import { Linkedin, Facebook, Youtube, Phone, Mail, Sparkles, Bell, Menu, Grip, Pill } from "lucide-react";
import { BookOpen, User, Award, MessageCircle, HelpCircle, X, ShieldCheck, LogOut, CheckSquare, BarChart3, Users2 } from "lucide-react";
import { Link } from "react-router-dom";

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWebSocket } from '../context/WebSocketContext';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { notifications, clearNotifications } = useWebSocket();
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showAppsMenu, setShowAppsMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  
  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const appsRef = useRef(null);
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
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfileMenu(false);
      if (appsRef.current && !appsRef.current.contains(e.target)) setShowAppsMenu(false);
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
    const publicPages = ['/questions', '/leaderboard'];
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

  const ecosystemApps = [
    { name: 'Bevinzey', icon: Sparkles, color: 'text-purple-600', bg: 'bg-purple-100', path: '/resources' },
    { name: 'Evalometrics', icon: CheckSquare, color: 'text-emerald-600', bg: 'bg-emerald-100', path: '/assessments' },
    { name: 'FacultyLens', icon: BarChart3, color: 'text-blue-600', bg: 'bg-blue-100', path: '/leader' },
    { name: 'StudySocius', icon: Users2, color: 'text-orange-600', bg: 'bg-orange-100', path: '/groups' },
    { name: 'RxCalculations', icon: Pill, color: 'text-red-600', bg: 'bg-red-100', path: '/rxcalculations' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <BookOpen className="h-8 w-8 text-primary-600 group-hover:scale-105 transition-transform" />
              <span className="text-xl font-bold text-gray-900 tracking-tight">EduConnect</span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-6 ml-4">
              <Link to="/questions" className={navLinkClass('/questions')} id="nav-questions">
                Questions
              </Link>
              <Link to="/leaderboard" className={navLinkClass('/leaderboard')} id="nav-leaderboard">
                Leaderboard
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Google-Style App Launcher (Ecosystem Menu) */}
            <div className="relative" ref={appsRef}>
              <button 
                onClick={() => setShowAppsMenu(!showAppsMenu)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                title="EduScope Ecosystem"
              >
                <Grip className="h-5 w-5" />
              </button>

              {showAppsMenu && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 p-4 z-50 animate-fade-in">
                  <div className="grid grid-cols-3 gap-4">
                    {ecosystemApps.map((app) => (
                      <Link 
                        key={app.name} 
                        to={app.path}
                        onClick={() => setShowAppsMenu(false)}
                        className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-xl transition-colors text-center group"
                      >
                        <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${app.bg} group-hover:scale-110 transition-transform`}>
                          <app.icon className={`h-6 w-6 ${app.color}`} />
                        </div>
                        <span className="text-xs font-medium text-gray-700">{app.name}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                    <Link to="/ecosystem" className="text-sm font-medium text-primary-600 hover:underline" onClick={() => setShowAppsMenu(false)}>
                      View All Apps
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <div className="relative" ref={notifRef}>
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Bell className="h-5 w-5" />
                    {notifications.length > 0 && (
                      <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                    )}
                  </button>
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-fade-in">
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

                {/* Profile Dropdown */}
                <div className="relative" ref={profileRef}>
                  <button 
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-full transition-colors" 
                  >
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold">
                      {user?.username?.charAt(0).toUpperCase()}
                    </div>
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 animate-fade-in">
                      <div className="px-4 py-3 border-b border-gray-100 mb-1 flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-lg">
                           {user?.username?.charAt(0).toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-sm font-bold text-gray-900 truncate">{user?.username}</p>
                          <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        </div>
                      </div>
                      
                      <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setShowProfileMenu(false)}>
                        <User className="h-4 w-4 text-gray-400" /> My Profile
                      </Link>

                      {(user?.role === 'ADMIN' || user?.role === 'LEADER') && (
                        <Link to="/leader" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setShowProfileMenu(false)}>
                          <BarChart3 className="h-4 w-4 text-gray-400" /> Leader Dashboard
                        </Link>
                      )}
                      
                      {user?.role === 'ADMIN' && (
                        <Link to="/admin" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setShowProfileMenu(false)}>
                          <ShieldCheck className="h-4 w-4 text-gray-400" /> Admin Settings
                        </Link>
                      )}
                      
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button onClick={() => { setShowProfileMenu(false); handleLogout(); }} className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                          <LogOut className="h-4 w-4 text-gray-400" /> Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm px-2">
                  Sign in
                </Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-4 rounded-full shadow-sm">
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors ml-1"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white" ref={mobileMenuRef}>
          <div className="px-4 py-2 space-y-1">
            <Link to="/questions" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 font-medium">
              <HelpCircle className="h-5 w-5 text-gray-400" /> Questions
            </Link>
            <Link to="/leaderboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 font-medium">
              <Award className="h-5 w-5 text-gray-400" /> Leaderboard
            </Link>
            
            <div className="pt-4 pb-2">
              <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Ecosystem Apps</p>
              {ecosystemApps.map(app => (
                <Link key={app.name} to={app.path} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-700 hover:bg-gray-50">
                  <app.icon className={`h-5 w-5 ${app.color}`} /> {app.name}
                </Link>
              ))}
            </div>

            {!isAuthenticated && (
              <div className="pt-4 border-t border-gray-100 mt-2 flex flex-col gap-2">
                <Link to="/login" className="btn-secondary text-center py-2.5 rounded-xl">Sign in</Link>
                <Link to="/register" className="btn-primary text-center py-2.5 rounded-xl">Get Started</Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toast notifications */}
      <div className="fixed top-20 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div key={toast.id} className="bg-gray-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-fade-in text-sm font-medium">
            <Bell className="h-4 w-4 text-gray-400" />
            {toast.message}
          </div>
        ))}
      </div>
    </nav>
  );
}
