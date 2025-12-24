'use client';

import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeStyles = {
    success: 'bg-green-500 border-green-600',
    error: 'bg-red-500 border-red-600',
    warning: 'bg-yellow-500 border-yellow-600',
    info: 'bg-blue-500 border-blue-600',
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <div className="fixed top-4 right-4 z-[60] animate-slide-in">
      <div
        className={`${typeStyles[type]} text-white px-6 py-4 rounded-lg shadow-2xl border-l-4 flex items-center gap-3 min-w-[300px] max-w-md`}
      >
        <span className="text-2xl font-bold">{icons[type]}</span>
        <p className="flex-1 font-medium">{message}</p>
        <button
          onClick={onClose}
          className="ml-2 text-white hover:text-gray-200 font-bold text-xl"
        >
          ×
        </button>
      </div>
    </div>
  );
}
