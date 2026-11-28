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
      className="bg-transparent"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-6 space-y-5 text-[#e0e0e0] text-base sm:text-[17px] leading-relaxed">
          {siteConfig.game.longDescription.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          <div className="pt-4 border-t border-[#262626] grid grid-cols-2 sm:grid-cols-3 gap-5 text-sm">
            <div>
              <span className="block font-display text-xl font-semibold text-[#4ade80] tabular-nums">
                5
              </span>
              <span className="text-[#cccccc]">Explorable Regions</span>
            </div>
            <div>
              <span className="block font-display text-xl font-semibold text-[#22c55e] tabular-nums">
                5
              </span>
              <span className="text-[#cccccc]">Ancient Fragments</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="block font-display text-xl font-semibold text-white">
                3D Adventure
              </span>
              <span className="text-[#cccccc]">Puzzles &amp; Discovery</span>
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
