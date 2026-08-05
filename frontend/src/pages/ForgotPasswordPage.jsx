import { KeyRound } from "lucide-react";
import { Loader2, ArrowLeft, CheckCircle2, Send, Check, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import React from "react";

import { useState } from 'react';
import api from '../utils/api';
import { showToast } from '../components/ToastContainer';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/auth/forgot-password', { email });
      setSuccess(true);
      showToast('Reset link sent!', 'success');
    } catch (err) {
      showToast(err.response?.data?.error || 'Failed to request reset', 'error');
    } finally {
      setLoading(false);
    }
  };

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
              <KeyRound className="h-8 w-8 text-primary-600 -rotate-3" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Forgot Password</h1>
            <p className="text-gray-500 mt-3 text-sm leading-relaxed">
              Enter the email associated with your account and we'll send you secure instructions to reset your password.
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
                    <h3 className="text-lg font-bold text-gray-900">Check your inbox</h3>
                    <p className="text-sm text-gray-600 mt-2">
                      If an account exists for <span className="font-semibold text-gray-900">{email}</span>, you will receive a password reset link shortly.
                    </p>
                  </div>
                </div>
              </div>
              <Link to="/login" className="w-full inline-flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all duration-200">
                Return to Login
              </Link>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all duration-200 sm:text-sm"
                    placeholder="you@university.edu"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-md shadow-primary-500/20 text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 transition-all duration-200 disabled:opacity-50 disabled:shadow-none"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Send Reset Link'}
              </button>

              <div className="text-center pt-2">
                <Link to="/login" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors">
                  <ArrowLeft className="h-4 w-4" />
                  Wait, I remember my password!
                </Link>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
