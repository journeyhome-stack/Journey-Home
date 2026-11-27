import {siteConfig, type DownloadPlatformId} from '../config/siteConfig';
import {Button} from './Button';
import {Section} from './Section';

function PlatformIcon({id}: {id: DownloadPlatformId}) {
  const cls = 'w-6 h-6';
  switch (id) {
    case 'windows':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls} aria-hidden="true">
          <path d="M3 5.2L10.8 4v7.2H3V5.2Zm9-1.4L21 2.5v8.7h-9V3.8ZM3 12.8h7.8v7.2L3 18.8v-6Zm9 0h9v8.7l-9-1.3v-7.4Z" />
        </svg>
      );
    case 'macos':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={cls} aria-hidden="true">
          <path d="M16.5 12.6c0-2.1 1.7-3.2 1.8-3.3-1-1.4-2.5-1.6-3-1.7-1.3-.1-2.5.8-3.2.8-.7 0-1.7-.8-2.8-.7-1.4 0-2.8.8-3.5 2.1-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.8-.7s1.7.7 2.8.7c1.2 0 1.9-1 2.6-2.1.8-1.2 1.2-2.4 1.2-2.5-.1 0-2.5-1-2.5-3.5Z" />
          <path d="M14.3 5.8c.6-.7 1-1.7.9-2.8-.9.1-2 .6-2.6 1.3-.5.6-1 1.7-.9 2.7 1 .1 2-.5 2.6-1.2Z" />
        </svg>
      );
    case 'linux':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true">
          <rect x="4" y="4.5" width="16" height="15" rx="2.5" />
          <path d="M8 10l2.5 2L8 14" />
          <path d="M12.5 14H16" />
        </svg>
      );
    case 'android':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true">
          <path d="M6.5 10.5h11v6.5a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-6.5Z" />
          <path d="M7.5 10.5a4.5 4.5 0 0 1 9 0" />
          <path d="M9 5l1 1.8M15 5l-1 1.8" />
        </svg>
      );
    case 'other':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true">
          <path d="M12 3.5l7 4v9l-7 4-7-4v-9l7-4Z" />
          <path d="M5 7.5l7 4 7-4M12 11.5v9" />
        </svg>
      );
  }
}

export function Download() {
  const hasBrowserUrl = siteConfig.playInBrowserUrl.trim().length > 0;
  const androidBuild = siteConfig.downloads.find((d) => d.id === 'android');
  const showAndroidTips =
    Boolean(androidBuild?.available) && Boolean(androidBuild?.url.trim().length);

  return (
    <Section
      id="download"
      kicker="Ways to Play"
      title="Play Journey Home"
      subtitle="Launch directly in your browser when live, or choose a platform build as downloadable releases are added."
      className="bg-[#0e1524]"
    >
      {/* Featured Play in Browser Card */}
      <div className="stone-panel rounded-2xl p-6 sm:p-8 mb-8 border-teal-400/25">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2.5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-300">
              Web Edition · Desktop &amp; Mobile
            </p>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#faf5ea]">
              Play in Your Browser
            </h3>
            <p className="text-sm sm:text-base text-[#cfc7b7] leading-relaxed">
              No installation needed. Plays with keyboard and mouse on desktop or touch controls on mobile.
            </p>
            <p className="text-xs text-[#a59d8d]">
              {siteConfig.recommendedBrowsersNote}
            </p>
          </div>

          <div className="shrink-0">
            {hasBrowserUrl ? (
              <Button href={siteConfig.playInBrowserUrl} external variant="primary" size="lg">
                Play in Browser
              </Button>
            ) : (
              <Button variant="primary" size="lg" disabled ariaLabel="Play in Browser — Coming soon">
                Play in Browser · Coming Soon
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Platform Download Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        {siteConfig.downloads.map((item) => {
          const isReady = item.available && item.url.trim().length > 0;
          return (
            <article
              key={item.id}
              className="stone-panel-subtle rounded-xl p-5 flex flex-col justify-between gap-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-amber-300 mb-3">
                  <PlatformIcon id={item.id} />
                  <span className="text-[11px] font-medium uppercase tracking-wider text-[#9d9585]">
                    {isReady ? 'Available' : 'Coming soon'}
                  </span>
                </div>

                <h3 className="font-display text-lg font-semibold text-[#f3ede0]">
                  {item.label}
                </h3>
                <p className="text-xs text-[#9c9484] mt-0.5">{item.formatNote}</p>

                <dl className="mt-4 space-y-1.5 text-xs border-t border-amber-200/10 pt-3">
                  <div className="flex justify-between gap-2">
                    <dt className="text-[#9e9687]">Version</dt>
                    <dd className="text-[#e2dac9] font-mono tabular-nums">{item.version}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-[#9e9687]">Size</dt>
                    <dd className="text-[#e2dac9] font-mono tabular-nums">{item.fileSize}</dd>
                  </div>
                </dl>
              </div>

              {isReady ? (
                <Button href={item.url} external variant="secondary" size="sm" className="w-full">
                  Download
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  disabled
                  className="w-full"
                  ariaLabel={`${item.label} download — Coming soon`}
                >
                  Coming soon
                </Button>
              )}
            </article>
          );
        })}
      </div>

      {/* Conditional Android Install Tips */}
      {showAndroidTips && (
        <div className="stone-panel-subtle rounded-xl p-5 mb-10 border-teal-400/25">
          <h3 className="font-display text-base font-semibold text-teal-300 mb-1.5">
            Android Install Tips
          </h3>
          <p className="text-sm text-[#d2cab9] leading-relaxed">
            {siteConfig.androidInstallTips}
          </p>
        </div>
      )}

      {/* System Requirements */}
      <div className="stone-panel-subtle rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-6">
          <h3 className="font-display text-xl font-semibold text-[#f5efe2]">
            System Requirements
          </h3>
          <p className="text-xs sm:text-sm text-teal-300/90">
            Your progress is saved automatically on your device.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300 mb-3">
              Minimum
            </h4>
            <dl className="divide-y divide-amber-200/10 text-sm">
              {siteConfig.systemRequirements.minimum.map((row) => (
                <div key={row.label} className="py-2.5 flex items-center justify-between gap-4">
                  <dt className="text-[#a8a090]">{row.label}</dt>
                  <dd className="text-[#e8e0cf] text-right">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-300 mb-3">
              Recommended
            </h4>
            <dl className="divide-y divide-amber-200/10 text-sm">
              {siteConfig.systemRequirements.recommended.map((row) => (
                <div key={row.label} className="py-2.5 flex items-center justify-between gap-4">
                  <dt className="text-[#a8a090]">{row.label}</dt>
                  <dd className="text-[#e8e0cf] text-right">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </Section>
  );
}
