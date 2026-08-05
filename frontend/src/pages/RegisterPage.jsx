import { BookOpen, Eye, EyeOff, Loader2, X, Check } from "lucide-react";
import { Link } from "react-router-dom";

import React from "react";

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { showToast } from '../components/ToastContainer';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const passwordChecks = {
    length: formData.password.length >= 8,
    letter: /[A-Za-z]/.test(formData.password),
    number: /\d/.test(formData.password),
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      setLoading(false);
      return;
    }

    if (!Object.values(passwordChecks).every(Boolean)) {
      setErrors({ password: 'Password does not meet requirements' });
      setLoading(false);
      return;
    }

    try {
      const res = await api.post('/auth/register', formData);
      const { token, refreshToken, user } = res.data;
      login(token, refreshToken, user);
      showToast('Account created successfully!', 'success');
      navigate('/questions');
    } catch (err) {
      const message = err.response?.data?.error || 'Registration failed';
      setErrors({ general: message });
      showToast(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="card">
          <div className="text-center mb-8">
            <BookOpen className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-600 mt-1">Join the EduConnect community</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.general && (
              <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg">{errors.general}</div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="input-field"
                placeholder="johndoe"
                maxLength={30}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pr-10"
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <div className="mt-2 space-y-1">
                <div className={`flex items-center gap-1 text-xs ${passwordChecks.length ? 'text-green-600' : 'text-gray-500'}`}>
                  {passwordChecks.length ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                  At least 8 characters
                </div>
                <div className={`flex items-center gap-1 text-xs ${passwordChecks.letter ? 'text-green-600' : 'text-gray-500'}`}>
                  {passwordChecks.letter ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                  Contains a letter
                </div>
                <div className={`flex items-center gap-1 text-xs ${passwordChecks.number ? 'text-green-600' : 'text-gray-500'}`}>
                  {passwordChecks.number ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                  Contains a number
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input-field"
                placeholder="Confirm your password"
                required
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
