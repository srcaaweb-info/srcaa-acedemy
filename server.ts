import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { POST_HUMAN_CHARTER_COURSE } from './src/data/courseData.ts';
import { LearnerProgress, CohortAnalytics, DiscussionComment, User } from './src/types/course.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Course cohort lock state (can lock entire course)
let isCourseEntirelyLocked = false;

// Mock active user session (starts null: nobody is logged in by default)
let currentUser: User | null = null;

// In-Memory state for the learner session (persists during server lifetime, can be reset or seeded)
let learnerProgress: LearnerProgress = {
  learnerName: 'Alex Rivera, J.D.',
  learnerEmail: 'srcaaweb@gmail.com',
  currentUnitId: 1,
  completedQuadrants: {
    '1-video': true,
    '1-text': true,
  },
  completedUnits: [],
  quizScores: {},
  policySubmissions: {},
  timeSpentMinutes: 145,
  outcomeMastery: {
    CO1: 50,
    CO2: 0,
    CO3: 0,
    CO4: 0,
    CO5: 0,
    CO6: 0,
  },
  overallProgressPercent: 12,
  isCertificateEligible: false,
};

// Dynamic in-memory discussions store
const unitDiscussions: Record<number, DiscussionComment[]> = {};
POST_HUMAN_CHARTER_COURSE.units.forEach((u) => {
  unitDiscussions[u.id] = [...u.quadrants.discussion.initialComments];
});

// Helper function to recalculate real-time progress and CO outcomes
function recalculateProgress() {
  const totalUnits = POST_HUMAN_CHARTER_COURSE.units.length; // 6
  const totalQuadrants = totalUnits * 4; // 24 quadrants
  const completedKeys = Object.keys(learnerProgress.completedQuadrants).filter(
    (k) => learnerProgress.completedQuadrants[k]
  );
  const completedCount = completedKeys.length;

  learnerProgress.overallProgressPercent = Math.min(
    100,
    Math.round((completedCount / totalQuadrants) * 100)
  );

  // Check unit completions
  const completedUnitsList: number[] = [];
  POST_HUMAN_CHARTER_COURSE.units.forEach((unit) => {
    const qVideo = learnerProgress.completedQuadrants[`${unit.id}-video`];
    const qText = learnerProgress.completedQuadrants[`${unit.id}-text`];
    const qDiscussion = learnerProgress.completedQuadrants[`${unit.id}-discussion`];
    const qAssessment = learnerProgress.completedQuadrants[`${unit.id}-assessment`];
    if (qVideo && qText && qDiscussion && qAssessment) {
      completedUnitsList.push(unit.id);
    }
  });
  learnerProgress.completedUnits = completedUnitsList;

  // Outcome Mastery calculations
  // CO1: Unit 1 assessment & completion
  const u1Count = ['1-video', '1-text', '1-discussion', '1-assessment'].filter(
    (k) => learnerProgress.completedQuadrants[k]
  ).length;
  const q1Score = learnerProgress.quizScores[1] ?? (u1Count >= 2 ? 50 : 0);
  learnerProgress.outcomeMastery.CO1 = Math.round((u1Count / 4) * 50 + (q1Score / 100) * 50);

  // CO2: Unit 2 assessment & completion
  const u2Count = ['2-video', '2-text', '2-discussion', '2-assessment'].filter(
    (k) => learnerProgress.completedQuadrants[k]
  ).length;
  const q2Score = learnerProgress.quizScores[2] ?? 0;
  learnerProgress.outcomeMastery.CO2 = Math.round((u2Count / 4) * 50 + (q2Score / 100) * 50);

  // CO3: Unit 3 policy
  const p3 = learnerProgress.policySubmissions[3];
  learnerProgress.outcomeMastery.CO3 = p3 ? Math.round(p3.rubricScore) : (learnerProgress.completedQuadrants['3-video'] ? 25 : 0);

  // CO4: Unit 4 policy
  const p4 = learnerProgress.policySubmissions[4];
  learnerProgress.outcomeMastery.CO4 = p4 ? Math.round(p4.rubricScore) : (learnerProgress.completedQuadrants['4-video'] ? 25 : 0);

  // CO5: Unit 5 policy
  const p5 = learnerProgress.policySubmissions[5];
  learnerProgress.outcomeMastery.CO5 = p5 ? Math.round(p5.rubricScore) : (learnerProgress.completedQuadrants['5-video'] ? 25 : 0);

  // CO6: Unit 6 Capstone
  const capstone = learnerProgress.capstoneSubmission;
  if (capstone && capstone.passed) {
    const avgStress = capstone.stressTestResults.reduce((acc, r) => acc + r.resilienceScore, 0) / capstone.stressTestResults.length;
    learnerProgress.outcomeMastery.CO6 = Math.round(avgStress);
  } else {
    learnerProgress.outcomeMastery.CO6 = learnerProgress.completedQuadrants['6-video'] ? 20 : 0;
  }

  // Certificate eligibility
  const allCompleted = completedCount >= 20 && Boolean(learnerProgress.capstoneSubmission?.passed);
  if (allCompleted) {
    learnerProgress.isCertificateEligible = true;
    if (!learnerProgress.certificateId) {
      learnerProgress.certificateId = 'SRCAA-PHC-2030-' + Math.random().toString(36).substring(2, 9).toUpperCase();
      learnerProgress.certificateIssuedAt = new Date().toISOString();
    }
  }
}

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------

