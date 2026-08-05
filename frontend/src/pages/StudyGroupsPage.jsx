import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { showToast } from '../components/ToastContainer';
import { Users2, Search, Plus, MessageCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function StudyGroupsPage() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await api.get('/groups');
        setGroups(res.data);
      } catch (err) {
        showToast('Failed to load study groups', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);

  const filteredGroups = groups.filter(g => 
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    g.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner size="lg" className="py-20" />;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Users2 className="w-8 h-8 text-orange-500" />
            Study Groups
          </h1>
          <p className="text-gray-500 mt-1">Join collaborative learning hubs to share resources and study together.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search groups..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-9 w-full md:w-64"
            />
          </div>
          {isAuthenticated && (
            <button className="btn-primary flex items-center gap-2 whitespace-nowrap" onClick={() => showToast('Group creation coming soon!', 'info')}>
              <Plus className="w-4 h-4" /> Create Group
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map(group => (
          <div key={group.id} className="card hover:shadow-md transition-shadow border-t-4 border-orange-400">
            <div className="flex justify-between items-start mb-3">
              <span className="px-2.5 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full uppercase tracking-wider">
                {group.category}
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-500 font-medium">
                <Users2 className="w-4 h-4" /> {Math.floor(Math.random() * 50) + 2}
              </span>
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mb-2">{group.name}</h2>
            <p className="text-gray-600 mb-6 text-sm line-clamp-2 min-h-[40px]">{group.description}</p>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => showToast('Joining groups will be available soon!', 'info')}
                className="flex-1 btn-secondary py-2"
              >
                Join Group
              </button>
            </div>
          </div>
        ))}
        {groups.length === 0 && (
          <div className="col-span-full p-12 text-center text-gray-500 border-2 border-dashed rounded-2xl">
            <MessageCircle className="w-12 h-12 mx-auto text-gray-300 mb-3" />
            <p>No study groups available yet. Be the first to create one!</p>
          </div>
        )}
      </div>
    </div>
  );
}
