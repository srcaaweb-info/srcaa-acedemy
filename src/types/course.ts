export type DeliveryQuadrant = 'video' | 'text' | 'discussion' | 'assessment';

export type AssessmentType = 'automated_mcq' | 'drafted_policy' | 'capstone_synthesis';

export interface CourseOutcome {
  id: string; // CO1 - CO6
  title: string;
  description: string;
  testedInUnits: number[];
  assessmentMethod: string;
}

export interface VideoChapter {
  time: string;
  seconds: number;
  title: string;
}

export interface VideoTranscriptItem {
  id: string;
  speaker: string;
  time: string;
  seconds: number;
  text: string;
}

export interface VideoQuadrant {
  title: string;
  duration: string; // e.g. "9:45"
  videoPlaceholderUrl?: string;
  summary: string;
  chapters: VideoChapter[];
  transcript: VideoTranscriptItem[];
  keyTakeaways: string[];
}

export interface CaseStudyTILT {
  title: string;
  purpose: string; // TILT: Purpose
  task: string;    // TILT: Task
  criteria: string;// TILT: Criteria
  statutoryFrameworks: {
    name: string;
    jurisdiction: string;
    provisions: string;
  }[];
  contentSections: {
    heading: string;
    body: string;
    quote?: string;
  }[];
  reflectiveQuestions: string[];
}

export interface DiscussionComment {
  id: string;
  authorName: string;
  authorRole: string;
  avatarSeed: string;
  timestamp: string;
  content: string;
  upvotes: number;
  isInstructorEndorsed?: boolean;
  isFacultyEndorsed?: boolean;
}

export interface DiscussionQuadrant {
  topicTitle: string;
  provocation: string;
  initialComments: DiscussionComment[];
}

export interface MCQOption {
  id: string;
  text: string;
  isCorrect: boolean;
  legalRationale: string;
}

export interface MCQQuestion {
  id: string;
  scenario: string;
  question: string;
  targetOutcome: string; // e.g. "CO1"
  options: MCQOption[];
}

export interface PolicyWorkbenchTemplate {
  policyType: string; // 'remote_work' | 'crispr_ethics' | 'equity_impact'
  instructions: string;
  rubricCriteria: {
    title: string;
    weight: number;
    description: string;
  }[];
  defaultClauses: {
    clauseTitle: string;
    recommendedText: string;
    legalRationale: string;
  }[];
}

export interface CapstoneScenario {
  id: string;
  name: string;
  tagline: string;
  corporateContext: string;
  pressureTestEvents: {
    eventTitle: string;
    infringementDescription: string;
    targetedArticle: string;
  }[];
}

export interface Unit {
  id: number;
  unitNumberRoman: string; // "Unit I"
  title: string;
  durationHours: number; // 4 hrs
  primaryOutcome: CourseOutcome;
  summary: string;
  topics: string[];
  quadrants: {
    video: VideoQuadrant;
    text: CaseStudyTILT;
    discussion: DiscussionQuadrant;
    assessment: {
      type: AssessmentType;
      title: string;
      mcqQuestions?: MCQQuestion[];
      policyTemplate?: PolicyWorkbenchTemplate;
      capstoneScenarios?: CapstoneScenario[];
    };
  };
}

export interface Course {
  title: string;
  code: string;
  organization: string;
  duration: string;
  level: string;
  targetLearners: string[];
  deliveryMode: string;
  completionRateGoal: number; // 45
  courseObjectives: string[];
  courseOutcomes: CourseOutcome[];
  references: {
    title: string;
    details: string;
  }[];
  units: Unit[];
}

export interface LearnerProgress {
  learnerName: string;
  learnerEmail: string;
  currentUnitId: number;
  completedQuadrants: Record<string, boolean>; // key: "unitId-quadrant" e.g. "1-video"
  completedUnits: number[];
  quizScores: Record<number, number>; // unitId -> score (0-100)
  policySubmissions: Record<number, {
    submittedAt: string;
    draftContent: string;
    rubricScore: number;
    feedback: string;
    peerReviewsCount: number;
  }>;
  capstoneSubmission?: {
    submittedAt: string;
    articles: {
      articleNumber: string;
      title: string;
      text: string;
    }[];
    stressTestResults: {
      scenarioId: string;
      scenarioName: string;
      resilienceScore: number; // 0-100
      vulnerabilitiesMitigated: number;
      verdict: string;
    }[];
    passed: boolean;
  };
  timeSpentMinutes: number;
  outcomeMastery: Record<string, number>; // CO1 -> 0-100%
  overallProgressPercent: number;
  isCertificateEligible: boolean;
  certificateId?: string;
  certificateIssuedAt?: string;
}

export interface CohortAnalytics {
  activeLearnersCount: number;
  averageProgressPercent: number;
  completionRateCurrent: number;
  targetCompletionRate: number; // 45%
  moocAverageCompletionRate: number; // 15%
  quadrantCompletionDistribution: {
    video: number;
    text: number;
    discussion: number;
    assessment: number;
  };
  averageQuizScores: {
    unit1: number;
    unit2: number;
  };
  policySubmissionsCount: number;
  capstonesApproved: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  provider: 'email' | 'google' | 'microsoft';
  role: 'scholar' | 'candidate' | 'instructor' | 'admin';
  institution?: string;
  avatarUrl?: string;
  token?: string;
}
