import { XCircle, Info } from "lucide-react";
import { X, CheckCircle } from "lucide-react";

import React from "react";

import { useState, useEffect } from 'react';

let toastId = 0;
const listeners = new Set();

export function showToast(message, type = 'info') {
  const id = ++toastId;
  listeners.forEach((listener) => listener({ id, message, type }));
  setTimeout(() => {
    listeners.forEach((listener) => listener({ id, remove: true }));
  }, 5000);
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const listener = (toast) => {
      if (toast.remove) {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      } else {
        setToasts((prev) => [...prev, toast]);
      }
    };
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, []);

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <XCircle className="h-5 w-5 text-red-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-3 flex items-center gap-3 min-w-[300px] animate-slide-up"
        >
          {icons[toast.type]}
          <span className="text-sm text-gray-800 flex-1">{toast.message}</span>
          <button
            onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
