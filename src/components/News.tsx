import {useState} from 'react';
import {siteConfig} from '../config/siteConfig';
import {Button} from './Button';
import {Section} from './Section';

export function News() {
  const [showAll, setShowAll] = useState(false);
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const visibleNews = showAll ? siteConfig.news : siteConfig.news.slice(0, 3);
  const hasMore = siteConfig.news.length > 3;

  const toggleDetails = (id: string) => {
    setExpandedIds((prev) => ({...prev, [id]: !prev[id]}));
  };

  return (
    <Section
      id="news"
      kicker="Journal"
      title="Latest News"
      subtitle="Development logs, patch notes, and milestones from the island."
      className="bg-[#0b101b]"
    >
      <div className="space-y-4">
        {visibleNews.map((entry) => {
          const hasDetails = Boolean(entry.details && entry.details.length > 0);
          const isExpanded = Boolean(expandedIds[entry.id]);

          return (
            <article key={entry.id} className="stone-panel rounded-2xl p-6 sm:p-7">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#aba393] mb-2">
                <span>{entry.date}</span>
                {entry.tag && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-amber-300 font-medium">{entry.tag}</span>
                  </>
                )}
                {entry.isExample && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-teal-300/90">Example entry (editable in siteConfig.ts)</span>
                  </>
                )}
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#faf5ea]">
                {entry.title}
              </h3>

              <p className="mt-3 text-sm sm:text-base text-[#d2cab9] leading-relaxed max-w-3xl">
                {entry.summary}
              </p>

              {hasDetails && (
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => toggleDetails(entry.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`news-details-${entry.id}`}
                    className="inline-flex items-center gap-2 min-h-[40px] px-3.5 rounded-lg border border-amber-200/20 bg-[#121b2e] text-xs font-medium text-[#efe8d8] hover:border-amber-300/45 transition-colors"
                  >
                    <span>{isExpanded ? 'Hide notes' : 'Read details'}</span>
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {isExpanded && entry.details && (
                    <ul
                      id={`news-details-${entry.id}`}
                      className="mt-4 pt-4 border-t border-amber-200/15 space-y-2 text-sm text-[#c7bfae] list-disc pl-5"
                    >
                      {entry.details.map((line, idx) => (
                        <li key={idx}>{line}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>

      {hasMore && (
        <div className="mt-6">
          <Button variant="secondary" onClick={() => setShowAll((prev) => !prev)}>
            {showAll ? 'Show latest 3' : `View all (${siteConfig.news.length})`}
          </Button>
        </div>
      )}
    </Section>
  );
}
