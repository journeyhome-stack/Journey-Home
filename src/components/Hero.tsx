import {useEffect, useRef, useState} from 'react';
import {siteConfig} from '../config/siteConfig';
import type {PageId} from '../pages/SectionPage';
import {Button} from './Button';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
  warm: boolean;
}

interface HeroProps {
  onNavigate: (page: PageId, options?: {anchor?: string}) => void;
}

export function Hero({onNavigate}: HeroProps) {
  const heroRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [heroImgError, setHeroImgError] = useState(false);

  const hasHeroImage = siteConfig.heroImage.src.trim().length > 0 && !heroImgError;
  const hasBrowserUrl = siteConfig.playInBrowserUrl.trim().length > 0;
  const hasWishlistUrl = siteConfig.wishlistUrl.trim().length > 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = heroRef.current;
    if (!canvas || !container) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    let isVisible = true;
    let width = 0;
    let height = 0;

    const particles: Particle[] = Array.from({length: 24}, (_, idx) => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00022,
      vy: -0.00012 - Math.random() * 0.00025,
      radius: 1.5 + Math.random() * 2,
      phase: Math.random() * Math.PI * 2,
      warm: idx % 2 === 0,
    }));

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize, {passive: true});

    const observer =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            (entries) => {
              isVisible = entries[0]?.isIntersecting ?? true;
              if (isVisible && animationFrameId === 0) {
                animationFrameId = window.requestAnimationFrame(draw);
              }
            },
            {threshold: 0.02},
          )
        : null;

    observer?.observe(container);

    const draw = (time: number) => {
      if (!isVisible) {
        animationFrameId = 0;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -0.05) p.y = 1.05;
        if (p.x < -0.05) p.x = 1.05;
        if (p.x > 1.05) p.x = -0.05;

        const pulse = 0.5 + 0.5 * Math.sin(time * 0.0018 + p.phase);
        const px = p.x * width;
        const py = p.y * height;

        ctx.beginPath();
        ctx.arc(px, py, p.radius * (0.8 + 0.25 * pulse), 0, Math.PI * 2);
        ctx.fillStyle = p.warm ? '#4ade80' : '#22c55e';
        ctx.fill();
      }

      animationFrameId = window.requestAnimationFrame(draw);
    };

    animationFrameId = window.requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      observer?.disconnect();
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const platformBadges = [
    {label: 'Web', active: hasBrowserUrl},
    ...siteConfig.downloads
      .filter((d) => d.id !== 'other')
      .map((d) => ({label: d.label.replace(' (APK)', ''), active: d.available && d.url.trim().length > 0})),
  ];

  return (
    <section
      id="hero"
      ref={heroRef}
      aria-label="Journey Home Introduction"
      className="relative min-h-[calc(100svh-4rem)] flex flex-col justify-between overflow-hidden bg-transparent"
    >
      {/* Background artwork slot (1920x1080) or transparent sky + island silhouette over background dragon */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {hasHeroImage ? (
          <>
            <img
              src={siteConfig.heroImage.src}
              alt={siteConfig.heroImage.alt}
              loading="eager"
              referrerPolicy="no-referrer"
              onError={() => setHeroImgError(true)}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/70" />
          </>
        ) : (
          <>
            {/* Soft drifting cloud band */}
            <svg
              viewBox="0 0 1440 420"
              className="hidden sm:block absolute top-10 inset-x-0 w-full h-auto animate-cloud-drift"
              preserveAspectRatio="none"
            >
              <path
                d="M-60 210c110-38 220-38 330 0 95-45 215-45 310 0 110-35 230-35 340 0 100-40 220-40 320 0 90-30 180-30 260 0v80H-60Z"
                fill="#0d1a11"
              />
            </svg>

            {/* Ancient island and temple ruins silhouette */}
            <svg
              viewBox="0 0 1440 420"
              className="absolute bottom-0 inset-x-0 w-full h-[46%] sm:h-[54%] object-cover"
              preserveAspectRatio="xMidYMax slice"
            >
              <circle cx="1140" cy="86" r="36" fill="#22c55e" />
              <path
                d="M0 320 L160 220 L290 275 L470 155 L630 250 L790 130 L960 235 L1140 165 L1310 245 L1440 190 L1440 420 L0 420 Z"
                fill="#0f2918"
              />
              <path
                d="M0 355 Q240 305 490 325 T980 310 Q1220 295 1440 335 L1440 420 L0 420 Z"
                fill="#14532d"
              />
              <path
                d="M620 315 L638 210 L664 210 L674 315 Z M694 315 L704 185 L736 185 L746 315 Z M766 315 L776 210 L802 210 L820 315 Z M654 205 L786 205 L776 182 L664 182 Z"
                fill="#000000"
              />
              <circle cx="720" cy="162" r="14" fill="#16a34a" />
              <path d="M720 146 L727 162 L720 176 L713 162 Z" fill="#4ade80" />
              <rect x="0" y="378" width="1440" height="42" fill="#000000" />
            </svg>
          </>
        )}

        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </div>



      <div className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 my-auto">
        <div className="max-w-3xl">
          <p className="text-xs sm:text-sm font-bold tracking-[0.18em] text-[#22c55e] uppercase mb-4">
            {siteConfig.game.genre}
          </p>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wide text-white leading-[1.1]">
            {siteConfig.game.name}
          </h1>

          <p className="mt-4 font-display text-lg sm:text-2xl text-[#4ade80] tracking-wide">
            {siteConfig.game.tagline}
          </p>

          <p className="mt-5 text-base sm:text-lg text-[#e5e5e5] leading-relaxed max-w-2xl">
            {siteConfig.game.shortPitch}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            {hasBrowserUrl ? (
              <Button href={siteConfig.playInBrowserUrl} external variant="primary" size="lg">
                Play in Browser
              </Button>
            ) : (
              <Button
                variant="primary"
                size="lg"
                disabled
                ariaLabel="Play in Browser — Coming soon"
              >
                Play in Browser · Coming Soon
              </Button>
            )}

            <Button href="#download" onClick={() => onNavigate('home', {anchor: 'download'})} variant="secondary" size="lg">
              Download
            </Button>

            <Button
              href="#/explore"
              onClick={() => onNavigate('explore')}
              variant="ghost"
              size="lg"
            >
              Explore Game
            </Button>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <a
              href="#/trailer"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('screenshots', {anchor: 'trailer'});
              }}
              className="inline-flex items-center gap-2 min-h-[40px] text-white hover:text-[#4ade80] underline decoration-[#22c55e] underline-offset-4 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#22c55e]" aria-hidden="true">
                <path d="M8 5.5v13l11-6.5-11-6.5Z" />
              </svg>
              Watch Trailer
            </a>

            {hasWishlistUrl ? (
              <a
                href={siteConfig.wishlistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-[40px] text-white hover:text-[#22c55e] underline decoration-[#22c55e] underline-offset-4 transition-colors"
              >
                Wishlist / Follow
              </a>
            ) : (
              <span
                title="Placeholder — add wishlistUrl in src/config/siteConfig.ts"
                className="inline-flex items-center gap-1.5 min-h-[40px] text-[#999999] cursor-not-allowed select-none"
              >
                Wishlist / Follow (Coming soon)
              </span>
            )}
          </div>

          <div
            aria-label="Platform availability"
            className="mt-8 pt-6 border-t border-[#262626] flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-[#d4d4d4]"
          >
            <span className="font-semibold text-white">Platforms:</span>
            {platformBadges.map((plat, index) => (
              <span key={plat.label} className="inline-flex items-center gap-2">
                {index > 0 && (
                  <span aria-hidden="true" className="text-[#525252] mr-1">
                    ·
                  </span>
                )}
                <span className={plat.active ? 'text-[#22c55e] font-semibold' : 'text-[#d4d4d4]'}>
                  {plat.label}
                </span>
                <span className="text-[11px] text-[#999999]">
                  ({plat.active ? 'Available' : 'Coming soon'})
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 pb-6 flex justify-center">
        <a
          href="#download"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home', {anchor: 'download'});
          }}
          aria-label="Scroll down to Download section"
          className="inline-flex flex-col items-center gap-1.5 min-h-[44px] px-4 text-xs tracking-[0.14em] uppercase text-[#d4d4d4] hover:text-[#4ade80] transition-colors"
        >
          <span>Download &amp; Updates</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="w-4 h-4 animate-gentle-bob"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
          </svg>
        </a>
      </div>
    </section>
  );
}
