import { User, Award, Edit2, ArrowLeft, CheckCircle, ArrowUp, ArrowDown, Repeat, Forward, Tag, Clock, Trash2, Send, MessageCircle, Sparkles } from "lucide-react";
import SimpleMdeReact from "react-simplemde-editor";
import ReactMarkdown from "react-markdown";
import LoadingSpinner from "../components/LoadingSpinner";
import AuthPrompt from "../components/AuthPrompt";
import SearchResourcesPanel from "../components/SearchResourcesPanel";
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useWebSocket } from '../context/WebSocketContext';
import { showToast } from '../components/ToastContainer';
import 'easymde/dist/easymde.min.css';
import remarkGfm from 'remark-gfm';

function timeAgo(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now - date) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return minutes + 'm ago';
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return hours + 'h ago';
  const days = Math.floor(hours / 24);
  if (days < 30) return days + 'd ago';
  const months = Math.floor(days / 30);
  if (months < 12) return months + 'mo ago';
  return Math.floor(months / 12) + 'y ago';
}

export default function QuestionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { subscribeToQuestion } = useWebSocket();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answerBody, setAnswerBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [editingAnswer, setEditingAnswer] = useState(null);
  const [editBody, setEditBody] = useState('');
  
  const [aiSummary, setAiSummary] = useState(null);
  const [generatingSummary, setGeneratingSummary] = useState(false);

  const editorOptionsEdit = useMemo(() => ({ spellChecker: false, maxHeight: '200px' }), []);
  const editorOptionsNew = useMemo(() => ({ spellChecker: false, maxHeight: '300px' }), []);

  const fetchQuestion = useCallback(async () => {
    try {
      const res = await api.get(`/questions/${id}`);
      setQuestion(res.data);
    } catch (err) {
      showToast('Question not found', 'error');
      navigate('/questions');
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

  useEffect(() => {
    if (!question) return;

    const unsubscribe = subscribeToQuestion(parseInt(id), {
      onNewAnswer: (answer) => {
        setQuestion((prev) => ({
          ...prev,
          answers: [...prev.answers, answer],
        }));
        showToast('New answer received!', 'info');
      },
      onVoteUpdate: (update) => {
        setQuestion((prev) => ({
          ...prev,
          answers: prev.answers.map((a) =>
            a.id === update.answerId ? { ...a, voteCount: update.voteCount } : a
          ),
        }));
      },
      onSolved: (event) => {
        setQuestion((prev) => ({
          ...prev,
          status: 'SOLVED',
          answers: prev.answers.map((a) =>
            a.id === event.acceptedAnswerId ? { ...a, isAccepted: true } : { ...a, isAccepted: false }
          ),
        }));
      },
    });

    return () => unsubscribe?.();
  }, [id, question?.id, subscribeToQuestion]);

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    if (!answerBody.trim()) return;

    setSubmitting(true);
    try {
      const res = await api.post(`/questions/${id}/answers`, { body: answerBody });
      setQuestion((prev) => ({
        ...prev,
        answers: [...prev.answers, res.data],
      }));
      setAnswerBody('');
      showToast('Answer posted successfully!', 'success');
    } catch (err) {
      showToast(err.response?.data?.error || 'Failed to post answer', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleVote = async (answerId, voteType) => {
    if (!isAuthenticated) {
      showToast('Please login to vote', 'error');
      navigate(`/login?redirect=${encodeURIComponent('/question/' + id)}`);
      return;
    }
    try {
      const res = await api.post(`/answers/${answerId}/vote`, { voteType });
      setQuestion((prev) => ({
        ...prev,
        answers: prev.answers.map((a) =>
          a.id === answerId
            ? { ...a, voteCount: res.data.voteCount, userVote: res.data.userVote }
            : a
        ),
      }));
    } catch (err) {
      showToast(err.response?.data?.error || 'Vote failed', 'error');
    }
  };

  const handleQuestionVote = async (voteType) => {
    if (!isAuthenticated) {
      showToast('Please login to vote', 'error');
      navigate(`/login?redirect=${encodeURIComponent('/question/' + id)}`);
      return;
    }
    try {
      const res = await api.post(`/questions/${id}/vote`, { voteType });
      setQuestion((prev) => ({
        ...prev,
        voteCount: res.data.voteCount,
        userVote: res.data.userVote
      }));
    } catch (err) {
      showToast(err.response?.data?.error || 'Vote failed', 'error');
    }
  };

  const handleShare = (e) => {
    e.preventDefault();
    const url = window.location.origin + '/question/' + question.id;
    if (navigator.share) {
      navigator.share({ title: question.title, url: url }).catch(console.error);
    } else {
      navigator.clipboard.writeText(url);
      showToast('Link copied to clipboard', 'success');
    }
  };

  const handleRepost = (e) => {
    e.preventDefault();
    showToast('Repost feature coming soon!', 'info');
  };

  const handleMarkSolved = async (answerId) => {
    try {
      const res = await api.patch(`/questions/${id}/status`, {
        status: 'SOLVED',
        acceptedAnswerId: answerId,
      });
      setQuestion(res.data);
      showToast('Question marked as solved!', 'success');
    } catch (err) {
      showToast(err.response?.data?.error || 'Failed to update status', 'error');
    }
  };

  const handleDeleteQuestion = async () => {
    if (!window.confirm('Are you sure you want to delete this question?')) return;
    try {
      await api.delete(`/questions/${id}`);
      showToast('Question deleted', 'success');
      navigate('/questions');
    } catch (err) {
      showToast(err.response?.data?.error || 'Delete failed', 'error');
    }
  };

  const handleDeleteAnswer = async (answerId) => {
    if (!window.confirm('Are you sure you want to delete this answer?')) return;
    try {
      await api.delete(`/answers/${answerId}`);
      setQuestion((prev) => ({
        ...prev,
        answers: prev.answers.filter((a) => a.id !== answerId),
      }));
      showToast('Answer deleted', 'success');
    } catch (err) {
      showToast(err.response?.data?.error || 'Delete failed', 'error');
    }
  };

  const handleEditAnswer = async (answerId) => {
    try {
      const res = await api.patch(`/answers/${answerId}`, { body: editBody });
      setQuestion((prev) => ({
        ...prev,
        answers: prev.answers.map((a) => (a.id === answerId ? res.data : a)),
      }));
      setEditingAnswer(null);
      setEditBody('');
      showToast('Answer updated', 'success');
    } catch (err) {
      showToast(err.response?.data?.error || 'Update failed', 'error');
    }
  };

  const handleSummarize = async () => {
    setGeneratingSummary(true);
    try {
      const res = await api.post('/ai/summarize', { text: question.body });
      setAiSummary(res.data.summary);
      showToast('AI Summary generated!', 'success');
    } catch (err) {
      showToast('AI summarization failed: ' + (err.response?.data?.error || err.message), 'error');
    } finally {
      setGeneratingSummary(false);
    }
  };

  if (loading) return <LoadingSpinner size="lg" className="py-12" />;
  if (!question) return null;

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/questions')}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Questions
      </button>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* Question */}
          <div className="card">
            <div className="flex flex-col gap-4">
              
              {/* Question Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{question.author?.username}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(question.createdAt).toLocaleDateString()}
                      <span className="text-gray-400 mx-1">·</span>
                      <span className="text-gray-400">{timeAgo(question.createdAt)}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${question.status === 'SOLVED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {question.status === 'SOLVED' ? (
                      <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4" /> Solved</span>
                    ) : (
                      'Unsolved'
                    )}
                  </span>
                  {question.isOwner && (
                    <button
                      onClick={handleDeleteQuestion}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      id="delete-question-btn"
                    >
                    <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Question Body */}
              <div className="min-w-0">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{question.title}</h1>
                <div className="prose max-w-none mb-4">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{question.body}</ReactMarkdown>
                </div>

                <div className="flex flex-wrap gap-2 mb-2">
                  {question.tags?.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-full cursor-pointer transition-colors">
                      <Tag className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* AI Summary Box */}
                {aiSummary && (
                  <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-xl">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} className="text-purple-900 prose prose-purple">{aiSummary}</ReactMarkdown>
                  </div>
                )}
              </div>

              {/* Quora Style Action Bar for Question */}
              <div className="flex items-center gap-2 flex-wrap border-t border-gray-100 pt-3">
                <div className="action-pill-group">
                  <button 
                    onClick={() => handleQuestionVote('UP')}
                    className={`action-pill ${question.userVote === 'up' ? 'text-blue-600 bg-blue-50' : 'hover:text-blue-600'}`}
                  >
                    <ArrowUp className="w-5 h-5" />
                    <span className="font-semibold">{question.voteCount || 0}</span>
                  </button>
                  <div className="w-px h-6 bg-gray-300"></div>
                  <button 
                    onClick={() => handleQuestionVote('DOWN')}
                    className={`action-pill ${question.userVote === 'down' ? 'text-red-600 bg-red-50' : 'hover:text-red-600'}`}
                  >
                    <ArrowDown className="w-5 h-5" />
                  </button>
                </div>

                <button onClick={() => { document.getElementById('submit-answer-btn')?.scrollIntoView({ behavior: 'smooth' }); }} className="action-pill-group px-3 py-1.5 hover:bg-gray-200">
                  <MessageCircle className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-sm text-gray-600">{question.answers?.length || 0}</span>
                </button>

                <button onClick={handleRepost} className="action-pill-group px-3 py-1.5 hover:bg-gray-200">
                  <Repeat className="w-5 h-5 text-gray-600" />
                </button>

                <button onClick={handleShare} className="action-pill-group px-3 py-1.5 hover:bg-gray-200">
                  <Forward className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-sm text-gray-600">Share</span>
                </button>

                <div className="ml-auto">
                  <button 
                    onClick={handleSummarize} 
                    disabled={generatingSummary}
                    className="flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    <Sparkles className="w-4 h-4" />
                    {generatingSummary ? 'Summarizing...' : 'Summarize with AI'}
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Answers */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              {question.answers?.length || 0} Answers
            </h2>

            {question.answers?.map((answer) => (
              <div key={answer.id} className={`card ${answer.isAccepted ? 'border-green-300 bg-green-50/30' : ''}`}>
                {answer.isAccepted && (
                  <div className="flex items-center gap-2 text-green-700 font-medium mb-3">
                    <Award className="h-5 w-5" />
                    Accepted Answer
                  </div>
                )}

                <div className="flex flex-col gap-4">
                  {/* Answer Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-gray-600" />
                      </div>
                      <span className="font-medium text-sm">{answer.author?.username}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(answer.createdAt).toLocaleDateString()}
                        <span className="text-gray-400 ml-1">· {timeAgo(answer.createdAt)}</span>
                      </span>
                    </div>
                    {answer.isOwner && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setEditingAnswer(answer.id); setEditBody(answer.body); }}
                          className="p-1 text-gray-400 hover:text-primary-600"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteAnswer(answer.id)}
                          className="p-1 text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Answer Body */}
                  {editingAnswer === answer.id ? (
                    <div className="space-y-2">
                      <SimpleMdeReact
                        value={editBody}
                        onChange={setEditBody}
                        options={editorOptionsEdit}
                      />
                      <div className="flex gap-2">
                        <button onClick={() => handleEditAnswer(answer.id)} className="btn-primary text-sm">Save</button>
                        <button onClick={() => { setEditingAnswer(null); setEditBody(''); }} className="btn-secondary text-sm">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="prose max-w-none text-sm md:text-base">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{answer.body}</ReactMarkdown>
                    </div>
                  )}

                  {question.isOwner && question.status !== 'SOLVED' && !answer.isAccepted && (
                    <button
                      onClick={() => handleMarkSolved(answer.id)}
                      className="mt-2 inline-flex items-center gap-1 text-sm text-green-600 hover:text-green-700 font-medium"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Mark as Accepted Answer
                    </button>
                  )}

                  {/* Quora Style Action Bar for Answer */}
                  <div className="flex items-center gap-2 flex-wrap border-t border-gray-100 pt-3">
                    <div className="action-pill-group">
                      <button 
                        onClick={() => handleVote(answer.id, 'UP')}
                        className={`action-pill ${answer.userVote === 'up' ? 'text-blue-600 bg-blue-50' : 'hover:text-blue-600'}`}
                      >
                        <ArrowUp className="w-5 h-5" />
                        <span className="font-semibold">{answer.voteCount || 0}</span>
                      </button>
                      <div className="w-px h-6 bg-gray-300"></div>
                      <button 
                        onClick={() => handleVote(answer.id, 'DOWN')}
                        className={`action-pill ${answer.userVote === 'down' ? 'text-red-600 bg-red-50' : 'hover:text-red-600'}`}
                      >
                        <ArrowDown className="w-5 h-5" />
                      </button>
                    </div>

                    <button onClick={handleRepost} className="action-pill-group px-3 py-1.5 hover:bg-gray-200">
                      <Repeat className="w-5 h-5 text-gray-600" />
                    </button>

                    <button onClick={handleShare} className="action-pill-group px-3 py-1.5 hover:bg-gray-200">
                      <Forward className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-sm text-gray-600">Share</span>
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Post Answer - Authenticated */}
          {isAuthenticated && question.status !== 'SOLVED' && (
            <div className="card mt-6">
              <h3 className="text-lg font-semibold mb-4">Your Answer</h3>
              <form onSubmit={handleSubmitAnswer}>
                <div className="mb-4">
                  <SimpleMdeReact
                    value={answerBody}
                    onChange={setAnswerBody}
                    options={editorOptionsNew}
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting || !answerBody.trim()}
                  className="btn-primary inline-flex items-center gap-2 disabled:opacity-50"
                  id="submit-answer-btn"
                >
                  {submitting ? (
                    <span className="animate-spin">⌛</span>
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  Post Answer
                </button>
              </form>
            </div>
          )}

          {/* Auth Prompt - Not Authenticated */}
          {!isAuthenticated && question.status !== 'SOLVED' && (
            <AuthPrompt
              title="Want to answer this question?"
              message="Log in or create an account to post your answer, vote on solutions, and earn reputation."
              icon={MessageCircle}
            />
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:w-80 flex-shrink-0 space-y-6">
          <SearchResourcesPanel 
            query={question.title} 
            tags={question.tags} 
          />
        </div>
      </div>
    </div>
  );
}