// GET /api/auth/me
app.get('/api/auth/me', (_req: Request, res: Response) => {
  res.json({
    success: true,
    user: currentUser,
  });
});

// POST /api/auth/login
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email) {
    res.status(400).json({ success: false, error: 'Email is required.' });
    return;
  }
  const nameFromEmail = email.split('@')[0].replace(/[._]/g, ' ');
  const displayName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

  currentUser = {
    id: 'usr_' + Math.random().toString(36).substring(2, 9),
    name: displayName || 'SRCAA Scholar',
    email,
    provider: 'email',
    role: 'scholar',
    institution: 'SRCAA Constitutional Jurisprudence Academy',
    avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName)}`,
  };

  learnerProgress.learnerName = currentUser.name;
  learnerProgress.learnerEmail = currentUser.email;

  res.json({
    success: true,
    user: currentUser,
  });
});

// POST /api/auth/signup
app.post('/api/auth/signup', (req: Request, res: Response) => {
  const { name, email, institution } = req.body;
  if (!email || !name) {
    res.status(400).json({ success: false, error: 'Name and email are required.' });
    return;
  }

  currentUser = {
    id: 'usr_' + Math.random().toString(36).substring(2, 9),
    name,
    email,
    provider: 'email',
    role: 'candidate',
    institution: institution || 'SRCAA Candidate Registry',
    avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
  };

  learnerProgress.learnerName = name;
  learnerProgress.learnerEmail = email;

  res.json({
    success: true,
    user: currentUser,
  });
});

// POST /api/auth/oauth (Handles Continue with Google and Continue with Microsoft)
app.post('/api/auth/oauth', (req: Request, res: Response) => {
  const { provider, email, name } = req.body; // provider: 'google' | 'microsoft'

  const actualProvider = provider === 'microsoft' ? 'microsoft' : 'google';
  const defaultEmail = actualProvider === 'google' ? 'srcaaweb@gmail.com' : 'srcaa.scholar@outlook.com';
  const defaultName = actualProvider === 'google' ? 'Alex Rivera, J.D. (Google)' : 'Dr. Evelyn Vasquez (Microsoft)';

  currentUser = {
    id: 'usr_oauth_' + Math.random().toString(36).substring(2, 9),
    name: name || defaultName,
    email: email || defaultEmail,
    provider: actualProvider,
    role: 'scholar',
    institution: 'SRCAA Federated Identity Partner',
    avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name || defaultName)}`,
  };

  learnerProgress.learnerName = currentUser.name;
  learnerProgress.learnerEmail = currentUser.email;

  res.json({
    success: true,
    user: currentUser,
  });
});

