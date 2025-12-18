'use client';
import { useAuth } from '@/lib/auth';
import { useState } from 'react';

export default function ConnectWallet() {
  const { user, login, logout } = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleConnect() {
    const username = prompt('Enter your username:');
    if (!username) return;
    setLoading(true);
    await login(username);
    setLoading(false);
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">{user.username}</span>
        <button onClick={logout} className="text-sm text-gray-500 hover:text-gray-700">
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      disabled={loading}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
    >
      {loading ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
}
