import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { showToast } from '../components/ToastContainer';
import { PlayCircle, CheckCircle, Award } from 'lucide-react';

export default function AssessmentsPage() {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const res = await api.get('/assessments');
        setAssessments(res.data);
      } catch (err) {
        showToast('Failed to load assessments', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchAssessments();
  }, []);

  if (loading) return <LoadingSpinner size="lg" className="py-20" />;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="card bg-gradient-to-r from-emerald-600 to-teal-500 text-white">
        <h1 className="text-3xl font-bold mb-2">Knowledge Assessments</h1>
        <p className="opacity-90">Test your knowledge with quizzes created by our community Leaders. Earn reputation by scoring high!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assessments.map(assessment => (
          <div key={assessment.id} className="card hover:shadow-md transition-shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-2">{assessment.title}</h2>
            <p className="text-gray-600 mb-4 line-clamp-2">{assessment.description}</p>
            
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
              <div className="text-sm text-gray-500">
                Created by {assessment.author?.username}
              </div>
              <button 
                onClick={() => showToast('Taking assessments will be available soon!', 'info')}
                className="btn-primary flex items-center gap-2 text-sm px-4 py-2"
              >
                <PlayCircle className="w-4 h-4" /> Start Quiz
              </button>
            </div>
          </div>
        ))}
        {assessments.length === 0 && (
          <div className="col-span-full p-12 text-center text-gray-500 border-2 border-dashed rounded-2xl">
            <Award className="w-12 h-12 mx-auto text-gray-300 mb-3" />
            <p>No assessments available yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