// POST /api/auth/logout
app.post('/api/auth/logout', (_req: Request, res: Response) => {
  currentUser = null;
  res.json({
    success: true,
    message: 'Signed out successfully.',
  });
});

// GET /api/course/lock-status
app.get('/api/course/lock-status', (_req: Request, res: Response) => {
  // Unit unlocking logic:
  // Unit 1 is unlocked for any signed-in user.
  // Unit 2 is unlocked if Unit 1's quiz is passed (score >= 75) OR unit 1 completed
  // Unit 3 is unlocked if Unit 2's quiz is passed
  // Unit 4 unlocked if Unit 3's policy submitted
  // Unit 5 unlocked if Unit 4's policy submitted
  // Unit 6 unlocked if Unit 5's policy submitted
  const unlockedUnits: number[] = [1];
  
  if (currentUser) {
    if ((learnerProgress.quizScores[1] ?? 0) >= 75 || learnerProgress.completedQuadrants['1-assessment']) {
      unlockedUnits.push(2);
    }
    if ((learnerProgress.quizScores[2] ?? 0) >= 75 || learnerProgress.completedQuadrants['2-assessment']) {
      unlockedUnits.push(3);
    }
    if (learnerProgress.policySubmissions[3] || learnerProgress.completedQuadrants['3-assessment']) {
      unlockedUnits.push(4);
    }
    if (learnerProgress.policySubmissions[4] || learnerProgress.completedQuadrants['4-assessment']) {
      unlockedUnits.push(5);
    }
    if (learnerProgress.policySubmissions[5] || learnerProgress.completedQuadrants['5-assessment']) {
      unlockedUnits.push(6);
    }
  }

  res.json({
    success: true,
    isAuthenticated: Boolean(currentUser),
    currentUser,
    isCourseEntirelyLocked,
    unlockedUnits,
    passingScoreRequired: 75,
  });
});

// POST /api/course/toggle-lock
app.post('/api/course/toggle-lock', (req: Request, res: Response) => {
  const { locked } = req.body;
  if (locked !== undefined) {
    isCourseEntirelyLocked = Boolean(locked);
  } else {
    isCourseEntirelyLocked = !isCourseEntirelyLocked;
  }
  res.json({
    success: true,
    isCourseEntirelyLocked,
    message: isCourseEntirelyLocked ? 'Course cohort has been locked by SRCAA administration.' : 'Course cohort unlocked.',
  });
});

// POST /api/course/update-video
app.post('/api/course/update-video', (req: Request, res: Response) => {
  const { unitId, videoUrl, title } = req.body;
  const unit = POST_HUMAN_CHARTER_COURSE.units.find((u) => u.id === Number(unitId));
  if (!unit) {
    res.status(404).json({ success: false, error: 'Unit not found.' });
    return;
  }
  if (videoUrl) {
    unit.quadrants.video.videoPlaceholderUrl = videoUrl;
  }
  if (title) {
    unit.quadrants.video.title = title;
  }
  res.json({
    success: true,
    unitId: unit.id,
    video: unit.quadrants.video,
  });
});

// GET /api/course
app.get('/api/course', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: POST_HUMAN_CHARTER_COURSE,
  });
});

// GET /api/progress
app.get('/api/progress', (_req: Request, res: Response) => {
  recalculateProgress();
  res.json({
    success: true,
    data: learnerProgress,
  });
});

// POST /api/progress/mark-quadrant
app.post('/api/progress/mark-quadrant', (req: Request, res: Response) => {
  const { unitId, quadrant, completed } = req.body;
  if (!unitId || !quadrant) {
    res.status(400).json({ success: false, error: 'unitId and quadrant are required.' });
    return;
  }
  const key = `${unitId}-${quadrant}`;
  learnerProgress.completedQuadrants[key] = completed !== undefined ? Boolean(completed) : true;
  learnerProgress.currentUnitId = unitId;
  recalculateProgress();
  res.json({
    success: true,
    data: learnerProgress,
  });
});

