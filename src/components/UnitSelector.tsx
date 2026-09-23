import React from 'react';
import { Unit, LearnerProgress } from '../types/course';
import { CheckCircle2, Circle, Clock, Sparkles, Lock, Unlock } from 'lucide-react';

interface UnitSelectorProps {
  units: Unit[];
  selectedUnitId: number;
  onSelectUnit: (unitId: number) => void;
  progress: LearnerProgress | null;
  unlockedUnitIds: number[];
  onLockedUnitClick?: (unit: Unit) => void;
  instructorBypass: boolean;
  onToggleInstructorBypass: () => void;
}

export const UnitSelector: React.FC<UnitSelectorProps> = ({
  units,
  selectedUnitId,
  onSelectUnit,
  progress,
  unlockedUnitIds,
  onLockedUnitClick,
  instructorBypass,
  onToggleInstructorBypass,
}) => {
  return (
    <div className="border-b border-slate-200 bg-slate-50/60 py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Syllabus Units & Modules</h2>
            <p className="text-xs text-slate-500">
              Sequential Unit Mastery: Complete preceding unit quiz (75%+ score) to unlock subsequent units.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onToggleInstructorBypass}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors border ${
                instructorBypass
                  ? 'bg-amber-100 border-amber-300 text-amber-900'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
              title="Toggle evaluator bypass to inspect all units freely"
            >
              {instructorBypass ? <Unlock className="h-3 w-3 text-amber-700" /> : <Lock className="h-3 w-3 text-slate-400" />}
              <span>{instructorBypass ? 'Bypass Active: All Unlocked' : 'Instructor Bypass: Unlock All'}</span>
            </button>

            <div className="text-xs text-slate-500 font-mono">
              {progress?.completedUnits.length ?? 0} of {units.length} Units Completed
            </div>
          </div>
        </div>

        {/* Scrollable Unit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {units.map((unit) => {
            const isSelected = unit.id === selectedUnitId;
            const isUnitComplete = progress?.completedUnits.includes(unit.id) ?? false;
            const isUnlocked = instructorBypass || unlockedUnitIds.includes(unit.id);

            // Quadrant completion count for this unit
            const qVideo = progress?.completedQuadrants[`${unit.id}-video`];
            const qText = progress?.completedQuadrants[`${unit.id}-text`];
            const qDisc = progress?.completedQuadrants[`${unit.id}-discussion`];
            const qAss = progress?.completedQuadrants[`${unit.id}-assessment`];
            const completedCount = [qVideo, qText, qDisc, qAss].filter(Boolean).length;

            return (
              <button
                key={unit.id}
                onClick={() => {
                  if (isUnlocked) {
                    onSelectUnit(unit.id);
                  } else if (onLockedUnitClick) {
                    onLockedUnitClick(unit);
                  }
                }}
                className={`relative flex flex-col justify-between rounded-xl border p-4 text-left transition-all ${
                  !isUnlocked
                    ? 'border-slate-200 bg-slate-100/70 text-slate-400 opacity-75 cursor-not-allowed'
                    : isSelected
                    ? 'border-[#8C2528] bg-white shadow-md ring-1 ring-[#8C2528]'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2 text-xs font-semibold">
                      <span className={isSelected ? 'text-[#8C2528]' : 'text-slate-500'}>
                        {unit.unitNumberRoman}
                      </span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="text-slate-500">{unit.durationHours} hrs</span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="text-amber-800 font-bold">{unit.primaryOutcome.id}</span>
                    </div>

                    {!isUnlocked ? (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-200/80 px-1.5 py-0.5 rounded">
                        <Lock className="h-3 w-3 text-slate-500" />
                        <span>Locked</span>
                      </span>
                    ) : isUnitComplete ? (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Completed</span>
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono text-slate-500">
                        {completedCount}/4 Qs
                      </span>
                    )}
                  </div>

                  <h3 className={`text-sm font-semibold leading-snug line-clamp-2 ${
                    !isUnlocked ? 'text-slate-500' : isSelected ? 'text-slate-900 font-bold' : 'text-slate-800'
                  }`}>
                    {unit.title}
                  </h3>
                </div>

                {/* Quadrants Progress Dots or Lock Requirement */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  {isUnlocked ? (
                    <>
                      <div className="flex items-center gap-1.5">
                        <span className={`inline-block h-2 w-2 rounded-full ${qVideo ? 'bg-[#8C2528]' : 'bg-slate-200'}`} title="Quadrant 1: Video" />
                        <span className={`inline-block h-2 w-2 rounded-full ${qText ? 'bg-[#8C2528]' : 'bg-slate-200'}`} title="Quadrant 2: Text" />
                        <span className={`inline-block h-2 w-2 rounded-full ${qDisc ? 'bg-[#8C2528]' : 'bg-slate-200'}`} title="Quadrant 3: Discussion" />
                        <span className={`inline-block h-2 w-2 rounded-full ${qAss ? 'bg-amber-500' : 'bg-slate-200'}`} title="Quadrant 4: Assessment" />
                      </div>
                      <span className="text-slate-500 truncate max-w-[150px]">
                        {unit.quadrants.assessment.title.replace('Assessment: ', '').split(':')[0]}
                      </span>
                    </>
                  ) : (
                    <span className="text-[11px] text-amber-900/80 font-medium">
                      Requires passing Unit {unit.id - 1} Assessment
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
