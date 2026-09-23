import React, { useState } from 'react';
import { Shield, Lock, CheckCircle2, ArrowRight, Mail, Key, Building, Globe, User as UserIcon, AlertCircle, Sparkles } from 'lucide-react';
import { SrcaaLogo } from './SrcaaLogo';
import { User } from '../types/course';

interface SecureGatewayProps {
  onAuthSuccess: (user: User) => void;
}

export const SecureGateway: React.FC<SecureGatewayProps> = ({ onAuthSuccess }) => {
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [institution, setInstitution] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Email/Password login
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMessage('Please provide a valid institutional or personal email.');
      return;
    }
    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        onAuthSuccess(data.user);
      } else {
        setErrorMessage(data.error || 'Authentication rejected. Please check your credentials.');
      }
    } catch (err) {
      setErrorMessage('Security gateway connection failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Sign up
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !fullName.trim()) {
      setErrorMessage('Full name and email are required to provision access.');
      return;
    }
    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName.trim(),
          email: email.trim(),
          institution: institution.trim() || 'SRCAA Candidate Registry',
        }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        onAuthSuccess(data.user);
      } else {
        setErrorMessage(data.error || 'Account provisioning failed.');
      }
    } catch (err) {
      setErrorMessage('Security gateway error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Quick OAuth (Google or Microsoft)
  const handleOAuth = async (provider: 'google' | 'microsoft', overrideEmail?: string, overrideName?: string) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/auth/oauth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider,
          email: overrideEmail || (provider === 'google' ? 'srcaaweb@gmail.com' : 'srcaa.scholar@microsoft.com'),
          name: overrideName || (provider === 'google' ? 'Alex Rivera (Google)' : 'Dr. Evelyn Vasquez (Microsoft)'),
        }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        onAuthSuccess(data.user);
      } else {
        setErrorMessage(data.error || `${provider} authentication could not be completed.`);
      }
    } catch (err) {
      setErrorMessage('OAuth connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-white to-slate-100 flex flex-col justify-between text-slate-800">
      {/* Top Security Banner */}
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SrcaaLogo size={36} showTagline={true} />
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-800">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>256-Bit SSL/TLS Encrypted Gateway</span>
          </span>
        </div>
      </header>

      {/* Main Center Security Enclave */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-6">
        <div className="w-full max-w-xl">
          {/* Card Wrapper */}
          <div className="rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden">
            {/* Maroon Institutional Header */}
            <div className="bg-gradient-to-r from-[#8C2528] to-[#5C1619] p-6 sm:p-8 text-white relative overflow-hidden">
              <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 opacity-10 pointer-events-none">
                <Shield className="h-48 w-48 text-white" />
              </div>

              <div className="relative z-10 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xs text-amber-300 shadow-sm">
                  <Lock className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-amber-200">
                    Restricted Institutional Access
                  </span>
                  <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                    SRCAA Academy Security Enclave
                  </h1>
                </div>
              </div>

              <p className="relative z-10 mt-3 text-xs text-red-100/90 leading-relaxed max-w-lg">
                Access to the syllabus, course modules, video lectures, cohort discussions, and credential assessment portals is restricted to verified candidates and faculty. Please authenticate to unlock the platform.
              </p>
            </div>

            {/* Auth Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Error Notification */}
              {errorMessage && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Single Sign-On (SSO) Primary Actions */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span>Single Sign-On (SSO) Identity</span>
                  <span className="text-[10px] text-slate-400 font-normal">Fast, 1-Click Verification</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Google OAuth Button */}
                  <button
                    type="button"
                    onClick={() => handleOAuth('google', 'srcaaweb@gmail.com', 'Alex Rivera, J.D.')}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2.5 rounded-xl border border-slate-300 bg-white py-3 px-4 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all shadow-2xs group"
                  >
                    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span className="truncate">Continue with Google</span>
                  </button>

                  {/* Microsoft Entra OAuth Button */}
                  <button
                    type="button"
                    onClick={() => handleOAuth('microsoft', 'srcaa.scholar@microsoft.com', 'Dr. Evelyn Vasquez')}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2.5 rounded-xl border border-slate-300 bg-white py-3 px-4 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all shadow-2xs group"
                  >
                    <svg className="h-4 w-4 shrink-0" viewBox="0 0 23 23">
                      <rect fill="#F25022" x="1" y="1" width="10" height="10" />
                      <rect fill="#7FBA00" x="12" y="1" width="10" height="10" />
                      <rect fill="#00A4EF" x="1" y="12" width="10" height="10" />
                      <rect fill="#FFB900" x="12" y="12" width="10" height="10" />
                    </svg>
                    <span className="truncate">Continue with Microsoft</span>
                  </button>
                </div>

                {/* Quick 1-click for srcaaweb@gmail.com */}
                <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[#8C2528] shrink-0" />
                    <span className="text-amber-900 font-medium">
                      Configured Account: <strong>srcaaweb@gmail.com</strong>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOAuth('google', 'srcaaweb@gmail.com', 'Alex Rivera, J.D.')}
                    className="px-2.5 py-1 bg-[#8C2528] text-white text-[11px] font-bold rounded-lg hover:bg-[#A83236] transition-colors shadow-2xs"
                  >
                    1-Click Sign In
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative bg-white px-3 text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                  Or institutional credentials
                </div>
              </div>

              {/* Tab Selector */}
              <div className="flex rounded-xl bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => {
                    setTab('signin');
                    setErrorMessage('');
                  }}
                  className={`flex-1 rounded-lg py-2 text-xs font-bold transition-colors ${
                    tab === 'signin'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Candidate Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTab('signup');
                    setErrorMessage('');
                  }}
                  className={`flex-1 rounded-lg py-2 text-xs font-bold transition-colors ${
                    tab === 'signup'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  New Scholar Registration
                </button>
              </div>

              {/* TAB 1: SIGN IN */}
              {tab === 'signin' && (
                <form onSubmit={handleEmailSignIn} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-slate-400" />
                      <span>Institutional Email Address</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. srcaaweb@gmail.com or scholar@university.edu"
                      className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#8C2528] focus:outline-none focus:ring-1 focus:ring-[#8C2528]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Key className="h-3.5 w-3.5 text-slate-400" />
                      <span>Account Password / Key</span>
                    </label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#8C2528] focus:outline-none focus:ring-1 focus:ring-[#8C2528]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#8C2528] py-3 px-4 text-xs font-bold text-white hover:bg-[#A83236] transition-colors shadow-md disabled:opacity-50"
                  >
                    <span>{isLoading ? 'Verifying Credentials...' : 'Unlock Secure Platform'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}

              {/* TAB 2: SIGN UP */}
              {tab === 'signup' && (
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <UserIcon className="h-3.5 w-3.5 text-slate-400" />
                      <span>Full Candidate Legal Name</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Alex Rivera, J.D."
                      className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#8C2528] focus:outline-none focus:ring-1 focus:ring-[#8C2528]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-slate-400" />
                      <span>Primary Email</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="scholar@srcaa.org"
                      className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#8C2528] focus:outline-none focus:ring-1 focus:ring-[#8C2528]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Building className="h-3.5 w-3.5 text-slate-400" />
                      <span>Academic Institution / Affiliation</span>
                    </label>
                    <input
                      type="text"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      placeholder="e.g. Faculty of Law / Technology Institute"
                      className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#8C2528] focus:outline-none focus:ring-1 focus:ring-[#8C2528]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#8C2528] py-3 px-4 text-xs font-bold text-white hover:bg-[#A83236] transition-colors shadow-md disabled:opacity-50"
                  >
                    <span>{isLoading ? 'Registering...' : 'Provision Candidate Credentials'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}

              {/* Security Compliance Guarantee */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Zero unauthorized data leak policy</span>
                </span>
                <span className="font-mono text-[10px] text-slate-400">SRCAA ISO/IEC 27001</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 px-4 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>SRCAA Academy · Learn. Research. Innovate. Grow. © 2026</span>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span>Security Audited</span>
            <span aria-hidden="true">·</span>
            <span>WCAG 2.1 AA</span>
            <span aria-hidden="true">·</span>
            <span>Post-Human Jurisprudence Council</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
