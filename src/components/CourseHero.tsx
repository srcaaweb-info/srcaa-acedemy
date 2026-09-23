import React from 'react';
import { Course, LearnerProgress } from '../types/course';
import { Clock, Users, GraduationCap, Target, Layers, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface CourseHeroProps {
  course: Course;
  progress: LearnerProgress | null;
  onStartUnit: (unitId: number) => void;
}

export const CourseHero: React.FC<CourseHeroProps> = ({
  course,
  progress,
  onStartUnit,
}) => {
  const currentUnitId = progress?.currentUnitId || 1;
  const percent = progress?.overallProgressPercent || 0;

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-white pt-8 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Course Metadata & Title */}
          <div className="lg:col-span-7 space-y-4">
            {/* Zero-Pill Unboxed Metadata with SRCAA Motto */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
              <span className="text-[#8C2528] font-bold tracking-wide">SRCAA Academy</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-amber-800 font-medium">Learn. Research. Innovate. Grow.</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="font-mono text-slate-700">{course.code}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-emerald-700">Target 45% Completion (TILT)</span>
            </div>

            <h1 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              The Post-Human Charter
            </h1>
            <p className="text-base text-slate-600 font-normal leading-relaxed">
              Rights & Freedom in the Age of AI, Neurotechnology, and Bio-Enhancement. A certified 6-week professional development MOOC from SRCAA Academy.
            </p>

            {/* Key Delivery & Level Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-700">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                  <Clock className="h-3.5 w-3.5 text-[#8C2528]" />
                  <span>Duration</span>
                </div>
                <div className="font-semibold text-slate-900">6 Weeks (~24 Hours)</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                  <GraduationCap className="h-3.5 w-3.5 text-[#8C2528]" />
                  <span>Level</span>
                </div>
                <div className="font-semibold text-slate-900">{course.level}</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 col-span-2 sm:col-span-1">
                <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                  <Layers className="h-3.5 w-3.5 text-[#8C2528]" />
                  <span>Delivery Model</span>
                </div>
                <div className="font-semibold text-slate-900">Four Quadrants</div>
              </div>
            </div>

            {/* Target Learners text */}
            <div className="text-xs text-slate-500">
              <span className="text-slate-800 font-semibold">Curated for: </span>
              {course.targetLearners.join(' · ')}
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onStartUnit(currentUnitId)}
                className="flex items-center gap-2 rounded-xl bg-[#8C2528] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#A83236] shadow-sm"
              >
                <span>Resume {currentUnitId === 1 ? 'Unit I' : `Unit ${currentUnitId}`}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 pl-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>WCAG 2.1 Compliant · TILT Structured Assessments</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset with Fallback */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <img
                src="/src/assets/images/hero_sraa_posthuman_1790176131697.jpg"
                alt="SRCAA Academy - The Post-Human Charter scholarly study and neural projection"
                referrerPolicy="no-referrer"
                className="h-60 sm:h-64 w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="p-4 space-y-2 bg-slate-50 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs text-slate-700">
                  <span className="font-medium">Active Cohort Velocity</span>
                  <span className="font-mono text-[#8C2528] font-bold">46.2% Completion Pace</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full bg-gradient-to-r from-[#8C2528] to-amber-500"
                    style={{ width: `${Math.max(percent, 24)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>MOOC Industry Avg: 15%</span>
                  <span className="text-amber-800 font-semibold">SRCAA TILT Target: 45%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