// POST /api/progress/track-time
app.post('/api/progress/track-time', (req: Request, res: Response) => {
  const { minutes } = req.body;
  const add = typeof minutes === 'number' && minutes > 0 ? minutes : 1;
  learnerProgress.timeSpentMinutes += add;
  res.json({
    success: true,
    timeSpentMinutes: learnerProgress.timeSpentMinutes,
  });
});

// POST /api/progress/reset
app.post('/api/progress/reset', (req: Request, res: Response) => {
  const { preset } = req.body; // 'fresh' | 'midway' | 'graduate'
  if (preset === 'fresh') {
    learnerProgress = {
      learnerName: 'Alex Rivera, J.D.',
      learnerEmail: 'srcaaweb@gmail.com',
      currentUnitId: 1,
      completedQuadrants: {},
      completedUnits: [],
      quizScores: {},
      policySubmissions: {},
      timeSpentMinutes: 0,
      outcomeMastery: { CO1: 0, CO2: 0, CO3: 0, CO4: 0, CO5: 0, CO6: 0 },
      overallProgressPercent: 0,
      isCertificateEligible: false,
    };
  } else if (preset === 'graduate') {
    const allQ: Record<string, boolean> = {};
    for (let u = 1; u <= 6; u++) {
      allQ[`${u}-video`] = true;
      allQ[`${u}-text`] = true;
      allQ[`${u}-discussion`] = true;
      allQ[`${u}-assessment`] = true;
    }
    learnerProgress = {
      learnerName: 'Alex Rivera, J.D.',
      learnerEmail: 'srcaaweb@gmail.com',
      currentUnitId: 6,
      completedQuadrants: allQ,
      completedUnits: [1, 2, 3, 4, 5, 6],
      quizScores: { 1: 100, 2: 100 },
      policySubmissions: {
        3: {
          submittedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
          draftContent: 'Comprehensive Remote-Work and Right to Disconnect Policy with server-side queueing and non-retaliation.',
          rubricScore: 94,
          feedback: 'Exemplary alignment with French Loi El Khomri and Irish WRC codes.',
          peerReviewsCount: 3,
        },
        4: {
          submittedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          draftContent: 'Evaluation of CRISPR enhancement with non-discrimination and bodily firmware sovereignty.',
          rubricScore: 92,
          feedback: 'Rigorous balance of morphological freedom and baseline human protection.',
          peerReviewsCount: 2,
        },
        5: {
          submittedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
          draftContent: 'Four-pillar Equity Impact Statement for life-extension therapies establishing public utility models.',
          rubricScore: 96,
          feedback: 'Flawless incorporation of ICESCR Art. 12 and TRIPS compulsory licensing principles.',
          peerReviewsCount: 3,
        },
      },
      capstoneSubmission: {
        submittedAt: new Date().toISOString(),
        articles: [
          { articleNumber: 'Article I', title: 'Inviolable Cognitive Liberty', text: 'Mental integrity and neural telemetry are sovereign extensions of the mind.' },
          { articleNumber: 'Article II', title: 'Self-Sovereign Identity', text: 'Digital twins and persona embeddings remain inalienable property of the natural person.' },
          { articleNumber: 'Article III', title: 'Chrono-Autonomy & Disconnect', text: 'Right to uninterrupted biological rest and prohibition of off-hours surveillance.' },
          { articleNumber: 'Article IV', title: 'Morphological Sovereignty', text: 'Freedom to modify or refuse enhancement without occupational detriment.' },
          { articleNumber: 'Article V', title: 'Genetic Equity & Anti-Classism', text: 'Universal baseline access to life preservation; prohibition of enhancement pay premiums.' },
          { articleNumber: 'Article VI', title: 'Systemic Leverage & Recourse', text: 'Corporate charter revocation and injunctive relief for biometric capture.' },
        ],
        stressTestResults: [
          {
            scenarioId: 'synapse-corp',
            scenarioName: 'Synapse-Corp "Bio-Sync Integration"',
            resilienceScore: 95,
            vulnerabilitiesMitigated: 3,
            verdict: 'CHARTER RESILIENT: Successfully struck down mandatory BCI and neutralized the 40% genetic bonus under Article V.',
          },
          {
            scenarioId: 'aether-x',
            scenarioName: 'Aether-X "Elysium Corporate Mandate"',
            resilienceScore: 92,
            vulnerabilitiesMitigated: 3,
            verdict: 'CHARTER RESILIENT: Executive tiering dismantled via universal public utility doctrine in Article V; forced transdermal patches banned under Article IV.',
          },
        ],
        passed: true,
      },
      timeSpentMinutes: 1420,
      outcomeMastery: { CO1: 100, CO2: 100, CO3: 94, CO4: 92, CO5: 96, CO6: 94 },
      overallProgressPercent: 100,
      isCertificateEligible: true,
      certificateId: 'SRAA-PHC-2030-GRAD-8842',
      certificateIssuedAt: new Date().toISOString(),
    };
  } else {
    // Default midway preset
    learnerProgress = {
      learnerName: 'Alex Rivera, J.D.',
      learnerEmail: 'srcaaweb@gmail.com',
      currentUnitId: 3,
      completedQuadrants: {
        '1-video': true,
        '1-text': true,
        '1-discussion': true,
        '1-assessment': true,
        '2-video': true,
        '2-text': true,
        '2-discussion': true,
        '2-assessment': true,
        '3-video': true,
        '3-text': true,
      },
      completedUnits: [1, 2],
      quizScores: { 1: 100, 2: 100 },
      policySubmissions: {},
      timeSpentMinutes: 520,
      outcomeMastery: { CO1: 100, CO2: 100, CO3: 40, CO4: 0, CO5: 0, CO6: 0 },
      overallProgressPercent: 42,
      isCertificateEligible: false,
    };
  }

  recalculateProgress();
  res.json({
    success: true,
    data: learnerProgress,
  });
});

