import React, { useState } from 'react';
import { Award, BookOpen, Sliders, Terminal, CheckCircle2, User as UserIcon, LogOut, Video, GitBranch, Lock, Unlock, HelpCircle, ChevronDown, ShieldCheck, Database } from 'lucide-react';
import { LearnerProgress, User } from '../types/course';
import { SrcaaLogo } from './SrcaaLogo';

interface NavbarProps {
  progress: LearnerProgress | null;
  activeView: 'home' | 'course' | 'about' | 'progress' | 'certificate';
  setActiveView: (view: 'home' | 'course' | 'about' | 'progress' | 'certificate') => void;
  openAccessibility: () => void;
  openApiExplorer: () => void;
  openVideoAndGitGuide: () => void;
  openDatabaseModal?: () => void;
  lowBandwidth: boolean;
  user: User | null;
  onOpenAuth: (initialTab?: 'signin' | 'signup') => void;
  onLogout: () => void;
  isCourseLocked: boolean;
  onToggleCourseLock: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  progress,
  activeView,
  setActiveView,
  openAccessibility,
  openApiExplorer,
  openVideoAndGitGuide,
  openDatabaseModal,
  lowBandwidth,
  user,
  onOpenAuth,
  onLogout,
  isCourseLocked,
  onToggleCourseLock,
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const percent = progress?.overallProgressPercent ?? 0;
  const isEligible = progress?.isCertificateEligible ?? false;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-2xs">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveView('home')}
            className="flex items-center text-left transition-opacity hover:opacity-90"
            title="SRCAA Academy - Learn. Research. Innovate. Grow."
          >
            <SrcaaLogo size={36} showTagline={true} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 font-medium text-xs">
          <button
            onClick={() => setActiveView('home')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeView === 'home'
                ? 'bg-red-50 text-[#8C2528] font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => setActiveView('course')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeView === 'course'
                ? 'bg-red-50 text-[#8C2528] font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <span>Course Syllabus</span>
            {isCourseLocked && <Lock className="h-3 w-3 text-amber-600" />}
          </button>

          <button
            onClick={() => setActiveView('about')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeView === 'about'
                ? 'bg-red-50 text-[#8C2528] font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            About Us
          </button>

          <button
            onClick={() => setActiveView('progress')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeView === 'progress'
                ? 'bg-red-50 text-[#8C2528] font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Progress Matrix
          </button>

          <button
            onClick={() => setActiveView('certificate')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeView === 'certificate'
                ? 'bg-red-50 text-[#8C2528] font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Award className="h-3.5 w-3.5 text-amber-600" />
            <span>Credential</span>
            {isEligible && (
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            )}
          </button>
        </nav>

        {/* Right Tools & Security Enclave Actions */}
        <div className="flex items-center gap-2.5">
          {/* Security Shield Indicator */}
          <div className="hidden xl:flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-800">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>Secure Portal</span>
          </div>

          {/* Progress Mini Pill */}
          <button
            onClick={() => setActiveView('progress')}
            className="hidden md:flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-100 transition-colors"
            title="Learner Completion Progress"
          >
            <div className="h-1.5 w-12 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full bg-amber-500 transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="font-mono text-[11px] font-bold text-slate-800">{percent}%</span>
          </button>

          {/* Video & Git Push Guide Button */}
          <button
            onClick={openVideoAndGitGuide}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#8C2528] transition-colors shadow-2xs"
            title="How to link lecture videos and push code to Git"
          >
            <Video className="h-3.5 w-3.5 text-[#8C2528]" />
            <span className="hidden sm:inline">Video & Push</span>
          </button>

          {/* Accessibility Settings */}
          <button
            onClick={openAccessibility}
            className="flex items-center justify-center h-8 w-8 rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-2xs"
            aria-label="Accessibility settings"
            title="Accessibility Controls"
          >
            <Sliders className="h-4 w-4" />
          </button>

          {/* REST API Explorer */}
          <button
            onClick={openApiExplorer}
            className="flex items-center justify-center h-8 w-8 rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-[#8C2528] hover:bg-slate-50 transition-colors shadow-2xs"
            title="Inspect Full-Stack REST Endpoints"
            aria-label="API Explorer"
          >
            <Terminal className="h-4 w-4" />
          </button>

          {/* Cloud Database / Supabase Integration */}
          {openDatabaseModal && (
            <button
              onClick={openDatabaseModal}
              className="flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50/70 px-2.5 py-1.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 transition-colors shadow-2xs"
              title="Cloud Database: Connect with Supabase or View Firestore Status"
            >
              <Database className="h-3.5 w-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Database</span>
            </button>
          )}

          {/* Direct 1-Click Lock Portal Button */}
          <button
            onClick={onLogout}
            className="flex items-center gap-1 rounded-lg border border-red-200 bg-red-50/70 px-2.5 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100 transition-colors shadow-2xs"
            title="Lock Portal & Sign Out"
          >
            <Lock className="h-3.5 w-3.5 text-[#8C2528]" />
            <span className="hidden sm:inline">Lock Portal</span>
          </button>

          {/* User Profile Dropdown */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 pl-2 pr-3 py-1 text-xs hover:bg-slate-100 transition-colors shadow-2xs"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8C2528] text-[10px] font-bold text-white uppercase">
                  {user.name.charAt(0)}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="font-semibold text-slate-800 leading-tight max-w-[100px] truncate">
                    {user.name}
                  </div>
                  <div className="text-[10px] text-slate-500 capitalize">{user.role}</div>
                </div>
                <ChevronDown className="h-3 w-3 text-slate-400" />
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-xl z-50 text-xs text-slate-700 animate-in fade-in-50 duration-150">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="font-bold text-slate-900 truncate">{user.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    <span className="inline-block mt-1 rounded bg-amber-50 border border-amber-200 px-1.5 py-0.5 text-[10px] font-medium text-amber-800">
                      Auth via {user.provider}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setActiveView('progress');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700 flex items-center justify-between"
                  >
                    <span>My Progress & Matrix</span>
                    <span className="font-mono text-slate-500">{percent}%</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveView('certificate');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700 flex items-center justify-between"
                  >
                    <span>Official Credential</span>
                    {isEligible ? (
                      <span className="text-emerald-600 font-bold text-[10px]">ELIGIBLE</span>
                    ) : (
                      <span className="text-slate-400 text-[10px]">IN PROGRESS</span>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      onToggleCourseLock();
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700 flex items-center justify-between border-t border-slate-100 mt-1"
                  >
                    <span>Cohort Course Lock</span>
                    {isCourseLocked ? (
                      <span className="text-red-600 font-bold text-[10px]">LOCKED</span>
                    ) : (
                      <span className="text-emerald-600 font-bold text-[10px]">OPEN</span>
                    )}
                  </button>

                  {openDatabaseModal && (
                    <button
                      onClick={() => {
                        openDatabaseModal();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700 flex items-center justify-between"
                    >
                      <span>Cloud Database / Supabase</span>
                      <span className="text-emerald-600 font-bold text-[10px]">CONFIG</span>
                    </button>
                  )}

                  <div className="border-t border-slate-100 my-1" />

                  <button
                    onClick={() => {
                      onLogout();
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-red-50 text-red-600 font-medium flex items-center gap-1.5"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Lock Portal & Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
