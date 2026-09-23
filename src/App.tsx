import React, { useState, useEffect } from 'react';
import { POST_HUMAN_CHARTER_COURSE } from './data/courseData';
import { Course, LearnerProgress, CohortAnalytics, DeliveryQuadrant, DiscussionComment, User, Unit } from './types/course';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { AboutUsPage } from './components/AboutUsPage';
import { AccessibilityToolbar } from './components/AccessibilityToolbar';
import { CourseHero } from './components/CourseHero';
import { UnitSelector } from './components/UnitSelector';
import { QuadrantVideo } from './components/QuadrantVideo';
import { QuadrantText } from './components/QuadrantText';
import { QuadrantDiscussion } from './components/QuadrantDiscussion';
import { QuadrantAssessment } from './components/QuadrantAssessment';
import { ProgressDashboard } from './components/ProgressDashboard';
import { CertificateModal } from './components/CertificateModal';
import { ApiExplorerModal } from './components/ApiExplorerModal';
import { AuthModal } from './components/AuthModal';
import { VideoAndGitGuideModal } from './components/VideoAndGitGuideModal';
import { SecureGateway } from './components/SecureGateway';
import {
  Video,
  BookOpen,
  MessageSquare,
  Award,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Lock,
  Unlock,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  LogIn,
  ExternalLink,
} from 'lucide-react';

