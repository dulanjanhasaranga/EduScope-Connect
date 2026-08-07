import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { showToast } from '../components/ToastContainer';
import { Users2, Search, Plus, MessageCircle, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function StudyGroupsPage() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: '', description: '', category: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchGroups();
  }, [isAuthenticated]);

  const fetchGroups = async () => {
    try {
      const res = await api.get(`/groups?t=${new Date().getTime()}`);
      setGroups(res.data);
    } catch (err) {
      showToast('Failed to load study groups', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    if (!newGroup.name || !newGroup.category) {
      showToast('Name and Category are required', 'error');
      return;
    }
    
    setSubmitting(true);
    try {
      const res = await api.post('/groups', newGroup);
      setGroups([res.data, ...groups]);
      setShowCreateModal(false);
      setNewGroup({ name: '', description: '', category: '' });
      showToast('Study group created!', 'success');
      navigate(`/groups/${res.data.id}`);
    } catch (err) {
      showToast(err.response?.data?.error || 'Failed to create group', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleJoinOrEnter = async (group) => {
    if (!isAuthenticated) {
      showToast('Please login to join groups', 'error');
      return;
    }

    if (group.isMember || group.ownerId === user?.id) {
      navigate(`/groups/${group.id}`);
      return;
    }

    try {
      const res = await api.post(`/groups/${group.id}/join`);
      setGroups(groups.map(g => g.id === group.id ? res.data : g));
      showToast(`Joined ${group.name}!`, 'success');
      navigate(`/groups/${group.id}`);
    } catch (err) {
      showToast(err.response?.data?.error || 'Failed to join group', 'error');
    }
  };

  const filteredGroups = groups.filter(g => 
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    g.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const myGroups = filteredGroups.filter(group => group.isMember || group.ownerId === user?.id);
  const discoverGroups = filteredGroups.filter(group => !(group.isMember || group.ownerId === user?.id));

  if (loading) return <LoadingSpinner size="lg" className="py-20" />;

  return (
    <div className="max-w-7xl mx-auto space-y-6 relative">
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
            <button className="btn-primary flex items-center gap-2 whitespace-nowrap" onClick={() => setShowCreateModal(true)}>
              <Plus className="w-4 h-4" /> Create Group
            </button>
          )}
        </div>
      </div>

      {/* My Chats (WhatsApp Style) */}
      {isAuthenticated && (
        <div className="mb-10 animate-fade-in-up">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-orange-500" />
            My Chats
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
            {myGroups.map(group => (
              <div 
                key={group.id} 
                onClick={() => navigate(`/groups/${group.id}`)}
                className="flex items-center justify-between p-4 hover:bg-orange-50 cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 text-orange-700 rounded-full flex items-center justify-center font-bold text-xl shadow-inner">
                    {group.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{group.name}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                      {group.category} • {group.memberCount} members
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center">
                   <span className="text-sm font-medium text-orange-600 bg-orange-100 px-4 py-1.5 rounded-full group-hover:bg-orange-500 group-hover:text-white transition-colors">
                     Open Chat
                   </span>
                </div>
              </div>
            ))}
            {myGroups.length === 0 && (
              <div className="p-8 text-center text-gray-500 bg-gray-50">
                <p>You haven't joined any groups yet. Browse the groups below to get started!</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Discover Groups */}
      <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Search className="w-5 h-5 text-gray-400" />
          Discover Groups
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {discoverGroups.map(group => (
            <div key={group.id} className="card hover:shadow-md transition-shadow border-t-4 border-orange-400 flex flex-col h-full">
              <div className="flex justify-between items-start mb-3">
                <span className="px-2.5 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full uppercase tracking-wider">
                  {group.category}
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-500 font-medium">
                  <Users2 className="w-4 h-4" /> {group.memberCount}
                </span>
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 mb-2">{group.name}</h2>
              <p className="text-gray-600 mb-6 text-sm line-clamp-2 min-h-[40px] flex-grow">{group.description}</p>
              
              <div className="flex items-center gap-2 mt-auto">
                <button 
                  onClick={() => handleJoinOrEnter(group)}
                  className="w-full py-2 btn-secondary hover:bg-orange-50 hover:text-orange-600"
                >
                  Join Group
                </button>
              </div>
            </div>
          ))}
          {discoverGroups.length === 0 && (
            <div className="col-span-full p-12 text-center text-gray-500 border-2 border-dashed rounded-2xl">
              <Users2 className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p>No new groups available to join right now.</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in-up">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-bold text-gray-900">Create Study Group</h2>
              <button onClick={() => setShowCreateModal(false)} className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleCreateGroup} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Group Name</label>
                <input 
                  type="text" 
                  required
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                  className="input-field w-full"
                  placeholder="e.g., Advanced Machine Learning"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select 
                  required
                  value={newGroup.category}
                  onChange={(e) => setNewGroup({...newGroup, category: e.target.value})}
                  className="input-field w-full"
                >
                  <option value="">Select a category</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Biology">Biology</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Business">Business</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  rows={3}
                  value={newGroup.description}
                  onChange={(e) => setNewGroup({...newGroup, description: e.target.value})}
                  className="input-field w-full resize-none"
                  placeholder="What is this group about?"
                />
              </div>
              
              <div className="pt-2 flex justify-end gap-3">
                <button type="button" onClick={() => setShowCreateModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="btn-primary">
                  {submitting ? 'Creating...' : 'Create Group'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
