import React from 'react';
import { Shield, BookOpen, Award, Users, CheckCircle, ArrowRight, Mail, Globe, MapPin, Sparkles, Scale, GraduationCap } from 'lucide-react';
import { SrcaaLogo } from './SrcaaLogo';

interface AboutUsPageProps {
  onEnterCourse: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ onEnterCourse }) => {
  const faculty = [
    {
      name: 'Dr. Evelyn Vasquez',
      title: 'Chair of Neuro-Jurisprudence, SRCAA',
      affiliation: 'Post-Human Jurisprudence Council',
      bio: 'Pioneered comparative legal frameworks for brain-computer interface privacy. Consulted on the Chilean Ley de Neuroderechos constitutional reform and authored foundational publications on workplace cognitive liberty.',
      specialty: 'Comparative Neuro-Rights & Cognitive Liberty',
    },
    {
      name: 'Prof. Tariq Al-Mansoor',
      title: 'Dean of Post-Human Studies',
      affiliation: 'SRCAA Academic Senate',
      bio: 'Leading scholar on algorithmic agency, post-human personhood, and biological enhancement jurisprudence. Specializes in balancing morphological freedom with anti-discrimination statutes.',
      specialty: 'AI Personhood & Enhancement Ethics',
    },
    {
      name: 'Elena Vance, LL.M.',
      title: 'Director of Digital Sovereignty Research',
      affiliation: 'SRCAA Future Rights Lab',
      bio: 'Specialist in decentralized identity architectures, biometric data governance, and the EU AI Act. Co-architect of the SRCAA 2030 Model Bill of Rights framework.',
      specialty: 'Self-Sovereign Identity & Biometrics',
    },
    {
      name: 'Marcus Sterling, Ph.D.',
      title: 'Senior Systems Thinking Fellow',
      affiliation: 'Meadows Policy Simulation Unit',
      bio: 'Expert in complex adaptive systems and institutional leverage points. Designed the Meadows Stress-Testing engine used in Quadrant IV capstone evaluations.',
      specialty: 'Systems Dynamics & Regulatory Design',
    },
  ];

  const pillars = [
    {
      keyword: 'Learn',
      title: 'Inclusive & Frontier Knowledge',
      desc: 'Democratizing access to high-rigor legal and ethical education through fully accessible (WCAG 2.1 AA) four-quadrant digital courses.',
      color: 'text-amber-800 bg-amber-100 border-amber-300',
    },
    {
      keyword: 'Research',
      title: 'Interdisciplinary Jurisprudence',
      desc: 'Conducting empirical research at the intersection of neuroscience, machine learning architectures, labor economics, and human rights charters.',
      color: 'text-[#8C2528] bg-red-100 border-red-300',
    },
    {
      keyword: 'Innovate',
      title: 'Simulated Policy Sandboxes',
      desc: 'Moving beyond passive lectures to interactive drafting workbenches, automated rubric grading, and corporate infringement stress-testing.',
      color: 'text-blue-800 bg-blue-100 border-blue-300',
    },
    {
      keyword: 'Grow',
      title: 'Verified Competency Credentials',
      desc: 'Empowering lawyers, ethicists, policy makers, and enterprise leaders with verifiably tracked outcomes (CO1–CO6) and tamper-evident diplomas.',
      color: 'text-emerald-800 bg-emerald-100 border-emerald-300',
    },
  ];

  return (
    <div className="space-y-16 py-8">
      {/* Header Section */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50 via-white to-amber-50/20 px-6 py-16 sm:px-12 text-center">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-xs font-semibold text-amber-900">
            <SrcaaLogo size={20} showTagline={false} />
            <span>ESTABLISHED 2026 · SRCAA ACADEMY</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            About <span className="text-[#8C2528]">SRCAA Academy</span>
          </h1>

          <p className="font-display italic text-lg sm:text-xl text-amber-900 font-medium">
            "Learn. Research. Innovate. Grow."
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            The Society for Research & Academic Affairs (SRCAA) Academy is an independent research and higher education institution dedicated to formulating legal safeguards, ethical standards, and educational models for an era shaped by artificial intelligence and bio-technological enhancement.
          </p>
        </div>
      </section>

      {/* The Four Core Pillars */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-[#8C2528]">
            Our Institutional Motto
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
            The Four Pillars of SRCAA
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Every course, research paper, and interactive simulator created at SRCAA Academy embodies these four continuous actions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3 shadow-xs hover:border-slate-300 transition-colors"
            >
              <div className={`inline-flex px-3 py-1 rounded-lg text-xs font-bold border ${p.color}`}>
                {p.keyword}
              </div>
              <h3 className="font-display text-base font-bold text-slate-900">
                {p.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Faculty & Academic Leadership */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#8C2528] mb-1">
              Scholarly Faculty
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
              Academic Senate & Course Directors
            </h2>
          </div>
          <div className="text-xs text-slate-500">
            Interdisciplinary leaders in law, neuroscience, and computational ethics
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faculty.map((f, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3 shadow-xs"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold text-slate-900">
                    {f.name}
                  </h3>
                  <div className="text-xs font-semibold text-[#8C2528]">{f.title}</div>
                  <div className="text-[11px] text-slate-400">{f.affiliation}</div>
                </div>
                <div className="rounded-lg bg-amber-50 border border-amber-200 p-2 text-amber-800">
                  <GraduationCap className="h-5 w-5" />
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                {f.bio}
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                <span className="font-medium text-slate-700">Specialty:</span>
                <span>{f.specialty}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pedagogical Governance & Standards */}
      <section className="rounded-2xl border border-slate-200 bg-slate-50/70 p-8 sm:p-10 space-y-6">
        <div className="max-w-2xl space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-[#8C2528]">
            Quality Assurance & Standards
          </div>
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Accreditation & Pedagogical Integrity
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            SRCAA Academy courses adhere to internationally recognized higher education frameworks:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-2 shadow-xs">
            <h4 className="font-display text-sm font-bold text-slate-900">
              UGC / SWAYAM Four Quadrants
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every course integrates Quadrant I (e-Tutorial Video), Quadrant II (e-Content Text & Reading), Quadrant III (Discussion Forum), and Quadrant IV (Self-Assessment & Rubric).
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-2 shadow-xs">
            <h4 className="font-display text-sm font-bold text-slate-900">
              TILT Framework (Transparency)
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Assignments and readings explicitly state Purpose, Task, and Criteria, removing ambiguities and accelerating practical application for adult professionals.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-2 shadow-xs">
            <h4 className="font-display text-sm font-bold text-slate-900">
              Donella Meadows Systems Model
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Capstones evaluate whether drafted human rights laws can withstand the 12 leverage points against regulatory capture and corporate evasion.
            </p>
          </div>
        </div>
      </section>

      {/* Contact & Registrar */}
      <section className="rounded-2xl border border-slate-200 bg-white p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
          <div className="space-y-3">
            <h3 className="font-display text-xl font-bold text-slate-900">
              Office of the Academic Registrar
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              For institutional licensing, credential verification requests, custom corporate cohorts, or research inquiries, contact our registrar desk:
            </p>
            <div className="space-y-1.5 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#8C2528]" />
                <span className="font-mono">srcaaweb@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-[#8C2528]" />
                <span>www.srcaa.academy (Research & Accreditation Registry)</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={onEnterCourse}
              className="flex items-center gap-2 rounded-xl bg-[#8C2528] px-6 py-3 text-xs font-semibold text-white hover:bg-[#A83236] transition-colors shadow-sm"
            >
              <span>Explore The Post-Human Charter MOOC</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
