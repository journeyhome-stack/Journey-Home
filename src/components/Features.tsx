import {siteConfig, type FeatureItem} from '../config/siteConfig';
import {Section} from './Section';

function FeatureIcon({name}: {name: FeatureItem['icon']}) {
  const cls = 'w-6 h-6';
  switch (name) {
    case 'compass':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={cls} aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M15.5 8.5l-2.3 5.2-5.2 2.3 2.3-5.2 5.2-2.3Z" strokeLinejoin="round" />
        </svg>
      );
    case 'map':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" className={cls} aria-hidden="true">
          <path d="M3.5 6.5l5.5-2.5 6 2.5 5.5-2.5v13.5l-5.5 2.5-6-2.5-5.5 2.5V6.5Z" />
          <path d="M9 4v13.5M15 6.5V20" />
        </svg>
      );
    case 'crystal':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" className={cls} aria-hidden="true">
          <path d="M12 2.5l6.5 6.5L12 21.5 5.5 9 12 2.5Z" />
          <path d="M5.5 9h13M12 2.5v19" />
        </svg>
      );
    case 'chest':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" className={cls} aria-hidden="true">
          <rect x="3.5" y="7" width="17" height="12.5" rx="2" />
          <path d="M3.5 11.5h17" />
          <rect x="10.2" y="10" width="3.6" height="4" rx="0.8" />
        </svg>
      );
    case 'puzzle':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true">
          <path d="M12 3.5v4M7.5 10.5h9l1.5 9.5H6l1.5-9.5Z" />
          <circle cx="12" cy="14.5" r="1.5" />
        </svg>
      );
    case 'devices':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true">
          <rect x="3" y="5" width="13" height="10" rx="1.8" />
          <path d="M6.5 18.5h6" />
          <rect x="16.5" y="9" width="4.5" height="9.5" rx="1.2" />
        </svg>
      );
    case 'save':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true">
          <path d="M5 4.5h11.5L19.5 7.5V19.5H5V4.5Z" />
          <path d="M8.5 4.5v4.5h6V4.5" />
          <rect x="8.5" y="13" width="7" height="6.5" />
        </svg>
      );
    case 'replay':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true">
          <path d="M4.5 11.5a7.5 7.5 0 1 1 2 5.2" />
          <path d="M4.5 6.5v5h5" />
        </svg>
      );
  }
}

export function Features() {
  return (
    <Section
      id="features"
      kicker="Exploration & Freedom"
      title="Your Journey, Unhurried"
      subtitle="Built around quiet discovery, tactile puzzles, and the freedom to explore every corner of the island."
      className="bg-black"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {siteConfig.features.map((feature, idx) => {
          const isGreen = idx % 2 === 1;
          return (
            <article
              key={feature.id}
              className="stone-panel rounded-xl p-5 sm:p-6 flex flex-col gap-3.5 hover:border-[#facc15] transition-colors"
            >
              <div
                className={`inline-flex items-center justify-center w-11 h-11 rounded-lg ${
                  isGreen
                    ? 'bg-[#22c55e] text-black'
                    : 'bg-[#facc15] text-black'
                }`}
              >
                <FeatureIcon name={feature.icon} />
              </div>
              <h3 className="font-display text-lg font-semibold text-white leading-snug">
                {feature.title}
              </h3>
              <p className="text-sm text-[#cccccc] leading-relaxed">
                {feature.description}
              </p>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
