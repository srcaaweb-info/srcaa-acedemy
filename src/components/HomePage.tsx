import React from 'react';
import { ArrowRight, BookOpen, Video, MessageSquare, Award, ShieldCheck, CheckCircle2, Users, Clock, Sparkles, Scale, Cpu, Globe, Lock } from 'lucide-react';
import { Course } from '../types/course';
import { SrcaaLogo } from './SrcaaLogo';

interface HomePageProps {
  course: Course;
  onEnterCourse: () => void;
  onNavigateAbout: () => void;
  onOpenAuth: () => void;
  isAuthenticated: boolean;
  isCourseLocked: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({
  course,
  onEnterCourse,
  onNavigateAbout,
  onOpenAuth,
  isAuthenticated,
  isCourseLocked,
}) => {
  const upcomingCourses = [
    {
      title: 'Neural Data Sovereignty & Neuro-Rights in Corporate AI',
      code: 'SRCAA-NDS-2031',
      level: 'Advanced Jurisprudence',
      duration: '4 Weeks · 16 Hours',
      focus: 'Analysis of non-invasive EEG headsets, cognitive workload surveillance, and GDPR Article 9 biometric classifications.',
      status: 'Enrolling Cohort II',
    },
    {
      title: 'Autonomous Agent Liability & Algorithmic Personhood',
      code: 'SRCAA-AAL-2031',
      level: 'Professional Development',
      duration: '5 Weeks · 20 Hours',
      focus: 'Tort law, enterprise agency, self-executing smart contracts, and statutory liability for autonomous AI systems.',
      status: 'Coming Soon',
    },
    {
      title: 'Biometric Trust Architectures & Self-Sovereign Identity',
      code: 'SRCAA-SSI-2032',
      level: 'Foundational',
      duration: '4 Weeks · 16 Hours',
      focus: 'W3C Verifiable Credentials, decentralized identifiers (DIDs), and zero-knowledge privacy for citizen identity.',
      status: 'In Curriculum Review',
    },
  ];

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50 via-white to-red-50/20 px-6 py-16 sm:px-12 sm:py-24 text-center">
        {/* Ambient decorative elements */}
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#8C2528]/10 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-4xl space-y-6">
          {/* Logo & Motto Badge */}
          <div className="inline-flex items-center gap-3 rounded-full border border-amber-200 bg-amber-50/80 px-4 py-1.5 shadow-xs">
            <SrcaaLogo size={22} showTagline={false} />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
              SRCAA ACADEMY
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs font-semibold text-[#8C2528]">
              Learn. Research. Innovate. Grow.
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Advancing Constitutional Jurisprudence for the{' '}
            <span className="text-[#8C2528]">Synthetic Age</span>
          </h1>

          <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
            Welcome to SRCAA Academy's flagship eLearning platform. We bridge the frontier between technological velocity, post-human rights, cognitive liberty, and statutory law through an evidence-based Four-Quadrant pedagogy.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={onEnterCourse}
              className="flex items-center gap-2 rounded-xl bg-[#8C2528] px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-[#A83236] transition-all hover:shadow-lg active:scale-95"
            >
              <span>{isCourseLocked ? 'View Course Syllabus' : 'Enter Course Sandbox'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            {!isAuthenticated ? (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
              >
                <Lock className="h-4 w-4 text-[#8C2528]" />
                <span>Sign In / Create Account</span>
              </button>
            ) : (
              <button
                onClick={onNavigateAbout}
                className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
              >
                <span>About SRCAA Academy</span>
              </button>
            )}
          </div>

          {/* Academic Trust Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 border-t border-slate-200/80 text-left">
            <div className="rounded-xl border border-slate-200/70 bg-white p-4 shadow-xs">
              <div className="text-2xl font-bold font-display text-slate-900">6 Units</div>
              <div className="text-xs text-slate-500 font-medium">24 Academic Hours</div>
            </div>
            <div className="rounded-xl border border-slate-200/70 bg-white p-4 shadow-xs">
              <div className="text-2xl font-bold font-display text-[#8C2528]">45% Target</div>
              <div className="text-xs text-slate-500 font-medium">Completion Velocity</div>
            </div>
            <div className="rounded-xl border border-slate-200/70 bg-white p-4 shadow-xs">
              <div className="text-2xl font-bold font-display text-amber-700">Four Quadrants</div>
              <div className="text-xs text-slate-500 font-medium">UGC / SWAYAM Aligned</div>
            </div>
            <div className="rounded-xl border border-slate-200/70 bg-white p-4 shadow-xs">
              <div className="text-2xl font-bold font-display text-emerald-700">WCAG 2.1 AA</div>
              <div className="text-xs text-slate-500 font-medium">Inclusive Accessibility</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Flagship Course */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#8C2528] mb-1">
              Active Curriculum
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
              Flagship Accredited MOOC
            </h2>
          </div>
          <button
            onClick={onEnterCourse}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C2528] hover:text-[#A83236]"
          >
            <span>Open Interactive Syllabus</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Course Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="font-mono font-semibold text-slate-900">{course.code}</span>
                <span>·</span>
                <span>{course.duration}</span>
                <span>·</span>
                <span>{course.level}</span>
                <span>·</span>
                <span className="text-amber-700 font-medium">UGC Four-Quadrant Compliant</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                {course.title}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                Explore the jurisprudence of human enhancement, brain-computer interfaces, remote work digital burnout, and cognitive sovereignty. Build practical drafting skills for futuristic charters and stress-test synthetic constitutions against corporate capture.
              </p>

              {/* Course Outcomes Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {course.courseOutcomes.slice(0, 4).map((co) => (
                  <div key={co.id} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>{co.id}:</strong> {co.title}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={onEnterCourse}
                  className="rounded-xl bg-[#8C2528] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#A83236] transition-colors shadow-sm"
                >
                  Enter Course Workspace
                </button>
                <button
                  onClick={onNavigateAbout}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  View Academic Faculty
                </button>
              </div>
            </div>

            {/* Course Visual Stamp */}
            <div className="lg:col-span-4 rounded-xl border border-amber-200/80 bg-gradient-to-br from-amber-50 to-red-50 p-6 text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm border border-amber-300">
                <SrcaaLogo size={36} showTagline={false} />
              </div>
              <div>
                <div className="font-display text-base font-bold text-slate-900">
                  Certified Future Rights Specialist
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Conferred upon completion of Units I–VI and ratification of the 2030 Bill of Rights.
                </div>
              </div>
              <div className="border-t border-amber-200/60 pt-3 text-[11px] font-mono text-slate-600">
                OFFICIAL SRCAA CREDENTIAL
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Four Quadrants Pedagogical Framework */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-[#8C2528]">
            Evidence-Based Pedagogy
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
            The Four Quadrants of Learning
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Aligned with national and international MOOC standards for maximum retention and verifiable skill mastery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Q1 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3 shadow-xs hover:border-amber-300 transition-colors">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
              <Video className="h-5 w-5" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wide text-amber-800">
              Quadrant I
            </div>
            <h3 className="font-display text-base font-bold text-slate-900">
              Masterclass Video
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Recorded high-impact lectures with synchronized transcripts, timestamped chapters, playback speed controls, and low-bandwidth fallback modes.
            </p>
          </div>

          {/* Q2 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3 shadow-xs hover:border-[#8C2528]/40 transition-colors">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-[#8C2528]">
              <BookOpen className="h-5 w-5" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wide text-[#8C2528]">
              Quadrant II
            </div>
            <h3 className="font-display text-base font-bold text-slate-900">
              TILT Text & Case Studies
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Curated e-content structured with Transparency in Learning and Teaching (Purpose, Task, Criteria), statutory excerpts, and personal notes scratchpad.
            </p>
          </div>

          {/* Q3 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3 shadow-xs hover:border-blue-300 transition-colors">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-800">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wide text-blue-800">
              Quadrant III
            </div>
            <h3 className="font-display text-base font-bold text-slate-900">
              Moderated Social Debates
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Weekly provocations with peer deliberation, upvoting, community perspective-sharing, and verified faculty endorsements.
            </p>
          </div>

          {/* Q4 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3 shadow-xs hover:border-emerald-300 transition-colors">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
              <Award className="h-5 w-5" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wide text-emerald-800">
              Quadrant IV
            </div>
            <h3 className="font-display text-base font-bold text-slate-900">
              Assessment Workbench
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Scenario-based automated MCQs, statutory drafting workbench with rubric scoring, and the Meadows Systems Stress-Tester capstone.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Academic Catalog */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#8C2528] mb-1">
              Expanding Frontiers
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
              SRCAA Research Catalog
            </h2>
          </div>
          <div className="text-xs text-slate-500">
            Courses developing under the 2026–2030 Academic Roadmap
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingCourses.map((c, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>{c.code}</span>
                  <span className="text-amber-700 font-semibold">{c.status}</span>
                </div>
                <h4 className="font-display text-base font-bold text-slate-900 leading-snug">
                  {c.title}
                </h4>
                <div className="text-xs text-slate-400 font-medium">
                  {c.level} · {c.duration}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {c.focus}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">Prerequisite: SRCAA-PHC-2030</span>
                <span className="text-[#8C2528] font-semibold">Pre-Register</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="rounded-3xl border border-red-200 bg-gradient-to-r from-red-50 via-white to-amber-50 p-8 sm:p-12 text-center space-y-4 shadow-sm">
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
          Ready to Master the Future of Human Rights?
        </h3>
        <p className="mx-auto max-w-xl text-xs sm:text-sm text-slate-600 leading-relaxed">
          Enroll in The Post-Human Charter MOOC today. Engage with simulated corporate pressure-tests, draft real protective policy clauses, and earn your verified credential.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={onEnterCourse}
            className="flex items-center gap-2 rounded-xl bg-[#8C2528] px-6 py-3 text-xs font-semibold text-white hover:bg-[#A83236] transition-colors shadow-md"
          >
            <span>Launch Course Sandbox</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
