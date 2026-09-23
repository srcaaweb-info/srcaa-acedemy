import React from 'react';
import { X, Eye, Type, Wifi, Zap, Check } from 'lucide-react';

interface AccessibilityToolbarProps {
  isOpen: boolean;
  onClose: () => void;
  fontSize: 'normal' | 'large' | 'xl';
  setFontSize: (size: 'normal' | 'large' | 'xl') => void;
  dyslexiaMode: boolean;
  setDyslexiaMode: (v: boolean) => void;
  highContrast: boolean;
  setHighContrast: (v: boolean) => void;
  lowBandwidth: boolean;
  setLowBandwidth: (v: boolean) => void;
}

export const AccessibilityToolbar: React.FC<AccessibilityToolbarProps> = ({
  isOpen,
  onClose,
  fontSize,
  setFontSize,
  dyslexiaMode,
  setDyslexiaMode,
  highContrast,
  setHighContrast,
  lowBandwidth,
  setLowBandwidth,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Accessibility & Display Controls</h3>
            <p className="text-xs text-slate-500">WCAG 2.1 Compliance Suite</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close settings"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-5 pt-4">
          {/* Font Size */}
          <div>
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-2">
              <Type className="h-3.5 w-3.5 text-[#8C2528]" />
              <span>Reading Typography Scale</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['normal', 'large', 'xl'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-colors ${
                    fontSize === size
                      ? 'border-[#8C2528] bg-red-50 text-[#8C2528]'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {size === 'normal' ? 'Standard (100%)' : size === 'large' ? 'Large (115%)' : 'Extra (130%)'}
                </button>
              ))}
            </div>
          </div>

          {/* Dyslexia Mode */}
          <div className="flex items-center justify-between py-2 border-t border-slate-100">
            <div>
              <p className="text-sm font-semibold text-slate-800">Dyslexia-Friendly Spacing</p>
              <p className="text-xs text-slate-500">Optimizes letter-spacing, tracking, and optical rhythm</p>
            </div>
            <button
              onClick={() => setDyslexiaMode(!dyslexiaMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                dyslexiaMode ? 'bg-[#8C2528]' : 'bg-slate-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  dyslexiaMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* High Contrast */}
          <div className="flex items-center justify-between py-2 border-t border-slate-100">
            <div>
              <p className="text-sm font-semibold text-slate-800">High Contrast Mode</p>
              <p className="text-xs text-slate-500">Enhances border delineation & text luminance</p>
            </div>
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                highContrast ? 'bg-[#8C2528]' : 'bg-slate-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  highContrast ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Low Bandwidth */}
          <div className="flex items-center justify-between py-2 border-t border-slate-100">
            <div>
              <p className="text-sm font-semibold text-slate-800">Low-Bandwidth Mode</p>
              <p className="text-xs text-slate-500">Replaces video streaming with textual lectures</p>
            </div>
            <button
              onClick={() => setLowBandwidth(!lowBandwidth)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                lowBandwidth ? 'bg-[#8C2528]' : 'bg-slate-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  lowBandwidth ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-slate-900 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
