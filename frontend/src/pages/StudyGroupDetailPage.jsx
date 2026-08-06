import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { showToast } from '../components/ToastContainer';
import { Send, ArrowLeft, Users, LogOut, MessageSquare, HelpCircle } from 'lucide-react';
import QuestionCard from '../components/QuestionCard';

export default function StudyGroupDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [group, setGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('chat');
  const [relatedQuestions, setRelatedQuestions] = useState([]);
  const stompClient = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchGroupAndMessages();
    return () => {
      if (stompClient.current) {
        stompClient.current.deactivate();
      }
    };
  }, [id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchGroupAndMessages = async () => {
    try {
      // First verify the group exists and we have access
      const groupRes = await api.get('/groups');
      const foundGroup = groupRes.data.find(g => g.id === parseInt(id));
      
      if (!foundGroup) {
        showToast('Group not found', 'error');
        navigate('/groups');
        return;
      }
      setGroup(foundGroup);

      // Fetch message history
      const msgRes = await api.get(`/groups/${id}/messages`);
      setMessages(msgRes.data);
      
      // Map group category to question tag
      let tagMap = {
        'Computer Science': 'machine-learning',
        'Medicine': 'biology',
        'Mathematics': 'mathematics'
      };
      const queryTag = tagMap[foundGroup.category] || '';
      
      const qRes = await api.get(`/questions?tag=${queryTag}&size=20`);
      setRelatedQuestions(qRes.data.content || []);
      
      connectWebSocket();
    } catch (err) {
      showToast('Error loading group details', 'error');
      navigate('/groups');
    } finally {
      setLoading(false);
    }
  };

  const connectWebSocket = () => {
    const token = localStorage.getItem('token');
    
    stompClient.current = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      connectHeaders: {
        Authorization: `Bearer ${token}`
      },
      onConnect: () => {
        stompClient.current.subscribe(`/topic/group/${id}`, (message) => {
          const newMsg = JSON.parse(message.body);
          setMessages(prev => [...prev, newMsg]);
        });
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });

    stompClient.current.activate();
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !stompClient.current?.connected) return;

    stompClient.current.publish({
      destination: `/app/group/${id}/chat`,
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
      await api.post(`/groups/${id}/leave`);
      showToast('Left group successfully', 'success');
      navigate('/groups');
    } catch (err) {
      showToast('Failed to leave group', 'error');
    }
  };

  if (loading) return <LoadingSpinner size="lg" className="py-20" />;

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-100px)] flex flex-col">
      {/* Header */}
      <div className="bg-white p-4 rounded-t-2xl border-b shadow-sm flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/groups')} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{group.name}</h1>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs font-bold uppercase">{group.category}</span>
              <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {group.memberCount} members</span>
            </p>
          </div>
        </div>
        
        <button 
          onClick={handleLeaveGroup}
          className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium"
        >
          <LogOut className="w-4 h-4" /> Leave Group
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b bg-white shrink-0">
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 font-medium transition-colors ${
            activeTab === 'chat' 
              ? 'text-orange-600 border-b-2 border-orange-600' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          <MessageSquare className="w-4 h-4" /> Live Chat
        </button>
        <button
          onClick={() => setActiveTab('questions')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 font-medium transition-colors ${
            activeTab === 'questions' 
              ? 'text-orange-600 border-b-2 border-orange-600' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          <HelpCircle className="w-4 h-4" /> Group Q&A
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-gray-50 overflow-y-auto p-4 space-y-4 rounded-b-2xl shadow-sm border-x border-b">
        {activeTab === 'chat' ? (
          <>
            {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-2">
            <Users className="w-12 h-12 opacity-50" />
            <p>No messages yet. Say hello!</p>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isMe = msg.authorId === user?.id;
            return (
              <div key={msg.id || index} className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                <div className={`max-w-[70%] flex gap-3 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                  <img 
                    src={msg.authorAvatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(msg.authorName)}&background=random`}
                    alt={msg.authorName}
                    className="w-8 h-8 rounded-full shadow-sm shrink-0 mt-1"
                  />
                  <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <span className="text-xs text-gray-500 mb-1 px-1">{msg.authorName}</span>
                    <div className={`px-4 py-2 rounded-2xl shadow-sm whitespace-pre-wrap ${
                      isMe ? 'bg-orange-500 text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border'
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
          <div className="space-y-4">
            {relatedQuestions.length === 0 ? (
              <div className="text-center text-gray-500 py-10">No related questions found for this group.</div>
            ) : (
              relatedQuestions.map(q => <QuestionCard key={q.id} question={q} />)
            )}
          </div>
        )}
      </div>

      {/* Message Input */}
      {activeTab === 'chat' && (
      <div className="mt-4 shrink-0">
        <form onSubmit={handleSendMessage} className="relative">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="input-field w-full pr-12 py-3 rounded-xl shadow-sm border-gray-200 focus:border-orange-500 focus:ring-orange-500"
          />
          <button 
            type="submit" 
            disabled={!newMessage.trim() || !stompClient.current?.connected}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-orange-500 hover:bg-orange-50 rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
      )}
    </div>
  );
}
