import { MessageCircle, Search, Filter, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import LoadingSpinner from "../components/LoadingSpinner";
import QuestionCard from "../components/QuestionCard";

import React from "react";

import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../components/ToastContainer';

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState('');
  const [status, setStatus] = useState('');
  const [sort, setSort] = useState('newest');
  const [categorizedTags, setCategorizedTags] = useState({});
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const askLink = isAuthenticated ? '/ask' : `/login?redirect=${encodeURIComponent('/ask')}`;

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', page);
      params.append('size', 10);
      params.append('sort', sort);
      if (search) params.append('search', search);
      if (tag) params.append('tag', tag);
      if (status) params.append('status', status);

      const res = await api.get(`/questions?${params.toString()}`);
      setQuestions(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      showToast('Failed to load questions', 'error');
    } finally {
      setLoading(false);
    }
  }, [page, sort, search, tag, status]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  useEffect(() => {
    api.get('/tags/categorized')
      .then((res) => {
        setCategorizedTags(res.data);
      })
      .catch((err) => {
        console.error("Failed to load tags", err);
      });
  }, []);

  useEffect(() => {
    const handleNewQuestion = (e) => {
      const question = e.detail;
      setQuestions((prev) => [question, ...prev]);
      showToast('New question posted!', 'info');
    };
    window.addEventListener('newQuestion', handleNewQuestion);
    return () => window.removeEventListener('newQuestion', handleNewQuestion);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0);
    fetchQuestions();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Questions</h1>
        <Link to={askLink} className="btn-primary inline-flex items-center gap-2 self-start" id="questions-ask-btn">
          <Plus className="h-4 w-4" />
          Ask Question
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="card py-4">
        <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="input-field pl-10"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={tag}
              onChange={(e) => { setTag(e.target.value); setPage(0); }}
              className="input-field w-48"
              id="filter-tag"
            >
              <option value="">All Tags</option>
              {Object.entries(categorizedTags).map(([category, tags]) => (
                <optgroup key={category} label={category}>
                  {tags.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </optgroup>
              ))}
            </select>
            <select
              value={status}
              onChange={(e) => { setStatus(e.target.value); setPage(0); }}
              className="input-field w-40"
            >
              <option value="">All Status</option>
              <option value="unsolved">Unsolved</option>
              <option value="solved">Solved</option>
            </select>
            <select
              value={sort}
              onChange={(e) => { setSort(e.target.value); setPage(0); }}
              className="input-field w-40"
            >
              <option value="newest">Newest</option>
              <option value="most-voted">Most Voted</option>
              <option value="unsolved">Unsolved</option>
            </select>
            <button type="submit" className="btn-secondary">
              <Filter className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Questions List */}
      {loading ? (
        <LoadingSpinner size="lg" className="py-12" />
      ) : questions.length === 0 ? (
        <div className="card text-center py-12">
          <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No questions found</h3>
          <p className="text-gray-600 mt-1">Be the first to ask a question!</p>
          <Link to={askLink} className="btn-primary inline-flex items-center gap-2 mt-4">
            <Plus className="h-4 w-4" />
            Ask Question
          </Link>
        </div>
      ) : (
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {questions.map((question) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <QuestionCard question={question} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 pt-4">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-sm text-gray-600">
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
