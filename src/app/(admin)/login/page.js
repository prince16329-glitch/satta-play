"use client"
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (loginData.username === 'admin' && loginData.password === 'admin123') {
        // Store auth token in localStorage (in real app, use httpOnly cookies)
        localStorage.setItem('authToken', 'demo-token-123');
        localStorage.setItem('user', JSON.stringify({ username: loginData.username, role: 'admin' }));

        // Redirect to admin panel
        router.push('/admin');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="bg-gradient2 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
              <div className="text-white text-2xl font-bold">A</div>
            </div>
            <h1 className="roboto text-white text-2xl mb-2">Admin Panel</h1>
            <p className="text-white/70">Please sign in to continue</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
              <p className="text-red-200 text-sm text-center">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
                placeholder="Enter username"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
                  placeholder="Enter password"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading || !loginData.username || !loginData.password}
              className="w-full bg-gradientmidyellow text-white py-3 px-4 rounded-lg roboto hover:opagame-90 transform hover:scale-105 transition-all duration-200 disabled:opagame-50 disabled:transform-none disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>

          <div className="mt-6 text-center">
            <div className="text-white/60 text-sm mb-2">
              Demo Credentials:
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-white/80 text-sm">
              <div>Username: <span className="font-mono">admin</span></div>
              <div>Password: <span className="font-mono">admin123</span></div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-white/50 text-xs">
              © 2024 Admin Panel. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;