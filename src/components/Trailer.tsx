import {useState} from 'react';
import {siteConfig} from '../config/siteConfig';
import {PlaceholderImage} from './PlaceholderImage';

export function Trailer() {
  const [loaded, setLoaded] = useState(false);
  const [thumbError, setThumbError] = useState(false);

  const youtubeId = siteConfig.trailer.youtubeId.trim();
  const hasTrailer = youtubeId.length > 0;
  const hasCustomThumb = siteConfig.trailer.thumbnailSrc.trim().length > 0 && !thumbError;

  const thumbnailUrl = hasCustomThumb
    ? siteConfig.trailer.thumbnailSrc
    : hasTrailer
      ? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`
      : '';

  if (!hasTrailer) {
    return (
      <div id="trailer" className="scroll-mt-24 stone-panel rounded-2xl p-3 sm:p-4 mb-12">
        <div className="relative">
          <PlaceholderImage
            src={siteConfig.trailer.thumbnailSrc}
            alt={siteConfig.trailer.thumbnailAlt}
            label="Trailer coming soon — Thumbnail slot"
            dimensions="1920x1080 (16:9)"
            aspectRatio="16/9"
            scene="trailer"
          />
          <div className="mt-3 px-1 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-[#d4d4d4]">
            <span>{siteConfig.trailer.title}</span>
            <span className="text-[#999999]">Add a YouTube ID in siteConfig.ts to enable playback</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="trailer" className="scroll-mt-24 stone-panel rounded-2xl p-3 sm:p-4 mb-12">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-[#2e2e2e] bg-black">
        {loaded ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtubeId)}?autoplay=1&rel=0`}
            title={siteConfig.trailer.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setLoaded(true)}
            aria-label={`Play ${siteConfig.trailer.title}`}
            className="group relative w-full h-full flex items-center justify-center text-left focus-visible:outline-offset-[-4px]"
          >
            {thumbnailUrl ? (
              <img
                src={thumbnailUrl}
                alt={siteConfig.trailer.thumbnailAlt}
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={() => setThumbError(true)}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            ) : (
              <div className="w-full h-full bg-[#111111]" />
            )}
            <div className="absolute inset-0 bg-black/55" />
            <div className="relative z-10 flex flex-col items-center gap-3">
              <span className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#facc15] text-black group-hover:bg-[#fde047] transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 translate-x-0.5" aria-hidden="true">
                  <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                </svg>
              </span>
              <span className="text-sm font-semibold text-white bg-black px-3.5 py-1.5 rounded-md border border-[#2e2e2e]">
                Click to load trailer (youtube-nocookie.com)
              </span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
