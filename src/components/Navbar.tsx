import {useEffect, useState} from 'react';
import {siteConfig} from '../config/siteConfig';
import type {PageId} from '../pages/SectionPage';
import {Button} from './Button';
import {Logo} from './Logo';
import {SocialIcon} from './SocialIcon';

interface NavLinkItem {
  key: string;
  page: PageId;
  anchor?: string;
  label: string;
  href: string;
}

interface NavbarProps {
  currentPage: PageId;
  signedInEmail?: string | null;
  onNavigate: (page: PageId, options?: {anchor?: string}) => void;
}

const NAV_LINKS: NavLinkItem[] = [
  {key: 'hero', page: 'home', label: 'Home', href: '#/'},
  {key: 'explore', page: 'explore', label: 'Explore Game', href: '#/explore'},
  {key: 'screenshots', page: 'screenshots', label: 'Screenshots', href: '#/screenshots'},
  {key: 'download', page: 'home', anchor: 'download', label: 'Download', href: '#download'},
  {key: 'news', page: 'home', anchor: 'news', label: 'News', href: '#news'},
  {key: 'faq', page: 'home', anchor: 'faq', label: 'FAQ', href: '#faq'},
  {key: 'community', page: 'home', anchor: 'community', label: 'Community', href: '#community'},
];

export function Navbar({currentPage, signedInEmail, onNavigate}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHomeSection, setActiveHomeSection] = useState<string>('hero');

  useEffect(() => {
    if (currentPage !== 'home') {
      return;
    }

    const sectionIds = ['hero', 'download', 'news', 'faq', 'community'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0 || typeof IntersectionObserver === 'undefined') {
      setActiveHomeSection('hero');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHomeSection(entry.target.id);
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

  const desktopSocials = siteConfig.socialLinks.filter((s) => s.enabled);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: NavLinkItem) => {
    e.preventDefault();
    setMobileOpen(false);
    onNavigate(link.page, link.anchor ? {anchor: link.anchor} : undefined);
  };

  const isLinkActive = (link: NavLinkItem) => {
    if (link.page !== 'home') {
      return currentPage === link.page;
    }
    return currentPage === 'home' && activeHomeSection === link.key;
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#262626] bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <a
          href="#/"
          onClick={(e) => {
            e.preventDefault();
            setMobileOpen(false);
            onNavigate('home');
          }}
          aria-label="Journey Home — Back to home"
          className="rounded-md focus-visible:outline-offset-4 shrink-0"
        >
          <Logo />
        </a>

        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-4 xl:gap-5">
          {NAV_LINKS.map((link) => {
            const isActive = isLinkActive(link);

            return (
              <a
                key={link.key}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'text-[#22c55e]'
                    : 'text-[#d4d4d4] hover:text-[#4ade80]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-[#22c55e] rounded-full"
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-2.5 shrink-0">
          <div className="hidden xl:flex items-center gap-0.5 pr-1 border-r border-[#262626]">
            {desktopSocials.map((social) => (
              <SocialIcon key={social.id} social={social} variant="compact" />
            ))}
          </div>
          <Button
            href="#/signin"
            onClick={() => onNavigate('signin')}
            variant={currentPage === 'signin' ? 'secondary' : 'ghost'}
            size="sm"
          >
            {signedInEmail ? 'Signed In' : 'Sign In'}
          </Button>
          <Button
            href="#download"
            onClick={() => onNavigate('home', {anchor: 'download'})}
            variant="primary"
            size="sm"
          >
            Download
          </Button>
        </div>

        <div className="flex lg:hidden items-center gap-2 shrink-0">
          <Button
            href="#/signin"
            onClick={() => {
              setMobileOpen(false);
              onNavigate('signin');
            }}
            variant={currentPage === 'signin' ? 'secondary' : 'ghost'}
            size="sm"
          >
            {signedInEmail ? 'Signed In' : 'Sign In'}
          </Button>
          <Button
            href="#download"
            onClick={() => {
              setMobileOpen(false);
              onNavigate('home', {anchor: 'download'});
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
            className="inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#166534] bg-[#0b100c] text-white hover:border-[#22c55e] transition-colors"
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
            {[
              ...NAV_LINKS,
              {
                key: 'signin',
                page: 'signin' as PageId,
                label: signedInEmail ? 'Account (Signed In)' : 'Sign In',
                href: '#/signin',
              },
            ].map((link) => {
              const isActive = isLinkActive(link);
              return (
                <li key={link.key}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex items-center min-h-[44px] px-3.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#22c55e] text-black font-bold border border-[#22c55e]'
                        : 'text-[#e5e5e5] bg-[#0d140f] border border-[#14532d] hover:border-[#22c55e]'
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
