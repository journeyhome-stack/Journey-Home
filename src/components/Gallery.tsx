import {useMemo, useState} from 'react';
import {siteConfig} from '../config/siteConfig';
import {Lightbox} from './Lightbox';
import {PlaceholderImage, type PlaceholderScene} from './PlaceholderImage';
import {Section} from './Section';
import {Trailer} from './Trailer';

const SLOT_SCENES: PlaceholderScene[] = [
  'shore',
  'woods',
  'sunken',
  'peaks',
  'sky',
  'about',
  'default',
  'trailer',
];

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const realShots = useMemo(
    () => siteConfig.screenshots.filter((shot) => shot.src.trim().length > 0),
    [],
  );

  const openRealShot = (shotId: string) => {
    const idx = realShots.findIndex((s) => s.id === shotId);
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  };

  return (
    <Section
      id="screenshots"
      kicker="Media"
      title="Screenshots &amp; Trailer"
      subtitle="Preview footage and reserved 16:9 gallery frames ready for in-game captures."
      className="bg-transparent"
    >
      <Trailer />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {siteConfig.screenshots.map((shot, idx) => {
          const hasImage = shot.src.trim().length > 0;
          const scene = SLOT_SCENES[idx % SLOT_SCENES.length];

          if (hasImage) {
            return (
              <figure key={shot.id} className="group">
                <button
                  type="button"
                  onClick={() => openRealShot(shot.id)}
                  aria-label={`Open screenshot: ${shot.caption}`}
                  className="w-full text-left rounded-xl overflow-hidden border border-[#166534] hover:border-[#22c55e] transition-colors focus-visible:outline-offset-2"
                >
                  <div className="relative overflow-hidden">
                    <PlaceholderImage
                      src={shot.src}
                      alt={shot.alt}
                      dimensions="1920x1080 (16:9)"
                      aspectRatio="16/9"
                      scene={scene}
                      className="border-0 rounded-none transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                </button>
                <figcaption className="mt-2 text-xs text-[#cccccc] leading-snug">
                  {shot.caption}
                </figcaption>
              </figure>
            );
          }

          return (
            <figure key={shot.id}>
              <PlaceholderImage
                src=""
                alt={shot.alt}
                label="Screenshot goes here"
                dimensions="1920x1080 (16:9)"
                aspectRatio="16/9"
                scene={scene}
              />
              <figcaption className="mt-2 text-xs text-[#a3a3a3] leading-snug">
                {shot.caption}
              </figcaption>
            </figure>
          );
        })}
      </div>

      <Lightbox
        items={realShots}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChangeIndex={(next) => setLightboxIndex(next)}
      />
    </Section>
  );
}
