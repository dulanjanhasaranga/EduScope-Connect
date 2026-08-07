import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { showToast } from '../components/ToastContainer';
import { Send, ArrowLeft, Users, LogOut, MessageSquare, HelpCircle, MessageCircle, Search } from 'lucide-react';
import QuestionCard from '../components/QuestionCard';

export default function StudyGroupDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Sidebar state
  const [allGroups, setAllGroups] = useState([]);
  const [sidebarTab, setSidebarTab] = useState('chats'); // 'chats' or 'discover'
  const [sidebarSearch, setSidebarSearch] = useState('');
  
  // Active Group state
  const [group, setGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('chat');
  const [relatedQuestions, setRelatedQuestions] = useState([]);
  
  const stompClient = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchAllGroups();
  }, [user]);

  useEffect(() => {
    if (id && allGroups.length > 0) {
      loadActiveGroup(parseInt(id));
    }
  }, [id, allGroups]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  useEffect(() => {
    return () => {
      if (stompClient.current) {
        stompClient.current.deactivate();
      }
    };
  }, []);

  const fetchAllGroups = async () => {
    try {
      const res = await api.get(`/groups?t=${new Date().getTime()}`);
      setAllGroups(res.data);
    } catch (err) {
      console.error("Failed to load groups");
    }
  };

  const loadActiveGroup = async (groupId) => {
    setLoading(true);
    if (stompClient.current) {
      stompClient.current.deactivate();
    }
    
    try {
      const foundGroup = allGroups.find(g => g.id === groupId);
      if (!foundGroup) {
        showToast('Group not found', 'error');
        navigate('/groups');
        return;
      }
      
      setGroup(foundGroup);

      // Fetch message history
      const msgRes = await api.get(`/groups/${groupId}/messages`);
      setMessages(msgRes.data);
      
      // Map group category to question tag
      let tagMap = {
        'Computer Science': 'machine-learning',
        'Medicine': 'biology',
        'Mathematics': 'mathematics'
      };
      const queryTag = tagMap[foundGroup.category] || foundGroup.category.toLowerCase().replace(/\s+/g, '-');
      
      const qRes = await api.get(`/questions?tag=${queryTag}&size=20`);
      setRelatedQuestions(qRes.data.content || []);
      
      if (foundGroup.isMember || foundGroup.ownerId === user?.id) {
        connectWebSocket(groupId);
      }
    } catch (err) {
      showToast('Error loading group details', 'error');
    } finally {
      setLoading(false);
    }
  };

  const connectWebSocket = (groupId) => {
    const token = localStorage.getItem('token');
    
    stompClient.current = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      connectHeaders: {
        Authorization: `Bearer ${token}`
      },
      onConnect: () => {
        stompClient.current.subscribe(`/topic/group/${groupId}`, (message) => {
          const newMsg = JSON.parse(message.body);
          setMessages(prev => [...prev, newMsg]);
        });
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
      },
    });

    stompClient.current.activate();
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !stompClient.current?.connected) return;

    stompClient.current.publish({
      destination: `/app/group/${group.id}/chat`,
      body: JSON.stringify({ content: newMessage })
    });
    setNewMessage('');
  };

  const handleLeaveGroup = async () => {
    if (group.ownerId === user?.id) {
      showToast('Owners cannot leave their own group currently', 'error');
      return;
    }

    try {
      await api.post(`/groups/${group.id}/leave`);
      showToast('Left group successfully', 'success');
      fetchAllGroups(); // refresh sidebar
      navigate('/groups'); // redirect to main groups page
    } catch (err) {
      showToast('Failed to leave group', 'error');
    }
  };
  
  const handleJoinSidebarGroup = async (e, groupToJoin) => {
    e.stopPropagation();
    try {
      const res = await api.post(`/groups/${groupToJoin.id}/join`);
      const joinedGroup = res.data;
      
      showToast(`Joined ${groupToJoin.name}!`, 'success');
      
      // Optimistically update states for instant UI transition
      setAllGroups(prev => prev.map(g => g.id === joinedGroup.id ? joinedGroup : g));
      if (group?.id === joinedGroup.id) {
        setGroup(joinedGroup);
        if (!stompClient.current?.connected) {
          connectWebSocket(joinedGroup.id);
        }
      }
      
      setSidebarTab('chats');
      navigate(`/groups/${groupToJoin.id}`);
      
      // Fetch in background to ensure everything is synced
      fetchAllGroups();
    } catch (err) {
      showToast(err.response?.data?.error || 'Failed to join group', 'error');
    }
  };

  // Compute sidebar groups
  const filteredSidebarGroups = allGroups.filter(g => 
    g.name.toLowerCase().includes(sidebarSearch.toLowerCase()) || 
    g.category.toLowerCase().includes(sidebarSearch.toLowerCase())
  );
  const mySidebarGroups = filteredSidebarGroups.filter(g => g.isMember || g.ownerId === user?.id);
  const discoverSidebarGroups = filteredSidebarGroups; // User requested Discover to show all groups with updated buttons
  
  const activeSidebarList = sidebarTab === 'chats' ? mySidebarGroups : discoverSidebarGroups;

  if (allGroups.length === 0) return <LoadingSpinner size="lg" className="py-20" />;

  return (
    <div className="max-w-[1400px] mx-auto h-[calc(100vh-100px)] flex flex-col md:flex-row gap-4 px-4 pb-4">
      {/* LEFT SIDEBAR */}
      <div className="w-full md:w-80 lg:w-96 bg-white rounded-2xl shadow-sm border flex flex-col shrink-0 overflow-hidden">
        {/* Sidebar Header */}
        <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Study Groups</h2>
          <button onClick={() => navigate('/groups')} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500" title="Back to Grid">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
        
        {/* Sidebar Search */}
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={sidebarSearch}
              onChange={(e) => setSidebarSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-100 border-transparent focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl text-sm"
            />
          </div>
        </div>

        {/* Sidebar Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setSidebarTab('chats')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
              sidebarTab === 'chats' ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <MessageCircle className="w-4 h-4" /> My Chats
          </button>
          <button
            onClick={() => setSidebarTab('discover')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
              sidebarTab === 'discover' ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Search className="w-4 h-4" /> Discover
          </button>
        </div>

        {/* Sidebar List */}
        <div className="flex-1 overflow-y-auto bg-white divide-y divide-gray-50">
          {activeSidebarList.length === 0 ? (
             <div className="p-8 text-center text-gray-400 text-sm">
               {sidebarTab === 'chats' ? "You haven't joined any groups." : "No groups found."}
             </div>
          ) : (
            activeSidebarList.map(g => (
              <div 
                key={g.id}
                onClick={() => navigate(`/groups/${g.id}`)}
                className={`flex items-center justify-between p-3 cursor-pointer transition-colors ${
                  group?.id === g.id ? 'bg-orange-100/50 border-l-4 border-orange-500' : 'hover:bg-gray-50 border-l-4 border-transparent'
                }`}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                    group?.id === g.id ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {g.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="truncate">
                    <h3 className={`font-semibold truncate text-sm ${group?.id === g.id ? 'text-gray-900' : 'text-gray-700'}`}>
                      {g.name}
                    </h3>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{g.category}</p>
                  </div>
                </div>
                {sidebarTab === 'discover' && (
                  g.isMember || g.ownerId === user?.id ? (
                    <button 
                      onClick={(e) => { e.stopPropagation(); navigate(`/groups/${g.id}`); setSidebarTab('chats'); }}
                      className="ml-2 px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-lg shrink-0"
                    >
                      Joined
                    </button>
                  ) : (
                    <button 
                      onClick={(e) => handleJoinSidebarGroup(e, g)}
                      className="ml-2 px-3 py-1 bg-gray-100 hover:bg-orange-500 hover:text-white text-gray-700 text-xs font-semibold rounded-lg transition-colors shrink-0"
                    >
                      Join
                    </button>
                  )
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* RIGHT MAIN AREA (CHAT) */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border flex flex-col min-w-0">
        {!group || loading ? (
          <div className="flex-1 flex items-center justify-center">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between shrink-0 bg-gray-50/50 rounded-t-2xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-xl shadow-inner shrink-0">
                  {group.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900 leading-tight">{group.name}</h1>
                  <p className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                    <span className="font-medium text-orange-600">{group.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {group.memberCount} members</span>
                  </p>
                </div>
              </div>
              
              {group.isMember || group.ownerId === user?.id ? (
                <button 
                  onClick={handleLeaveGroup}
                  className="hidden sm:flex items-center gap-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors text-xs font-semibold uppercase tracking-wider"
                >
                  <LogOut className="w-3.5 h-3.5" /> Leave
                </button>
              ) : (
                <button 
                  onClick={(e) => handleJoinSidebarGroup(e, group)}
                  className="btn-primary py-1.5 px-4 text-sm"
                >
                  Join Group to Chat
                </button>
              )}
            </div>

            {/* Chat Tabs */}
            <div className="flex border-b bg-white shrink-0">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'chat' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <MessageSquare className="w-4 h-4" /> Live Chat
              </button>
              <button
                onClick={() => setActiveTab('questions')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'questions' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <HelpCircle className="w-4 h-4" /> Group Q&A
              </button>
            </div>

            {/* Chat Content Area */}
            <div className="flex-1 bg-gray-50 overflow-y-auto p-4 space-y-4 relative">
              {!(group.isMember || group.ownerId === user?.id) ? (
                 <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center">
                   <div className="bg-white p-6 rounded-2xl shadow-xl text-center max-w-sm border border-gray-100">
                     <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                     <h3 className="text-xl font-bold text-gray-900 mb-2">Join to View Chat</h3>
                     <p className="text-gray-500 text-sm mb-4">You must be a member of this group to view messages and participate in the conversation.</p>
                     <button 
                       onClick={(e) => handleJoinSidebarGroup(e, group)}
                       className="btn-primary w-full"
                     >
                       Join Group Now
                     </button>
                   </div>
                 </div>
              ) : activeTab === 'chat' ? (
                <>
                  {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-2">
                      <MessageCircle className="w-12 h-12 opacity-50" />
                      <p className="text-sm font-medium">No messages yet. Break the ice!</p>
                    </div>
                  ) : (
                    messages.map((msg, index) => {
                      const isMe = msg.authorId === user?.id;
                      return (
                        <div key={msg.id || index} className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                          <div className={`max-w-[75%] flex gap-3 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                            <img 
                              src={msg.authorAvatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(msg.authorName)}&background=random`}
                              alt={msg.authorName}
                              className="w-8 h-8 rounded-full shadow-sm shrink-0 mt-1"
                            />
                            <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                              <span className="text-[11px] font-medium text-gray-500 mb-1 px-1">{msg.authorName}</span>
                              <div className={`px-4 py-2.5 rounded-2xl shadow-sm whitespace-pre-wrap text-[15px] ${
                                isMe ? 'bg-orange-500 text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                              }`}>
                                {msg.content}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </>
              ) : (
                <div className="space-y-4 max-w-3xl mx-auto">
                  {relatedQuestions.length === 0 ? (
                    <div className="text-center text-gray-500 py-10 bg-white rounded-xl shadow-sm border">No related questions found for this group's category.</div>
                  ) : (
                    relatedQuestions.map(q => <QuestionCard key={q.id} question={q} />)
                  )}
                </div>
              )}
            </div>

            {/* Chat Input */}
            {activeTab === 'chat' && (group.isMember || group.ownerId === user?.id) && (
              <div className="p-3 bg-gray-50 border-t shrink-0 rounded-b-2xl">
                <form onSubmit={handleSendMessage} className="relative flex items-center gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 py-3 px-4 bg-white border border-gray-200 rounded-full shadow-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm"
                  />
                  <button 
                    type="submit" 
                    disabled={!newMessage.trim() || !stompClient.current?.connected}
                    className="p-3 bg-orange-500 text-white hover:bg-orange-600 rounded-full transition-colors disabled:opacity-50 disabled:hover:bg-orange-500 shadow-sm shrink-0"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
