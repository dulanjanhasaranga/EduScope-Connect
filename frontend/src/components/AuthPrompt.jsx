import { UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

import React from "react";

import { useLocation } from 'react-router-dom';
import { LogIn } from 'lucide-react';

export default function AuthPrompt({ 
  title = 'Join the conversation',
  message = 'Log in or sign up to participate in the community.',
  icon: Icon = LogIn,
}) {
  const location = useLocation();
  const redirectPath = encodeURIComponent(location.pathname + location.search);

  return (
    <div className="card border-2 border-dashed border-primary-200 bg-gradient-to-br from-primary-50/50 to-white text-center py-8 px-6">
      <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-100 rounded-2xl mb-4">
        <Icon className="h-7 w-7 text-primary-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-6 max-w-sm mx-auto">{message}</p>
      <div className="flex items-center justify-center gap-3">
        <Link
          to={`/login?redirect=${redirectPath}`}
          className="btn-primary inline-flex items-center gap-2"
          id="auth-prompt-login"
        >
          <LogIn className="h-4 w-4" />
          Log In
        </Link>
        <Link
          to={`/register?redirect=${redirectPath}`}
          className="btn-secondary inline-flex items-center gap-2"
          id="auth-prompt-register"
        >
          <UserPlus className="h-4 w-4" />
          Sign Up
        </Link>
      </div>
    </div>
  );
}
