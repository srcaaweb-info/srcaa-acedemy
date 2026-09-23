import React, { useState } from 'react';
import { Terminal, X, Play, Copy, Check } from 'lucide-react';

interface ApiExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiExplorerModal: React.FC<ApiExplorerModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const endpoints = [
    { method: 'GET', path: '/api/course', desc: 'Fetch course syllabus, units, and learning outcomes' },
    { method: 'GET', path: '/api/progress', desc: 'Real-time learner progress, completed quadrants & outcome mastery' },
    { method: 'GET', path: '/api/course/lock-status', desc: 'Check global platform course lock configuration & rules' },
    { method: 'GET', path: '/api/auth/me', desc: 'Current authenticated session identity and learner role' },
    { method: 'GET', path: '/api/analytics', desc: 'Cohort analytics & completion rate velocity vs 45% goal' },
    { method: 'GET', path: '/api/discussions/1', desc: 'Fetch unit 1 moderated social debate arguments' },
    { method: 'GET', path: '/api/certificate', desc: 'Verify and retrieve future rights specialist credential' },
  ];

  const [selectedEndpoint, setSelectedEndpoint] = useState(endpoints[1]);
  const [responseJson, setResponseJson] = useState<string>('Click "Execute Query" to inspect live response...');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleExecute = async () => {
    setLoading(true);
    try {
      const res = await fetch(selectedEndpoint.path);
      const data = await res.json();
      setResponseJson(JSON.stringify(data, null, 2));
    } catch (err) {
      setResponseJson(JSON.stringify({ error: String(err) }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(responseJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3.5">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <Terminal className="h-4 w-4 text-[#8C2528]" />
            <span>SRCAA Academy Full-Stack API Architecture & Live Explorer</span>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 overflow-y-auto">
          <div>
            <label className="text-xs font-bold text-slate-700 mb-1.5 block">
              Select REST API Endpoint:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {endpoints.map((ep, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedEndpoint(ep)}
                  className={`text-left p-2.5 rounded-xl border text-xs transition-colors ${
                    selectedEndpoint.path === ep.path
                      ? 'border-[#8C2528] bg-red-50 text-slate-900 shadow-2xs font-medium'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-mono mb-0.5">
                    <span className="font-bold text-[#8C2528]">{ep.method}</span>
                    <span className="text-slate-800">{ep.path}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{ep.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={handleExecute}
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-[#8C2528] px-4 py-2 text-xs font-semibold text-white hover:bg-[#A83236] transition-colors disabled:opacity-50 shadow-xs"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>{loading ? 'Querying Backend...' : 'Execute Query'}</span>
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Response'}</span>
            </button>
          </div>

          {/* Response Box */}
          <div className="relative rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-emerald-400 max-h-64 overflow-y-auto">
            <pre className="whitespace-pre-wrap">{responseJson}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};
