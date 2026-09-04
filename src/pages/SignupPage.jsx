import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Terminal, User, Mail, Lock, Eye, EyeOff, ArrowRight, Github, Chrome, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/layout/Navbar';

export const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = 'Full name is required';
    if (!email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Enter a valid email address';

    if (!password) errs.password = 'Password is required';
    else if (password.length < 6) errs.password = 'Password must be at least 6 characters';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      signup(name, email, password);
      setLoading(false);
      navigate('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#090D16] flex flex-col justify-between">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative">
        <div className="absolute w-[500px] h-[300px] bg-purple-600/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl">
            <div className="text-center space-y-2 mb-6">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 fill-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Create DevHub Account</h2>
              <p className="text-xs text-slate-400">
                Join 48,000+ builders mastering 31 Java, Spring Boot & AI modules
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Rivera"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 transition font-mono ${
                      errors.name
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-white/10 focus:border-purple-500 focus:ring-purple-500'
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-xs text-rose-400 font-mono">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@devhub.io"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 transition font-mono ${
                      errors.email
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-white/10 focus:border-purple-500 focus:ring-purple-500'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-rose-400 font-mono">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900/80 border text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 transition font-mono ${
                      errors.password
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-white/10 focus:border-purple-500 focus:ring-purple-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-rose-400 font-mono">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-glow-sm flex items-center justify-center space-x-2 transition disabled:opacity-50"
              >
                {loading ? (
                  <span className="font-mono">Setting up your learning cockpit...</span>
                ) : (
                  <>
                    <span>Create Free Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-white/5 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    signup("GitHub Developer", "github.dev@devhub.io", "demo123");
                    navigate('/dashboard');
                  }}
                  className="flex items-center justify-center space-x-2 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs text-slate-300 transition"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    signup("Google Developer", "google.dev@devhub.io", "demo123");
                    navigate('/dashboard');
                  }}
                  className="flex items-center justify-center space-x-2 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs text-slate-300 transition"
                >
                  <Chrome className="w-4 h-4 text-rose-400" />
                  <span>Google</span>
                </button>
              </div>

              <p className="text-center text-xs text-slate-400 pt-2">
                Already have an account?{' '}
                <Link to="/login" className="text-purple-400 font-semibold hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
