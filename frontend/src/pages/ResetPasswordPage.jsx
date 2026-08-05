import { Eye, EyeOff, Loader2, CheckCircle2, Lock, ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import React from "react";

import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../utils/api';
import { showToast } from '../components/ToastContainer';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await api.post('/auth/reset-password', { token, newPassword: password });
      setSuccess(true);
      showToast('Password reset successfully!', 'success');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to reset password');
      showToast('Failed to reset password', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl max-w-md w-full text-center shadow-sm">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="h-6 w-6 text-red-600" />
          </div>
          <h2 className="text-lg font-bold mb-2">Invalid Reset Link</h2>
          <p className="text-sm mb-6 opacity-90">This password reset link is missing a valid token. Please request a new link.</p>
          <Link to="/forgot-password" className="inline-flex justify-center items-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none transition-all w-full">
            Request New Link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary-100/50 rounded-full blur-[100px] -z-10" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-100/40 rounded-full blur-[80px] -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-white/80 backdrop-blur-xl py-10 px-8 shadow-2xl shadow-gray-200/50 sm:rounded-3xl sm:px-12 border border-white/50 relative overflow-hidden">
          
          {/* Decorative element */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 via-blue-500 to-primary-600" />
          
          <div className="text-center mb-8 relative">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-primary-100/50 transform rotate-3">
              <Lock className="h-8 w-8 text-primary-600 -rotate-3" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create New Password</h1>
            <p className="text-gray-500 mt-3 text-sm leading-relaxed">
              Your new password must be unique from those previously used.
            </p>
          </div>

          {success ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8"
            >
              <div className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-100/50 shadow-sm relative overflow-hidden">
                <div className="absolute -right-4 -top-4 opacity-5">
                  <ShieldCheck className="w-24 h-24 text-emerald-900" />
                </div>
                <div className="flex flex-col items-center gap-4 relative z-10">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-inner">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Password Updated!</h3>
                    <p className="text-sm text-gray-600 mt-2">
                      Your password has been changed successfully. You are being redirected to login...
                    </p>
                  </div>
                </div>
              </div>
              <Link to="/login" className="w-full inline-flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all duration-200">
                Continue to Login <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-red-50 text-red-700 rounded-xl text-sm border border-red-200 flex items-start gap-2">
                  <div className="mt-0.5"><ShieldCheck className="w-4 h-4" /></div>
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all duration-200 sm:text-sm"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all duration-200 sm:text-sm"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !password || !confirmPassword}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-md shadow-primary-500/20 text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 transition-all duration-200 disabled:opacity-50 disabled:shadow-none"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Reset Password'}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
