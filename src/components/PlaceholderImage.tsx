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
        <svg viewBox="0 0 640 360" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect width="640" height="360" fill="#000000" />
          <circle cx="485" cy="96" r="36" fill="#facc15" />
          <path d="M0 245 Q160 215 320 238 T640 225 L640 360 L0 360 Z" fill="#14532d" />
          <path d="M0 278 Q180 258 360 278 T640 268 L640 360 L0 360 Z" fill="#0f2918" />
          <path d="M90 260 L110 175 L138 175 L154 260 Z" fill="#0a0a0a" />
          <path d="M142 260 L158 195 L182 195 L196 260 Z" fill="#171717" />
        </svg>
      );
    case 'woods':
      return (
        <svg viewBox="0 0 640 360" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect width="640" height="360" fill="#000000" />
          <path d="M0 360 L0 190 L55 120 L105 190 L165 100 L230 195 L290 130 L355 205 L430 110 L500 195 L575 135 L640 190 L640 360 Z" fill="#0f2918" />
          <path d="M190 265 Q320 290 460 250" stroke="#22c55e" strokeWidth="3" fill="none" strokeDasharray="5 6" />
          <circle cx="245" cy="195" r="5" fill="#facc15" />
          <circle cx="385" cy="175" r="4" fill="#22c55e" />
          <circle cx="490" cy="215" r="5" fill="#facc15" />
        </svg>
      );
    case 'sunken':
      return (
        <svg viewBox="0 0 640 360" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect width="640" height="360" fill="#000000" />
          <path d="M160 60 L220 60 L205 260 L175 260 Z" fill="#171717" />
          <path d="M420 60 L480 60 L465 260 L435 260 Z" fill="#171717" />
          <rect x="245" y="135" width="150" height="145" rx="75" fill="#0a0a0a" stroke="#facc15" strokeWidth="2.5" />
          <path d="M0 245 Q160 232 320 248 T640 240 L640 360 L0 360 Z" fill="#14532d" />
          <circle cx="320" cy="195" r="14" fill="#facc15" />
        </svg>
      );
    case 'peaks':
      return (
        <svg viewBox="0 0 640 360" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect width="640" height="360" fill="#000000" />
          <path d="M40 85 Q200 45 360 95 T620 70" stroke="#22c55e" strokeWidth="14" fill="none" strokeLinecap="round" />
          <path d="M0 360 L0 250 L140 130 L265 235 L395 105 L535 225 L640 165 L640 360 Z" fill="#171717" />
          <path d="M395 105 L445 150 L410 158 L385 142 L356 155 Z" fill="#facc15" />
          <path d="M140 130 L178 164 L148 168 L122 158 Z" fill="#facc15" />
        </svg>
      );
    case 'sky':
      return (
        <svg viewBox="0 0 640 360" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect width="640" height="360" fill="#000000" />
          <path d="M210 210 L430 210 L385 265 L255 265 Z" fill="#171717" stroke="#facc15" strokeWidth="2" />
          <path d="M275 160 L365 160 L355 210 L285 210 Z" fill="#14532d" />
          <path d="M90 185 L175 185 L155 215 L110 215 Z" fill="#171717" />
          <path d="M475 165 L560 165 L540 198 L495 198 Z" fill="#171717" />
          <circle cx="320" cy="130" r="10" fill="#22c55e" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 640 360" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect width="640" height="360" fill="#000000" />
          <circle cx="490" cy="100" r="32" fill="#22c55e" />
          <circle cx="150" cy="240" r="24" fill="#facc15" />
          <path d="M0 290 Q170 245 340 275 T640 250 L640 360 L0 360 Z" fill="#111111" />
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
      className={`relative w-full overflow-hidden rounded-xl border border-[#2e2e2e] bg-black ${ratioClass} ${className}`}
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
          <div className="relative z-10 flex flex-col items-center gap-2 max-w-sm bg-black border border-[#2e2e2e] px-5 py-4 rounded-xl">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#facc15] text-black">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="w-5 h-5" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <circle cx="8.5" cy="10" r="1.5" />
                <path d="M4.5 17l5-4.5 3.5 3 2.5-2 4 3.5" />
              </svg>
            </span>
            <p className="text-xs sm:text-sm font-semibold text-white tracking-wide">
              {label}
            </p>
            <p className="text-[11px] sm:text-xs font-mono tabular-nums text-[#22c55e] bg-[#0d0d0d] px-2.5 py-1 rounded border border-[#262626]">
              {dimensions}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
