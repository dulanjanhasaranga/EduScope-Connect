import React, { useState, useEffect } from 'react';
import { Shield, Trash2, CheckCircle } from 'lucide-react';
import api from '../../utils/api';
import { showToast } from '../../components/ToastContainer';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function LeaderManagement() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaders();
  }, []);

  const fetchLeaders = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/users');
      setLeaders(res.data.filter(u => u.role === 'LEADER'));
    } catch (err) {
      showToast('Failed to fetch leaders: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoteLeader = async (id) => {
    if (!window.confirm('Demote this leader to a regular student?')) return;
    try {
      await api.patch(`/admin/users/${id}/role?role=STUDENT`);
      setLeaders(leaders.filter(u => u.id !== id));
      showToast(`Leader demoted to STUDENT`, 'success');
    } catch (err) {
      showToast('Update failed: ' + err.message, 'error');
    }
  };

  if (loading) return <LoadingSpinner size="lg" className="py-20" />;

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Leader Management</h2>
      <p className="text-slate-500 mb-6">Manage platform educators and subject matter experts.</p>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-sm border-b">
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Reputation</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map(l => (
              <tr key={l.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="p-4 font-semibold text-slate-800 flex items-center gap-2">
                  <img src={l.avatarUrl} alt={l.username} className="w-8 h-8 rounded-full" />
                  {l.username}
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                </td>
                <td className="p-4 text-slate-600">{l.email}</td>
                <td className="p-4">
                  <span className="px-2 py-1 rounded text-xs font-bold bg-blue-100 text-blue-700 border border-blue-200">
                    VERIFIED
                  </span>
                </td>
                <td className="p-4 text-slate-600 font-medium">{l.reputationScore}</td>
                <td className="p-4 text-right flex justify-end gap-2">
                  <button onClick={() => handleDemoteLeader(l.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded" title="Revoke Leader Status">Revoke</button>
                </td>
              </tr>
            ))}
            {leaders.length === 0 && <tr><td colSpan="5" className="p-8 text-center text-slate-500">No leaders found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
