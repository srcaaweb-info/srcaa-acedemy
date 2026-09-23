import React from 'react';
import { LearnerProgress, CohortAnalytics, CourseOutcome } from '../types/course';
import { CheckCircle2, Clock, Award, Target, TrendingUp, BarChart2, ShieldCheck, RefreshCw } from 'lucide-react';

interface ProgressDashboardProps {
  progress: LearnerProgress;
  outcomes: CourseOutcome[];
  analytics: CohortAnalytics | null;
  onResetProgress: (preset: 'fresh' | 'midway' | 'graduate') => Promise<void>;
  onClaimCredential: () => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  progress,
  outcomes,
  analytics,
  onResetProgress,
  onClaimCredential,
}) => {
  const percent = progress.overallProgressPercent;
  const hoursSpent = (progress.timeSpentMinutes / 60).toFixed(1);

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8C2528] mb-1">
            <span>Real-Time LMS Telemetry Engine</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Candidate: <strong>{progress.learnerName}</strong></span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
            Learner Progress & Outcome Mastery
          </h1>
        </div>

        {/* Evaluation Preset Simulator Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 hidden sm:inline font-medium">Cohort State:</span>
          <div className="flex items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-xl">
            <button
              onClick={() => onResetProgress('fresh')}
              className="px-2.5 py-1 text-xs font-medium rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white transition-colors"
            >
              Fresh
            </button>
            <button
              onClick={() => onResetProgress('midway')}
              className="px-2.5 py-1 text-xs font-medium rounded-lg text-[#8C2528] bg-white shadow-xs font-semibold transition-colors"
            >
              Midway
            </button>
            <button
              onClick={() => onResetProgress('graduate')}
              className="px-2.5 py-1 text-xs font-medium rounded-lg text-emerald-700 hover:bg-white transition-colors"
            >
              Graduate
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Overall Completion */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Overall Progress</span>
            <span className="font-mono text-[#8C2528] font-bold">{percent}%</span>
          </div>
          <div className="text-3xl font-extrabold font-mono text-slate-900">{percent}%</div>
          <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#8C2528] to-amber-500 transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-500">
            {Object.keys(progress.completedQuadrants).filter((k) => progress.completedQuadrants[k]).length} of 24 Quadrants Finished
          </div>
        </div>

        {/* Time Invested */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Time Invested</span>
            <Clock className="h-4 w-4 text-[#8C2528]" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-slate-900">{hoursSpent} hrs</div>
          <div className="text-[11px] text-slate-500">
            Total target: ~24 hours across 6 Units
          </div>
        </div>

        {/* Cohort Benchmark vs 45% Target */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Completion Velocity</span>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-emerald-700">
            {analytics?.completionRateCurrent ?? 46.2}%
          </div>
          <div className="text-[11px] text-slate-500">
            SRCAA Target: <span className="text-amber-800 font-bold">45%</span> (Industry Avg: 15%)
          </div>
        </div>

        {/* Credential Status */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Competency Badge</span>
              <Award className="h-4 w-4 text-[#8C2528]" />
            </div>
            <div className="text-sm font-bold text-slate-900 mt-1">
              {progress.isCertificateEligible ? 'Certified Future Rights' : 'In Progress'}
            </div>
          </div>
          {progress.isCertificateEligible ? (
            <button
              onClick={onClaimCredential}
              className="w-full rounded-xl bg-[#8C2528] py-2 text-xs font-bold text-white hover:bg-[#A83236] transition-colors shadow-sm"
            >
              View Credential
            </button>
          ) : (
            <div className="text-[11px] text-slate-400">Unlock via Capstone completion</div>
          )}
        </div>
      </div>

      {/* Course Outcomes (CO1 to CO6) Mastery Matrix */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Course Outcomes (COs) Competency Breakdown
            </h2>
            <p className="text-xs text-slate-500">
              Assessed across all six units through the Four Quadrants model
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">SRCAA Academic Standards Board</span>
        </div>

        <div className="space-y-4 pt-2">
          {outcomes.map((co) => {
            const score = progress.outcomeMastery[co.id] ?? 0;
            const isMastered = score >= 75;

            return (
              <div
                key={co.id}
                className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#8C2528]">{co.id}</span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span className="font-bold text-slate-900">{co.title}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500 text-[11px]">Tested via: {co.assessmentMethod}</span>
                    <span className={`font-mono font-bold ${isMastered ? 'text-emerald-700' : 'text-slate-600'}`}>
                      {score}%
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{co.description}</p>

                <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      isMastered ? 'bg-emerald-500' : 'bg-gradient-to-r from-[#8C2528] to-amber-500'
                    }`}
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Four Quadrants Engagement Distribution */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BarChart2 className="h-4 w-4 text-[#8C2528]" />
              <span>Cohort Quadrant Engagement</span>
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-slate-700 mb-1">
                  <span>Quadrant I: Masterclass Video Modules</span>
                  <span className="font-mono font-bold text-[#8C2528]">{analytics.quadrantCompletionDistribution.video}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#8C2528]" style={{ width: `${analytics.quadrantCompletionDistribution.video}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-slate-700 mb-1">
                  <span>Quadrant II: TILT-ed E-Content Case Studies</span>
                  <span className="font-mono font-bold text-[#8C2528]">{analytics.quadrantCompletionDistribution.text}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#8C2528]" style={{ width: `${analytics.quadrantCompletionDistribution.text}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-slate-700 mb-1">
                  <span>Quadrant III: Moderated Social Debates</span>
                  <span className="font-mono font-bold text-[#8C2528]">{analytics.quadrantCompletionDistribution.discussion}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#8C2528]" style={{ width: `${analytics.quadrantCompletionDistribution.discussion}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-slate-700 mb-1">
                  <span>Quadrant IV: Assessments & Capstone</span>
                  <span className="font-mono font-bold text-[#8C2528]">{analytics.quadrantCompletionDistribution.assessment}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500" style={{ width: `${analytics.quadrantCompletionDistribution.assessment}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Pedagogical Assurance & Accessibility</span>
            </h3>
            <div className="space-y-2.5 text-xs text-slate-600 leading-relaxed">
              <div className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>100% WCAG 2.1 Compliant:</strong> Captions, live synchronized transcripts, screen-reader semantic tokens, and high contrast options.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Low-Bandwidth Option:</strong> Seamlessly switch video streaming to lightweight textual lectures.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>TILT Transparent Design:</strong> Every case study explicitly details Purpose, Task, and Criteria to boost completion.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
