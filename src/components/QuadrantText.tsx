import React, { useState } from 'react';
import { CaseStudyTILT } from '../types/course';
import { BookOpen, CheckCircle, Scale, BookmarkCheck, HelpCircle, Save } from 'lucide-react';

interface QuadrantTextProps {
  unitId: number;
  textData: CaseStudyTILT;
  isCompleted: boolean;
  onMarkCompleted: () => void;
}

export const QuadrantText: React.FC<QuadrantTextProps> = ({
  unitId,
  textData,
  isCompleted,
  onMarkCompleted,
}) => {
  const [scratchNotes, setScratchNotes] = useState<string>(() => {
    return localStorage.getItem(`srcaa-notes-unit-${unitId}`) || '';
  });
  const [notesSaved, setNotesSaved] = useState(false);

  const handleSaveNotes = () => {
    localStorage.setItem(`srcaa-notes-unit-${unitId}`, scratchNotes);
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8C2528] mb-1">
            <span>Quadrant II · TILT-ed E-Content & Legal Whitepaper</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-slate-500">Scholarly Jurisprudence</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">{textData.title}</h2>
        </div>

        <div className="flex items-center gap-2">
          {isCompleted ? (
            <div className="flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
              <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
              <span>Reading Completed</span>
            </div>
          ) : (
            <button
              onClick={onMarkCompleted}
              className="flex items-center gap-1.5 rounded-lg border border-[#8C2528]/30 bg-red-50 px-3 py-1.5 text-xs font-semibold text-[#8C2528] hover:bg-red-100 transition-colors shadow-xs"
            >
              <CheckCircle className="h-3.5 w-3.5" />
              <span>Mark Reading as Done</span>
            </button>
          )}
        </div>
      </div>

      {/* TILT Pedagogical Foundation (Purpose · Task · Criteria) */}
      <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
            TILT Pedagogical Framework (Transparency in Learning and Teaching)
          </span>
          <span className="text-[11px] text-slate-500 font-medium">Standardized SRCAA Syllabus Design</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1.5 shadow-2xs">
            <span className="font-bold text-[#8C2528]">1. Purpose</span>
            <p className="text-slate-600 leading-relaxed">{textData.purpose}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1.5 shadow-2xs">
            <span className="font-bold text-[#8C2528]">2. Task</span>
            <p className="text-slate-600 leading-relaxed">{textData.task}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1.5 shadow-2xs">
            <span className="font-bold text-[#8C2528]">3. Criteria</span>
            <p className="text-slate-600 leading-relaxed">{textData.criteria}</p>
          </div>
        </div>
      </div>

      {/* Comparative Statutory Frameworks Matrix */}
      {textData.statutoryFrameworks.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <Scale className="h-4 w-4 text-[#8C2528]" />
            <span>Comparative Statutory Instruments</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {textData.statutoryFrameworks.map((stat, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 bg-white p-4 space-y-2 text-xs shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{stat.name}</span>
                </div>
                <div className="text-[11px] text-amber-800 font-semibold font-mono">{stat.jurisdiction}</div>
                <p className="text-slate-600 leading-relaxed border-t border-slate-100 pt-2 font-mono text-[11px]">
                  {stat.provisions}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Whitepaper Content Sections */}
      <div className="space-y-6">
        {textData.contentSections.map((sec, idx) => (
          <article
            key={idx}
            className="rounded-xl border border-slate-200 bg-white p-6 space-y-3 shadow-2xs"
          >
            <h3 className="font-display text-lg font-bold text-slate-900">
              {sec.heading}
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">{sec.body}</p>

            {sec.quote && (
              <blockquote className="border-l-3 border-[#8C2528] pl-4 py-2 italic text-[#8C2528] text-xs bg-red-50/70 rounded-r-lg font-medium">
                {sec.quote}
              </blockquote>
            )}
          </article>
        ))}
      </div>

      {/* Reflective Questions & Interactive Legal Scratchpad */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 rounded-xl border border-slate-200 bg-white p-5 space-y-3 shadow-2xs">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <HelpCircle className="h-4 w-4 text-[#8C2528]" />
            <span>Reflective Analysis Prompts</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-600 list-disc list-inside leading-relaxed">
            {textData.reflectiveQuestions.map((q, idx) => (
              <li key={idx}>
                <span className="text-slate-700">{q}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal Scratchpad */}
        <div className="lg:col-span-6 rounded-xl border border-slate-200 bg-white p-5 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between text-sm font-bold text-slate-900">
            <span>Constitutional Scratchpad</span>
            <button
              onClick={handleSaveNotes}
              className="flex items-center gap-1 text-xs text-[#8C2528] hover:underline"
            >
              <Save className="h-3.5 w-3.5" />
              <span>{notesSaved ? 'Saved to Session' : 'Save Notes'}</span>
            </button>
          </div>
          <textarea
            value={scratchNotes}
            onChange={(e) => setScratchNotes(e.target.value)}
            placeholder="Record your legal observations and draft statutory counter-clauses here..."
            className="w-full h-24 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-800 placeholder-slate-400 focus:border-[#8C2528] focus:bg-white focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};
