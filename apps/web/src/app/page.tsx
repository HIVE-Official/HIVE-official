"use client";

import { useState, useEffect } from 'react';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-24 h-24 bg-gray-800 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center p-4">
      <div className="text-center space-y-8">
        <h1 className="text-6xl font-bold">HIVE</h1>
        <p className="text-xl text-gray-400">Campus Tools · Launching July 31st, 2025</p>
        <div className="flex gap-4 justify-center">
          <button 
            className="px-6 py-3 bg-gray-800 rounded-lg cursor-not-allowed opacity-50"
            disabled
          >
            🔒 Locked
          </button>
          <button 
            className="px-6 py-3 border border-gray-700 rounded-lg hover:border-yellow-500 transition-colors"
          >
            See What's Coming
          </button>
        </div>
        <div className="text-sm text-gray-500">
          🛠️ Early access begins throughout July
        </div>
      </div>
    </div>
  );
}