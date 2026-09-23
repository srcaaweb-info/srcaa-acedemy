import React, { useState } from 'react';
import { Unit, LearnerProgress, MCQQuestion, PolicyWorkbenchTemplate, CapstoneScenario } from '../types/course';
import { CheckCircle2, XCircle, AlertCircle, Sparkles, Send, FileCheck, Shield, Award, RotateCcw } from 'lucide-react';

interface QuadrantAssessmentProps {
  unit: Unit;
  progress: LearnerProgress | null;
  onRefreshProgress: () => void;
}

export const QuadrantAssessment: React.FC<QuadrantAssessmentProps> = ({
  unit,
  progress,
  onRefreshProgress,
}) => {
  const assessmentData = unit.quadrants.assessment;
  const unitId = unit.id;

  // ----------------------------------------------------
  // SUB-COMPONENT: AUTOMATED MCQ QUIZ (Units I & II)
  // ----------------------------------------------------
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(
    progress?.quizScores[unitId] ?? null
  );
  const [quizFeedback, setQuizFeedback] = useState<
    { questionId: string; selectedOptionId: string; isCorrect: boolean; legalRationale: string }[]
  >([]);
  const [isSubmittingQuiz, setIsSubmittingQuiz] = useState(false);

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmitQuiz = async () => {
    setIsSubmittingQuiz(true);
    try {
      const res = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ unitId, answers: selectedAnswers }),
      });
      const data = await res.json();
      if (data.success) {
        setQuizScore(data.score);
        setQuizFeedback(data.feedback);
        setQuizSubmitted(true);
        onRefreshProgress();
      }
    } catch (err) {
      console.error('Failed to submit quiz:', err);
    } finally {
      setIsSubmittingQuiz(false);
    }
  };

  // ----------------------------------------------------
  // SUB-COMPONENT: DRAFTED POLICY WORKBENCH (Units III, IV, V)
  // ----------------------------------------------------
  const policyTemplate = assessmentData.policyTemplate;
  const existingSubmission = progress?.policySubmissions[unitId];

  const defaultDraftText = policyTemplate?.defaultClauses
    ?.map((c) => `[${c.clauseTitle}]\n${c.recommendedText}\n// Rationale: ${c.legalRationale}`)
    .join('\n\n') || '';

  const [policyDraft, setPolicyDraft] = useState(existingSubmission?.draftContent || defaultDraftText);
  const [isSubmittingPolicy, setIsSubmittingPolicy] = useState(false);
  const [policyResult, setPolicyResult] = useState<{ score: number; feedback: string } | null>(
    existingSubmission ? { score: existingSubmission.rubricScore, feedback: existingSubmission.feedback } : null
  );

  const handleSubmitPolicy = async () => {
    setIsSubmittingPolicy(true);
    try {
      const res = await fetch('/api/policy/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unitId,
          draftContent: policyDraft,
          clauses: policyTemplate?.defaultClauses || [],
        }),
      });
      const data = await res.json();
      if (data.success) {
        setPolicyResult({ score: data.score, feedback: data.submission.feedback });
        onRefreshProgress();
      }
    } catch (err) {
      console.error('Failed to submit policy:', err);
    } finally {
      setIsSubmittingPolicy(false);
    }
  };

  // ----------------------------------------------------
  // SUB-COMPONENT: CAPSTONE SYNTHESIS & STRESS TESTER (Unit VI)
  // ----------------------------------------------------
  const [capstoneArticles, setCapstoneArticles] = useState([
    {
      articleNumber: 'Article I',
      title: 'Inviolable Cognitive Liberty & Mental Integrity',
      text: 'No person shall be subjected to involuntary, covert, or coercive extraction, analysis, or storage of their neural data. Mental privacy constitutes an absolute fundamental right.',
    },
    {
      articleNumber: 'Article II',
      title: 'Self-Sovereign Identity & Digital Twin Inalienability',
      text: 'Every natural person retains sovereign ownership of their behavioural embeddings, latent weights, and digital replicas. Platforms shall guarantee zero-cost biometric and model portability.',
    },
    {
      articleNumber: 'Article III',
      title: 'Chrono-Autonomy & The Inviolable Right to Disconnect',
      text: 'Workers possess an unconditional right to digital rest outside agreed working hours. Employers are barred from penalizing non-responsiveness or utilizing predictive availability metrics.',
    },
    {
      articleNumber: 'Article IV',
      title: 'Morphological Freedom & Bodily Firmware Sovereignty',
      text: 'The choice to undergo or refuse biological, genomic, or cybernetic enhancement is non-negotiable. Implant recipients retain full cryptographic ownership and open-source repair rights over bodily firmware.',
    },
    {
      articleNumber: 'Article V',
      title: 'Genetic Equity & Universal Access to Life-Extension',
      text: 'Validated healthspan-extending biotechnologies shall be administered as Essential Public Utilities. Compensation stratification and genetic pay premiums favoring enhanced employees are outlawed.',
    },
    {
      articleNumber: 'Article VI',
      title: 'Systemic Recourse & Corporate Charter Revocation',
      text: 'Corporate entities found guilty of deploying non-consensual biometric or neural surveillance shall face automatic statutory dissolution and personal executive liability.',
    },
  ]);

  const [stressTesting, setStressTesting] = useState(false);
  const [stressResults, setStressResults] = useState<
    { scenarioId: string; scenarioName: string; resilienceScore: number; vulnerabilitiesMitigated: number; verdict: string }[] | null
  >(progress?.capstoneSubmission?.stressTestResults || null);

  const [capstoneSubmitted, setCapstoneSubmitted] = useState(Boolean(progress?.capstoneSubmission?.passed));

  const handleRunStressTest = async () => {
    setStressTesting(true);
    try {
      const res = await fetch('/api/capstone/stress-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articles: capstoneArticles }),
      });
      const data = await res.json();
      if (data.success) {
        setStressResults(data.stressTestResults);
      }
    } catch (err) {
      console.error('Failed stress test:', err);
    } finally {
      setStressTesting(false);
    }
  };

  const handleFinalizeCapstone = async () => {
    try {
      const res = await fetch('/api/capstone/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articles: capstoneArticles, stressTestResults: stressResults }),
      });
      const data = await res.json();
      if (data.success) {
        setCapstoneSubmitted(true);
        onRefreshProgress();
      }
    } catch (err) {
      console.error('Failed to submit capstone:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8C2528] mb-1">
            <span>
              Quadrant IV ·{' '}
              {assessmentData.type === 'automated_mcq'
                ? 'Automated Scenario MCQ Quiz'
                : assessmentData.type === 'drafted_policy'
                ? 'Drafted Policy Document'
                : 'Capstone Synthesis Project'}
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-slate-700 font-mono font-bold">Testing {unit.primaryOutcome.id}</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">{assessmentData.title}</h2>
        </div>

        {/* Outcome Mapping Badge */}
        <div className="flex items-center gap-2">
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs text-amber-900">
            <span className="font-bold">{unit.primaryOutcome.id}: </span>
            <span className="text-slate-700">{unit.primaryOutcome.title}</span>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* CASE 1: AUTOMATED MCQ QUIZ (Units I & II)            */}
      {/* ---------------------------------------------------- */}
      {assessmentData.type === 'automated_mcq' && assessmentData.mcqQuestions && (
        <div className="space-y-6">
          {quizScore !== null && (
            <div
              className={`rounded-xl border p-5 flex items-center justify-between shadow-2xs ${
                quizScore >= 75
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                  : 'border-amber-200 bg-amber-50 text-amber-900'
              }`}
            >
              <div className="flex items-center gap-3">
                {quizScore >= 75 ? (
                  <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                ) : (
                  <AlertCircle className="h-6 w-6 text-amber-600" />
                )}
                <div>
                  <div className="font-bold text-sm">
                    {quizScore >= 75 ? 'Assessment Passed (Unit Mastered & Next Unit Unlocked!)' : 'Passing Threshold Unmet (Need 75%+)'}
                  </div>
                  <div className="text-xs text-slate-600">
                    Calculated Score: <strong>{quizScore}%</strong> (Passing Benchmark: 75%)
                  </div>
                </div>
              </div>

              {quizSubmitted && (
                <button
                  onClick={() => {
                    setQuizSubmitted(false);
                    setSelectedAnswers({});
                  }}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Retry Quiz</span>
                </button>
              )}
            </div>
          )}

          {/* Question Cards */}
          <div className="space-y-6">
            {assessmentData.mcqQuestions.map((q, qIndex) => {
              const feedback = quizFeedback.find((f) => f.questionId === q.id);

              return (
                <div
                  key={q.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-2xs"
                >
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-mono text-[#8C2528] font-bold">QUESTION 0{qIndex + 1}</span>
                    <span>Target Learning Outcome: <strong>{q.targetOutcome}</strong></span>
                  </div>

                  {/* Scenario */}
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-700 leading-relaxed">
                    <span className="font-bold text-[#8C2528] block mb-1">Factual Matrix / Scenario:</span>
                    {q.scenario}
                  </div>

                  {/* Question */}
                  <h3 className="text-sm font-bold text-slate-900">{q.question}</h3>

                  {/* Options */}
                  <div className="space-y-2.5">
                    {q.options.map((opt) => {
                      const isSelected = selectedAnswers[q.id] === opt.id;
                      let optionClasses = 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300';

                      if (quizSubmitted) {
                        if (opt.isCorrect) {
                          optionClasses = 'border-emerald-400 bg-emerald-50 text-emerald-900 font-semibold';
                        } else if (isSelected && !opt.isCorrect) {
                          optionClasses = 'border-red-300 bg-red-50 text-red-900';
                        } else {
                          optionClasses = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                        }
                      } else if (isSelected) {
                        optionClasses = 'border-[#8C2528] bg-red-50/50 text-slate-900 ring-1 ring-[#8C2528] font-medium';
                      }

                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleSelectOption(q.id, opt.id)}
                          disabled={quizSubmitted}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs leading-relaxed transition-all flex items-start gap-3 shadow-2xs ${optionClasses}`}
                        >
                          <span className="font-mono font-bold uppercase text-slate-500 shrink-0">
                            {opt.id}.
                          </span>
                          <span>{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Detailed Legal Rationale if submitted */}
                  {quizSubmitted && feedback && (
                    <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-xs space-y-1">
                      <div className="font-bold text-amber-900 flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-[#8C2528]" />
                        <span>Judicial & Jurisprudential Rationale</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{feedback.legalRationale}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!quizSubmitted && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleSubmitQuiz}
                disabled={
                  Object.keys(selectedAnswers).length < assessmentData.mcqQuestions.length ||
                  isSubmittingQuiz
                }
                className="flex items-center gap-2 rounded-xl bg-[#8C2528] px-6 py-2.5 text-xs font-semibold text-white hover:bg-[#A83236] transition-colors disabled:opacity-50 shadow-md"
              >
                <span>{isSubmittingQuiz ? 'Grading Submission...' : 'Submit Assessment for Grading'}</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* CASE 2: DRAFTED POLICY WORKBENCH (Units III, IV, V) */}
      {/* ---------------------------------------------------- */}
      {assessmentData.type === 'drafted_policy' && policyTemplate && (
        <div className="space-y-6">
          {/* Instructions & Rubric */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-[#8C2528]" />
                <span>Policy Drafting Instructions & Evaluation Rubric</span>
              </h3>
              <span className="text-xs text-slate-500">Peer-Reviewed Standard</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{policyTemplate.instructions}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              {policyTemplate.rubricCriteria.map((crit, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between font-bold text-slate-800">
                    <span>{crit.title}</span>
                    <span className="font-mono text-[#8C2528]">{crit.weight}%</span>
                  </div>
                  <p className="text-slate-500 text-[11px] leading-relaxed">{crit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Policy Text Drafting Studio */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900">Statutory Clause Workbench</span>
              <span className="font-mono text-slate-500">
                Word Count: {policyDraft.trim().split(/\s+/).filter(Boolean).length} words
              </span>
            </div>

            <textarea
              value={policyDraft}
              onChange={(e) => setPolicyDraft(e.target.value)}
              rows={12}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs text-slate-900 leading-relaxed focus:border-[#8C2528] focus:bg-white focus:outline-none"
              placeholder="Draft clauses incorporating temporal boundaries, firmware ownership, or equity statement pillars..."
            />

            {policyResult && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 flex items-center justify-between text-xs text-emerald-900">
                <div>
                  <div className="font-bold text-emerald-800">
                    Policy Submission Validated · Rubric Score {policyResult.score}/100
                  </div>
                  <p className="text-slate-700 mt-0.5">{policyResult.feedback}</p>
                </div>
                <div className="font-mono font-bold text-emerald-700 text-sm">CO PASS</div>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={handleSubmitPolicy}
                disabled={isSubmittingPolicy || !policyDraft.trim()}
                className="flex items-center gap-2 rounded-xl bg-[#8C2528] px-6 py-2.5 text-xs font-semibold text-white hover:bg-[#A83236] transition-colors disabled:opacity-50 shadow-md"
              >
                <Send className="h-3.5 w-3.5" />
                <span>{isSubmittingPolicy ? 'Validating Clauses...' : 'Submit Draft for Peer Review'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* CASE 3: CAPSTONE SYNTHESIS & STRESS TESTER (Unit VI) */}
      {/* ---------------------------------------------------- */}
      {assessmentData.type === 'capstone_synthesis' && assessmentData.capstoneScenarios && (
        <div className="space-y-6">
          {/* Capstone Briefing */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-[#8C2528]" />
                <span>The 2030 Bill of Rights · Capstone Synthesis Protocol</span>
              </span>
              <span className="text-xs font-mono text-amber-800 font-semibold">Donella Meadows Framework</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Synthesize the legal, neuro-rights, biometric, and equity frameworks formulated in Units I through V into an authoritative 6-Article Charter. Once drafted, execute real-time automated stress-tests against the twin corporate pressure scenarios: Synapse-Corp and Aether-X.
            </p>
          </div>

          {/* Scenario Dossiers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assessmentData.capstoneScenarios.map((scen) => (
              <div
                key={scen.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900">{scen.name}</span>
                  <span className="font-mono text-[10px] text-amber-900 border border-amber-200 bg-amber-100 px-1.5 py-0.5 rounded font-semibold">
                    CORPORATE THREAT
                  </span>
                </div>
                <div className="text-xs text-[#8C2528] font-semibold">{scen.tagline}</div>
                <p className="text-xs text-slate-600 leading-relaxed">{scen.corporateContext}</p>
                <div className="border-t border-slate-100 pt-2 space-y-1 text-[11px] text-slate-500">
                  <span className="font-bold text-slate-700">Pressure Test Infringements:</span>
                  <ul className="list-disc list-inside space-y-1 pl-1">
                    {scen.pressureTestEvents.map((ev, i) => (
                      <li key={i} className="text-slate-600 truncate">
                        <span className="text-slate-800">{ev.eventTitle}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Article Drafter */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-900">
                Charter Drafter: 6 Fundamental Articles
              </span>
              <span className="text-xs text-slate-500 font-mono">Synthesising CO1 to CO5</span>
            </div>

            <div className="space-y-3">
              {capstoneArticles.map((art, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-[#8C2528]">
                    <span>{art.articleNumber}: {art.title}</span>
                  </div>
                  <textarea
                    rows={2}
                    value={art.text}
                    onChange={(e) => {
                      const updated = [...capstoneArticles];
                      updated[idx].text = e.target.value;
                      setCapstoneArticles(updated);
                    }}
                    className="w-full bg-white rounded-lg p-2 text-xs text-slate-800 focus:outline-none border border-slate-200 focus:border-[#8C2528] leading-relaxed"
                  />
                </div>
              ))}
            </div>

            {/* Stress Test Action */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <div className="text-xs text-slate-500">
                Stress-test simulated legal attacks before final credential sign-off.
              </div>
              <button
                onClick={handleRunStressTest}
                disabled={stressTesting}
                className="flex items-center gap-2 rounded-xl bg-amber-500/10 border border-amber-500/30 px-4 py-2 text-xs font-bold text-amber-900 hover:bg-amber-500/20 transition-colors disabled:opacity-50"
              >
                <Sparkles className="h-3.5 w-3.5 text-[#8C2528]" />
                <span>{stressTesting ? 'Simulating Corporate Attacks...' : 'Run Meadows Stress-Test'}</span>
              </button>
            </div>
          </div>

          {/* Stress-Test Results */}
          {stressResults && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-sm font-bold text-slate-900">
                  Stress-Test Resilience Outcomes
                </span>
                <span className="text-xs text-emerald-700 font-bold">All Scenarios Passed</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stressResults.map((res, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{res.scenarioName}</span>
                      <span className="font-mono text-[#8C2528] font-bold">{res.resilienceScore}% RESILIENT</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#8C2528] to-emerald-500 transition-all duration-500"
                        style={{ width: `${res.resilienceScore}%` }}
                      />
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed pt-1">{res.verdict}</p>
                  </div>
                ))}
              </div>

              {!capstoneSubmitted ? (
                <div className="flex justify-end pt-3">
                  <button
                    onClick={handleFinalizeCapstone}
                    className="flex items-center gap-2 rounded-xl bg-[#8C2528] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#A83236] transition-colors shadow-md"
                  >
                    <Award className="h-4 w-4" />
                    <span>Ratify 2030 Bill of Rights & Claim Credential</span>
                  </button>
                </div>
              ) : (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs text-emerald-900 flex items-center justify-between">
                  <span>Capstone Ratified & Passed! "Certified Future Rights Specialist" unlocked.</span>
                  <span className="font-mono font-bold text-emerald-700">CO6 COMPLETE</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
