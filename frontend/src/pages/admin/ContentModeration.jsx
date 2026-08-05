import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import api from '../../utils/api';
import { showToast } from '../../components/ToastContainer';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function ContentModeration() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/questions');
      setQuestions(res.data);
    } catch (err) {
      showToast('Failed to fetch questions: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuestion = async (id) => {
    if (!window.confirm('Are you sure you want to delete this question?')) return;
    try {
      await api.delete(`/admin/questions/${id}`);
      setQuestions(questions.filter(q => q.id !== id));
      showToast('Question deleted', 'success');
    } catch (err) {
      showToast('Delete failed: ' + err.message, 'error');
    }
  };

  if (loading) return <LoadingSpinner size="lg" className="py-20" />;

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Content Moderation</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-sm border-b">
              <th className="p-4 font-medium">Title</th>
              <th className="p-4 font-medium">Author</th>
              <th className="p-4 font-medium">Created At</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {questions.map(q => (
              <tr key={q.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="p-4 font-semibold text-slate-800 truncate max-w-xs">{q.title}</td>
                <td className="p-4 text-slate-600">{q.authorUsername}</td>
                <td className="p-4 text-slate-500 text-sm">{new Date(q.createdAt).toLocaleDateString()}</td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDeleteQuestion(q.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
            {questions.length === 0 && <tr><td colSpan="4" className="p-8 text-center text-slate-500">No questions found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
