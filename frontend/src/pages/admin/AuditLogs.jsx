import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import { showToast } from '../../components/ToastContainer';
import { ShieldAlert, UserPlus, Settings, Trash2, Edit } from 'lucide-react';

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/audit-logs');
      setLogs(res.data);
    } catch (err) {
      showToast('Failed to fetch audit logs', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getActionIcon = (action) => {
    if (action.includes('DELETE')) return <Trash2 className="w-4 h-4 text-red-500" />;
    if (action.includes('CREATE')) return <UserPlus className="w-4 h-4 text-emerald-500" />;
    if (action.includes('UPDATE') || action.includes('SETTING')) return <Settings className="w-4 h-4 text-blue-500" />;
    if (action.includes('PROMOTE')) return <ShieldAlert className="w-4 h-4 text-purple-500" />;
    return <Edit className="w-4 h-4 text-slate-500" />;
  };

  const getActionColor = (action) => {
    if (action.includes('DELETE')) return 'bg-red-50 text-red-700 border-red-200';
    if (action.includes('CREATE')) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (action.includes('UPDATE') || action.includes('SETTING')) return 'bg-blue-50 text-blue-700 border-blue-200';
    if (action.includes('PROMOTE')) return 'bg-purple-50 text-purple-700 border-purple-200';
    return 'bg-slate-50 text-slate-700 border-slate-200';
  };

  if (loading) return <LoadingSpinner size="lg" className="py-20" />;

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Audit & Activity Logs</h2>
      
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
                <th className="p-4 font-medium w-12"></th>
                <th className="p-4 font-medium">Action</th>
                <th className="p-4 font-medium">Performed By</th>
                <th className="p-4 font-medium">Target Entity</th>
                <th className="p-4 font-medium w-1/3">Details</th>
                <th className="p-4 font-medium text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 text-center">
                    {getActionIcon(log.action)}
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${getActionColor(log.action)}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="p-4 font-medium text-slate-900">
                    {log.performedByUsername}
                  </td>
                  <td className="p-4 text-slate-600 text-sm">
                    {log.entityName} <span className="text-slate-400">#{log.entityId}</span>
                  </td>
                  <td className="p-4 text-slate-600 text-sm">
                    {log.details}
                  </td>
                  <td className="p-4 text-right text-slate-500 text-sm whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-500">No audit logs found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
