import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import { showToast } from '../../components/ToastContainer';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Users, FileText, LayoutTemplate, Activity } from 'lucide-react';

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/analytics');
      setStats(res.data);
    } catch (err) {
      showToast('Failed to load analytics: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  if (loading || !stats) return <LoadingSpinner size="lg" className="py-20" />;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Analytics Overview</h2>
          <p className="text-slate-500 text-sm mt-1">Real-time metrics and platform engagement</p>
        </div>
        <button onClick={fetchAnalytics} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
          <Activity className="w-4 h-4" /> Refresh
        </button>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center opacity-50 pointer-events-none">
            <Users className="w-10 h-10 text-blue-200 ml-4 mt-4" />
          </div>
          <h3 className="text-slate-500 font-medium mb-1 text-sm">Total Users</h3>
          <p className="text-4xl font-bold text-slate-900">{stats.totalUsers}</p>
        </div>
        
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center opacity-50 pointer-events-none">
            <FileText className="w-10 h-10 text-emerald-200 ml-4 mt-4" />
          </div>
          <h3 className="text-slate-500 font-medium mb-1 text-sm">Questions Asked</h3>
          <p className="text-4xl font-bold text-slate-900">{stats.totalQuestions}</p>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-50 rounded-full flex items-center justify-center opacity-50 pointer-events-none">
            <Users className="w-10 h-10 text-purple-200 ml-4 mt-4" />
          </div>
          <h3 className="text-slate-500 font-medium mb-1 text-sm">Study Groups</h3>
          <p className="text-4xl font-bold text-slate-900">{stats.totalGroups}</p>
        </div>
        
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center opacity-50 pointer-events-none">
            <LayoutTemplate className="w-10 h-10 text-orange-200 ml-4 mt-4" />
          </div>
          <h3 className="text-slate-500 font-medium mb-1 text-sm">Ecosystem Apps</h3>
          <p className="text-4xl font-bold text-slate-900">{stats.totalEcosystemApps}</p>
        </div>
      </div>
      
      {/* Chart */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Engagement (Last 7 Days)</h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats.questionActivityChart} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
              />
              <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
              <Line type="monotone" name="Questions Asked" dataKey="questions" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 8, stroke: '#bfdbfe', strokeWidth: 4 }} />
              <Line type="monotone" name="New Users" dataKey="users" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 8, stroke: '#a7f3d0', strokeWidth: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
