import { Loader2, User, Award, MessageCircle, HelpCircle, Edit2, Save, X } from "lucide-react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import QuestionCard from "../components/QuestionCard";

import React from "react";

import { useState, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../components/ToastContainer';

export default function ProfilePage() {
  const { user: authUser, updateUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ displayName: '', bio: '' });
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('questions');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/users/me');
      setProfile(res.data);
      setEditForm({
        displayName: res.data.user.username,
        bio: res.data.user.bio || '',
      });
    } catch (err) {
      showToast('Failed to load profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await api.patch('/users/me', editForm);
      updateUser({ ...authUser, username: res.data.username, bio: res.data.bio });
      setProfile((prev) => ({ ...prev, user: res.data }));
      setEditing(false);
      showToast('Profile updated!', 'success');
    } catch (err) {
      showToast(err.response?.data?.error || 'Update failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner size="lg" className="py-12" />;
  if (!profile) return null;

  const { user, questions, answers } = profile;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="card">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="h-10 w-10 text-primary-600" />
          </div>
          <div className="flex-1">
            {editing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                  <input
                    type="text"
                    value={editForm.displayName}
                    onChange={(e) => setEditForm({ ...editForm, displayName: e.target.value })}
                    className="input-field max-w-md"
                    maxLength={30}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    className="input-field w-full max-w-md"
                    rows={3}
                    maxLength={300}
                    placeholder="Tell us about yourself..."
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="btn-primary inline-flex items-center gap-2 disabled:opacity-50"
                  >
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    Save
                  </button>
                  <button
                    onClick={() => { setEditing(false); setEditForm({ displayName: user.username, bio: user.bio || '' }); }}
                    className="btn-secondary inline-flex items-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{user.username}</h1>
                    <p className="text-gray-500">{user.email}</p>
                  </div>
                  <button
                    onClick={() => setEditing(true)}
                    className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-4 flex items-center gap-6">
                  <div className="flex items-center gap-2 bg-primary-50 px-4 py-2 rounded-lg">
                    <Award className="h-5 w-5 text-primary-600" />
                    <div>
                      <p className="text-2xl font-bold text-primary-700">{user.reputationScore}</p>
                      <p className="text-xs text-primary-600">Reputation</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                    <HelpCircle className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-2xl font-bold text-gray-700">{questions.length}</p>
                      <p className="text-xs text-gray-600">Questions</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                    <MessageCircle className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-2xl font-bold text-gray-700">{answers.length}</p>
                      <p className="text-xs text-gray-600">Answers</p>
                    </div>
                  </div>
                </div>
                {user.bio && (
                  <p className="mt-4 text-gray-600">{user.bio}</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('questions')}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'questions'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            My Questions ({questions.length})
          </button>
          <button
            onClick={() => setActiveTab('answers')}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'answers'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            My Answers ({answers.length})
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'questions' ? (
          questions.length === 0 ? (
            <div className="card text-center py-12">
              <HelpCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">You haven't asked any questions yet.</p>
              <Link to="/ask" className="btn-primary inline-flex items-center gap-2 mt-4">
                Ask Your First Question
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {questions.map((q) => (
                <QuestionCard key={q.id} question={q} />
              ))}
            </div>
          )
        ) : (
          answers.length === 0 ? (
            <div className="card text-center py-12">
              <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">You haven't answered any questions yet.</p>
              <Link to="/questions" className="btn-primary inline-flex items-center gap-2 mt-4">
                Browse Questions
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {answers.map((a) => (
                <div key={a.id} className="card">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      a.isAccepted ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {a.isAccepted ? 'Accepted' : `${a.voteCount} votes`}
                    </span>
                  </div>
                  <p className="text-gray-700 line-clamp-3">{a.body}</p>
                  <Link 
                    to={`/question/${a.id}`} 
                    className="mt-2 text-sm text-primary-600 hover:underline inline-flex items-center gap-1"
                  >
                    View Question <MessageCircle className="h-3 w-3" />
                  </Link>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}
