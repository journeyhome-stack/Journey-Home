import {useEffect, useRef, useState} from 'react';
import {siteConfig} from '../config/siteConfig';
import {Logo} from './Logo';
import {SocialIcon} from './SocialIcon';

type LegalModalType = 'privacy' | 'credits' | null;

interface FooterProps {
  onNavigateHomeSection: (sectionId?: string) => void;
  onNavigateExplore: () => void;
}

const QUICK_LINKS = [
  {id: 'explore', label: 'Explore Game', isPage: true},
  {id: 'screenshots', label: 'Screenshots', isPage: false},
  {id: 'download', label: 'Download', isPage: false},
  {id: 'news', label: 'News', isPage: false},
  {id: 'community', label: 'Community', isPage: false},
  {id: 'faq', label: 'FAQ', isPage: false},
];

export function Footer({onNavigateHomeSection, onNavigateExplore}: FooterProps) {
  const [modalType, setModalType] = useState<LegalModalType>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const enabledSocials = siteConfig.socialLinks.filter((s) => s.enabled);

  useEffect(() => {
    if (!modalType) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalType(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      previous?.focus();
    };
  }, [modalType]);

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  return (
    <footer className="relative z-10 border-t border-[#262626] bg-transparent pt-12 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 pb-10 border-b border-[#262626]">
          <div className="max-w-sm space-y-3">
            <a
              href="#/"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHomeSection();
              }}
              aria-label="Journey Home — Back to home"
            >
              <Logo />
            </a>
            <p className="text-sm text-[#cccccc] leading-relaxed">
              {siteConfig.game.tagline}
            </p>
          </div>

          <div className="space-y-4">
            <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-2">
              {QUICK_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.isPage ? '#/explore' : `#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (link.isPage) {
                      onNavigateExplore();
                    } else {
                      onNavigateHomeSection(link.id);
                    }
                  }}
                  className="text-sm text-[#d4d4d4] hover:text-[#4ade80] py-1 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex flex-wrap items-center gap-1" aria-label="Social channels">
              {enabledSocials.map((social) => (
                <SocialIcon key={social.id} social={social} variant="compact" />
              ))}
            </div>
          </div>

          <div className="shrink-0">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 min-h-[44px] px-4 rounded-lg border border-[#166534] bg-[#0b100c] text-xs font-semibold text-white hover:border-[#22c55e] hover:text-[#4ade80] transition-colors"
            >
              <span>Back to top</span>
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-[#22c55e]" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#999999]">
          <p>
            © {siteConfig.currentYear} {siteConfig.copyrightOwner}. {siteConfig.game.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setModalType('privacy')}
              className="min-h-[40px] hover:text-[#4ade80] underline underline-offset-4 decoration-[#166534] transition-colors"
            >
              Privacy
            </button>
            <button
              type="button"
              onClick={() => setModalType('credits')}
              className="min-h-[40px] hover:text-[#22c55e] underline underline-offset-4 decoration-[#525252] transition-colors"
            >
              Credits
            </button>
          </div>
        </div>
      </div>

      {/* Privacy & Credits Modal */}
      {modalType && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
          onClick={() => setModalType(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl border border-[#2e2e2e] bg-[#0f0f0f] p-6 space-y-4"
          >
            <div className="flex items-center justify-between gap-4">
              <h2 id="legal-modal-title" className="font-display text-xl font-semibold text-white">
                {modalType === 'privacy' ? 'Privacy Notice' : 'Credits'}
              </h2>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setModalType(null)}
                className="min-h-[44px] px-3.5 rounded-lg border border-[#166534] bg-black text-xs font-semibold text-white hover:border-[#22c55e] transition-colors"
              >
                Close
              </button>
            </div>

            <div className="space-y-3 text-sm text-[#d4d4d4] leading-relaxed">
              {(modalType === 'privacy' ? siteConfig.legal.privacy : siteConfig.legal.credits).map(
                (paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ),
              )}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