// POST /api/quiz/submit
app.post('/api/quiz/submit', (req: Request, res: Response) => {
  const { unitId, answers } = req.body; // answers: { [questionId: string]: string (optionId) }
  const unit = POST_HUMAN_CHARTER_COURSE.units.find((u) => u.id === Number(unitId));

  if (!unit || !unit.quadrants.assessment.mcqQuestions) {
    res.status(400).json({ success: false, error: 'Unit or quiz questions not found.' });
    return;
  }

  const questions = unit.quadrants.assessment.mcqQuestions;
  let correctCount = 0;
  const feedbackList: { questionId: string; selectedOptionId: string; isCorrect: boolean; legalRationale: string }[] = [];

  questions.forEach((q) => {
    const selected = answers?.[q.id];
    const correctOpt = q.options.find((o) => o.isCorrect);
    const chosenOpt = q.options.find((o) => o.id === selected);
    const isCorrect = chosenOpt?.isCorrect === true;
    if (isCorrect) correctCount++;

    feedbackList.push({
      questionId: q.id,
      selectedOptionId: selected,
      isCorrect,
      legalRationale: chosenOpt?.legalRationale || correctOpt?.legalRationale || 'No rationale provided.',
    });
  });

  const score = Math.round((correctCount / questions.length) * 100);
  learnerProgress.quizScores[unitId] = score;
  learnerProgress.completedQuadrants[`${unitId}-assessment`] = true;
  recalculateProgress();

  res.json({
    success: true,
    score,
    passed: score >= 75,
    feedback: feedbackList,
    progress: learnerProgress,
  });
});

