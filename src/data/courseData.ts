import { Course, CourseOutcome } from '../types/course';

export const COURSE_OUTCOMES: CourseOutcome[] = [
  {
    id: 'CO1',
    title: 'Cognitive Liberty & Mental Integrity',
    description: 'Define the boundaries of mental integrity and critically evaluate neuro-rights issues arising from workplace neurotechnology.',
    testedInUnits: [1],
    assessmentMethod: 'Automated scenario-based MCQ quiz',
  },
  {
    id: 'CO2',
    title: 'Self-Sovereign Identity & Portability',
    description: 'Propose a workable model for personal data portability grounded in Self-Sovereign Identity principles.',
    testedInUnits: [2],
    assessmentMethod: 'Automated scenario-based MCQ quiz',
  },
  {
    id: 'CO3',
    title: 'Remote-Work & Right to Disconnect',
    description: 'Draft a remote-work policy that safeguards employees against digital burnout.',
    testedInUnits: [3],
    assessmentMethod: 'Drafted policy document (peer-reviewed)',
  },
  {
    id: 'CO4',
    title: 'Morphological Freedom & Enhancement Ethics',
    description: 'Evaluate the ethics and legal standing of CRISPR-based and cybernetic human enhancement.',
    testedInUnits: [4],
    assessmentMethod: 'Drafted policy document (peer-reviewed)',
  },
  {
    id: 'CO5',
    title: 'Equity Impact Statement in Biotechnology',
    description: 'Apply an Equity Impact Statement framework to a futuristic technology policy scenario.',
    testedInUnits: [5],
    assessmentMethod: 'Drafted policy document (peer-reviewed)',
  },
  {
    id: 'CO6',
    title: '2030 Bill of Rights Synthesis',
    description: 'Draft a comprehensive "Charter of Rights" for a futuristic institution, synthesising Units I–V using systems thinking.',
    testedInUnits: [6],
    assessmentMethod: 'Capstone synthesis project',
  },
];

