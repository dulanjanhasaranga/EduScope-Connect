import { Loader2, ArrowLeft, Send } from "lucide-react";
import SimpleMdeReact from "react-simplemde-editor";
import TagInput from "../components/TagInput";

import React from "react";

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { showToast } from '../components/ToastContainer';
import 'easymde/dist/easymde.min.css';

export default function AskQuestionPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const editorOptions = useMemo(() => ({
    placeholder: "Describe your question in detail. Include what you've tried and what you expect.",
    spellChecker: false,
    maxHeight: '400px',
  }), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    if (tags.length === 0) {
      setErrors({ tags: 'At least one tag is required' });
      setLoading(false);
      return;
    }

    try {
      const res = await api.post('/questions', { title, body, tags });
      showToast('Question posted successfully!', 'success');
      navigate(`/question/${res.data.id}`);
    } catch (err) {
      const errorData = err.response?.data;
      let toastMessage = 'Failed to post question';
      
      if (typeof errorData === 'object' && errorData !== null) {
        setErrors(errorData);
        if (errorData.error) {
          toastMessage = errorData.error;
        } else if (Object.keys(errorData).length > 0) {
          toastMessage = Object.values(errorData)[0];
        }
      } else {
        setErrors({ general: errorData?.error || 'Failed to post question' });
        toastMessage = errorData?.error || 'Failed to post question';
      }
      showToast(toastMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <button
        onClick={() => navigate('/questions')}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Questions
      </button>

      <div className="card">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Ask a Question</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.general && (
            <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg">{errors.general}</div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-gray-400">(max 150 characters)</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's your academic doubt? Be specific."
              className="input-field"
              maxLength={150}
              required
            />
            <div className="mt-1 text-right text-xs text-gray-400">{title.length}/150</div>
            {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Body <span className="text-gray-400">(max 5000 characters)</span>
            </label>
            <SimpleMdeReact
              value={body}
              onChange={setBody}
              options={editorOptions}
            />
            <div className="mt-1 text-right text-xs text-gray-400">{body.length}/5000</div>
            {errors.body && <p className="text-sm text-red-600 mt-1">{errors.body}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
            <TagInput tags={tags} onChange={setTags} maxTags={5} />
            {errors.tags && <p className="text-sm text-red-600 mt-1">{errors.tags}</p>}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary inline-flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              Post Question
            </button>
            <button
              type="button"
              onClick={() => navigate('/questions')}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
