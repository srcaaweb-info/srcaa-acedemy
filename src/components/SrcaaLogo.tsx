import React from 'react';

interface SrcaaLogoProps {
  className?: string;
  size?: number;
  showTagline?: boolean;
}

export const SrcaaLogo: React.FC<SrcaaLogoProps> = ({
  className = '',
  size = 40,
  showTagline = false,
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* SVG Emblem matching uploaded emblem */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform hover:scale-105"
        aria-label="SRCAA Academy Logo"
      >
        {/* Outer Maroon Ring */}
        <circle cx="100" cy="100" r="88" stroke="#8C2528" strokeWidth="8" />

        {/* Soaring Bird / Dove in flight */}
        <path
          d="M 85 45 C 80 40, 72 38, 65 42 C 60 45, 62 55, 68 62 C 73 68, 80 72, 85 75 C 83 80, 80 87, 85 91 C 88 94, 95 91, 98 86 C 102 91, 108 93, 112 90 C 115 87, 112 80, 110 75 C 118 73, 126 68, 131 61 C 136 54, 136 45, 129 42 C 122 39, 114 43, 110 48 C 104 45, 96 44, 91 48 Z"
          fill="#8C2528"
        />

        {/* Left Book Page (raised) */}
        <path d="M 52 64 L 64 60 L 98 140 L 84 145 Z" fill="#8C2528" />
        <path
          d="M 64 61 L 76 57 L 108 135 L 96 139 Z"
          fill="#F1F5F9"
          stroke="#8C2528"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Right Curving Pages */}
        {/* Top page */}
        <path
          d="M 96 137 C 105 110, 130 92, 160 97 C 145 106, 120 120, 104 140 Z"
          fill="#CBD5E1"
          stroke="#8C2528"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Golden / Amber glowing page */}
        <path
          d="M 104 139 C 115 125, 140 114, 166 116 C 160 123, 138 133, 108 143 Z"
          fill="#E5A93C"
          stroke="#8C2528"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Bottom page */}
        <path
          d="M 96 142 L 175 137 L 176 150 L 93 154 Z"
          fill="#F8FAFC"
          stroke="#8C2528"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Book base underline */}
        <path d="M 82 148 L 178 145" stroke="#8C2528" strokeWidth="5.5" strokeLinecap="round" />
      </svg>

      {/* Brand Name & Tagline */}
      <div>
        <div className="font-display text-lg font-bold tracking-tight text-slate-100 flex items-center gap-1.5">
          <span>SRCAA</span>
          <span className="text-amber-400 font-normal">Academy</span>
        </div>
        {showTagline && (
          <div className="text-[10px] font-medium tracking-wide text-amber-200/90">
            Learn. Research. Innovate. Grow.
          </div>
        )}
      </div>
    </div>
  );
};
