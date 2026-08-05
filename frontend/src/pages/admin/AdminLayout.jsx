import React from 'react';
import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { LayoutDashboard, Users, UserCheck, ShieldCheck, Activity, Settings, BookOpen, Package } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout() {
  const { user } = useAuth();

  if (!user || (user.role !== 'ADMIN' && user.role !== 'LEADER')) {
    return <Navigate to="/" replace />;
  }

  const isAdmin = user.role === 'ADMIN';

  const navItems = [
    { name: 'Analytics Dashboard', path: '/admin', icon: <LayoutDashboard className="w-5 h-5" />, exact: true, show: true },
    { name: 'Content Moderation', path: '/admin/content', icon: <BookOpen className="w-5 h-5" />, show: true },
    { name: 'Ecosystem Management', path: '/admin/ecosystem', icon: <Package className="w-5 h-5" />, show: isAdmin },
    { name: 'User Management', path: '/admin/users', icon: <Users className="w-5 h-5" />, show: isAdmin },
    { name: 'Leader Management', path: '/admin/leaders', icon: <UserCheck className="w-5 h-5" />, show: isAdmin },
    { name: 'Audit Logs', path: '/admin/audit', icon: <Activity className="w-5 h-5" />, show: isAdmin },
    { name: 'System Settings', path: '/admin/settings', icon: <Settings className="w-5 h-5" />, show: isAdmin },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 flex gap-6 mt-4">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 hidden md:block">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sticky top-24">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="p-2 bg-slate-900 rounded-lg text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900">Admin Panel</h2>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{user.role}</p>
            </div>
          </div>
          
          <nav className="space-y-1">
            {navItems.filter(item => item.show).map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                className={({ isActive }) => 
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-slate-900 text-white' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 min-h-[600px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
