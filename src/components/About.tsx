import {siteConfig} from '../config/siteConfig';
import {PlaceholderImage} from './PlaceholderImage';
import {Section} from './Section';

export function About() {
  return (
    <Section
      id="about"
      kicker="The Story"
      title="An Ancient Island Awaits"
      subtitle="Step into a quiet, forgotten world where every ruin holds a clue and every step brings you closer to home."
      className="bg-[#0e1524]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-6 space-y-5 text-[#d7d0c0] text-base sm:text-[17px] leading-relaxed">
          {siteConfig.game.longDescription.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          <div className="pt-4 border-t border-amber-200/15 grid grid-cols-2 sm:grid-cols-3 gap-5 text-sm">
            <div>
              <span className="block font-display text-xl font-semibold text-amber-300 tabular-nums">
                5
              </span>
              <span className="text-[#b8b09f]">Explorable Regions</span>
            </div>
            <div>
              <span className="block font-display text-xl font-semibold text-teal-300 tabular-nums">
                5
              </span>
              <span className="text-[#b8b09f]">Ancient Fragments</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="block font-display text-xl font-semibold text-[#efe8d8]">
                3D Adventure
              </span>
              <span className="text-[#b8b09f]">Puzzles &amp; Discovery</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="stone-panel p-2.5 sm:p-3 rounded-2xl">
            <PlaceholderImage
              src={siteConfig.aboutImage.src}
              alt={siteConfig.aboutImage.alt}
              label="About artwork / gameplay still goes here"
              dimensions="1920x1080 (16:9)"
              aspectRatio="16/9"
              scene="about"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