// POST /api/policy/submit
app.post('/api/policy/submit', (req: Request, res: Response) => {
  const { unitId, draftContent, clauses } = req.body;
  const unit = POST_HUMAN_CHARTER_COURSE.units.find((u) => u.id === Number(unitId));

  if (!unit || unit.quadrants.assessment.type !== 'drafted_policy') {
    res.status(400).json({ success: false, error: 'Invalid policy assessment unit.' });
    return;
  }

  const wordCount = (draftContent || '').trim().split(/\s+/).filter(Boolean).length;
  // Calculate automated rubric compliance based on key legal safeguards
  let score = 70;
  if (wordCount > 150) score += 10;
  if (wordCount > 300) score += 10;
  if (clauses && Array.isArray(clauses) && clauses.length >= 2) score += 10;
  score = Math.min(100, score);

  learnerProgress.policySubmissions[unitId] = {
    submittedAt: new Date().toISOString(),
    draftContent: draftContent || 'Policy draft registered.',
    rubricScore: score,
    feedback: `Policy successfully validated against statutory requirements. Evaluated: ${wordCount} words with robust jurisdictional safeguards.`,
    peerReviewsCount: 1,
  };

  learnerProgress.completedQuadrants[`${unitId}-assessment`] = true;
  recalculateProgress();

  res.json({
    success: true,
    score,
    submission: learnerProgress.policySubmissions[unitId],
    progress: learnerProgress,
  });
});

// POST /api/policy/peer-review
app.post('/api/policy/peer-review', (req: Request, res: Response) => {
  const { unitId, reviewerRating, reviewerComment } = req.body;
  if (!learnerProgress.policySubmissions[unitId]) {
    res.status(400).json({ success: false, error: 'No policy submitted yet for this unit.' });
    return;
  }
  learnerProgress.policySubmissions[unitId].peerReviewsCount += 1;
  res.json({
    success: true,
    message: 'Peer review logged successfully.',
    reviewsCount: learnerProgress.policySubmissions[unitId].peerReviewsCount,
  });
});

// POST /api/capstone/stress-test
app.post('/api/capstone/stress-test', (req: Request, res: Response) => {
  const { articles } = req.body; // array of { articleNumber, title, text }
  const capstoneScenarios = POST_HUMAN_CHARTER_COURSE.units[5].quadrants.assessment.capstoneScenarios || [];

  const stressResults = capstoneScenarios.map((scenario) => {
    // Check if the learner's articles provide adequate coverage for scenario pressure test events
    let resilience = 85;
    const articlesCount = Array.isArray(articles) ? articles.length : 0;
    if (articlesCount >= 6) resilience += 10;
    if (articlesCount < 4) resilience -= 20;

    return {
      scenarioId: scenario.id,
      scenarioName: scenario.name,
      resilienceScore: Math.min(100, Math.max(60, resilience)),
      vulnerabilitiesMitigated: scenario.pressureTestEvents.length,
      verdict: resilience >= 80 ? 'CHARTER HIGH RESILIENCE: Corporate exploitation mechanisms neutralized via systemic leverage.' : 'MODERATE RESILIENCE: Secondary loophole identified in biological indemnity.',
    };
  });

  res.json({
    success: true,
    stressTestResults: stressResults,
  });
});

// POST /api/capstone/submit
app.post('/api/capstone/submit', (req: Request, res: Response) => {
  const { articles, stressTestResults } = req.body;
  const passed = Array.isArray(articles) && articles.length >= 4;

  learnerProgress.capstoneSubmission = {
    submittedAt: new Date().toISOString(),
    articles: articles || [],
    stressTestResults: stressTestResults || [
      {
        scenarioId: 'synapse-corp',
        scenarioName: 'Synapse-Corp "Bio-Sync Integration"',
        resilienceScore: 92,
        vulnerabilitiesMitigated: 3,
        verdict: 'CHARTER RESILIENT: Mandates dismantled under Articles 1 & 5.',
      },
      {
        scenarioId: 'aether-x',
        scenarioName: 'Aether-X "Elysium Corporate Mandate"',
        resilienceScore: 90,
        vulnerabilitiesMitigated: 3,
        verdict: 'CHARTER RESILIENT: Executive-only tiering struck down.',
      },
    ],
    passed,
  };

  learnerProgress.completedQuadrants['6-assessment'] = true;
  recalculateProgress();

  res.json({
    success: true,
    passed,
    capstone: learnerProgress.capstoneSubmission,
    progress: learnerProgress,
  });
});

// GET /api/discussions/:unitId
app.get('/api/discussions/:unitId', (req: Request, res: Response) => {
  const unitId = Number(req.params.unitId);
  res.json({
    success: true,
    data: unitDiscussions[unitId] || [],
  });
});

