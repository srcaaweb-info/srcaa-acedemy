import React, { useState } from 'react';
import { X, Video, GitBranch, Copy, Check, ExternalLink, Play, Sparkles, AlertCircle, Save } from 'lucide-react';
import { Course } from '../types/course';

interface VideoAndGitGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
  onVideoUpdated?: (unitId: number, newUrl: string) => void;
}

export const VideoAndGitGuideModal: React.FC<VideoAndGitGuideModalProps> = ({
  isOpen,
  onClose,
  course,
  onVideoUpdated,
}) => {
  const [activeTab, setActiveTab] = useState<'video' | 'git'>('video');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Live video linker form state
  const [selectedUnitId, setSelectedUnitId] = useState<number>(1);
  const [videoUrlInput, setVideoUrlInput] = useState<string>('');
  const [isSavingVideo, setIsSavingVideo] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  if (!isOpen) return null;

  const currentUnit = course.units.find((u) => u.id === selectedUnitId) || course.units[0];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSaveVideoUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrlInput.trim()) return;

    setIsSavingVideo(true);
    setSaveSuccessMsg('');
    try {
      const res = await fetch('/api/course/update-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unitId: selectedUnitId,
          videoUrl: videoUrlInput.trim(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSaveSuccessMsg(`Success! Unit ${selectedUnitId} video link updated to: ${videoUrlInput.trim()}`);
        if (onVideoUpdated) {
          onVideoUpdated(selectedUnitId, videoUrlInput.trim());
        }
      }
    } catch (err) {
      setSaveSuccessMsg('Error updating video link on server.');
    } finally {
      setIsSavingVideo(false);
    }
  };

  const gitCommands = [
    {
      title: '1. Initialize Local Git Repository',
      cmd: 'git init',
      desc: 'Initializes a new Git tracking repository in your project folder (skip if already a git repo).',
    },
    {
      title: '2. Stage All Changes & New Files',
      cmd: 'git add .',
      desc: 'Stages all project files, components, and assets ready for commit.',
    },
    {
      title: '3. Create a Descriptive Commit',
      cmd: 'git commit -m "feat: SRCAA Academy light theme with auth, home, about us, and progression locks"',
      desc: 'Commits your staged code to the local history.',
    },
    {
      title: '4. Set Default Branch to main',
      cmd: 'git branch -M main',
      desc: 'Ensures your primary deployment branch is standardized as main.',
    },
    {
      title: '5. Connect to Your Remote GitHub Repository',
      cmd: 'git remote add origin https://github.com/YOUR_USERNAME/srcaa-academy.git',
      desc: 'Replace YOUR_USERNAME with your GitHub username or organization name.',
    },
    {
      title: '6. Push Code to GitHub',
      cmd: 'git push -u origin main',
      desc: 'Uploads your branch to GitHub and sets up upstream tracking.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh] my-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#8C2528] text-amber-300">
              {activeTab === 'video' ? <Video className="h-4 w-4" /> : <GitBranch className="h-4 w-4" />}
            </div>
            <div>
              <h2 className="font-display text-base font-bold text-slate-900">
                SRCAA Academy Technical Guide
              </h2>
              <p className="text-[11px] text-slate-500">
                Course Lecture Video Linking & Git Deployment Instructions
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
            aria-label="Close guide modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-white px-6 pt-3 gap-6">
          <button
            onClick={() => setActiveTab('video')}
            className={`flex items-center gap-2 pb-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'video'
                ? 'border-[#8C2528] text-[#8C2528]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Video className="h-4 w-4" />
            <span>How to Link Course Overall Videos</span>
          </button>

          <button
            onClick={() => setActiveTab('git')}
            className={`flex items-center gap-2 pb-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'git'
                ? 'border-[#8C2528] text-[#8C2528]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <GitBranch className="h-4 w-4" />
            <span>How to Push to GitHub / Git</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {activeTab === 'video' ? (
            <div className="space-y-6">
              {/* Overview */}
              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 space-y-2 text-xs text-amber-950">
                <div className="font-bold flex items-center gap-1.5 text-[#8C2528]">
                  <Sparkles className="h-4 w-4" />
                  <span>Where Lecture Videos are Configured</span>
                </div>
                <p className="leading-relaxed text-slate-700">
                  Each unit's lecture video is mapped in <code className="rounded bg-white px-1.5 py-0.5 font-mono text-[#8C2528] border border-amber-200">src/data/courseData.ts</code> inside the <code className="font-mono text-slate-800">quadrants.video</code> object. You can specify a YouTube URL, Vimeo link, or direct MP4/HLS link.
                </p>
              </div>

              {/* Supported Video Types */}
              <div className="space-y-3">
                <h3 className="font-display text-sm font-bold text-slate-900">
                  Supported Video Link Formats
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-1">
                    <div className="font-bold text-red-600">YouTube Embeds</div>
                    <p className="text-slate-500 text-[11px]">
                      Paste standard YouTube URL or embed link:
                    </p>
                    <code className="text-[10px] font-mono text-slate-700 block break-all">
                      https://www.youtube.com/embed/VIDEO_ID
                    </code>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-1">
                    <div className="font-bold text-blue-600">Vimeo Embeds</div>
                    <p className="text-slate-500 text-[11px]">
                      Paste Vimeo player URL:
                    </p>
                    <code className="text-[10px] font-mono text-slate-700 block break-all">
                      https://player.vimeo.com/video/VIDEO_ID
                    </code>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-1">
                    <div className="font-bold text-emerald-600">Direct MP4 / CDN</div>
                    <p className="text-slate-500 text-[11px]">
                      Paste direct cloud file URL:
                    </p>
                    <code className="text-[10px] font-mono text-slate-700 block break-all">
                      https://your-domain.com/lecture.mp4
                    </code>
                  </div>
                </div>
              </div>

              {/* Live Video Linker Tool */}
              <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-sm font-bold text-slate-900">
                    Live Video Linker & Tester
                  </h3>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Session API Active
                  </span>
                </div>

                <form onSubmit={handleSaveVideoUrl} className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Choose Unit to Link Video:
                    </label>
                    <select
                      value={selectedUnitId}
                      onChange={(e) => {
                        const id = Number(e.target.value);
                        setSelectedUnitId(id);
                        const u = course.units.find((unit) => unit.id === id);
                        setVideoUrlInput(u?.quadrants.video.videoPlaceholderUrl || '');
                        setSaveSuccessMsg('');
                      }}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-[#8C2528] focus:outline-none"
                    >
                      {course.units.map((u) => (
                        <option key={u.id} value={u.id}>
                          {u.unitNumberRoman}: {u.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Paste Lecture Video URL (YouTube, Vimeo, or MP4):
                    </label>
                    <input
                      type="url"
                      value={videoUrlInput}
                      onChange={(e) => setVideoUrlInput(e.target.value)}
                      placeholder="https://www.youtube.com/embed/VIDEO_ID or https://cdn.example.com/video.mp4"
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:border-[#8C2528] focus:outline-none"
                    />
                  </div>

                  {saveSuccessMsg && (
                    <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-2.5 text-xs text-emerald-800">
                      {saveSuccessMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSavingVideo}
                    className="flex items-center gap-1.5 rounded-lg bg-[#8C2528] px-4 py-2 text-xs font-semibold text-white hover:bg-[#A83236] transition-colors disabled:opacity-50"
                  >
                    <Save className="h-3.5 w-3.5" />
                    <span>{isSavingVideo ? 'Updating...' : `Save Video for Unit ${selectedUnitId}`}</span>
                  </button>
                </form>
              </div>

              {/* Code Snippet Example */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-800">
                  Example in src/data/courseData.ts:
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-[11px] text-slate-200 overflow-x-auto">
                  <pre>{`// Inside unit 1 in src/data/courseData.ts:
quadrants: {
  video: {
    title: 'Masterclass: The Frontier of Cognitive Liberty',
    duration: '9:45',
    videoPlaceholderUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID', // <-- ADD YOUR LINK HERE
    summary: '...',
    chapters: [...],
    transcript: [...],
  }
}`}</pre>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Git Overview */}
              <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-4 text-xs text-blue-950 space-y-2">
                <div className="font-bold flex items-center gap-1.5 text-blue-800">
                  <GitBranch className="h-4 w-4" />
                  <span>How to Push to GitHub / Version Control</span>
                </div>
                <p className="leading-relaxed text-slate-700">
                  Follow these standard Git steps in your terminal inside the project directory to publish and push your entire SRCAA Academy codebase to GitHub or your organization's repository.
                </p>
              </div>

              {/* Step-by-step commands */}
              <div className="space-y-4">
                {gitCommands.map((step, idx) => (
                  <div key={idx} className="rounded-xl border border-slate-200 bg-white p-4 space-y-2 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{step.title}</span>
                      <button
                        onClick={() => handleCopy(step.cmd, idx)}
                        className="flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-600" />
                            <span className="text-emerald-700">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>Copy Command</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="rounded-lg bg-slate-900 px-3 py-2 font-mono text-xs text-amber-300 overflow-x-auto">
                      {step.cmd}
                    </div>

                    <p className="text-[11px] text-slate-500">{step.desc}</p>
                  </div>
                ))}
              </div>

              {/* One-Line Full Sequence */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>Single-Line Command (Quick Push):</span>
                  <button
                    onClick={() =>
                      handleCopy(
                        'git add . && git commit -m "feat: update SRCAA Academy" && git push',
                        99
                      )
                    }
                    className="flex items-center gap-1 text-[11px] text-[#8C2528] hover:underline"
                  >
                    {copiedIndex === 99 ? 'Copied!' : 'Copy One-Liner'}
                  </button>
                </div>
                <div className="rounded-lg bg-slate-900 px-3 py-2 font-mono text-xs text-amber-300 overflow-x-auto">
                  git add . && git commit -m "feat: update SRCAA Academy" && git push
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 bg-slate-50 px-6 py-3.5 flex items-center justify-between text-xs text-slate-500">
          <span>SRCAA Academy · Engineering & Faculty Support Desk</span>
          <button
            onClick={onClose}
            className="rounded-lg bg-[#8C2528] px-4 py-1.5 font-semibold text-white hover:bg-[#A83236] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
