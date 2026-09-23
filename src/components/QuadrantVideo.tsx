import React, { useState, useEffect } from 'react';
import { VideoQuadrant } from '../types/course';
import { Play, Pause, RotateCcw, Volume2, VolumeX, CheckCircle, Wifi, ListOrdered, FileText, Link, Sparkles, ExternalLink } from 'lucide-react';

interface QuadrantVideoProps {
  unitId: number;
  video: VideoQuadrant;
  isCompleted: boolean;
  onMarkCompleted: () => void;
  lowBandwidth: boolean;
  onOpenVideoLinker?: () => void;
}

export const QuadrantVideo: React.FC<QuadrantVideoProps> = ({
  unitId,
  video,
  isCompleted,
  onMarkCompleted,
  lowBandwidth,
  onOpenVideoLinker,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [activeTab, setActiveTab] = useState<'transcript' | 'chapters' | 'takeaways'>('transcript');

  // Parse total duration into seconds (~9:45 default)
  const totalSeconds = 9 * 60 + 45;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSeconds((prev) => {
          if (prev >= totalSeconds) {
            setIsPlaying(false);
            onMarkCompleted();
            return totalSeconds;
          }
          return prev + playbackSpeed;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, totalSeconds, onMarkCompleted]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const jumpToTime = (secs: number) => {
    setCurrentSeconds(secs);
    setIsPlaying(true);
  };

  // Helper to determine if an external URL is provided
  const hasExternalVideo = Boolean(video.videoPlaceholderUrl && video.videoPlaceholderUrl.startsWith('http'));

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8C2528] mb-1">
            <span>Quadrant I · Masterclass Video</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-slate-500">{video.duration} runtime</span>
            {hasExternalVideo && (
              <>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px] font-medium border border-emerald-200">
                  External Stream Linked
                </span>
              </>
            )}
          </div>
          <h2 className="text-xl font-bold text-slate-900">{video.title}</h2>
        </div>

        <div className="flex items-center gap-2">
          {onOpenVideoLinker && (
            <button
              onClick={onOpenVideoLinker}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
              title="Link custom YouTube, Vimeo, or MP4 video"
            >
              <Link className="h-3.5 w-3.5 text-[#8C2528]" />
              <span>Link Video</span>
            </button>
          )}

          {isCompleted ? (
            <div className="flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
              <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
              <span>Module Watched</span>
            </div>
          ) : (
            <button
              onClick={onMarkCompleted}
              className="flex items-center gap-1.5 rounded-lg border border-[#8C2528]/30 bg-red-50 px-3 py-1.5 text-xs font-semibold text-[#8C2528] hover:bg-red-100 transition-colors shadow-xs"
            >
              <CheckCircle className="h-3.5 w-3.5" />
              <span>Mark as Completed</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Video Player + Interactive Transcript/Chapters */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Video Screen / Simulation Deck */}
        <div className="lg:col-span-7 space-y-3">
          {lowBandwidth ? (
            /* Low-bandwidth textual mode */
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-900">
                <Wifi className="h-4 w-4" />
                <span>Low-Bandwidth Optimized Mode Active</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                Video streaming paused to conserve data and ensure high accessibility. The complete synchronized masterclass lecture transcript and conceptual key takeaways are displayed on the right.
              </p>
              <div className="rounded-lg border border-slate-200 bg-white p-4 space-y-2">
                <div className="text-xs font-semibold text-slate-800">Lecturer Summary</div>
                <p className="text-xs text-slate-600 leading-relaxed">{video.summary}</p>
              </div>
            </div>
          ) : hasExternalVideo ? (
            /* Embedded Real Video Stream (YouTube, Vimeo, or HTML5) */
            <div className="relative overflow-hidden rounded-xl border border-slate-300 bg-black shadow-lg aspect-video">
              {video.videoPlaceholderUrl?.includes('youtube') || video.videoPlaceholderUrl?.includes('vimeo') ? (
                <iframe
                  src={
                    video.videoPlaceholderUrl.includes('watch?v=')
                      ? video.videoPlaceholderUrl.replace('watch?v=', 'embed/')
                      : video.videoPlaceholderUrl
                  }
                  title={video.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={video.videoPlaceholderUrl}
                  controls
                  className="w-full h-full object-cover"
                  onEnded={onMarkCompleted}
                />
              )}
            </div>
          ) : (
            /* High-Fidelity Simulation Masterclass Deck */
            <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-xl aspect-video flex flex-col justify-between p-4">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-[#8C2528]/25" />

              {/* Top Header inside player */}
              <div className="relative z-10 flex items-center justify-between text-xs text-slate-300">
                <span className="font-semibold tracking-wide text-amber-400">SRCAA MASTERCLASS SERIES</span>
                <span className="font-mono">{formatTime(currentSeconds)} / {video.duration}</span>
              </div>

              {/* Center Play Indicator */}
              <div className="relative z-10 flex flex-col items-center justify-center my-auto space-y-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-[#8C2528] text-amber-200 border-2 border-amber-400/80 shadow-xl transition-transform hover:scale-105 active:scale-95 hover:bg-[#A83236]"
                  aria-label={isPlaying ? 'Pause masterclass' : 'Play masterclass'}
                >
                  {isPlaying ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7 ml-1" />}
                </button>
                <div className="text-xs text-slate-200 font-medium">
                  {isPlaying ? 'Lecture Simulation in Progress...' : 'Click to stream Masterclass Deck'}
                </div>
              </div>

              {/* Bottom Player Controls */}
              <div className="relative z-10 space-y-2">
                {/* Progress bar */}
                <div
                  className="relative h-2 w-full cursor-pointer rounded-full bg-slate-800/80 overflow-hidden"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const pct = clickX / rect.width;
                    setCurrentSeconds(pct * totalSeconds);
                  }}
                >
                  <div
                    className="h-full bg-amber-400 transition-all duration-200"
                    style={{ width: `${(currentSeconds / totalSeconds) * 100}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="hover:text-amber-400 transition-colors"
                    >
                      {isPlaying ? 'Pause' : 'Play'}
                    </button>
                    <button
                      onClick={() => setCurrentSeconds(0)}
                      className="hover:text-amber-400 transition-colors"
                      title="Rewind to start"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                    </button>
                    <span className="font-mono text-slate-400">
                      {formatTime(currentSeconds)} / {video.duration}
                    </span>
                  </div>

                  {/* Playback speed toggle */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400">Speed:</span>
                    {[1.0, 1.25, 1.5].map((spd) => (
                      <button
                        key={spd}
                        onClick={() => setPlaybackSpeed(spd)}
                        className={`px-1.5 py-0.5 rounded text-[11px] font-mono transition-colors ${
                          playbackSpeed === spd
                            ? 'bg-amber-500/20 text-amber-300 font-bold'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {spd}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Module Summary note */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
            <h4 className="text-xs font-bold text-slate-800 mb-1">Executive Module Overview</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{video.summary}</p>
          </div>
        </div>

        {/* Interactive Deck: Transcript & Chapters */}
        <div className="lg:col-span-5 rounded-xl border border-slate-200 bg-white shadow-2xs flex flex-col h-[460px]">
          {/* Deck Tabs */}
          <div className="flex items-center border-b border-slate-200 p-2 gap-1 bg-slate-50/70">
            <button
              onClick={() => setActiveTab('transcript')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'transcript'
                  ? 'bg-white text-[#8C2528] font-bold shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Interactive Transcript</span>
            </button>
            <button
              onClick={() => setActiveTab('chapters')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'chapters'
                  ? 'bg-white text-[#8C2528] font-bold shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <ListOrdered className="h-3.5 w-3.5" />
              <span>Chapters</span>
            </button>
            <button
              onClick={() => setActiveTab('takeaways')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'takeaways'
                  ? 'bg-white text-[#8C2528] font-bold shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>Key Takeaways</span>
            </button>
          </div>

          {/* Deck Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
            {activeTab === 'transcript' && (
              <div className="space-y-3">
                <p className="text-[11px] text-slate-500 italic">
                  Click any line to jump video playback directly to that argument.
                </p>
                {video.transcript.map((item) => {
                  const isActive =
                    currentSeconds >= item.seconds &&
                    currentSeconds < item.seconds + 90;

                  return (
                    <button
                      key={item.id}
                      onClick={() => jumpToTime(item.seconds)}
                      className={`w-full text-left p-2.5 rounded-lg border transition-all ${
                        isActive
                          ? 'border-[#8C2528]/40 bg-red-50/70 text-slate-900 shadow-xs'
                          : 'border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-[#8C2528]">{item.speaker}</span>
                        <span className="font-mono text-[11px] text-slate-400">{item.time}</span>
                      </div>
                      <p className="leading-relaxed text-slate-700">{item.text}</p>
                    </button>
                  );
                })}
              </div>
            )}

            {activeTab === 'chapters' && (
              <div className="space-y-2">
                {video.chapters.map((ch, idx) => (
                  <button
                    key={idx}
                    onClick={() => jumpToTime(ch.seconds)}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 transition-colors text-left"
                  >
                    <span className="text-slate-800 font-semibold">{ch.title}</span>
                    <span className="font-mono text-[#8C2528] text-[11px] font-bold">{ch.time}</span>
                  </button>
                ))}
              </div>
            )}

            {activeTab === 'takeaways' && (
              <div className="space-y-3">
                {video.keyTakeaways.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 rounded-lg border border-slate-200 bg-slate-50 p-3"
                  >
                    <span className="font-mono text-[#8C2528] font-bold">0{idx + 1}.</span>
                    <p className="text-slate-700 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