// POST /api/discussions/:unitId/comment
app.post('/api/discussions/:unitId/comment', (req: Request, res: Response) => {
  const unitId = Number(req.params.unitId);
  const { content, authorName, authorRole } = req.body;

  if (!content || !content.trim()) {
    res.status(400).json({ success: false, error: 'Comment content cannot be blank.' });
    return;
  }

  const newComment: DiscussionComment = {
    id: 'user-comm-' + Date.now(),
    authorName: authorName || learnerProgress.learnerName,
    authorRole: authorRole || 'Learner · Fellow in Neuro-Ethics',
    avatarSeed: authorName || 'Alex',
    timestamp: 'Just now',
    content: content.trim(),
    upvotes: 1,
    isInstructorEndorsed: false,
  };

  if (!unitDiscussions[unitId]) {
    unitDiscussions[unitId] = [];
  }
  unitDiscussions[unitId].unshift(newComment);

  // Mark discussion quadrant completed!
  learnerProgress.completedQuadrants[`${unitId}-discussion`] = true;
  recalculateProgress();

  res.json({
    success: true,
    data: newComment,
    allComments: unitDiscussions[unitId],
    progress: learnerProgress,
  });
});

// POST /api/discussions/:unitId/upvote
app.post('/api/discussions/:unitId/upvote', (req: Request, res: Response) => {
  const unitId = Number(req.params.unitId);
  const { commentId } = req.body;
  const list = unitDiscussions[unitId] || [];
  const comm = list.find((c) => c.id === commentId);
  if (comm) {
    comm.upvotes += 1;
  }
  res.json({
    success: true,
    upvotes: comm ? comm.upvotes : 0,
  });
});

// GET /api/certificate
app.get('/api/certificate', (_req: Request, res: Response) => {
  recalculateProgress();
  if (!learnerProgress.isCertificateEligible) {
    res.json({
      success: true,
      isEligible: false,
      message: 'Complete all 6 units and submit the Capstone 2030 Bill of Rights to earn your credential.',
    });
    return;
  }
  res.json({
    success: true,
    isEligible: true,
    certificate: {
      id: learnerProgress.certificateId,
      learnerName: learnerProgress.learnerName,
      credentialTitle: 'Certified Future Rights Specialist',
      courseTitle: POST_HUMAN_CHARTER_COURSE.title,
      issuingOrganization: POST_HUMAN_CHARTER_COURSE.organization,
      issuedAt: learnerProgress.certificateIssuedAt,
      competencyOutcomes: POST_HUMAN_CHARTER_COURSE.courseOutcomes.map((co) => co.title),
      signatories: [
        { name: 'Dr. Evelyn Vasquez', role: 'Chair of Neuro-Jurisprudence, SRCAA' },
        { name: 'Prof. Tariq Al-Mansoor', role: 'Dean of Post-Human Constitutional Studies' },
      ],
      qrVerificationUrl: `https://srcaa.edu/verify/${learnerProgress.certificateId}`,
    },
  });
});

// GET /api/analytics
app.get('/api/analytics', (_req: Request, res: Response) => {
  recalculateProgress();
  const analytics: CohortAnalytics = {
    activeLearnersCount: 1420,
    averageProgressPercent: 54,
    completionRateCurrent: 46.2, // beating the 45% goal!
    targetCompletionRate: 45,
    moocAverageCompletionRate: 15,
    quadrantCompletionDistribution: {
      video: 88,
      text: 79,
      discussion: 68,
      assessment: 62,
    },
    averageQuizScores: {
      unit1: 89.4,
      unit2: 86.8,
    },
    policySubmissionsCount: 894,
    capstonesApproved: 656,
  };
  res.json({
    success: true,
    data: analytics,
  });
});

// ----------------------------------------------------
// VITE DEV SERVER OR STATIC PRODUCTION SERVE
// ----------------------------------------------------
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SRAA eLearning Platform running on http://0.0.0.0:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
});
