import {useState} from 'react';

export type PlaceholderScene =
  | 'default'
  | 'hero'
  | 'about'
  | 'shore'
  | 'woods'
  | 'sunken'
  | 'peaks'
  | 'sky'
  | 'trailer'
  | 'social';

interface PlaceholderImageProps {
  src?: string;
  alt: string;
  label?: string;
  dimensions?: string;
  aspectRatio?: '16/9' | '1200/630';
  scene?: PlaceholderScene;
  className?: string;
  priority?: boolean;
}

function SceneArtwork({scene}: {scene: PlaceholderScene}) {
  switch (scene) {
    case 'shore':
      return (
        <svg viewBox="0 0 640 360" className="absolute inset-0 w-full h-full opacity-55" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="shoreSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#12323d" />
              <stop offset="60%" stopColor="#1b4d54" />
              <stop offset="100%" stopColor="#826546" />
            </linearGradient>
          </defs>
          <rect width="640" height="360" fill="url(#shoreSky)" />
          <circle cx="485" cy="96" r="42" fill="#f6d38b" fillOpacity="0.28" />
          <path d="M0 245 Q160 215 320 238 T640 225 L640 360 L0 360 Z" fill="#113840" />
          <path d="M0 278 Q180 258 360 278 T640 268 L640 360 L0 360 Z" fill="#1e2d2e" />
          <path d="M90 260 L110 175 L138 175 L154 260 Z" fill="#0d1722" fillOpacity="0.7" />
          <path d="M142 260 L158 195 L182 195 L196 260 Z" fill="#0d1722" fillOpacity="0.55" />
        </svg>
      );
    case 'woods':
      return (
        <svg viewBox="0 0 640 360" className="absolute inset-0 w-full h-full opacity-60" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect width="640" height="360" fill="#0c2420" />
          <circle cx="220" cy="145" r="95" fill="#2dd4bf" fillOpacity="0.12" />
          <circle cx="440" cy="120" r="110" fill="#34d399" fillOpacity="0.1" />
          <path d="M0 360 L0 190 L55 120 L105 190 L165 100 L230 195 L290 130 L355 205 L430 110 L500 195 L575 135 L640 190 L640 360 Z" fill="#081715" />
          <path d="M190 265 Q320 290 460 250" stroke="#2dd4bf" strokeOpacity="0.4" strokeWidth="3" fill="none" strokeDasharray="5 6" />
          <circle cx="245" cy="195" r="4" fill="#5eead4" />
          <circle cx="385" cy="175" r="3" fill="#5eead4" />
          <circle cx="490" cy="215" r="4.5" fill="#6ee7b7" />
        </svg>
      );
    case 'sunken':
      return (
        <svg viewBox="0 0 640 360" className="absolute inset-0 w-full h-full opacity-60" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect width="640" height="360" fill="#0b182e" />
          <path d="M160 60 L220 60 L205 260 L175 260 Z" fill="#172c4d" />
          <path d="M420 60 L480 60 L465 260 L435 260 Z" fill="#172c4d" />
          <rect x="245" y="135" width="150" height="145" rx="75" fill="#091224" stroke="#f59e0b" strokeOpacity="0.45" strokeWidth="2.5" />
          <path d="M0 245 Q160 232 320 248 T640 240 L640 360 L0 360 Z" fill="#0e2a4a" fillOpacity="0.85" />
          <circle cx="320" cy="195" r="14" fill="#f59e0b" fillOpacity="0.4" />
        </svg>
      );
    case 'peaks':
      return (
        <svg viewBox="0 0 640 360" className="absolute inset-0 w-full h-full opacity-65" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect width="640" height="360" fill="#0d192b" />
          <path d="M40 85 Q200 45 360 95 T620 70" stroke="#7dd3fc" strokeOpacity="0.32" strokeWidth="22" fill="none" strokeLinecap="round" />
          <path d="M0 360 L0 250 L140 130 L265 235 L395 105 L535 225 L640 165 L640 360 Z" fill="#172b45" />
          <path d="M395 105 L445 150 L410 158 L385 142 L356 155 Z" fill="#e0f2fe" fillOpacity="0.45" />
          <path d="M140 130 L178 164 L148 168 L122 158 Z" fill="#e0f2fe" fillOpacity="0.38" />
        </svg>
      );
    case 'sky':
      return (
        <svg viewBox="0 0 640 360" className="absolute inset-0 w-full h-full opacity-65" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="skyTempleGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#26173a" />
              <stop offset="55%" stopColor="#1b1a36" />
              <stop offset="100%" stopColor="#352026" />
            </linearGradient>
          </defs>
          <rect width="640" height="360" fill="url(#skyTempleGrad)" />
          <circle cx="320" cy="145" r="88" fill="#fbbf24" fillOpacity="0.12" />
          <path d="M210 210 L430 210 L385 265 L255 265 Z" fill="#141126" stroke="#fbbf24" strokeOpacity="0.35" strokeWidth="1.5" />
          <path d="M275 160 L365 160 L355 210 L285 210 Z" fill="#1c1633" />
          <path d="M90 185 L175 185 L155 215 L110 215 Z" fill="#161229" />
          <path d="M475 165 L560 165 L540 198 L495 198 Z" fill="#161229" />
          <circle cx="320" cy="135" r="8" fill="#f472b6" fillOpacity="0.65" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 640 360" className="absolute inset-0 w-full h-full opacity-50" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="defGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#121e33" />
              <stop offset="100%" stopColor="#0e1422" />
            </linearGradient>
          </defs>
          <rect width="640" height="360" fill="url(#defGrad)" />
          <circle cx="490" cy="100" r="95" fill="#2dd4bf" fillOpacity="0.08" />
          <circle cx="150" cy="260" r="110" fill="#f59e0b" fillOpacity="0.07" />
          <path d="M0 290 Q170 245 340 275 T640 250 L640 360 L0 360 Z" fill="#090e18" fillOpacity="0.7" />
        </svg>
      );
  }
}

export function PlaceholderImage({
  src = '',
  alt,
  label = 'Screenshot goes here',
  dimensions = '1920x1080 (16:9)',
  aspectRatio = '16/9',
  scene = 'default',
  className = '',
  priority = false,
}: PlaceholderImageProps) {
  const [hasError, setHasError] = useState(false);
  const ratioClass = aspectRatio === '1200/630' ? 'aspect-[1200/630]' : 'aspect-video';
  const showRealImage = src.trim().length > 0 && !hasError;

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl border border-amber-200/20 bg-[#0d1424] ${ratioClass} ${className}`}
    >
      {showRealImage ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className="w-full h-full object-cover block"
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="relative w-full h-full flex flex-col items-center justify-center p-5 text-center select-none"
        >
          <SceneArtwork scene={scene} />
          <div className="relative z-10 flex flex-col items-center gap-2 max-w-sm">
            <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-amber-200/25 bg-[#0b101b]/75 text-amber-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <circle cx="8.5" cy="10" r="1.5" />
                <path d="M4.5 17l5-4.5 3.5 3 2.5-2 4 3.5" />
              </svg>
            </span>
            <p className="text-xs sm:text-sm font-medium text-[#efe8d8] tracking-wide">
              {label}
            </p>
            <p className="text-[11px] sm:text-xs font-mono tabular-nums text-[#b9b09e] bg-[#0b101b]/70 px-2.5 py-1 rounded border border-amber-200/15">
              {dimensions}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
