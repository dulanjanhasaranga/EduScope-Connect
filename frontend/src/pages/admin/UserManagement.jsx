import React, { useState, useEffect } from 'react';
import { Shield, Trash2 } from 'lucide-react';
import api from '../../utils/api';
import { showToast } from '../../components/ToastContainer';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/users');
      // Filter out LEADERS and ADMINS if we only want standard STUDENTS here, 
      // but for now let's just show everyone or just STUDENTS.
      // We will show only STUDENT and ADMIN here. Leaders go to Leader Management.
      setUsers(res.data.filter(u => u.role !== 'LEADER'));
    } catch (err) {
      showToast('Failed to fetch users: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await api.delete(`/admin/users/${id}`);
      setUsers(users.filter(u => u.id !== id));
      showToast('User deleted', 'success');
    } catch (err) {
      showToast('Delete failed: ' + err.message, 'error');
    }
  };

  const handleToggleRole = async (id, currentRole) => {
    const newRole = currentRole === 'ADMIN' ? 'STUDENT' : 'ADMIN';
    if (!window.confirm(`Change role to ${newRole}?`)) return;
    try {
      await api.patch(`/admin/users/${id}/role?role=${newRole}`);
      setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
      showToast(`User role updated to ${newRole}`, 'success');
    } catch (err) {
      showToast('Update failed: ' + err.message, 'error');
    }
  };

  if (loading) return <LoadingSpinner size="lg" className="py-20" />;

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">User Management</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-sm border-b">
              <th className="p-4 font-medium">Username</th>
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Role</th>
              <th className="p-4 font-medium">Reputation</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="p-4 font-semibold text-slate-800">{u.username}</td>
                <td className="p-4 text-slate-600">{u.email}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${u.role === 'ADMIN' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
                    {u.role}
                  </span>
                </td>
                <td className="p-4 text-slate-600 font-medium">{u.reputationScore}</td>
                <td className="p-4 text-right flex justify-end gap-2">
                  <button onClick={() => handleToggleRole(u.id, u.role)} className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded" title="Toggle Role"><Shield className="w-4 h-4" /></button>
                  <button onClick={() => handleDeleteUser(u.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded" title="Delete User"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
            {users.length === 0 && <tr><td colSpan="5" className="p-8 text-center text-slate-500">No users found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
