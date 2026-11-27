interface LogoProps {
  className?: string;
  compact?: boolean;
}

export function Logo({className = '', compact = false}: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 ${className}`}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
        className="w-8 h-8 shrink-0"
      >
        <circle cx="24" cy="24" r="20" stroke="#c89d54" strokeOpacity="0.55" strokeWidth="1.5" />
        <circle
          cx="24"
          cy="24"
          r="14"
          stroke="#2dd4bf"
          strokeOpacity="0.4"
          strokeWidth="1.1"
          strokeDasharray="2.5 3"
        />
        <path
          d="M24 7L27.2 20.8L41 24L27.2 27.2L24 41L20.8 27.2L7 24L20.8 20.8L24 7Z"
          fill="url(#jhLogoGrad)"
          stroke="#f6d38b"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <circle cx="24" cy="24" r="3.2" fill="#2dd4bf" />
        <defs>
          <linearGradient id="jhLogoGrad" x1="12" y1="10" x2="36" y2="38" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f6d38b" />
            <stop offset="1" stopColor="#b4782e" />
          </linearGradient>
        </defs>
      </svg>
      {!compact && (
        <span className="font-display text-lg font-bold tracking-[0.06em] text-[#f5efe2]">
          Journey Home
        </span>
      )}
    </span>
  );
}
