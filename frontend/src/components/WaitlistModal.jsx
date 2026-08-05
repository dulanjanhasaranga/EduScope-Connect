import { Loader2, X, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import React from "react";

import { useState } from 'react';
import api from '../utils/api';

export default function WaitlistModal({ isOpen, onClose, product }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError('');

    try {
      await api.post('/waitlist', {
        email: email,
        productId: product.id
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to join waitlist. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setTimeout(() => {
      setSuccess(false);
      setEmail('');
      setError('');
    }, 300);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className={`p-8 pb-6 bg-gradient-to-br ${product?.color || 'from-slate-800 to-slate-900'} text-white relative`}>
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold mb-2">Request Early Access</h2>
            <p className="text-white/80 text-sm">
              Join the waitlist for <span className="font-semibold">{product?.name}</span> and be the first to know when it goes live!
            </p>
          </div>

          {/* Body */}
          <div className="p-8">
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">You're on the list!</h3>
                <p className="text-slate-600 mb-6">
                  We've added <strong>{email}</strong> to the waitlist for {product?.name}. Keep an eye on your inbox!
                </p>
                <button
                  onClick={handleClose}
                  className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl transition-colors"
                >
                  Close
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@university.edu"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                  />
                </div>
                
                {error && (
                  <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading || !email}
                  className={`w-full py-3 px-4 flex justify-center items-center gap-2 rounded-xl text-white font-semibold shadow-lg transition-all ${
                    loading || !email 
                      ? 'bg-slate-400 cursor-not-allowed shadow-none' 
                      : `bg-gradient-to-r ${product?.color || 'from-primary-600 to-primary-500'} hover:opacity-90 hover:-translate-y-0.5`
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Securing your spot...
                    </>
                  ) : (
                    'Join Waitlist'
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
