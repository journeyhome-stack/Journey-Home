import {useEffect, useState} from 'react';
import {siteConfig} from '../config/siteConfig';
import {Button} from './Button';
import {Logo} from './Logo';
import {SocialIcon} from './SocialIcon';

interface NavLinkItem {
  id: string;
  label: string;
  isPage?: boolean;
}

interface NavbarProps {
  currentPage: 'home' | 'explore';
  onNavigateHomeSection: (sectionId?: string) => void;
  onNavigateExplore: () => void;
}

const NAV_LINKS: NavLinkItem[] = [
  {id: 'explore', label: 'Explore Game', isPage: true},
  {id: 'screenshots', label: 'Screenshots'},
  {id: 'download', label: 'Download'},
  {id: 'news', label: 'News'},
  {id: 'community', label: 'Community'},
  {id: 'faq', label: 'FAQ'},
];

export function Navbar({
  currentPage,
  onNavigateHomeSection,
  onNavigateExplore,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('hero');

  useEffect(() => {
    if (currentPage === 'explore') {
      setActiveId('explore');
      return;
    }

    const sectionIds = ['hero', ...NAV_LINKS.filter((l) => !l.isPage).map((l) => l.id)];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0 || typeof IntersectionObserver === 'undefined') {
      setActiveId('hero');
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
  }, [currentPage]);

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

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: NavLinkItem) => {
    e.preventDefault();
    setMobileOpen(false);
    if (link.isPage) {
      onNavigateExplore();
    } else {
      onNavigateHomeSection(link.id);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#262626] bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <a
          href="#/"
          onClick={(e) => {
            e.preventDefault();
            setMobileOpen(false);
            onNavigateHomeSection();
          }}
          aria-label="Journey Home — Back to home"
          className="rounded-md focus-visible:outline-offset-4 shrink-0"
        >
          <Logo />
        </a>

        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-5 xl:gap-6">
          {NAV_LINKS.map((link) => {
            const isActive =
              (link.isPage && currentPage === 'explore') ||
              (!link.isPage && currentPage === 'home' && activeId === link.id);

            return (
              <a
                key={link.id}
                href={link.isPage ? '#/explore' : `#${link.id}`}
                onClick={(e) => handleLinkClick(e, link)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'text-[#facc15]'
                    : 'text-[#d4d4d4] hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-[#facc15] rounded-full"
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <div className="hidden xl:flex items-center gap-0.5 pr-1 border-r border-[#262626]">
            {desktopSocials.map((social) => (
              <SocialIcon key={social.id} social={social} variant="compact" />
            ))}
          </div>
          <Button
            href="#download"
            onClick={() => onNavigateHomeSection('download')}
            variant="primary"
            size="sm"
          >
            Download
          </Button>
        </div>

        <div className="flex lg:hidden items-center gap-2 shrink-0">
          <Button
            href="#download"
            onClick={() => {
              setMobileOpen(false);
              onNavigateHomeSection('download');
            }}
            variant="primary"
            size="sm"
          >
            Download
          </Button>
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#333333] bg-[#111111] text-white hover:border-[#facc15] transition-colors"
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

      {mobileOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Mobile navigation"
          className="lg:hidden border-t border-[#262626] bg-[#0a0a0a] px-4 py-4"
        >
          <ul className="grid grid-cols-2 gap-2">
            {NAV_LINKS.map((link) => {
              const isActive =
                (link.isPage && currentPage === 'explore') ||
                (!link.isPage && currentPage === 'home' && activeId === link.id);
              return (
                <li key={link.id}>
                  <a
                    href={link.isPage ? '#/explore' : `#${link.id}`}
                    onClick={(e) => handleLinkClick(e, link)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex items-center min-h-[44px] px-3.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#facc15] text-black font-bold border border-[#facc15]'
                        : 'text-[#e5e5e5] bg-[#141414] border border-[#262626] hover:border-[#22c55e]'
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
