import { Linkedin, Facebook, Youtube, Phone, Mail, Sparkles, Bell, Menu } from "lucide-react";
import { BookOpen, User, Award, MessageCircle, HelpCircle, X, ShieldCheck, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

import React from "react";

import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWebSocket } from '../context/WebSocketContext';

import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { notifications, clearNotifications } = useWebSocket();
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleNotification = (e) => {
      const notification = e.detail;
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message: notification.message, type: 'info' }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 5000);
    };
    window.addEventListener('notification', handleNotification);
    return () => window.removeEventListener('notification', handleNotification);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    // Stay on current browsable page or go to questions
    const publicPages = ['/questions', '/leaderboard', '/resources'];
    const isOnPublicPage = publicPages.some(p => location.pathname.startsWith(p)) || location.pathname.startsWith('/question/');
    navigate(isOnPublicPage ? location.pathname : '/questions');
  };

  const isActive = (path) => {
    if (path === '/questions') return location.pathname === '/questions' || location.pathname.startsWith('/question/');
    return location.pathname === path;
  };

  const navLinkClass = (path) => 
    `flex items-center gap-1.5 font-medium transition-colors ${
      isActive(path) 
        ? 'text-primary-600' 
        : 'text-gray-600 hover:text-primary-600'
    }`;

  const redirectToLogin = (from) => `/login?redirect=${encodeURIComponent(from || location.pathname)}`;

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 transition-all">
      {/* Top Header */}
      <div className="bg-gray-100 border-b border-gray-200 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-10 text-sm text-gray-600">
            <div className="flex items-center gap-6">
              <a href="tel:+18666973314" className="flex items-center gap-2 hover:text-primary-600 transition-colors">
                <Phone className="h-4 w-4" />
                <span>+1-866-697-3314</span>
              </a>
              <a href="mailto:info@eduscopeglobal.com" className="flex items-center gap-2 hover:text-primary-600 transition-colors">
                <Mail className="h-4 w-4" />
                <span>info@eduscopeglobal.com</span>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-medium">Follow Us:</span>
              <div className="flex items-center gap-3">
                <a href="#" className="text-gray-500 hover:text-[#0077b5] transition-colors"><Linkedin className="h-4 w-4" /></a>
                <a href="#" className="text-gray-500 hover:text-[#1877f2] transition-colors"><Facebook className="h-4 w-4" /></a>
                <a href="#" className="text-gray-500 hover:text-[#ff0000] transition-colors"><Youtube className="h-4 w-4" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">Eduscope Connect</span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-6">
              <Link to="/questions" className={navLinkClass('/questions')} id="nav-questions">
                <HelpCircle className="h-4 w-4" />
                Questions
              </Link>
              <Link to="/leaderboard" className={navLinkClass('/leaderboard')} id="nav-leaderboard">
                <Award className="h-4 w-4" />
                Leaderboard
              </Link>
              <Link to="/resources" className={navLinkClass('/resources')} id="nav-resources">
                <Sparkles className="h-4 w-4" />
                Resources
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <div className="relative" ref={notifRef}>
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors"
                    id="nav-notifications-btn"
                  >
                    <Bell className="h-5 w-5" />
                    {notifications.length > 0 && (
                      <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {notifications.length}
                      </span>
                    )}
                  </button>
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                        <span className="font-medium">Notifications</span>
                        <button onClick={clearNotifications} className="text-sm text-primary-600 hover:underline">
                          Clear all
                        </button>
                      </div>
                      {notifications.length === 0 ? (
                        <p className="px-4 py-3 text-gray-500 text-sm">No notifications</p>
                      ) : (
                        notifications.map((n, i) => (
                          <div key={i} className="px-4 py-2 hover:bg-gray-50 text-sm">
                            <p className="text-gray-800">{n.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>

                {/* Ask Question - Authenticated */}
                <Link to="/ask" className="btn-primary hidden sm:flex items-center gap-2" id="nav-ask-question">
                  <MessageCircle className="h-4 w-4" />
                  Ask Question
                </Link>

                {/* Profile Dropdown */}
                <div className="relative" ref={profileRef}>
                  <button 
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition-colors" 
                    id="nav-profile-btn"
                  >
                    <div className="flex items-center gap-1 bg-primary-50 px-3 py-1.5 rounded-full">
                      <Award className="h-4 w-4 text-primary-600" />
                      <span className="text-sm font-medium text-primary-700">{user?.reputationScore || 0}</span>
                    </div>
                    <User className="h-5 w-5" />
                    <span className="hidden sm:inline text-sm font-medium">{user?.username}</span>
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-fade-in">
                      <div className="px-4 py-2 border-b border-gray-100 mb-1">
                        <p className="text-sm font-medium text-gray-900 truncate">{user?.email}</p>
                      </div>
                      
                      <Link 
                        to="/profile" 
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <User className="h-4 w-4" /> My Profile
                      </Link>
                      
                      {user?.role === 'ADMIN' && (
                        <Link 
                          to="/admin" 
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <ShieldCheck className="h-4 w-4" /> Admin Dashboard
                        </Link>
                      )}
                      
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button
                          onClick={() => {
                            setShowProfileMenu(false);
                            handleLogout();
                          }}
                          className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="h-4 w-4" /> Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Ask Question - Unauthenticated (redirects to login) */}
                <Link 
                  to={redirectToLogin('/ask')} 
                  className="btn-primary hidden sm:flex items-center gap-2"
                  id="nav-ask-question-guest"
                >
                  <MessageCircle className="h-4 w-4" />
                  Ask Question
                </Link>

                <Link to="/login" className="text-gray-700 hover:text-primary-600 font-medium transition-colors" id="nav-login">
                  Log In
                </Link>
                <Link to="/register" className="btn-primary" id="nav-signup">
                  Sign Up
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors"
              id="nav-mobile-menu-btn"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md animate-slide-down" ref={mobileMenuRef}>
          <div className="px-4 py-4 space-y-2">
            <Link
              to="/questions"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive('/questions') ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <HelpCircle className="h-5 w-5" />
              <span className="font-medium">Questions</span>
            </Link>
            <Link
              to="/leaderboard"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive('/leaderboard') ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Award className="h-5 w-5" />
              <span className="font-medium">Leaderboard</span>
            </Link>
            <Link
              to="/resources"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive('/resources') ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Sparkles className="h-5 w-5" />
              <span className="font-medium">Resources</span>
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/ask"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span className="font-medium">Ask Question</span>
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span className="font-medium">Profile</span>
                </Link>
                {user?.role === 'ADMIN' && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <ShieldCheck className="h-5 w-5" />
                    <span className="font-medium">Admin Dashboard</span>
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to={redirectToLogin('/ask')}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span className="font-medium">Ask Question</span>
                </Link>
                <div className="pt-2 border-t border-gray-100 mt-2 flex gap-3">
                  <Link to="/login" className="flex-1 btn-secondary text-center py-3">
                    Log In
                  </Link>
                  <Link to="/register" className="flex-1 btn-primary text-center py-3">
                    Sign Up
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Toast notifications */}
      <div className="fixed top-20 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="bg-primary-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in"
          >
            <Bell className="h-4 w-4" />
            <span className="text-sm">{toast.message}</span>
          </div>
        ))}
      </div>
    </nav>
  );
}
