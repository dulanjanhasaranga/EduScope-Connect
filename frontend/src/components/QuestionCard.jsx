import { ArrowUp, ArrowDown, MessageCircle, Repeat, Forward, CheckCircle, Tag, Clock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import api from "../utils/api";
import { showToast } from "../components/ToastContainer";

export default function QuestionCard({ question }) {
  const navigate = useNavigate();
  const [voteCount, setVoteCount] = useState(question.voteCount || 0);
  const [userVote, setUserVote] = useState(question.userVote || null); // 'UP' or 'DOWN'

  const handleVote = async (type, e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const res = await api.post('/questions/' + question.id + '/vote', { voteType: type });
      setVoteCount(res.data.voteCount);
      setUserVote(res.data.userVote);
    } catch (err) {
      if (err.response?.status === 401) {
        showToast('Please login to vote', 'error');
      } else {
        showToast(err.response?.data?.error || 'Vote failed', 'error');
      }
    }
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const url = window.location.origin + '/question/' + question.id;
    if (navigator.share) {
      navigator.share({
        title: question.title,
        url: url
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(url);
      showToast('Link copied to clipboard', 'success');
    }
  };

  const handleRepost = (e) => {
    e.preventDefault();
    e.stopPropagation();
    showToast('Repost feature coming soon!', 'info');
  };

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-3">
        {/* Header: Author & Time */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
              {question.authorUsername.charAt(0).toUpperCase()}
            </div>
            <div>
              <span className="font-semibold text-gray-800">{question.authorUsername}</span>
              <div className="text-xs text-gray-500">{new Date(question.createdAt).toLocaleDateString()}</div>
            </div>
          </div>
          {question.status === 'SOLVED' && (
            <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-semibold border border-green-200">
              <CheckCircle className="w-4 h-4" /> Solved
            </div>
          )}
        </div>

        {/* Content */}
        <div className="min-w-0">
          <Link 
            to={'/question/' + question.id} 
            className="text-lg font-bold text-gray-900 hover:underline line-clamp-2"
          >
            {question.title}
          </Link>
          <p className="mt-1 text-gray-600 text-sm line-clamp-3 leading-relaxed">{question.body}</p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {question.tags?.map((tag) => (
              <span 
                key={tag} 
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-full cursor-pointer transition-colors"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Quora Style Action Bar */}
        <div className="mt-2 flex items-center gap-2 flex-wrap">
          <div className="action-pill-group">
            <button 
              onClick={(e) => handleVote('UP', e)}
              className={`action-pill ${userVote === 'up' ? 'text-blue-600 bg-blue-50' : 'hover:text-blue-600'}`}
            >
              <ArrowUp className="w-5 h-5" />
              <span className="font-semibold">{voteCount}</span>
            </button>
            <div className="w-px h-6 bg-gray-300"></div>
            <button 
              onClick={(e) => handleVote('DOWN', e)}
              className={`action-pill ${userVote === 'down' ? 'text-red-600 bg-red-50' : 'hover:text-red-600'}`}
            >
              <ArrowDown className="w-5 h-5" />
            </button>
          </div>

          <button 
            onClick={() => navigate('/question/' + question.id)}
            className="action-pill-group px-3 py-1.5 hover:bg-gray-200"
          >
            <MessageCircle className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-sm text-gray-600">{question.answerCount || 0}</span>
          </button>

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
  );
}
