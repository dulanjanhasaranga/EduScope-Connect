import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import api from '../utils/api';
import { BarChart3, Users, Award, BookOpen, Plus, Calendar } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import { showToast } from '../components/ToastContainer';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function LeaderDashboard() {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('analytics');

  useEffect(() => {
    if (user?.role === 'LEADER' || user?.role === 'ADMIN') {
      fetchAnalytics();
    }
  }, [user]);

  const fetchAnalytics = async () => {
    try {
      const [analyticsRes, assessmentsRes] = await Promise.all([
        api.get('/analytics/leader'),
        api.get('/assessments/my')
      ]);
      setAnalytics(analyticsRes.data);
      setAssessments(assessmentsRes.data);
    } catch (err) {
      showToast('Failed to load dashboard data', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!user || (user.role !== 'LEADER' && user.role !== 'ADMIN')) {
    return <Navigate to="/" replace />;
  }

  if (loading) return <LoadingSpinner size="lg" className="py-20" />;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
          <img src={user.avatarUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&q=80"} className="w-16 h-16 rounded-full" alt="Profile" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leader Portal</h1>
          <p className="text-gray-500">Welcome back, {user.username}</p>
        </div>
      </div>

      <div className="flex gap-4 border-b border-gray-200 mb-8">
        <button 
          onClick={() => setActiveTab('analytics')}
          className={`pb-4 px-2 font-medium ${activeTab === 'analytics' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Performance Analytics
        </button>
        <button 
          onClick={() => setActiveTab('assessments')}
          className={`pb-4 px-2 font-medium ${activeTab === 'assessments' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Manage Assessments
        </button>
      </div>

      {activeTab === 'analytics' && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 mb-1">Total Answers</p>
                  <p className="text-3xl font-bold text-gray-900">{analytics?.totalAnswers || 0}</p>
                </div>
                <div className="p-3 bg-white rounded-xl shadow-sm"><BookOpen className="w-6 h-6 text-blue-500"/></div>
              </div>
            </div>
            
            <div className="card bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600 mb-1">Reputation Score</p>
                  <p className="text-3xl font-bold text-gray-900">{analytics?.reputationScore || 0}</p>
                </div>
                <div className="p-3 bg-white rounded-xl shadow-sm"><Award className="w-6 h-6 text-purple-500"/></div>
              </div>
            </div>

            <div className="card bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-600 mb-1">Student Impact</p>
                  <p className="text-3xl font-bold text-gray-900">{analytics?.studentImpactScore || 0}</p>
                </div>
                <div className="p-3 bg-white rounded-xl shadow-sm"><Users className="w-6 h-6 text-emerald-500"/></div>
              </div>
            </div>
          </div>

          <div className="card min-h-[300px] flex flex-col bg-white border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-500" /> Monthly Engagement
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics?.monthlyEngagement || []}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                  <Tooltip 
                    cursor={{fill: '#F3F4F6'}}
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  />
                  <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'assessments' && (
        <div className="animate-fade-in">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Your Assessments</h2>
            <button className="btn-primary flex items-center gap-2 text-sm px-4 py-2" onClick={() => showToast('Assessment builder opening soon', 'info')}>
              <Plus className="w-4 h-4" /> Create New
            </button>
          </div>
          {assessments.length === 0 ? (
            <div className="card border-dashed border-2 bg-gray-50 flex flex-col items-center justify-center p-12 text-gray-500">
              <BookOpen className="w-12 h-12 text-gray-300 mb-3" />
              <p>You haven't created any assessments yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assessments.map((assessment) => (
                <div key={assessment.id} className="card hover:shadow-md transition-shadow cursor-pointer bg-white border border-gray-100">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-900">{assessment.title}</h3>
                    <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded font-medium flex items-center gap-1">
                      {assessment.questions?.length || 0} Questions
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{assessment.description}</p>
                  <div className="text-xs text-gray-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Created {new Date(assessment.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
