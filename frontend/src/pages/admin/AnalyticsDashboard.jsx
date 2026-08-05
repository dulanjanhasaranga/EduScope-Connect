import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState({ users: 0, questions: 0, products: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be a dedicated stats endpoint
    // For now we'll just fetch list endpoints to get lengths, or just show placeholders
    setLoading(false);
  }, []);

  if (loading) return <LoadingSpinner size="lg" className="py-20" />;

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Analytics Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl">
          <h3 className="text-blue-800 font-medium mb-2">Total Users</h3>
          <p className="text-4xl font-bold text-blue-900">--</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl">
          <h3 className="text-emerald-800 font-medium mb-2">Questions Asked</h3>
          <p className="text-4xl font-bold text-emerald-900">--</p>
        </div>
        <div className="bg-purple-50 border border-purple-100 p-6 rounded-2xl">
          <h3 className="text-purple-800 font-medium mb-2">Ecosystem Apps</h3>
          <p className="text-4xl font-bold text-purple-900">--</p>
        </div>
      </div>
      
      <div className="mt-8 p-8 border-2 border-dashed border-slate-200 rounded-2xl text-center text-slate-500">
        Detailed charting (Recharts) will be integrated here.
      </div>
    </div>
  );
}
