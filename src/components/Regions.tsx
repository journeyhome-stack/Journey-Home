import {useEffect, useRef, useState, type KeyboardEvent, type TouchEvent} from 'react';
import {siteConfig} from '../config/siteConfig';
import {PlaceholderImage} from '../components/PlaceholderImage';

interface RegionsProps {
  selectedId?: string;
  onSelectRegion?: (regionId: string) => void;
}

export function Regions({selectedId, onSelectRegion}: RegionsProps) {
  const regions = siteConfig.regions;
  const initialIndex = selectedId
    ? Math.max(
        0,
        regions.findIndex((r) => r.id === selectedId),
      )
    : 0;

  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!selectedId) return;
    const idx = regions.findIndex((r) => r.id === selectedId);
    if (idx !== -1) {
      setSelectedIndex(idx);
    }
  }, [selectedId, regions]);

  const activeRegion = regions[selectedIndex];

  const selectRegion = (nextIndex: number) => {
    const wrapped = (nextIndex + regions.length) % regions.length;
    setSelectedIndex(wrapped);
    onSelectRegion?.(regions[wrapped].id);
  };

  const handleTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (index + 1) % regions.length;
      selectRegion(next);
      tabRefs.current[next]?.focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (index - 1 + regions.length) % regions.length;
      selectRegion(prev);
      tabRefs.current[prev]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      selectRegion(0);
      tabRefs.current[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      const last = regions.length - 1;
      selectRegion(last);
      tabRefs.current[last]?.focus();
    }
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.changedTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) > 48) {
      if (delta < 0) {
        selectRegion(selectedIndex + 1);
      } else {
        selectRegion(selectedIndex - 1);
      }
    }
  };

  return (
    <div>
      {/* Region Selector Tabs */}
      <div
        role="tablist"
        aria-label="Select an island region"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-6"
      >
        {regions.map((region, idx) => {
          const isSelected = idx === selectedIndex;
          return (
            <button
              key={region.id}
              ref={(el) => {
                tabRefs.current[idx] = el;
              }}
              type="button"
              role="tab"
              id={`region-tab-${region.id}`}
              aria-selected={isSelected}
              aria-controls={`region-panel-${region.id}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => selectRegion(idx)}
              onKeyDown={(e) => handleTabKeyDown(e, idx)}
              style={{
                borderColor: isSelected ? region.theme.accentHex : undefined,
              }}
              className={`min-h-[56px] px-3.5 py-2.5 rounded-xl text-left transition-colors border ${
                isSelected
                  ? 'bg-[#171717] text-white'
                  : 'bg-[#0d0d0d] border-[#262626] text-[#cccccc] hover:bg-[#141414] hover:text-white'
              }`}
            >
              <span
                style={{color: isSelected ? region.theme.accentHex : undefined}}
                className="block text-[11px] font-semibold tracking-wider uppercase text-[#a3a3a3] tabular-nums"
              >
                Level {region.levelNumber}
                {region.isFinal ? ' · Final Level' : ''}
              </span>
              <span className="block font-display text-sm font-semibold mt-0.5 truncate">
                {region.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Region Detail Panel (swipeable on mobile) */}
      <div
        role="tabpanel"
        id={`region-panel-${activeRegion.id}`}
        aria-labelledby={`region-tab-${activeRegion.id}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          borderColor: activeRegion.theme.accentHex,
        }}
        className={`rounded-2xl border ${activeRegion.theme.cardSurface} p-5 sm:p-7 lg:p-8`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-center">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wider uppercase">
              <span style={{color: activeRegion.theme.accentHex}} className="tabular-nums">
                Level {activeRegion.levelNumber} of {regions.length}
              </span>
              <span aria-hidden="true" className="text-[#525252]">
                ·
              </span>
              <span className="text-[#d4d4d4]">{activeRegion.subtitle}</span>
              {activeRegion.isFinal && (
                <>
                  <span aria-hidden="true" className="text-[#525252]">
                    ·
                  </span>
                  <span style={{color: activeRegion.theme.secondaryHex}} className="font-bold">
                    Final Level
                  </span>
                </>
              )}
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              {activeRegion.name}
            </h2>

            <p className="text-sm sm:text-base text-[#dcdcdc] leading-relaxed">
              {activeRegion.description}
            </p>

            <div className="pt-2">
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#a3a3a3] mb-2.5">
                Key Mechanics &amp; Atmosphere
              </h3>
              <ul className="space-y-2 text-sm text-white">
                {activeRegion.mechanics.map((mech) => (
                  <li key={mech} className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      style={{backgroundColor: activeRegion.theme.accentHex}}
                      className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                    />
                    <span>{mech}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 flex items-center gap-3">
              <button
                type="button"
                onClick={() => selectRegion(selectedIndex - 1)}
                aria-label="Previous region"
                className="inline-flex items-center justify-center min-h-[44px] px-4 rounded-lg border border-[#3a3a3a] bg-black text-xs font-medium text-white hover:border-[#facc15] hover:text-[#facc15] transition-colors"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => selectRegion(selectedIndex + 1)}
                aria-label="Next region"
                className="inline-flex items-center justify-center min-h-[44px] px-4 rounded-lg border border-[#22c55e] bg-[#22c55e] text-xs font-bold text-black hover:bg-[#4ade80] transition-colors"
              >
                Next Region
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <PlaceholderImage
              src={activeRegion.image.src}
              alt={activeRegion.image.alt}
              label={`${activeRegion.name} screenshot goes here`}
              dimensions="1920x1080 (16:9)"
              aspectRatio="16/9"
              scene={activeRegion.theme.sceneVariant}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