export const POST_HUMAN_CHARTER_COURSE: Course = {
  title: 'The Post-Human Charter: Rights & Freedom in the Age of AI and Bio-Enhancement',
  code: 'SRCAA-PHC-2030',
  organization: 'SRCAA Academy (Learn. Research. Innovate. Grow.)',
  duration: '6 Weeks (3–5 hours/week; total ~24 hours across 6 Units)',
  level: 'Intermediate / Professional Development',
  targetLearners: [
    'Legal professionals & Constitutional Scholars',
    'HR Leaders & Workforce Strategists',
    'Tech Ethicists & AI Governance Officers',
    'Global Citizens & Digital Rights Advocates',
  ],
  deliveryMode: 'LMS-based MOOC — Video, Text (e-content), Discussion, and Automated/Peer Assessment (Four Quadrants)',
  completionRateGoal: 45,
  courseObjectives: [
    'To introduce learners to emerging human-rights questions arising from AI, neurotechnology, and bio-enhancement.',
    'To build the ability to analyse real-world corporate and policy scenarios using a systems-thinking approach (Meadows Framework).',
    'To develop practical drafting skills — policy clauses, Equity Impact Statements, and Charter provisions — for futuristic institutional contexts.',
    "To familiarise learners with comparative legal frameworks (Chile's neuro-rights amendment, France's Right to Disconnect law, GDPR, India's DPDP Act) governing these emerging rights.",
  ],
  courseOutcomes: COURSE_OUTCOMES,
  references: [
    {
      title: 'NeuroRights Foundation',
      details: 'Publications on the five neuro-rights (Mental Privacy, Personal Identity, Free Will, Equal Access to Mental Augmentation, Protection from Bias).',
    },
    {
      title: 'UNESCO Recommendation on the Ethics of Neurotechnology',
      details: 'Global normative instrument setting multilateral standards on neural data protection and bodily integrity.',
    },
    {
      title: "Chile — Constitutional Amendment on Neuro-Rights",
      details: 'Ley de Neuroderechos (Constitutional Reform Act No. 21.383) — the world’s first constitutional protection for brain data.',
    },
    {
      title: 'European Union — General Data Protection Regulation (GDPR)',
      details: 'Articles 15 & 20 on the right to access and right to data portability; Article 9 on special category biometric data.',
    },
    {
      title: "India — Digital Personal Data Protection (DPDP) Act, 2023",
      details: 'Provisions regarding consent architecture, personal data processing, and cross-border digital rights.',
    },
    {
      title: "France — Loi El Khomri, 2017",
      details: 'Labour Code provisions establishing the statutory Right to Disconnect from occupational communication networks.',
    },
    {
      title: 'Comparative Material on Right to Disconnect',
      details: 'Italy (Law 81/2017), Spain (Organic Law 3/2018), Philippines (House Bill 5563), Ireland (WRC Code of Practice).',
    },
    {
      title: 'Donella Meadows — Thinking in Systems: A Primer',
      details: 'Core systems thinking principles and the 12 leverage points in policy and constitutional design used in Unit VI.',
    },
  ],
  units: [
    {
      id: 1,
      unitNumberRoman: 'Unit I',
      title: 'From Privacy to Cognition — Neuro-Rights and Cognitive Liberty',
      durationHours: 4,
      primaryOutcome: COURSE_OUTCOMES[0],
      summary: 'Explore the boundaries between data privacy and mental privacy. Examine workplace EEG monitoring, Brain-Computer Interfaces (BCI), Chile’s pioneering neuro-rights amendment, and UNESCO standards.',
      topics: [
        'Meaning and scope of Neuro-Rights',
        'Cognitive Liberty as an emerging legal and ethical entitlement',
        'Distinguishing Mental Privacy from conventional Data Privacy',
        'Workplace neurotechnology: EEG-based monitoring, BCIs, wearable neuro-sensors',
        'Chile constitutional amendment on neuro-rights (Ley de Neuroderechos)',
        "NeuroRights Foundation's five rights & UNESCO's Recommendation",
        'Employer surveillance vs employee cognitive autonomy',
        'Neuro-discrimination risks and mitigation protocols',
      ],
      quadrants: {
        video: {
          title: 'Masterclass: The Frontier of Cognitive Liberty & Workplace Brain-Monitoring',
          duration: '9:45',
          summary: 'In this masterclass, leading legal scholars break down why conventional data protection statutes fail when applied to neural recordings, and how Chile enacted the first constitutional shield for human cognition.',
          chapters: [
            { time: '00:00', seconds: 0, title: 'Introduction: The Shift from Screen to Synapse' },
            { time: '02:15', seconds: 135, title: 'Why Brain Data Differs from Biometrics' },
            { time: '04:40', seconds: 280, title: 'The Chilean Precedent: Ley de Neuroderechos' },
            { time: '07:10', seconds: 430, title: 'Workplace EEG & The Threat of Neuro-Discrimination' },
            { time: '08:50', seconds: 530, title: 'Quadrant Synthesis & Assessment Preview' },
          ],
          transcript: [
            {
              id: 't1-1',
              speaker: 'Dr. Evelyn Vasquez',
              time: '00:05',
              seconds: 5,
              text: 'Welcome to Unit I of The Post-Human Charter. For three decades, our privacy jurisprudence has focused on what we generate externally: clickstreams, emails, location data. But consumer-grade EEG headsets and workplace brain-computer interfaces now penetrate the final sanctuary: internal cognition.',
            },
            {
              id: 't1-2',
              speaker: 'Dr. Evelyn Vasquez',
              time: '02:20',
              seconds: 140,
              text: 'Neural data is not just sensitive personal data. It contains the sub-conscious precursors to choice. When an employer monitors cognitive workload or micro-distractions via headgear, they breach mental integrity.',
            },
            {
              id: 't1-3',
              speaker: 'Dr. Evelyn Vasquez',
              time: '04:45',
              seconds: 285,
              text: 'In 2021, Chile altered its Constitution under Article 19 to declare brain data and mental integrity an inviolable human right, later reinforced by Supreme Court rulings against Emotiv neuro-headsets.',
            },
            {
              id: 't1-4',
              speaker: 'Dr. Evelyn Vasquez',
              time: '07:15',
              seconds: 435,
              text: 'As HR and legal leaders, your responsibility is to craft policies preventing neuro-discrimination — ensuring workers are not penalized for biological involuntary neural states.',
            },
          ],
          keyTakeaways: [
            'Mental Privacy is distinct from Data Privacy: neural telemetry reflects subconscious, involuntary biological processes.',
            'Chile’s Ley de Neuroderechos (2021) establishes that scientific and technological development must serve persons without infringing mental integrity.',
            'The NeuroRights Foundation codifies 5 pillars: Mental Privacy, Personal Identity, Free Will, Fair Access to Augmentation, and Freedom from Bias.',
          ],
        },
        text: {
          title: 'Case Study: The Ethics of Workplace Brain-Monitoring in Logistics & High-Stakes Operations',
          purpose: 'To critically evaluate the legal tension between occupational safety imperatives and employee cognitive liberty in neuro-monitored environments.',
          task: 'Analyze the case of "VigilantLogistics Corp", which mandated EEG smart-helmets for 1,200 freight operators, penalizing micro-sleep EEG signatures before overt behavioral manifestations.',
          criteria: 'Distinguish between legitimate safety monitoring and unlawful cognitive extraction under Chilean precedent and UNESCO guidelines.',
          statutoryFrameworks: [
            {
              name: 'Chilean Constitutional Amendment (Ley No. 21.383)',
              jurisdiction: 'Chile (2021)',
              provisions: 'Amended Article 19 No. 1: "Scientific and technological development shall be at the service of persons and shall be carried out with respect for life and physical and psychic integrity."',
            },
            {
              name: 'UNESCO Recommendation on the Ethics of Neurotechnology',
              jurisdiction: 'International (2023)',
              provisions: 'Calls for strict prohibition on non-consensual extraction of neural correlates of thoughts, emotions, or behavioral intentions.',
            },
            {
              name: 'EU GDPR Article 9',
              jurisdiction: 'European Union',
              provisions: 'Prohibits processing of biometric data for uniquely identifying natural persons without explicit statutory derogations.',
            },
          ],
          contentSections: [
            {
              heading: '1. The Factual Matrix: VigilantLogistics Smart-Helmets',
              body: 'In 2029, multinational freight conglomerate VigilantLogistics implemented mandatory neuro-band headgear in heavy vehicle fleets. The sensors recorded continuous frontal-lobe EEG signals, streaming brainwave frequency bands (alpha, theta, beta) to central dispatch servers. Workers exhibiting high theta ratios received automated disciplinary dockings for "attentional deficit".',
              quote: '"When the machine monitors my hands, it oversees my labor. When it records my theta waves, it colonizes my nervous system." — Union Grievance, Local 402',
            },
            {
              heading: '2. The Legal Boundary: Mental Privacy vs Occupational Safety',
              body: 'While employers possess a statutory duty of care to prevent fatal accidents, neuro-surveillance extracts cognitive states prior to any manifest conduct. Unlike breathalyzers which test chemical intoxicants in blood, EEG sensors capture affective states, stress responses, and cognitive involuntary fluctuations.',
            },
            {
              heading: '3. Risk of Neuro-Discrimination',
              body: 'Neuro-divergent operators (such as individuals with ADHD or natural atypical baseline EEG waveforms) were systematically flagged as "high risk", resulting in constructive termination. This establishes a prima facie case of discriminatory algorithmic exclusion without behavioral failure.',
            },
          ],
          reflectiveQuestions: [
            'Can an employee genuinely grant "free and informed consent" to workplace neuro-monitoring when employment is conditioned on agreement?',
            'What technical mitigations (e.g. edge-processing without server transmission, zero raw EEG retention) would render safety headgear ethically tenable?',
          ],
        },
        discussion: {
          topicTitle: 'Debate: Mandatory Neuro-Monitoring for High-Risk Occupations vs Inviolable Cognitive Liberty',
          provocation: 'Should commercial aviation pilots, high-speed rail operators, and neurosurgeons be required by law to wear continuous EEG monitoring headsets during active duty to prevent catastrophic fatigue accidents?',
          initialComments: [
            {
              id: 'c1',
              authorName: 'Camila Reyes',
              authorRole: 'Human Rights Barrister, Santiago',
              avatarSeed: 'Camila',
              timestamp: '2 hours ago',
              content: 'Under Chilean constitutional jurisprudence, mental integrity is non-derogable. Even in high-risk sectors, you cannot compel biometric intrusion into the subconscious. Behavioral vigilance tests (reaction times, eye-tracking) achieve the safety threshold without converting human thoughts into employer telemetry.',
              upvotes: 42,
              isInstructorEndorsed: true,
            },
            {
              id: 'c2',
              authorName: 'Marcus Vance',
              authorRole: 'Aviation Safety Director',
              avatarSeed: 'Marcus',
              timestamp: '5 hours ago',
              content: 'With respect, pilots already submit to random toxicological screenings and simulator stress monitoring. If an EEG sensor can catch a micro-sleep episode 15 seconds before manual control is lost, refusing to use it violates the passengers’ right to life.',
              upvotes: 28,
            },
          ],
        },
        assessment: {
          type: 'automated_mcq',
          title: 'Unit I Assessment: Mental Integrity & Neuro-Rights Jurisprudence Quiz',
          mcqQuestions: [
            {
              id: 'q1-1',
              scenario: 'An international mining firm requires haul truck drivers to wear hardhats fitted with dry-sensor EEG probes. The system calculates a proprietary "Cognitive Readiness Index" (CRI). Drivers with a score below 60% are locked out of their vehicles and placed on unpaid standby.',
              question: 'Under the NeuroRights Foundation principles and Chile’s constitutional precedent, what is the primary legal vulnerability of this policy?',
              targetOutcome: 'CO1',
              options: [
                {
                  id: 'a',
                  text: 'The policy violates wage payment frequency regulations under standard labor codes.',
                  isCorrect: false,
                  legalRationale: 'Incorrect. While wage docking might violate standard labor codes, the constitutional and neuro-ethical vulnerability lies in extracting involuntary cognitive telemetry to determine employment status.',
                },
                {
                  id: 'b',
                  text: 'It violates the principle of Mental Integrity by penalizing involuntary neural correlates rather than verifiable behavioral incompetence.',
                  isCorrect: true,
                  legalRationale: 'Correct! Mental Integrity protects individuals from having their subconscious, involuntary mental states measured and penalized without manifest behavioral breach or objective impairment.',
                },
                {
                  id: 'c',
                  text: 'The policy is lawful provided the company owns the patent on the EEG algorithm.',
                  isCorrect: false,
                  legalRationale: 'Incorrect. Intellectual property rights cannot supersede fundamental constitutional protections or human rights.',
                },
                {
                  id: 'd',
                  text: 'It is compliant so long as employees signed the standard handbook upon hiring.',
                  isCorrect: false,
                  legalRationale: 'Incorrect. Fundamental rights cannot be waived by boilerplate adhesive employment contracts where power disparity precludes valid consent.',
                },
              ],
            },
            {
              id: 'q1-2',
              scenario: 'A fintech startup integrates a wearable consumer BCI headband into remote software engineer setups, claiming it assists workers by automatically silencing Slack notifications when their brain enters "Deep Flow State". However, the data is also aggregated to rank team efficiency.',
              question: 'Which principle of Cognitive Liberty is most severely infringed when internal neural states are repurposed for workplace productivity scoring?',
              targetOutcome: 'CO1',
              options: [
                {
                  id: 'a',
                  text: 'Cognitive Privacy / Purpose Limitation: Neural telemetry captured for notification filtering cannot be converted into performance surveillance without catastrophic erosion of psychological autonomy.',
                  isCorrect: true,
                  legalRationale: 'Correct! Repurposing cognitive wellness tools into productivity scoring violates Purpose Limitation and turns the brain into a transparent performance metric.',
                },
                {
                  id: 'b',
                  text: 'Right to Hardware Upgrades: Workers must receive the latest model every 6 months.',
                  isCorrect: false,
                  legalRationale: 'Incorrect. Hardware revision cycles are irrelevant to human rights protections.',
                },
                {
                  id: 'c',
                  text: 'Open-Source Licensing: The algorithm must be published on GitHub.',
                  isCorrect: false,
                  legalRationale: 'Incorrect. Code licensing does not solve the core ethical breach of mental privacy.',
                },
                {
                  id: 'd',
                  text: 'The startup is entirely immune because software development is non-hazardous.',
                  isCorrect: false,
                  legalRationale: 'Incorrect. Cognitive liberty applies universally, regardless of industry physical hazard level.',
                },
              ],
            },
          ],
        },
      },
    },
    {
      id: 2,
      unitNumberRoman: 'Unit II',
      title: 'Data Sovereignty & Digital Twins',
      durationHours: 4,
      primaryOutcome: COURSE_OUTCOMES[1],
      summary: 'Delve into Self-Sovereign Identity (SSI), decentralized verifiable credentials, digital twins, Big Tech data extraction, and comparative portability rights under EU GDPR and India’s DPDP Act 2023.',
      topics: [
        'Self-Sovereign Identity (SSI) — definition, core principles, and architecture',
        'Data Sovereignty and implications for individuals and nations',
        'Digital Twins — definition, categories, and use cases',
        'Contrasting ownership models: platform-owned vs user-owned data',
        '"Big Tech" data extraction practices and data-driven business models',
        'Regulatory frameworks: EU GDPR Article 20 vs India DPDP Act 2023',
        'Foundational concepts of decentralized identity & blockchain verifiable credentials',
        'Designing a workable model for personal data portability',
      ],
      quadrants: {
        video: {
          title: 'Masterclass: Reclaiming the Digital Self — SSI Architectures & Twin Ownership',
          duration: '9:15',
          summary: 'Analyze how behavioral digital twins are constructed by platform monopolies and how cryptographic SSI protocols enable citizens to reclaim sovereignty over their persona.',
          chapters: [
            { time: '00:00', seconds: 0, title: 'The Anatomy of a Behavioral Digital Twin' },
            { time: '02:30', seconds: 150, title: 'Walled Gardens vs Self-Sovereign Identity (SSI)' },
            { time: '05:10', seconds: 310, title: 'GDPR Art. 20 vs India DPDP Act §12' },
            { time: '07:45', seconds: 465, title: 'Cryptographic Portability: DIDs & Verifiable Credentials' },
          ],
          transcript: [
            {
              id: 't2-1',
              speaker: 'Prof. Tariq Al-Mansoor',
              time: '00:05',
              seconds: 5,
              text: 'In this second unit, we confront the digital double. Today, every search, pause, cadence, and biometric reading feeds a predictive model of you — your Digital Twin. But who owns this twin?',
            },
            {
              id: 't2-2',
              speaker: 'Prof. Tariq Al-Mansoor',
              time: '02:40',
              seconds: 160,
              text: 'Under current Big Tech architectures, the twin is platform-owned intellectual property. You cannot export the model weights or behavioral embeddings that know you better than you know yourself.',
            },
            {
              id: 't2-3',
              speaker: 'Prof. Tariq Al-Mansoor',
              time: '05:20',
              seconds: 320,
              text: 'We compare Article 20 of GDPR, which created the right to data portability in structured format, with India’s Digital Personal Data Protection Act of 2023. We discover why simple CSV exports are inadequate, and why Self-Sovereign Identity (SSI) standards are necessary.',
            },
          ],
          keyTakeaways: [
            'A Digital Twin is a dynamic computational replica of an individual’s cognitive, behavioral, and biological tendencies.',
            'Centralized platforms treat personal data as raw material for behavioral surplus extraction (Zuboff model).',
            'Self-Sovereign Identity (SSI) restores control to the user via Decentralized Identifiers (DIDs) and zero-knowledge Verifiable Credentials (VCs).',
          ],
        },
        text: {
          title: 'Case Study: Reclaiming Ownership of Personal Data & Digital Twins from "Big Tech"',
          purpose: 'To propose a workable model for personal data portability grounded in Self-Sovereign Identity principles (CO2).',
          task: 'Examine the petition of a creator attempting to migrate their 10-year behavioral and interaction twin from a closed ecosystem to an open-source decentralized agent.',
          criteria: 'Evaluate statutory deficiencies in GDPR and DPDP 2023 regarding model weight portability versus raw transaction logs.',
          statutoryFrameworks: [
            {
              name: 'EU GDPR Article 20 (Right to Data Portability)',
              jurisdiction: 'European Union',
              provisions: 'Data subject has the right to receive personal data concerning him or her in a structured, commonly used and machine-readable format and transmit to another controller.',
            },
            {
              name: 'India Digital Personal Data Protection (DPDP) Act, 2023',
              jurisdiction: 'India',
              provisions: 'Section 6 (Consent Architecture) and Section 12 (Right to Grievance Redressal and Correction/Erasure).',
            },
            {
              name: 'W3C Decentralized Identifiers (DIDs) v1.0',
              jurisdiction: 'Open Web Standard',
              provisions: 'Cryptographically verifiable, persistent identifiers that do not require a centralized registration authority.',
            },
          ],
          contentSections: [
            {
              heading: '1. The Illusion of Data Portability: The "Dump and Ditch" Problem',
              body: 'When users exercise their right under GDPR Art. 20, platforms typically furnish a compressed archive of disjointed JSON files: timestamped clicks and raw chat logs. The actual trained latent embeddings — the neural representation of user preference — are retained as proprietary trade secrets.',
            },
            {
              heading: '2. The SSI Alternative: User-Custodied Edge Twins',
              body: 'In an authentic Self-Sovereign architecture, users hold cryptographic keys to a Personal Data Store (PDS). Rather than algorithms consuming data in centralized silos, algorithms travel to the user’s device to train locally via Federated Learning, preserving sovereign control.',
            },
          ],
          reflectiveQuestions: [
            'Should trained algorithmic weights derived from an individual’s personal data be classified as personal data or proprietary company IP?',
            'How can the DPDP Act 2023 consent manager framework be upgraded to support zero-knowledge verifiable credentials?',
          ],
        },
        discussion: {
          topicTitle: 'Debate: Platform Convenience vs Personal SSI Sovereignty',
          provocation: 'If 95% of consumers choose the friction-free convenience of centralized Google/Apple accounts over managing cryptographic private keys for SSI, does data sovereignty remain a luxury principle for tech elites?',
          initialComments: [
            {
              id: 'c3',
              authorName: 'Dr. Arjun Mehta',
              authorRole: 'Cyberlaw Fellow, New Delhi',
              avatarSeed: 'Arjun',
              timestamp: '1 day ago',
              content: 'Convenience cannot justify digital vassalage. The Indian DPDP Act’s Consent Manager framework proves that sovereign intermediaries can handle cryptography seamlessly under the hood without burdening ordinary citizens with seed phrases.',
              upvotes: 35,
              isInstructorEndorsed: true,
            },
            {
              id: 'c4',
              authorName: 'Sarah Jenkins',
              authorRole: 'Product VP, Silicon Valley',
              avatarSeed: 'Sarah',
              timestamp: '1 day ago',
              content: 'Until decentralized networks match the sub-second latency and cross-device sync of hyperscalers, users will continue voting with their clicks for centralized convenience.',
              upvotes: 19,
            },
          ],
        },
        assessment: {
          type: 'automated_mcq',
          title: 'Unit II Assessment: Data Sovereignty & SSI Portability Quiz',
          mcqQuestions: [
            {
              id: 'q2-1',
              scenario: 'An employee leaves a sales consultancy where their client negotiations were used to train an autonomous AI sales avatar (Digital Twin). The employer claims exclusive ownership of the twin, while the employee claims it represents their cognitive likeness and professional identity.',
              question: 'Under a robust Self-Sovereign Identity framework, what principle resolves this dispute?',
              targetOutcome: 'CO2',
              options: [
                {
                  id: 'a',
                  text: 'The employer owns everything created on company hardware without reservation.',
                  isCorrect: false,
                  legalRationale: 'Incorrect. This reflects legacy 20th-century industrial property law, failing to account for digital identity replication.',
                },
                {
                  id: 'b',
                  text: 'The employee retains inalienable moral and sovereign rights over the behavioral likeness, requiring revocation or segregation of personal cognitive weights upon termination.',
                  isCorrect: true,
                  legalRationale: 'Correct! In SSI jurisprudence, persona and cognitive behavioral models remain tethered to the natural person as an extension of identity, preventing corporate enslavement of a digital twin.',
                },
                {
                  id: 'c',
                  text: 'The AI model belongs to the GPU cloud provider.',
                  isCorrect: false,
                  legalRationale: 'Incorrect. Cloud infrastructure vendors are mere data processors, not rights holders.',
                },
              ],
            },
            {
              id: 'q2-2',
              scenario: 'A healthcare app operating under India’s DPDP Act 2023 offers patients a choice between receiving their raw medical records in an unreadable format or paying a premium fee for an API that ports their predictive digital twin to another hospital.',
              question: 'Why does charging a portability penalty undermine the fundamental right to data portability?',
              targetOutcome: 'CO2',
              options: [
                {
                  id: 'a',
                  text: 'Because portability must be frictionless, interoperable, and cost-free to prevent platform lock-in and anti-competitive entrapment.',
                  isCorrect: true,
                  legalRationale: 'Correct! Both GDPR and progressive interpretations of DPDP mandate that interoperability and portability cannot be priced out of reach, as that creates digital captivity.',
                },
                {
                  id: 'b',
                  text: 'Because hospitals are not allowed to use computers under medical law.',
                  isCorrect: false,
                  legalRationale: 'Incorrect. Digital health systems are fully legal and encouraged.',
                },
              ],
            },
          ],
        },
      },
    },
    {
      id: 3,
      unitNumberRoman: 'Unit III',
      title: 'The Right to Disconnect',
      durationHours: 4,
      primaryOutcome: COURSE_OUTCOMES[2],
      summary: 'Analyze the 24/7 digital economy, cognitive exhaustion, France’s groundbreaking Loi El Khomri (2017), comparative approaches across Italy, Spain, Ireland, and draft an enforceable remote-work policy.',
      topics: [
        'Labor rights in the 24/7 digital economy',
        'Digital burnout: causes, symptoms, and organizational consequences',
        "France's 'Right to Disconnect' law (Loi El Khomri, 2017) — background & provisions",
        'Comparative regulatory approaches: Italy (Law 81/2017), Spain (Organic Law 3/2018), Ireland WRC Code',
        'Core principles underlying sound remote-work policy design',
        'Balancing employer operational needs against employee rights regarding after-hours communication',
        'Digital wellbeing and mental health considerations',
        'Essential clauses required when drafting an organizational remote-work policy',
      ],
      quadrants: {
        video: {
          title: 'Masterclass: The 24/7 Cognitive Toll & Drafting the Right to Disconnect',
          duration: '8:50',
          summary: 'Examine how always-on teleworking erodes psychological rest and explore legal architectures from Paris to Dublin that hold employers liable for hyper-connectivity.',
          chapters: [
            { time: '00:00', seconds: 0, title: 'The Hyper-Connected Trap: Invisible Overtime' },
            { time: '02:10', seconds: 130, title: 'The French Precedent: Loi El Khomri & Rentokil Case' },
            { time: '04:30', seconds: 270, title: 'Comparative Global Statutes (Spain, Italy, Ireland)' },
            { time: '06:40', seconds: 400, title: 'The Anatomy of an Enforceable Disconnect Policy' },
          ],
          transcript: [
            {
              id: 't3-1',
              speaker: 'Maitre Claire Beaumont',
              time: '00:05',
              seconds: 5,
              text: 'Smartphones and collaborative platforms turned every living room into an open office desk. But biological circadian rhythms have not evolved to process Slack pings at midnight.',
            },
            {
              id: 't3-2',
              speaker: 'Maitre Claire Beaumont',
              time: '02:15',
              seconds: 135,
              text: 'France made history in 2017 with Article L. 2242-17 of the Labour Code. Companies with more than 50 employees must negotiate formal agreements defining the regulation of digital tools. Failure results in severe back-pay penalties.',
            },
          ],
          keyTakeaways: [
            'Digital burnout is an occupational health injury characterized by emotional exhaustion, depersonalization, and reduced efficacy.',
            'Loi El Khomri establishes an affirmative obligation on employers to set digital tool boundaries.',
            'A robust policy requires technical mechanisms (e.g. server-side email holding, auto-replies) rather than placing the burden of refusal on vulnerable junior employees.',
          ],
        },
        text: {
          title: 'Case Study: Analysing the French "Right to Disconnect" Jurisprudence & Cross-Border Application',
          purpose: 'To draft a remote-work policy that safeguards employees against digital burnout (CO3).',
          task: 'Analyze the Cour de Cassation ruling against British firm Rentokil Initial, which was ordered to pay €60,000 for failing to respect employee disconnect boundaries.',
          criteria: 'Synthesize statutory requirements from France, Spain (Organic Law 3/2018), and Ireland’s 2021 Code of Practice into concrete organizational clauses.',
          statutoryFrameworks: [
            {
              name: 'French Labour Code Art. L. 2242-17 (Loi El Khomri)',
              jurisdiction: 'France (2017)',
              provisions: 'Mandatory annual negotiation on the right to disconnect and the setup of mechanisms to regulate digital tool usage.',
            },
            {
              name: 'Spain Organic Law 3/2018 (LOPDGDD) Art. 88',
              jurisdiction: 'Spain (2018)',
              provisions: 'Guarantees workers the right to digital disconnection outside working time to respect rest periods, leaves, and personal intimacy.',
            },
            {
              name: 'Ireland Workplace Relations Commission (WRC) Code of Practice',
              jurisdiction: 'Ireland (2021)',
              provisions: 'Right not to routinely perform work outside normal hours, right not to be penalized for refusing to attend to work matters, duty to respect another person’s right to disconnect.',
            },
          ],
          contentSections: [
            {
              heading: '1. The Rentokil Initial Precedent (Cour de Cassation 2018)',
              body: 'A director on an "astreinte" (on-call) availability regime was required to keep his phone on for emergency client contact. The court found that because he was never relieved of the psychological readiness requirement, the entire availability period constituted compensable overtime.',
            },
            {
              heading: '2. The Shift from Voluntary Rest to Structural Immunity',
              body: 'Policies that merely state "employees are encouraged not to check email" fail. True compliance requires structural defaults: disabling notifications, queueing evening outbound mail until 8:00 AM, and explicit non-retaliation provisions.',
            },
          ],
          reflectiveQuestions: [
            'How can global multinationals balance asynchronous work across Tokyo, London, and New York without infringing local disconnect laws?',
            'What constitutes a genuine "emergency" exception that cannot wait until morning business hours?',
          ],
        },
        discussion: {
          topicTitle: 'Debate: Asynchronous Global Collaboration vs The Absolute Right to Disconnect',
          provocation: 'In cross-continental teams, does an absolute legal ban on evening pings destroy the flexible asynchronous autonomy that made remote work attractive in the first place?',
          initialComments: [
            {
              id: 'c5',
              authorName: 'Liam O’Connor',
              authorRole: 'Head of People, Dublin',
              avatarSeed: 'Liam',
              timestamp: '3 hours ago',
              content: 'The Irish WRC Code gets it right: you don’t have to ban sending emails at 10 PM. You simply must establish that no employee is obligated or expected to read or answer until their local shift begins. The key is removing the cultural pressure of immediate response.',
              upvotes: 38,
              isInstructorEndorsed: true,
            },
          ],
        },
        assessment: {
          type: 'drafted_policy',
          title: 'Unit III Assessment: Organizational Remote-Work & Right-to-Disconnect Policy Workbench',
          policyTemplate: {
            policyType: 'remote_work',
            instructions: 'Draft a comprehensive organizational Remote-Work & Right-to-Disconnect Policy for a global enterprise. Your draft must incorporate comparative legal standards from France (Loi El Khomri), Spain, and Ireland, establishing clear structural safeguards against digital burnout.',
            rubricCriteria: [
              { title: 'Temporal Boundaries & Core Rest Periods', weight: 25, description: 'Explicit definition of daily 11-consecutive-hour rest periods and weekend protection.' },
              { title: 'Technical Enablers (Server-Side Holding)', weight: 25, description: 'Automated mechanisms like scheduled email delivery and notification suppression.' },
              { title: 'Emergency Protocol Definition', weight: 25, description: 'Narrow, legally defensible definition of true emergencies with alternate contact channels.' },
              { title: 'Anti-Retaliation & Promotion Safeguards', weight: 25, description: 'Protections ensuring non-responsive off-hours employees are not scored lower in performance appraisals.' },
            ],
            defaultClauses: [
              {
                clauseTitle: 'Clause 1: Scope & Guaranteed Minimum Rest',
                recommendedText: 'All employees are entitled to an inviolable 11 consecutive hours of daily rest and 48 hours of uninterrupted weekend rest, during which no occupational telecommunication is expected.',
                legalRationale: 'Directly mirrors the EU Working Time Directive and French Labour Code standards for mental recovery.',
              },
              {
                clauseTitle: 'Clause 2: Structural Asynchronous Queuing',
                recommendedText: 'Enterprise email and chat infrastructure shall automatically hold outbound external messages drafted between 19:00 and 08:00 local time, releasing them at the recipient’s normal shift opening.',
                legalRationale: 'Solves the power imbalance by making disconnect the default technical state rather than requiring employee courage.',
              },
              {
                clauseTitle: 'Clause 3: Non-Retaliation & Metric Protection',
                recommendedText: 'Speed of off-hours response shall be prohibited as an evaluation metric in performance appraisals, promotion deliberations, or bonus compensation.',
                legalRationale: 'Neutralizes passive-aggressive cultural penalization of healthy boundaries.',
              },
            ],
          },
        },
      },
    },
    {
      id: 4,
      unitNumberRoman: 'Unit IV',
      title: 'Morphological Freedom',
      durationHours: 4,
      primaryOutcome: COURSE_OUTCOMES[3],
      summary: 'Investigate the philosophical grounding of bodily autonomy, distinguish biological enhancement from cybernetic upgrades, evaluate CRISPR gene-editing ethics, and assess employer-mandated enhancements.',
      topics: [
        'Morphological Freedom — definition and philosophical grounding in bodily autonomy',
        'Distinguishing biological enhancement from cybernetic enhancement',
        'CRISPR gene-editing technology — basic mechanisms and ethical debates',
        'Existing legal protections and regulatory gaps for "bio-hacked" individuals',
        'Bodily autonomy as a jurisprudential principle extended to enhancement',
        'Transhumanism versus Bioconservatism debate on human enhancement ethics',
        'Employer-mandated enhancement scenarios and consent concerns',
        'Critical evaluation of the legality and ethics of cybernetic upgrades',
      ],
      quadrants: {
        video: {
          title: 'Masterclass: Bodily Autonomy in the Cybernetic Age — CRISPR, Implants & Law',
          duration: '9:10',
          summary: 'Examine the emerging right of morphological freedom: the right to modify or refuse modification to one’s own body, neural fabric, and genome.',
          chapters: [
            { time: '00:00', seconds: 0, title: 'From Bio-Hacking to Cybernetic Upgrades' },
            { time: '02:20', seconds: 140, title: 'The Transhumanist vs Bioconservative Divide' },
            { time: '04:50', seconds: 290, title: 'CRISPR Cas-9: Somatic vs Germline Boundaries' },
            { time: '07:05', seconds: 425, title: 'The Threat of the Coerced Enhancement' },
          ],
          transcript: [
            {
              id: 't4-1',
              speaker: 'Dr. Zoya Rostova',
              time: '00:05',
              seconds: 5,
              text: 'Morphological freedom is the fundamental extension of bodily autonomy into the 21st century. It guarantees two inseparable rights: the positive liberty to modify one’s body with cybernetic or genomic tools, and the negative liberty to REFUSE enhancement.',
            },
          ],
          keyTakeaways: [
            'Morphological Freedom guarantees both the freedom to modify oneself and the immunity from forced enhancement.',
            'Bioconservatives argue enhancement undermines human dignity and species-typical functioning; transhumanists view enhancement as self-actualization.',
            'Coercive enhancement occurs when non-enhanced citizens are priced out of employment, housing, or healthcare.',
          ],
        },
        text: {
          title: 'Case Study: Legal Protections for "Bio-Hacked" Individuals and Corporate Enhancement Mandates',
          purpose: 'To evaluate the ethics and legal standing of CRISPR-based and cybernetic human enhancement (CO4).',
          task: 'Analyze the case of "AeroSpace Dynamics", which offered a 35% salary incentive for test pilots willing to undergo synthetic night-vision ocular implants and CRISPR myostatin enhancements.',
          criteria: 'Assess whether economic inducements cross the threshold into coercive infringement of bodily autonomy under international bioethics treaties.',
          statutoryFrameworks: [
            {
              name: 'Universal Declaration on the Human Genome and Human Rights (UNESCO 1997)',
              jurisdiction: 'International',
              provisions: 'Article 1: The human genome underlies the fundamental unity of all members of the human family and their inherent dignity.',
            },
            {
              name: 'Oviedo Convention (Council of Europe 1997)',
              jurisdiction: 'Europe',
              provisions: 'Article 13: An intervention seeking to modify the human genome may only be undertaken for preventive, diagnostic or therapeutic purposes.',
            },
          ],
          contentSections: [
            {
              heading: '1. Economic Coercion vs Free Choice in Human Augmentation',
              body: 'When a commercial entity creates lucrative salary differentials ("Enhancement Premiums"), does a worker truly have the right to refuse? In jurisprudence, when refusal results in career stagnation, the choice ceases to be voluntary.',
            },
          ],
          reflectiveQuestions: [
            'Should cybernetic implants integrated into the human nervous system be legally classified as medical prosthetics or private property?',
            'What happens when an employee leaves a company that owns proprietary firmware running on their neural implant?',
          ],
        },
        discussion: {
          topicTitle: 'Debate: The Enhanced Workforce — The Right to Remain Baseline Human',
          provocation: 'If genetically or cybernetically enhanced workers are demonstrably faster, require zero sleep, and eliminate human error, does baseline un-enhanced humanity have a constitutional right to protected employment quotas?',
          initialComments: [
            {
              id: 'c6',
              authorName: 'Prof. Hans Lindqvist',
              authorRole: 'Bioethicist, Uppsala University',
              avatarSeed: 'Hans',
              timestamp: '6 hours ago',
              content: 'If we allow the market to determine enhancement norms, baseline humans will become an unemployable underclass within two generations. We need strict statutory firewalls forbidding enhancement status from being considered in hiring.',
              upvotes: 49,
              isInstructorEndorsed: true,
            },
          ],
        },
        assessment: {
          type: 'drafted_policy',
          title: 'Unit IV Assessment: CRISPR & Cybernetic Enhancement Ethics Evaluation Workbench',
          policyTemplate: {
            policyType: 'crispr_ethics',
            instructions: 'Draft an institutional policy brief evaluating the legal and ethical standing of voluntary and employer-incentivized cybernetic/CRISPR modifications. Formulate statutory clauses that protect workers from forced augmentation and secure device firmware ownership.',
            rubricCriteria: [
              { title: 'Negative Morphological Freedom Guarantee', weight: 30, description: 'Absolute immunity against direct or indirect employment discrimination for remaining baseline un-enhanced.' },
              { title: 'Firmware Sovereignty & Right to Repair', weight: 25, description: 'Ensuring patients own the cryptographic keys and firmware to internal bodily cybernetics.' },
              { title: 'Reversibility & Explant Safeguards', weight: 25, description: 'Corporate liability for safe removal or maintenance of workplace implants upon employment termination.' },
              { title: 'Proportionality & Therapeutic Distinction', weight: 20, description: 'Clear differentiation between restorative medical therapy and competitive enhancement.' },
            ],
            defaultClauses: [
              {
                clauseTitle: 'Clause 1: Baseline Biological Immunity',
                recommendedText: 'No person shall be denied employment, professional advancement, insurance coverage, or educational access based upon their decision not to undergo biological or cybernetic enhancement.',
                legalRationale: 'Protects against the creation of a two-tier biological caste system.',
              },
              {
                clauseTitle: 'Clause 2: Bodily Cybernetic Ownership',
                recommendedText: 'Any device, sensor, or cybernetic upgrade implanted within a human body shall become the inalienable biological property of the recipient. Corporate repossession or telemetry lockouts are criminalized.',
                legalRationale: 'Extends habeas corpus and bodily integrity to embedded internal hardware.',
              },
            ],
          },
        },
      },
    },
    {
      id: 5,
      unitNumberRoman: 'Unit V',
      title: 'The Genetic Divide & DEI',
      durationHours: 4,
      primaryOutcome: COURSE_OUTCOMES[4],
      summary: 'Examine biological classism, the genetic divide as a new axis of social stratification, access and cost concerns for life-extension therapies, and learn to draft an Equity Impact Statement (EIS).',
      topics: [
        'Biological Classism — meaning and its emergence as a societal risk',
        'The Genetic Divide as a new axis of social stratification',
        'Access, cost, and inequality concerns surrounding life-extension technologies',
        'Applying Diversity, Equity, and Inclusion (DEI) principles to biotechnology policy',
        'The structure and purpose of an Equity Impact Statement (EIS)',
        'Case-based analysis of ensuring equitable access to life-extension and enhancement',
        'Policy tools and institutional safeguards to prevent genetic classism',
        'The linkage between morphological freedom (Unit IV) and equity concerns (Unit V)',
      ],
      quadrants: {
        video: {
          title: 'Masterclass: Biological Classism & Drafting the Equity Impact Statement',
          duration: '9:30',
          summary: 'Analyze how high-cost gene therapies and cellular longevity treatments risk turning wealth disparities into hereditary biological advantages, and how to apply the EIS framework.',
          chapters: [
            { time: '00:00', seconds: 0, title: 'The Looming Genetic Divide' },
            { time: '02:30', seconds: 150, title: 'Longevity Therapies as Wealth Multipliers' },
            { time: '05:00', seconds: 300, title: 'The 4 Pillars of an Equity Impact Statement' },
            { time: '07:30', seconds: 450, title: 'Public Subsidies vs Market Monopolies' },
          ],
          transcript: [
            {
              id: 't5-1',
              speaker: 'Elena Morimoto, Esq.',
              time: '00:05',
              seconds: 5,
              text: 'Historically, class inequality was economic: the rich owned factories, the poor provided labor. But when longevity therapies and genetic cognitive enhancements cost millions, class inequality becomes genetic and immutable.',
            },
          ],
          keyTakeaways: [
            'Biological classism occurs when genetic enhancements become hereditary privileges of capital.',
            'An Equity Impact Statement (EIS) is a mandatory ex-ante regulatory assessment evaluating how a new biotech affects historically marginalized groups.',
            'Without affirmative bio-equity mandates, morphological freedom will simply accelerate societal fracture.',
          ],
        },
        text: {
          title: 'Case Study: Ensuring Equitable Access to Life-Extension Technologies & Mitigating Biological Stratification',
          purpose: 'To apply an Equity Impact Statement framework to a futuristic technology policy scenario (CO5).',
          task: 'Evaluate the national rollout of "Telomere-Plus", an epigenetic rejuvenation therapy extending active healthspan by 30 years, priced at $250,000 per treatment course.',
          criteria: 'Draft a 4-pillar Equity Impact Statement proposing sovereign wealth funding, tiered pricing, and anti-discrimination protections.',
          statutoryFrameworks: [
            {
              name: 'International Covenant on Economic, Social and Cultural Rights (ICESCR)',
              jurisdiction: 'United Nations',
              provisions: 'Article 12: The right of everyone to the enjoyment of the highest attainable standard of physical and mental health.',
            },
            {
              name: 'TRIPS Agreement Article 27 & Doha Declaration',
              jurisdiction: 'WTO',
              provisions: 'Permits compulsory licensing of essential pharmaceutical and biomedical innovations to protect public health.',
            },
          ],
          contentSections: [
            {
              heading: '1. The Compounding Advantage of Longevity',
              body: 'A wealthy elite living to 130 years with 25-year-old cognitive vigor will compound compound interest, real estate portfolios, and executive power for over a century, freezing democratic turnover and economic mobility.',
            },
          ],
          reflectiveQuestions: [
            'Should life-extension treatments be categorized as public utility goods financed via sovereign taxation?',
            'What criteria should determine priority access during supply-constrained rollout phases?',
          ],
        },
        discussion: {
          topicTitle: 'Debate: Universal Longevity Rights vs Free-Market Biotech Innovation',
          provocation: 'If pharmaceutical companies spend $20 billion developing cellular rejuvenation therapies, should governments have the legal power to seize patents and enforce universal distribution?',
          initialComments: [
            {
              id: 'c7',
              authorName: 'Amara Diop',
              authorRole: 'Health Equity Advocate, Dakar',
              avatarSeed: 'Amara',
              timestamp: '4 hours ago',
              content: 'If life-extension remains private luxury property, democracy dies. When lifespan is dictated by bank account, all human rights declarations become dead ink. Compulsory licensing under the Doha declaration must be expanded to longevity tech.',
              upvotes: 41,
              isInstructorEndorsed: true,
            },
          ],
        },
        assessment: {
          type: 'drafted_policy',
          title: 'Unit V Assessment: Equity Impact Statement (EIS) Policy Workbench',
          policyTemplate: {
            policyType: 'equity_impact',
            instructions: 'Formulate an Equity Impact Statement (EIS) for the deployment of a breakthrough cellular longevity and cognitive gene therapy. Address systemic cost barriers, resource allocation equity, and institutional safeguards to prevent genetic stratification.',
            rubricCriteria: [
              { title: 'Disproportionate Access Risk Analysis', weight: 25, description: 'Rigorous assessment of how market pricing creates biological inequality across demographic groups.' },
              { title: 'Subsidization & Sovereign Wealth Model', weight: 25, description: 'Viable economic mechanisms (e.g. patent buyouts, progressive taxation) to fund universal access.' },
              { title: 'Genetic Affirmative Protections', weight: 25, description: 'Protections prohibiting genetic credit scoring, biological underwriting, and caste-based discrimination.' },
              { title: 'Democratic Governance & Review Triggers', weight: 25, description: 'Public ethics board oversight with decennial equity audits.' },
            ],
            defaultClauses: [
              {
                clauseTitle: 'Pillar I: Universal Baseline Healthspan Guarantee',
                recommendedText: 'All therapeutic life-extension interventions validated for public health preservation shall be categorized as Essential Public Utilities, provided at point-of-service zero marginal cost through sovereign public health trusts.',
                legalRationale: 'Prevents the biological bifurcation of the human species into long-lived elites and short-lived laborers.',
              },
              {
                clauseTitle: 'Pillar II: Genetic Non-Stratification Mandate',
                recommendedText: 'Insurers, lending institutions, and employers are strictly prohibited from soliciting, analyzing, or pricing services based upon enhanced vs un-enhanced genomic profiles.',
                legalRationale: 'Builds upon the Genetic Information Nondiscrimination Act (GINA) to cover positive enhancement discrimination.',
              },
            ],
          },
        },
      },
    },
    {
      id: 6,
      unitNumberRoman: 'Unit VI',
      title: 'The 2030 Bill of Rights (Capstone)',
      durationHours: 4,
      primaryOutcome: COURSE_OUTCOMES[5],
      summary: 'Synthesize Units I–V using Donella Meadows’ Systems Framework. Stress-test your drafted articles against corporate dystopian scenarios: Synapse-Corp "Bio-Sync Integration" and Aether-X "Elysium Mandate".',
      topics: [
        'Synthesis of futuristic legal and ethical frameworks developed across Units I–V',
        'Meadows Systems Framework: "the parts together produce an effect different from each part on its own"',
        'Principles governing the drafting of a Charter or Bill of Rights',
        'Systems mapping: identifying complex scenario interconnections and feedback loops',
        'The concept of leverage points in policy and legal constitutional design',
        'Scenario A: Synapse-Corp "Bio-Sync Integration" (Mandatory BCI, Genetic Premiums, Twin Surveillance)',
        'Scenario B: Aether-X "Elysium Corporate Mandate" (Executive-only Radiation Resistance, Biometric Enslavement)',
        'Stress-testing proposed legal frameworks against futuristic corporate scenarios',
        'Drafting individual clauses/articles for a comprehensive "2030 Bill of Rights"',
      ],
      quadrants: {
        video: {
          title: 'Masterclass: Systems Thinking, Leverage Points & Drafting the 2030 Charter',
          duration: '10:15',
          summary: 'Discover how Donella Meadows’ systems principles allow us to design constitutional leverage points that resist institutional capture, and prepare for your Capstone project.',
          chapters: [
            { time: '00:00', seconds: 0, title: 'Why Rights Must Be Designed as Systems' },
            { time: '02:40', seconds: 160, title: 'Donella Meadows’ Leverage Points in Law' },
            { time: '05:20', seconds: 320, title: 'Deconstructing Synapse-Corp & Aether-X' },
            { time: '08:00', seconds: 480, title: 'Charter Architecture & Capstone Protocol' },
          ],
          transcript: [
            {
              id: 't6-1',
              speaker: 'Prof. Julian Sterling',
              time: '00:05',
              seconds: 5,
              text: 'Welcome to the Capstone Unit. As Donella Meadows taught us in Thinking in Systems: the parts together produce an effect different from each part on its own. You cannot solve neuro-privacy in isolation from data sovereignty, nor morphological freedom without equity.',
            },
          ],
          keyTakeaways: [
            'A Charter of Rights is a cybernetic negative feedback loop designed to prevent runaway systemic exploitation.',
            'Highest leverage points in legal design: shifting the goals of the system (Leverage Point #3) and the mindset/paradigm out of which the system arises (Leverage Point #2).',
            'Your Capstone must defend human sovereignty against simultaneous attacks on cognition, identity, time, and biology.',
          ],
        },
        text: {
          title: 'Capstone Dossier: Synapse-Corp & Aether-X Corporate Stress-Testing Scenarios',
          purpose: 'To draft a comprehensive "Charter of Rights" for a futuristic institution, synthesising Units I–V using systems thinking (CO6).',
          task: 'Draft a 6-article "2030 Bill of Rights" and stress-test every clause against two concrete corporate overreach scenarios.',
          criteria: 'Demonstrate resilience against mandatory neural telemetry, genetic classism, biometric extraction, and captive digital twins.',
          statutoryFrameworks: [
            {
              name: 'Donella Meadows Systems Leverage Framework',
              jurisdiction: 'Theoretical Systems Science',
              provisions: '12 Leverage Points to Intervene in a System — focusing on Information Flows, System Rules, and Paradigms.',
            },
            {
              name: 'Universal Declaration of Human Rights (UDHR) 1948',
              jurisdiction: 'Global Baseline',
              provisions: 'Articles 1, 3, 12, and 23 as foundational baselines to be extended into the post-human era.',
            },
          ],
          contentSections: [
            {
              heading: '1. Corporate Scenario A: Synapse-Corp "Bio-Sync Integration"',
              body: 'In 2030, Synapse-Corp announces its "Bio-Sync Integration Initiative": all employees must install a cranial BCI link for real-time workflow coordination. Non-compliant staff are relegated to remote status, where continuous Digital Twin monitoring tracks their keystrokes and gaze. Employees who elect CRISPR cognitive enhancement receive a 40% "Genetic Premium" bonus.',
            },
            {
              heading: '2. Corporate Scenario B: Aether-X "Elysium Mandate"',
              body: 'Aether-X, a deep-space and hazardous materials contractor, offers executive staff a proprietary Radiation Resistance therapy and mandatory Neural-Link upgrades. Subordinate technicians work in high-exposure orbital facilities without biological protection, their emotional distress suppressed via forced transdermal neuro-calm patches.',
            },
          ],
          reflectiveQuestions: [
            'Which specific article in your 2030 Charter legally dismantles Synapse-Corp’s "Genetic Premium"?',
            'How does your Charter guarantee device firmware open access so Aether-X cannot brick a dissenting employee’s neural implants?',
          ],
        },
        discussion: {
          topicTitle: 'Capstone Colosseum: Stress-Testing the 2030 Charter against Corporate Hegemony',
          provocation: 'Can any legal charter or bill of rights survive against trillion-dollar private corporations possessing autonomous AI agents, proprietary gene patents, and orbital monopolies without global enforcement machinery?',
          initialComments: [
            {
              id: 'c8',
              authorName: 'Justice Maya Al-Khatib',
              authorRole: 'International Court of Justice Consultant',
              avatarSeed: 'Maya',
              timestamp: '1 day ago',
              content: 'The Meadows framework teaches us that the rules of the system govern its behavior. When corporate charters require human rights compliance as a condition of corporate legal personhood, capital must bend to constitutional boundaries.',
              upvotes: 56,
              isInstructorEndorsed: true,
            },
          ],
        },
        assessment: {
          type: 'capstone_synthesis',
          title: 'Capstone Project: Drafting & Stress-Testing The 2030 Bill of Rights',
          capstoneScenarios: [
            {
              id: 'synapse-corp',
              name: 'Synapse-Corp "Bio-Sync Integration"',
              tagline: 'Mandatory Cranial BCI, Genetic Premium Bonus & Digital Twin Telemetry',
              corporateContext: 'Synapse-Corp mandates Neural-Link installation, awards 40% salary bonuses to CRISPR-enhanced employees, and deploys predictive digital twins to shadow and evaluate non-augmented workers.',
              pressureTestEvents: [
                {
                  eventTitle: 'Mandatory Cranial Link Installation',
                  infringementDescription: 'Attempt to terminate employee who refused invasive neural sensor installation on cognitive liberty grounds.',
                  targetedArticle: 'Article 1: Inviolable Cognitive Liberty & Mental Integrity',
                },
                {
                  eventTitle: '40% Genetic Premium Compensation Stratification',
                  infringementDescription: 'Institution of unequal pay scales favoring genetically augmented employees over natural humans.',
                  targetedArticle: 'Article 5: Genetic Equity & Anti-Biological Classism',
                },
                {
                  eventTitle: 'Surrogate Digital Twin Telemetry Capture',
                  infringementDescription: 'Extracting behavioral twin embeddings to replace departing non-compliant senior staff.',
                  targetedArticle: 'Article 2: Self-Sovereign Identity & Digital Twin Inalienability',
                },
              ],
            },
            {
              id: 'aether-x',
              name: 'Aether-X "Elysium Corporate Mandate"',
              tagline: 'Executive-Only Bio-Therapies, Forced Neuro-Calm Patches & Biometric Lockdown',
              corporateContext: 'Aether-X provides life-preserving radiation resistance exclusively to executive leadership while suppressing line worker grievances via automated neuro-calm biometric dispensers.',
              pressureTestEvents: [
                {
                  eventTitle: 'Executive-Only Biological Tiering',
                  infringementDescription: 'Withholding life-preserving cellular therapies from hazardous-duty workers while reserving them for executives.',
                  targetedArticle: 'Article 5: Genetic Equity & Universal Life-Preservation Access',
                },
                {
                  eventTitle: 'Forced Neuro-Calm Emotional Suppression',
                  infringementDescription: 'Automated chemical-transdermal suppression of worker dissent and strike organization.',
                  targetedArticle: 'Article 4: Morphological Freedom & Bodily Immunity',
                },
                {
                  eventTitle: '24/7 Orbital Station Availability Mandate',
                  infringementDescription: 'Subjecting off-duty personnel to continuous cognitive sleep-interruption alerts.',
                  targetedArticle: 'Article 3: Chrono-Autonomy & The Inviolable Right to Disconnect',
                },
              ],
            },
          ],
        },
      },
    },
  ],
};
