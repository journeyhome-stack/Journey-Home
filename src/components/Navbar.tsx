import {useEffect, useState} from 'react';
import {siteConfig} from '../config/siteConfig';
import {Button} from './Button';
import {Logo} from './Logo';
import {SocialIcon} from './SocialIcon';

interface NavLinkItem {
  id: string;
  label: string;
}

const NAV_LINKS: NavLinkItem[] = [
  {id: 'about', label: 'Game'},
  {id: 'features', label: 'Features'},
  {id: 'regions', label: 'Regions'},
  {id: 'screenshots', label: 'Screenshots'},
  {id: 'download', label: 'Download'},
  {id: 'news', label: 'News'},
  {id: 'community', label: 'Community'},
  {id: 'faq', label: 'FAQ'},
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('hero');

  // Highlight active section while scrolling
  useEffect(() => {
    const sectionIds = ['hero', ...NAV_LINKS.map((l) => l.id)];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0 || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      {
        rootMargin: '-28% 0px -55% 0px',
        threshold: 0.01,
      },
    );

    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  // Close mobile menu on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  const desktopSocials = siteConfig.socialLinks
    .filter((s) => s.enabled && ['youtube', 'discord', 'itch', 'steam'].includes(s.id));

  return (
    <header className="sticky top-0 z-40 border-b border-amber-200/15 bg-[#0b101b]/92 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <a
          href="#hero"
          aria-label="Journey Home — Back to top"
          className="rounded-md focus-visible:outline-offset-4 shrink-0"
        >
          <Logo />
        </a>

        {/* Desktop navigation */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-5 xl:gap-6">
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={isActive ? 'location' : undefined}
                className={`relative py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'text-amber-300'
                    : 'text-[#d5cebe] hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-gradient-to-r from-amber-400/80 via-teal-300 to-amber-400/80 rounded-full"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Desktop right zone: compact social row + primary Download button */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <div className="hidden xl:flex items-center gap-0.5 pr-1 border-r border-amber-200/15">
            {desktopSocials.map((social) => (
              <SocialIcon key={social.id} social={social} variant="compact" />
            ))}
          </div>
          <Button href="#download" variant="primary" size="sm">
            Download
          </Button>
        </div>

        {/* Mobile hamburger toggle */}
        <div className="flex lg:hidden items-center gap-2 shrink-0">
          <Button href="#download" variant="primary" size="sm">
            Download
          </Button>
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex items-center justify-center w-11 h-11 rounded-lg border border-amber-200/20 bg-[#121a2a] text-[#efe8d8] hover:border-amber-200/45 transition-colors"
          >
            {mobileOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" aria-hidden="true">
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" aria-hidden="true">
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Mobile navigation"
          className="lg:hidden border-t border-amber-200/15 bg-[#0d1423] px-4 py-4"
        >
          <ul className="grid grid-cols-2 gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setMobileOpen(false)}
                    aria-current={isActive ? 'location' : undefined}
                    className={`flex items-center min-h-[44px] px-3.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-amber-500/15 text-amber-300 border border-amber-400/35'
                        : 'text-[#dfd8c8] hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
