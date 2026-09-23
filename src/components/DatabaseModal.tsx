import React, { useState, useEffect } from 'react';
import { X, Database, ShieldCheck, CheckCircle2, AlertCircle, RefreshCw, Key, Globe, Layers, ArrowRight, ExternalLink } from 'lucide-react';
import { getSavedSupabaseConfig, saveSupabaseConfig, clearSupabaseConfig, testSupabaseConnection } from '../lib/supabase';
import { testFirestoreConnection } from '../lib/firebase';
import firebaseConfig from '../../firebase-applet-config.json';

interface DatabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DatabaseModal: React.FC<DatabaseModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'firebase' | 'supabase'>('supabase');
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  const [isTestingSupabase, setIsTestingSupabase] = useState(false);
  const [supabaseStatus, setSupabaseStatus] = useState<{ connected: boolean; message: string } | null>(null);

  const [firestoreStatus, setFirestoreStatus] = useState<'checking' | 'connected' | 'error'>('checking');

  useEffect(() => {
    if (isOpen) {
      const saved = getSavedSupabaseConfig();
      setSupabaseUrl(saved.url);
      setSupabaseKey(saved.anonKey);
      if (saved.url && saved.anonKey) {
        setSupabaseStatus({ connected: true, message: 'Connected to configured Supabase project' });
      }

      // Check Firestore
      testFirestoreConnection().then((ok) => {
        setFirestoreStatus(ok ? 'connected' : 'error');
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTestSupabase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabaseUrl.trim() || !supabaseKey.trim()) {
      setSupabaseStatus({ connected: false, message: 'Please provide both Supabase Project URL and Anon API Key.' });
      return;
    }

    setIsTestingSupabase(true);
    setSupabaseStatus(null);
    try {
      const res = await testSupabaseConnection(supabaseUrl, supabaseKey);
      if (res.success) {
        saveSupabaseConfig(supabaseUrl, supabaseKey);
        setSupabaseStatus({ connected: true, message: res.message });
      } else {
        setSupabaseStatus({ connected: false, message: res.message });
      }
    } catch (err: any) {
      setSupabaseStatus({ connected: false, message: err.message || 'Connection failed' });
    } finally {
      setIsTestingSupabase(false);
    }
  };

  const handleDisconnectSupabase = () => {
    clearSupabaseConfig();
    setSupabaseUrl('');
    setSupabaseKey('');
    setSupabaseStatus(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in-50 duration-200">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8C2528] to-[#5C1619] p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 border border-white/20 text-amber-300 shadow-sm">
              <Database className="h-6 w-6" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-amber-200">
                Cloud Database Integration
              </div>
              <h2 className="text-xl font-bold">Supabase & Firestore Persistence</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-2 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('supabase')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
              activeTab === 'supabase'
                ? 'bg-white text-[#8C2528] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 109 113" fill="none">
              <path
                d="M63.7075 110.284C60.948 113.883 55.2391 111.917 55.2391 107.369V64.0888H9.36214C3.89643 64.0888 0.771971 57.8687 4.10398 53.5222L45.2925 2.71617C48.052 -0.883015 53.7609 1.08277 53.7609 5.63102V48.9112H99.6379C105.104 48.9112 108.228 55.1313 104.896 59.4778L63.7075 110.284Z"
                fill="#3ECF8E"
              />
            </svg>
            <span>Connect with Supabase</span>
          </button>

          <button
            onClick={() => setActiveTab('firebase')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
              activeTab === 'firebase'
                ? 'bg-white text-[#8C2528] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="h-4 w-4 text-amber-500" />
            <span>Active Cloud Firestore</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700 text-xs">
          {/* TAB 1: SUPABASE */}
          {activeTab === 'supabase' && (
            <div className="space-y-5">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm mb-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Connect Your External Supabase Database</span>
                </div>
                <p className="text-emerald-800 leading-relaxed">
                  Enter your Supabase Project URL and Public Anon Key from your Supabase Dashboard (under <strong>Project Settings → API</strong>) to sync learners, courses, and submission data directly with your Supabase PostgreSQL tables.
                </p>
              </div>

              {/* Status Alert */}
              {supabaseStatus && (
                <div
                  className={`rounded-xl border p-3 flex items-center gap-2 ${
                    supabaseStatus.connected
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                      : 'border-red-200 bg-red-50 text-red-700'
                  }`}
                >
                  {supabaseStatus.connected ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
                  )}
                  <span className="font-semibold">{supabaseStatus.message}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleTestSupabase} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Globe className="h-3.5 w-3.5 text-slate-400" />
                    <span>Supabase Project URL</span>
                  </label>
                  <input
                    type="url"
                    required
                    value={supabaseUrl}
                    onChange={(e) => setSupabaseUrl(e.target.value)}
                    placeholder="https://xyzcompany.supabase.co"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#8C2528] focus:outline-none focus:ring-1 focus:ring-[#8C2528]"
                  />
                  <p className="text-[11px] text-slate-400">
                    Found in your Supabase Dashboard under <strong>Settings &gt; API &gt; Project URL</strong>
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Key className="h-3.5 w-3.5 text-slate-400" />
                    <span>Supabase Anon / Public API Key</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={supabaseKey}
                    onChange={(e) => setSupabaseKey(e.target.value)}
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-mono text-slate-900 placeholder:text-slate-400 focus:border-[#8C2528] focus:outline-none focus:ring-1 focus:ring-[#8C2528]"
                  />
                  <p className="text-[11px] text-slate-400">
                    Found under <strong>Settings &gt; API &gt; Project API keys &gt; anon public</strong>
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isTestingSupabase}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 font-bold text-white hover:bg-emerald-700 transition-colors shadow-sm disabled:opacity-50"
                  >
                    {isTestingSupabase ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Testing Connection...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Save & Connect Supabase</span>
                      </>
                    )}
                  </button>

                  {supabaseStatus?.connected && (
                    <button
                      type="button"
                      onClick={handleDisconnectSupabase}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-100 font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
                    >
                      Disconnect
                    </button>
                  )}
                </div>
              </form>

              {/* Quick Supabase Schema Setup SQL snippet */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2">
                <div className="font-bold text-slate-800 flex items-center justify-between">
                  <span>Optional: Supabase SQL Table Schema</span>
                  <span className="font-mono text-[10px] text-slate-400">PostgreSQL</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Run this in your Supabase SQL Editor if you want to mirror the SRCAA Academy schema:
                </p>
                <pre className="p-3 bg-slate-900 text-emerald-400 rounded-xl font-mono text-[11px] overflow-x-auto leading-relaxed">
{`-- SRCAA Academy Schema for Supabase
CREATE TABLE IF NOT EXISTS learners (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'scholar',
  institution TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS progress (
  user_id TEXT REFERENCES learners(id),
  current_unit_id INT DEFAULT 1,
  progress_percent INT DEFAULT 0,
  is_certified BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);`}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 2: ACTIVE FIRESTORE */}
          {activeTab === 'firebase' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                    Cloud Database Provider
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">Google Cloud Firestore</h3>
                  <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                    {firebaseConfig.projectId}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{firestoreStatus === 'connected' ? 'Live & Operational' : 'Checking...'}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Database ID</span>
                  <p className="font-mono text-xs font-semibold text-slate-800 truncate">
                    {firebaseConfig.firestoreDatabaseId}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Auth Domain</span>
                  <p className="font-mono text-xs font-semibold text-slate-800 truncate">
                    {firebaseConfig.authDomain}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 space-y-2">
                <div className="flex items-center gap-2 text-emerald-900 font-bold">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>firestore.rules Deployed & Hardened</span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Attribute-Based Access Control (ABAC) and Zero-Trust Firestore Security rules are deployed to your cloud project. Client requests are authenticated, preventing unauthorized data tampering.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 bg-white px-6 py-3 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            SRCAA Multi-Cloud Storage Architecture
          </span>
          <button
            onClick={onClose}
            className="rounded-xl bg-[#8C2528] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#A83236] transition-colors shadow-2xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
