import {useEffect} from 'react';
import {About} from '../components/About';
import {Button} from '../components/Button';
import {Features} from '../components/Features';
import {PlaceholderImage} from '../components/PlaceholderImage';
import {Regions} from '../components/Regions';
import {Section} from '../components/Section';
import {SectionDivider} from '../components/SectionDivider';
import {siteConfig} from '../config/siteConfig';

interface ExploreGamePageProps {
  selectedRegionId?: string;
  targetSection?: string;
  onSelectRegion: (regionId: string) => void;
  onBackHome: (sectionId?: string) => void;
}

export function ExploreGamePage({
  selectedRegionId,
  targetSection,
  onSelectRegion,
  onBackHome,
}: ExploreGamePageProps) {
  useEffect(() => {
    if (!targetSection) return;
    const idMap: Record<string, string> = {
      story: 'about',
      about: 'about',
      features: 'features',
      regions: 'regions',
      atlas: 'island-atlas',
    };
    const domId = idMap[targetSection] ?? targetSection;
    const timer = window.setTimeout(() => {
      document.getElementById(domId)?.scrollIntoView({behavior: 'smooth'});
    }, 60);
    return () => window.clearTimeout(timer);
  }, [targetSection]);

  const scrollToInPageSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <div className="bg-black text-white">
      {/* Page Hero / Header */}
      <section
        aria-label="Explore Game Overview"
        className="bg-black py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-[#262626]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <a
              href="#/"
              onClick={(e) => {
                e.preventDefault();
                onBackHome();
              }}
              className="inline-flex items-center gap-2 min-h-[40px] text-sm font-semibold text-[#22c55e] hover:text-[#facc15] transition-colors"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Back to Home</span>
            </a>
          </div>

          <p className="text-xs sm:text-sm font-bold tracking-[0.16em] text-[#22c55e] uppercase mb-2.5">
            Inside {siteConfig.game.name}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-wide">
            Explore Game
          </h1>
          <p className="mt-4 max-w-3xl text-base sm:text-lg text-[#cccccc] leading-relaxed">
            Discover the island&apos;s story, gameplay mechanics, puzzles, collectibles, and all five interconnected regions waiting to be explored.
          </p>

          {/* In-page quick navigation */}
          <nav aria-label="Explore Game sections" className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => scrollToInPageSection('about')}
              className="inline-flex items-center min-h-[44px] px-4 rounded-lg border border-[#3a3a3a] bg-[#111111] text-sm font-semibold text-white hover:border-[#facc15] hover:text-[#facc15] transition-colors"
            >
              The Story
            </button>
            <button
              type="button"
              onClick={() => scrollToInPageSection('features')}
              className="inline-flex items-center min-h-[44px] px-4 rounded-lg border border-[#3a3a3a] bg-[#111111] text-sm font-semibold text-white hover:border-[#22c55e] hover:text-[#22c55e] transition-colors"
            >
              Gameplay &amp; Features
            </button>
            <button
              type="button"
              onClick={() => scrollToInPageSection('regions')}
              className="inline-flex items-center min-h-[44px] px-4 rounded-lg border border-[#3a3a3a] bg-[#111111] text-sm font-semibold text-white hover:border-[#facc15] hover:text-[#facc15] transition-colors"
            >
              The Five Regions
            </button>
            <button
              type="button"
              onClick={() => scrollToInPageSection('island-atlas')}
              className="inline-flex items-center min-h-[44px] px-4 rounded-lg border border-[#3a3a3a] bg-[#111111] text-sm font-semibold text-white hover:border-[#22c55e] hover:text-[#22c55e] transition-colors"
            >
              Island Atlas
            </button>
          </nav>
        </div>
      </section>

      <SectionDivider kind="ruins" />

      {/* In-Game Story */}
      <About />

      <SectionDivider kind="waves" />

      {/* In-Game Features & Mechanics */}
      <Features />

      <SectionDivider kind="canopy" />

      {/* Interactive Five Regions Explorer */}
      <Section
        id="regions"
        kicker="World Map"
        title="The Five Regions"
        subtitle="Five distinct island regions connected by the world map. Recover all five ancient fragments to unlock the way home."
        className="bg-[#0a0a0a]"
      >
        <Regions selectedId={selectedRegionId} onSelectRegion={onSelectRegion} />
      </Section>

      <SectionDivider kind="peaks" />

      {/* Complete 5-Region Atlas Grid */}
      <section
        id="island-atlas"
        aria-label="All five regions overview"
        className="scroll-mt-20 py-14 sm:py-18 px-4 sm:px-6 lg:px-8 bg-black"
      >
        <div className="max-w-6xl mx-auto">
          <header className="max-w-3xl mb-10">
            <p className="text-xs sm:text-sm font-bold tracking-[0.16em] text-[#22c55e] uppercase mb-2">
              Island Atlas
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white">
              Every Stop Along the Journey
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-[#cccccc]">
              Select any region card below to focus it in the explorer above.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteConfig.regions.map((region) => {
              const isFocused = selectedRegionId === region.id;
              return (
                <article
                  key={region.id}
                  style={{borderColor: isFocused ? region.theme.accentHex : undefined}}
                  className="stone-panel rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-4 transition-colors"
                >
                  <div className="space-y-3.5">
                    <PlaceholderImage
                      src={region.image.src}
                      alt={region.image.alt}
                      label={`${region.name} screenshot`}
                      dimensions="1920x1080 (16:9)"
                      aspectRatio="16/9"
                      scene={region.theme.sceneVariant}
                    />

                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                      <span style={{color: region.theme.accentHex}} className="tabular-nums">
                        Level {region.levelNumber}
                      </span>
                      <span aria-hidden="true" className="text-[#525252]">
                        ·
                      </span>
                      <span className="text-[#b5b5b5]">{region.subtitle}</span>
                      {region.isFinal && (
                        <>
                          <span aria-hidden="true" className="text-[#525252]">
                            ·
                          </span>
                          <span className="text-[#facc15] font-bold">Final Level</span>
                        </>
                      )}
                    </div>

                    <h3 className="font-display text-xl font-semibold text-white">
                      {region.name}
                    </h3>

                    <p className="text-sm text-[#d4d4d4] leading-relaxed">
                      {region.description}
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectRegion(region.id);
                        scrollToInPageSection('regions');
                      }}
                      className="inline-flex items-center justify-center min-h-[44px] w-full px-4 rounded-lg border border-[#3a3a3a] bg-black text-xs font-semibold text-white hover:border-[#facc15] hover:text-[#facc15] transition-colors"
                    >
                      Inspect {region.name}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-12 stone-panel rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-white">
                Ready to Begin the Journey?
              </h2>
              <p className="mt-1 text-sm text-[#cccccc]">
                Return to the main page to view screenshots, watch the trailer, or check platform availability.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Button variant="secondary" href="#/" onClick={() => onBackHome()}>
                Back to Home
              </Button>
              <Button variant="primary" href="#download" onClick={() => onBackHome('download')}>
                Ways to Play
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
