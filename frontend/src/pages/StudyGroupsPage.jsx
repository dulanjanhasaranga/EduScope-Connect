import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { showToast } from '../components/ToastContainer';
import { Users2, Search, Plus, MessageCircle, X, ChevronRight } from 'lucide-react';
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

    if (group.member || group.ownerId === user?.id) {
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

  const myGroups = filteredGroups.filter(group => group.member || group.ownerId === user?.id);
  const discoverGroups = filteredGroups; 

  const getCategoryTheme = (category) => {
    switch (category) {
      case 'Computer Science': return { bg: 'from-blue-600 to-blue-800', light: 'bg-blue-50 text-blue-700' };
      case 'Mathematics': return { bg: 'from-red-600 to-red-800', light: 'bg-red-50 text-red-700' };
      case 'Physics': return { bg: 'from-indigo-600 to-indigo-800', light: 'bg-indigo-50 text-indigo-700' };
      case 'Biology': return { bg: 'from-emerald-600 to-emerald-800', light: 'bg-emerald-50 text-emerald-700' };
      case 'Chemistry': return { bg: 'from-teal-600 to-teal-800', light: 'bg-teal-50 text-teal-700' };
      case 'Medicine': return { bg: 'from-rose-600 to-rose-800', light: 'bg-rose-50 text-rose-700' };
      case 'Engineering': return { bg: 'from-orange-600 to-orange-800', light: 'bg-orange-50 text-orange-700' };
      case 'Business': return { bg: 'from-violet-600 to-violet-800', light: 'bg-violet-50 text-violet-700' };
      case 'Literature': return { bg: 'from-amber-600 to-amber-800', light: 'bg-amber-50 text-amber-700' };
      case 'History': return { bg: 'from-stone-600 to-stone-800', light: 'bg-stone-50 text-stone-700' };
      default: return { bg: 'from-slate-600 to-slate-800', light: 'bg-slate-50 text-slate-700' };
    }
  };

  if (loading) return <LoadingSpinner size="lg" className="py-20" />;

  return (
    <div className="max-w-7xl mx-auto space-y-8 relative pb-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Users2 className="w-8 h-8 text-blue-600" />
            Classes & Groups
          </h1>
          <p className="text-gray-500 mt-1">Collaborate, share resources, and learn together.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search classes..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 w-full md:w-64 bg-gray-100 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-full text-sm transition-all outline-none"
            />
          </div>
          {isAuthenticated && (
            <button 
              className="px-5 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50 flex items-center gap-2 shadow-sm transition-all" 
              onClick={() => setShowCreateModal(true)}
            >
              <Plus className="w-4 h-4" /> Create
            </button>
          )}
        </div>
      </div>

      {/* Enrolled Classes (My Chats) */}
      {isAuthenticated && myGroups.length > 0 && (
        <div className="animate-fade-in-up">
          <h2 className="text-lg font-bold text-gray-800 mb-4 px-1">Enrolled</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {myGroups.map(group => {
              const theme = getCategoryTheme(group.category);
              return (
                <div 
                  key={group.id} 
                  onClick={() => navigate(`/groups/${group.id}`)}
                  className="group flex flex-col h-48 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200 cursor-pointer relative"
                >
                  <div className={`h-24 bg-gradient-to-r ${theme.bg} p-4 relative`}>
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full text-white text-[10px] font-bold tracking-wider uppercase">
                      {group.category}
                    </div>
                    <h3 className="text-lg font-bold text-white mt-1 leading-tight line-clamp-1 group-hover:underline decoration-white/50 underline-offset-2">
                      {group.name}
                    </h3>
                  </div>
                  <div className="p-4 flex-grow flex items-end justify-between">
                    <p className="text-xs text-gray-500 flex items-center gap-1 font-medium">
                      <Users2 className="w-3.5 h-3.5" /> {group.memberCount} members
                    </p>
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                  {/* Avatar overlapping banner */}
                  <div className="absolute top-16 right-4 w-12 h-12 bg-white rounded-full p-1 shadow-sm">
                     <div className={`w-full h-full rounded-full flex items-center justify-center font-bold text-lg ${theme.light}`}>
                       {group.name.charAt(0).toUpperCase()}
                     </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Discover Groups */}
      <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-lg font-bold text-gray-800 mb-4 px-1 mt-8">Discover</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {discoverGroups.map(group => {
            const theme = getCategoryTheme(group.category);
            const isMember = group.member || group.ownerId === user?.id;
            
            return (
              <div key={group.id} className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200 relative">
                <div className={`h-28 bg-gradient-to-r ${theme.bg} p-4 relative`}>
                  <h3 className="text-lg font-bold text-white mt-1 leading-tight line-clamp-2 pr-12 group-hover:underline decoration-white/50 underline-offset-2 cursor-pointer" onClick={() => handleJoinOrEnter(group)}>
                    {group.name}
                  </h3>
                </div>
                
                {/* Avatar overlapping banner */}
                <div className="absolute top-20 right-4 w-14 h-14 bg-white rounded-full p-1 shadow-sm">
                   <div className={`w-full h-full rounded-full flex items-center justify-center font-bold text-xl ${theme.light}`}>
                     {group.name.charAt(0).toUpperCase()}
                   </div>
                </div>

                <div className="p-4 flex-grow flex flex-col mt-2">
                  <div className="mb-2">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${theme.light}`}>
                      {group.category}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2 min-h-[40px] flex-grow">{group.description}</p>
                  
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                    <span className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                      <Users2 className="w-3.5 h-3.5" /> {group.memberCount} members
                    </span>
                    {isMember ? (
                      <button 
                        onClick={() => handleJoinOrEnter(group)}
                        className="px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
                      >
                        View
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleJoinOrEnter(group)}
                        className="px-4 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 shadow-sm transition-colors"
                      >
                        Join
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
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
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Create Class</h2>
              <button onClick={() => setShowCreateModal(false)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleCreateGroup} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Class Name</label>
                <input 
                  type="text" 
                  required
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="e.g., Advanced Machine Learning"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                <select 
                  required
                  value={newGroup.category}
                  onChange={(e) => setNewGroup({...newGroup, category: e.target.value})}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none"
                >
                  <option value="">Select a subject</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Biology">Biology</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Literature">Literature</option>
                  <option value="History">History</option>
                  <option value="Business">Business</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                <textarea 
                  rows={3}
                  value={newGroup.description}
                  onChange={(e) => setNewGroup({...newGroup, description: e.target.value})}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="What is this class about?"
                />
              </div>
              
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowCreateModal(false)} className="px-5 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-full transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 shadow-sm transition-all">
                  {submitting ? 'Creating...' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