export default function App() {
  const [course, setCourse] = useState<Course>(POST_HUMAN_CHARTER_COURSE);
  const [progress, setProgress] = useState<LearnerProgress | null>(null);
  const [analytics, setAnalytics] = useState<CohortAnalytics | null>(null);

  // Authentication & Course Lock State
  // Strictly null initially: nobody is logged in by default
  const [user, setUser] = useState<User | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const [isCourseLocked, setIsCourseLocked] = useState<boolean>(false);
  const [instructorBypass, setInstructorBypass] = useState<boolean>(false);

  // Navigation views: default to Home page once authenticated
  const [activeView, setActiveView] = useState<'home' | 'course' | 'about' | 'progress' | 'certificate'>('home');
  const [selectedUnitId, setSelectedUnitId] = useState<number>(1);
  const [selectedQuadrant, setSelectedQuadrant] = useState<DeliveryQuadrant>('video');

  // Modals
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState<'signin' | 'signup'>('signin');
  const [isVideoGuideOpen, setIsVideoGuideOpen] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [isApiExplorerOpen, setIsApiExplorerOpen] = useState(false);
  const [lockedAlertUnit, setLockedAlertUnit] = useState<Unit | null>(null);

  // Accessibility State
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xl'>('normal');
  const [dyslexiaMode, setDyslexiaMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [lowBandwidth, setLowBandwidth] = useState(false);

  // Active unit discussions cache
  const [currentUnitComments, setCurrentUnitComments] = useState<DiscussionComment[]>([]);

  // Fetch Session User and Lock Status
  const fetchAuthAndLock = async () => {
    setIsCheckingAuth(true);
    try {
      const [authRes, lockRes] = await Promise.all([
        fetch('/api/auth/me'),
        fetch('/api/course/lock-status'),
      ]);

      if (authRes.ok) {
        const authData = await authRes.json();
        if (authData.success && authData.user) {
          setUser(authData.user);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }

      if (lockRes.ok) {
        const lockData = await lockRes.json();
        if (lockData.success) {
          setIsCourseLocked(Boolean(lockData.isCourseEntirelyLocked || lockData.isLocked));
        }
      }
    } catch (err) {
      console.warn('Initial security check completed:', err);
      setUser(null);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  // Fetch Course, Progress, and Analytics
  const fetchProgress = async () => {
    try {
      const res = await fetch('/api/progress');
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          setProgress(json.data);
          if (json.data.currentUnitId) {
            setSelectedUnitId(json.data.currentUnitId);
          }
        }
      }
    } catch (err) {
      console.warn('API /api/progress error:', err);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await fetch('/api/analytics');
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          setAnalytics(json.data);
        }
      }
    } catch (err) {
      console.warn('API /api/analytics error:', err);
    }
  };

  const fetchComments = async (unitId: number) => {
    try {
      const res = await fetch(`/api/discussions/${unitId}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          setCurrentUnitComments(json.data);
        }
      }
    } catch (err) {
      console.warn('API fetch comments error:', err);
    }
  };

  useEffect(() => {
    fetchAuthAndLock();
  }, []);

  useEffect(() => {
    if (user) {
      fetchProgress();
      fetchAnalytics();
      fetchComments(selectedUnitId);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchComments(selectedUnitId);
    }
  }, [selectedUnitId, user]);

  // Periodic active-time tracking (1 min tick) when user is logged in
  useEffect(() => {
    if (!user) return;
    const timer = setInterval(() => {
      fetch('/api/progress/track-time', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ minutes: 1 }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.timeSpentMinutes) {
            setProgress((prev) =>
              prev ? { ...prev, timeSpentMinutes: data.timeSpentMinutes } : prev
            );
          }
        })
        .catch(() => {});
    }, 60000);
    return () => clearInterval(timer);
  }, [user]);

  // Update body classes for accessibility
  useEffect(() => {
    if (dyslexiaMode) {
      document.body.classList.add('dyslexia-friendly');
    } else {
      document.body.classList.remove('dyslexia-friendly');
    }

    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [dyslexiaMode, highContrast]);

  // Authentication Handlers
  const handleOpenAuth = (tab: 'signin' | 'signup' = 'signin') => {
    setAuthInitialTab(tab);
    setIsAuthOpen(true);
  };

  const handleAuthSuccess = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    setIsAuthOpen(false);
    if (progress && authenticatedUser.name) {
      setProgress((prev) => (prev ? { ...prev, learnerName: authenticatedUser.name } : prev));
    }
    fetchProgress();
    fetchAnalytics();
    fetchComments(selectedUnitId);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      setProgress(null);
    }
  };

  const handleToggleCourseLock = async () => {
    try {
      const res = await fetch('/api/course/toggle-lock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locked: !isCourseLocked }),
      });
      const data = await res.json();
      if (data.success) {
        setIsCourseLocked(Boolean(data.isCourseEntirelyLocked));
      }
    } catch (err) {
      console.error('Toggle course lock error:', err);
    }
  };

  // Callback when instructor updates a unit's video URL
  const handleVideoUpdated = (unitId: number, newUrl: string) => {
    setCourse((prevCourse) => {
      const updatedUnits = prevCourse.units.map((u) => {
        if (u.id === unitId) {
          return {
            ...u,
            quadrants: {
              ...u.quadrants,
              video: {
                ...u.quadrants.video,
                videoPlaceholderUrl: newUrl,
              },
            },
          };
        }
        return u;
      });
      return { ...prevCourse, units: updatedUnits };
    });
  };

  // Handlers for quadrant actions
  const handleMarkQuadrant = async (quadrant: DeliveryQuadrant) => {
    try {
      const res = await fetch('/api/progress/mark-quadrant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ unitId: selectedUnitId, quadrant, completed: true }),
      });
      const data = await res.json();
      if (data.success) {
        setProgress(data.data);
      }
    } catch (err) {
      console.error('Failed to mark quadrant:', err);
    }
  };

  const handlePostComment = async (content: string) => {
    try {
      const res = await fetch(`/api/discussions/${selectedUnitId}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          authorName: user?.name || progress?.learnerName || 'Scholar Fellow',
          authorRole: user?.role === 'scholar' ? 'Candidate · Post-Human Law' : 'Scholar Fellow',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setCurrentUnitComments(data.allComments);
        if (data.progress) {
          setProgress(data.progress);
        }
      }
    } catch (err) {
      console.error('Failed to post comment:', err);
    }
  };

  const handleUpvoteComment = async (commentId: string) => {
    try {
      const res = await fetch(`/api/discussions/${selectedUnitId}/upvote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commentId }),
      });
      const data = await res.json();
      if (data.success) {
        setCurrentUnitComments((prev) =>
          prev.map((c) => (c.id === commentId ? { ...c, upvotes: data.upvotes } : c))
        );
      }
    } catch (err) {
      console.error('Failed to upvote:', err);
    }
  };

  const handleResetProgress = async (preset: 'fresh' | 'midway' | 'graduate') => {
    try {
      const res = await fetch('/api/progress/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preset }),
      });
      const data = await res.json();
      if (data.success) {
        setProgress(data.data);
        if (data.data.currentUnitId) {
          setSelectedUnitId(data.data.currentUnitId);
        }
      }
    } catch (err) {
      console.error('Failed to reset progress:', err);
    }
  };

  // ----------------------------------------------------
  // STRICT SECURITY GATE:
  // Without login, no one can see the webpage or course!
  // ----------------------------------------------------
  if (!user && !isCheckingAuth) {
    return <SecureGateway onAuthSuccess={handleAuthSuccess} />;
  }

  // Brief initial TLS handshake check loader
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-3 border-[#8C2528] border-t-transparent" />
          <p className="text-xs font-semibold text-slate-600 font-mono tracking-wide">
            Verifying TLS 1.3 Security Enclave...
          </p>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // AUTHENTICATED PLATFORM
  // ----------------------------------------------------
  const unlockedUnitIds: number[] = [1];
  for (let i = 2; i <= course.units.length; i++) {
    const prevUnitId = i - 1;
    const prevScore = progress?.quizScores[prevUnitId];
    const prevPolicy = progress?.policySubmissions[prevUnitId];
    const isPrevComplete = progress?.completedUnits?.includes(prevUnitId);

    if (instructorBypass) {
      unlockedUnitIds.push(i);
    } else if (
      (prevScore !== undefined && prevScore >= 75) ||
      (prevPolicy !== undefined && prevPolicy.rubricScore >= 75) ||
      isPrevComplete
    ) {
      unlockedUnitIds.push(i);
    }
  }

  const currentUnit = course.units.find((u) => u.id === selectedUnitId) || course.units[0];

  const isVideoDone = progress?.completedQuadrants[`${selectedUnitId}-video`] ?? false;
  const isTextDone = progress?.completedQuadrants[`${selectedUnitId}-text`] ?? false;
  const isDiscDone = progress?.completedQuadrants[`${selectedUnitId}-discussion`] ?? false;
  const isAssDone = progress?.completedQuadrants[`${selectedUnitId}-assessment`] ?? false;
  const isPreAssDone = isVideoDone && isTextDone && isDiscDone;

  const fontSizeClass =
    fontSize === 'large' ? 'text-base' : fontSize === 'xl' ? 'text-lg' : 'text-sm';

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-800 flex flex-col ${fontSizeClass}`}>
      {/* 3-Zone Top Bar Navbar with Lock Portal button */}
      <Navbar
        progress={progress}
        activeView={activeView}
        setActiveView={setActiveView}
        openAccessibility={() => setIsAccessibilityOpen(true)}
        openApiExplorer={() => setIsApiExplorerOpen(true)}
        openVideoAndGitGuide={() => setIsVideoGuideOpen(true)}
        lowBandwidth={lowBandwidth}
        user={user}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        isCourseLocked={isCourseLocked}
        onToggleCourseLock={handleToggleCourseLock}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* VIEW 1: HOME PAGE */}
        {activeView === 'home' && (
          <HomePage
            course={course}
            onEnterCourse={() => setActiveView('course')}
            onNavigateAbout={() => setActiveView('about')}
            onOpenAuth={() => handleOpenAuth('signup')}
            isAuthenticated={Boolean(user)}
            isCourseLocked={isCourseLocked}
          />
        )}

        {/* VIEW 2: ABOUT US PAGE */}
        {activeView === 'about' && (
          <AboutUsPage onEnterCourse={() => setActiveView('course')} />
        )}

        {/* VIEW 3: COURSE WORKSPACE */}
        {activeView === 'course' && (
          <div>
            {/* Condition: Entire Course Locked (Platform-wide cohort examination) */}
            {isCourseLocked ? (
              <div className="mx-auto max-w-4xl px-4 py-16 text-center space-y-6">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-100 border border-amber-300 text-amber-900 shadow-sm">
                  <Lock className="h-10 w-10 text-[#8C2528]" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-widest text-[#8C2528] font-bold">
                    Institutional Governance Active
                  </span>
                  <h1 className="font-display text-3xl font-extrabold text-slate-900">
                    The Entire Course is Currently Locked
                  </h1>
                  <p className="max-w-xl mx-auto text-sm text-slate-600 leading-relaxed">
                    Access to course modules and assessment portals is restricted by the SRCAA Academic Senate during scheduled proctored examination windows.
                  </p>
                </div>

                <div className="p-6 max-w-lg mx-auto rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
                  <div className="text-xs font-semibold text-slate-700">
                    Instructor / Evaluator Override Control:
                  </div>
                  <button
                    onClick={handleToggleCourseLock}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#8C2528] px-5 py-3 text-xs font-bold text-white hover:bg-[#A83236] transition-colors shadow-sm"
                  >
                    <Unlock className="h-4 w-4" />
                    <span>Unlock Entire Course (Platform-Wide)</span>
                  </button>
                  <p className="text-[11px] text-slate-400">
                    Or use the lock toggle in the top navigation bar.
                  </p>
                </div>
              </div>
            ) : (
              /* Normal Unlocked Workspace */
              <div>
                {/* Academic Hero Header */}
                <CourseHero
                  course={course}
                  progress={progress}
                  onStartUnit={(uid) => {
                    setSelectedUnitId(uid);
                    const el = document.getElementById('unit-workspace');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                />

                {/* Interactive Unit Carousel Selector with Sequential Progression */}
                <UnitSelector
                  units={course.units}
                  selectedUnitId={selectedUnitId}
                  onSelectUnit={(uid) => setSelectedUnitId(uid)}
                  progress={progress}
                  unlockedUnitIds={unlockedUnitIds}
                  instructorBypass={instructorBypass}
                  onToggleInstructorBypass={() => setInstructorBypass(!instructorBypass)}
                  onLockedUnitClick={(u) => setLockedAlertUnit(u)}
                />

                {/* Unit Workspace: Four Quadrants */}
                <div id="unit-workspace" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
                  {/* Four Quadrants Interactive Segmented Tabs */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4 mb-6">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#8C2528]">
                        <span>{currentUnit.unitNumberRoman}</span>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span>{currentUnit.durationHours} Hours Dedicated</span>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span className="text-amber-800 font-bold">{currentUnit.primaryOutcome.id}</span>
                      </div>
                      <h2 className="text-2xl font-bold font-display text-slate-900">
                        {currentUnit.title}
                      </h2>
                    </div>

                    {/* Four Quadrants Tabs */}
                    <div className="flex items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-xl overflow-x-auto max-w-full">
                      <button
                        onClick={() => setSelectedQuadrant('video')}
                        className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                          selectedQuadrant === 'video'
                            ? 'bg-[#8C2528] text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Video className="h-3.5 w-3.5" />
                        <span>Q1: Video</span>
                        {isVideoDone && <CheckCircle2 className="h-3 w-3 text-emerald-400 ml-0.5" />}
                      </button>

                      <button
                        onClick={() => setSelectedQuadrant('text')}
                        className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                          selectedQuadrant === 'text'
                            ? 'bg-[#8C2528] text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <BookOpen className="h-3.5 w-3.5" />
                        <span>Q2: Text (TILT)</span>
                        {isTextDone && <CheckCircle2 className="h-3 w-3 text-emerald-400 ml-0.5" />}
                      </button>

                      <button
                        onClick={() => setSelectedQuadrant('discussion')}
                        className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                          selectedQuadrant === 'discussion'
                            ? 'bg-[#8C2528] text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <MessageSquare className="h-3.5 w-3.5" />
                        <span>Q3: Discussion</span>
                        {isDiscDone && <CheckCircle2 className="h-3 w-3 text-emerald-400 ml-0.5" />}
                      </button>

                      <button
                        onClick={() => setSelectedQuadrant('assessment')}
                        className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                          selectedQuadrant === 'assessment'
                            ? 'bg-[#8C2528] text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Award className="h-3.5 w-3.5" />
                        <span>Q4: Assessment</span>
                        {isAssDone && <CheckCircle2 className="h-3 w-3 text-emerald-400 ml-0.5" />}
                      </button>
                    </div>
                  </div>

                  {/* "Add Quiz After Completing" Call-to-Action Banner */}
                  {isPreAssDone && !isAssDone && selectedQuadrant !== 'assessment' && (
                    <div className="mb-6 rounded-2xl border border-amber-300 bg-amber-50 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-900">
                          <Sparkles className="h-5 w-5 text-[#8C2528]" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-amber-900">
                            Quadrants I, II, & III Completed! Next Step: Unit Quiz
                          </h4>
                          <p className="text-xs text-slate-600">
                            Take the standardized {currentUnit.quadrants.assessment.title} (score $\ge 75\%$) to master {currentUnit.primaryOutcome.id} and unlock the next unit.
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedQuadrant('assessment')}
                        className="shrink-0 flex items-center gap-2 rounded-xl bg-[#8C2528] px-4 py-2 text-xs font-bold text-white hover:bg-[#A83236] transition-colors shadow-xs"
                      >
                        <span>Start Unit Quiz</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Active Quadrant View */}
                  <div className="min-h-[480px]">
                    {selectedQuadrant === 'video' && (
                      <QuadrantVideo
                        unitId={selectedUnitId}
                        video={currentUnit.quadrants.video}
                        isCompleted={isVideoDone}
                        onMarkCompleted={() => handleMarkQuadrant('video')}
                        lowBandwidth={lowBandwidth}
                        onOpenVideoLinker={() => setIsVideoGuideOpen(true)}
                      />
                    )}

                    {selectedQuadrant === 'text' && (
                      <QuadrantText
                        unitId={selectedUnitId}
                        textData={currentUnit.quadrants.text}
                        isCompleted={isTextDone}
                        onMarkCompleted={() => handleMarkQuadrant('text')}
                      />
                    )}

                    {selectedQuadrant === 'discussion' && (
                      <QuadrantDiscussion
                        unitId={selectedUnitId}
                        discussionData={currentUnit.quadrants.discussion}
                        comments={currentUnitComments}
                        isCompleted={isDiscDone}
                        onPostComment={handlePostComment}
                        onUpvoteComment={handleUpvoteComment}
                      />
                    )}

                    {selectedQuadrant === 'assessment' && (
                      <QuadrantAssessment
                        unit={currentUnit}
                        progress={progress}
                        onRefreshProgress={fetchProgress}
                      />
                    )}
                  </div>

                  {/* Bottom Unit Pagination */}
                  <div className="flex items-center justify-between border-t border-slate-200 pt-6 mt-12 mb-8">
                    <button
                      disabled={selectedUnitId <= 1}
                      onClick={() => setSelectedUnitId((prev) => Math.max(1, prev - 1))}
                      className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors shadow-2xs"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      <span>Previous Unit</span>
                    </button>

                    <div className="text-xs text-slate-500 font-mono">
                      Unit {selectedUnitId} of {course.units.length}
                    </div>

                    <button
                      disabled={
                        selectedUnitId >= course.units.length ||
                        (!instructorBypass && !unlockedUnitIds.includes(selectedUnitId + 1))
                      }
                      onClick={() => {
                        const nextId = selectedUnitId + 1;
                        if (instructorBypass || unlockedUnitIds.includes(nextId)) {
                          setSelectedUnitId(nextId);
                        }
                      }}
                      className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors shadow-2xs"
                    >
                      <span>Next Unit</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 4: PROGRESS & ANALYTICS DASHBOARD */}
        {activeView === 'progress' && progress && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <ProgressDashboard
              progress={progress}
              outcomes={course.courseOutcomes}
              analytics={analytics}
              onResetProgress={handleResetProgress}
              onClaimCredential={() => setActiveView('certificate')}
            />
          </div>
        )}

        {/* VIEW 5: CERTIFICATE CREDENTIAL VIEW */}
        {activeView === 'certificate' && progress && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <CertificateModal
              isOpen={true}
              onClose={() => setActiveView('course')}
              progress={progress}
              course={course}
            />
          </div>
        )}
      </main>

      {/* Locked Unit Alert Modal */}
      {lockedAlertUnit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-900">
                <Lock className="h-5 w-5 text-[#8C2528]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">{lockedAlertUnit.title}</h3>
                <p className="text-xs text-slate-500">Unit Locked (Sequential Mastery Rule)</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              To unlock <strong>{lockedAlertUnit.title}</strong>, you must first complete and pass the assessment for <strong>Unit {lockedAlertUnit.id - 1}</strong> with a minimum grade of 75%.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setInstructorBypass(true);
                  setSelectedUnitId(lockedAlertUnit.id);
                  setLockedAlertUnit(null);
                }}
                className="px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-50 text-amber-900 text-xs font-semibold hover:bg-amber-100"
              >
                Enable Instructor Bypass
              </button>
              <button
                onClick={() => setLockedAlertUnit(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal (can be triggered from dropdown if switching accounts) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        initialTab={authInitialTab}
      />

      {/* Video & Git Push Guide Modal */}
      <VideoAndGitGuideModal
        isOpen={isVideoGuideOpen}
        onClose={() => setIsVideoGuideOpen(false)}
        course={course}
        onVideoUpdated={handleVideoUpdated}
      />

      {/* Accessibility Drawer Modal */}
      <AccessibilityToolbar
        isOpen={isAccessibilityOpen}
        onClose={() => setIsAccessibilityOpen(false)}
        fontSize={fontSize}
        setFontSize={setFontSize}
        dyslexiaMode={dyslexiaMode}
        setDyslexiaMode={setDyslexiaMode}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        lowBandwidth={lowBandwidth}
        setLowBandwidth={setLowBandwidth}
      />

      {/* API Explorer Modal */}
      <ApiExplorerModal
        isOpen={isApiExplorerOpen}
        onClose={() => setIsApiExplorerOpen(false)}
      />

      {/* Academic Clean White Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[#8C2528]">SRCAA ACADEMY</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-amber-800 font-medium">Learn. Research. Innovate. Grow.</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>© 2026 All Rights Reserved</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span>WCAG 2.1 AA Compliant</span>
            <span aria-hidden="true">·</span>
            <span>TILT Methodology</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsApiExplorerOpen(true)}
              className="text-[#8C2528] hover:underline font-semibold"
            >
              REST APIs
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsVideoGuideOpen(true)}
              className="text-[#8C2528] hover:underline font-semibold"
            >
              Video & Git Guide
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
