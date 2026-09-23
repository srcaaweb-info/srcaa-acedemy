import React from 'react';
import { Award, CheckCircle, Download, Printer, Shield, X, ExternalLink } from 'lucide-react';
import { LearnerProgress, Course } from '../types/course';
import { SrcaaLogo } from './SrcaaLogo';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: LearnerProgress;
  course: Course;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  progress,
  course,
}) => {
  if (!isOpen) return null;

  const isEligible = progress.isCertificateEligible;
  const certId = progress.certificateId || 'SRCAA-PHC-2030-8842-PENDING';
  const issueDate = progress.certificateIssuedAt
    ? new Date(progress.certificateIssuedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="w-full max-w-4xl rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden my-8">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <Award className="h-4 w-4 text-[#8C2528]" />
            <span>SRCAA Official Credential Verification Registry</span>
          </div>
          <div className="flex items-center gap-3">
            {isEligible && (
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-colors shadow-2xs"
              >
                <Printer className="h-3.5 w-3.5 text-[#8C2528]" />
                <span>Print / Save PDF</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Certificate Canvas */}
        <div className="p-6 sm:p-10 bg-slate-50">
          {!isEligible ? (
            /* Incomplete Notice */
            <div className="text-center py-12 space-y-4 bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-50 border border-red-200 text-[#8C2528]">
                <Shield className="h-8 w-8" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Credential Incomplete</h2>
              <p className="max-w-md mx-auto text-xs text-slate-600 leading-relaxed">
                The "Certified Future Rights Specialist" credential requires successful completion of all 6 Units and ratification of the 2030 Bill of Rights Capstone.
              </p>
              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="rounded-xl bg-[#8C2528] px-5 py-2 text-xs font-semibold text-white hover:bg-[#A83236] transition-colors shadow-sm"
                >
                  Return to Syllabus
                </button>
              </div>
            </div>
          ) : (
            /* Official Accredited Diploma Layout */
            <div className="relative rounded-2xl border-4 border-double border-amber-400/80 bg-white p-8 sm:p-12 text-center space-y-6 shadow-xl">
              {/* Corner Watermarks */}
              <div className="flex items-center justify-between text-[11px] font-mono text-amber-800 font-semibold border-b border-slate-200 pb-4">
                <span>EST. 2026 · SRCAA ACADEMY</span>
                <span>CREDENTIAL ID: {certId}</span>
              </div>

              {/* Institution Emblem Header */}
              <div className="space-y-2 flex flex-col items-center">
                <SrcaaLogo size={52} showTagline={false} />
                <p className="text-xs uppercase tracking-widest text-[#8C2528] font-black mt-2">
                  SRCAA ACADEMY
                </p>
                <p className="text-[11px] tracking-wide text-amber-800 font-semibold">
                  Learn. Research. Innovate. Grow.
                </p>
                <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 pt-1">
                  Certified Future Rights Specialist
                </h1>
                <p className="text-xs text-slate-500 font-medium">
                  Conferred under the authority of the Post-Human Jurisprudence Council
                </p>
              </div>

              {/* Recipient */}
              <div className="py-2 space-y-1">
                <span className="text-xs text-slate-500 italic">This certifies that</span>
                <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#8C2528] border-b-2 border-amber-300 max-w-sm mx-auto pb-1">
                  {progress.learnerName}
                </div>
              </div>

              {/* Citation */}
              <p className="text-xs text-slate-600 max-w-xl mx-auto leading-relaxed">
                has demonstrated validated mastery in comparative neuro-rights, cognitive liberty boundaries, self-sovereign digital twin architectures, and synthesised the 2030 Bill of Rights through Donella Meadows systems thinking in:
              </p>

              <div className="font-display text-base font-bold text-slate-900 max-w-lg mx-auto">
                {course.title}
              </div>

              {/* Competency Badges List */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-w-xl mx-auto pt-2 text-[11px] text-slate-700">
                {course.courseOutcomes.map((co) => (
                  <div key={co.id} className="rounded-lg border border-slate-200 bg-slate-50 p-2 flex items-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate font-medium">{co.id}: {co.title.split('&')[0]}</span>
                  </div>
                ))}
              </div>

              {/* Signatures & Institutional Seal */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end pt-6 border-t border-slate-200 text-xs">
                {/* Signatory 1 */}
                <div className="space-y-1">
                  <div className="font-serif italic text-base text-slate-800">Dr. Evelyn Vasquez</div>
                  <div className="h-px w-36 mx-auto bg-slate-300" />
                  <div className="text-[11px] text-slate-500">Chair of Neuro-Jurisprudence, SRCAA</div>
                </div>

                {/* Center Badge Seal */}
                <div className="flex flex-col items-center">
                  <div className="h-20 w-20 rounded-full border-2 border-amber-400 p-1 bg-white flex items-center justify-center shadow-md">
                    <img
                      src="/srcaa_logo.svg"
                      alt="SRCAA Academy Official Seal"
                      className="h-16 w-16 object-contain"
                    />
                  </div>
                  <div className="text-[10px] font-mono text-[#8C2528] mt-1 font-bold">VERIFIED REGISTRY</div>
                </div>

                {/* Signatory 2 */}
                <div className="space-y-1">
                  <div className="font-serif italic text-base text-slate-800">Prof. Tariq Al-Mansoor</div>
                  <div className="h-px w-36 mx-auto bg-slate-300" />
                  <div className="text-[11px] text-slate-500">Dean of Post-Human Studies</div>
                </div>
              </div>

              {/* Footer Stamp */}
              <div className="text-[11px] font-mono text-slate-400 pt-2">
                ISSUED ON {issueDate.toUpperCase()} · 100% WCAG 2.1 VERIFIED · SRCAA ACADEMY
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
