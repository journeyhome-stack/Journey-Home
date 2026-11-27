import {useEffect, useRef, useState} from 'react';
import {siteConfig} from '../config/siteConfig';
import {Logo} from './Logo';
import {SocialIcon} from './SocialIcon';

type LegalModalType = 'privacy' | 'credits' | null;

const QUICK_LINKS = [
  {href: '#about', label: 'Game'},
  {href: '#features', label: 'Features'},
  {href: '#regions', label: 'Regions'},
  {href: '#screenshots', label: 'Screenshots'},
  {href: '#download', label: 'Download'},
  {href: '#news', label: 'News'},
  {href: '#community', label: 'Community'},
  {href: '#faq', label: 'FAQ'},
];

export function Footer() {
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
    <footer className="border-t border-amber-200/15 bg-[#080c15] pt-12 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 pb-10 border-b border-amber-200/10">
          <div className="max-w-sm space-y-3">
            <Logo />
            <p className="text-sm text-[#c2baa9] leading-relaxed">
              {siteConfig.game.tagline}
            </p>
          </div>

          <div className="space-y-4">
            <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-2">
              {QUICK_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#cfc7b6] hover:text-amber-300 py-1 transition-colors"
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
              className="inline-flex items-center gap-2 min-h-[44px] px-4 rounded-lg border border-amber-200/20 bg-[#101829] text-xs font-medium text-[#ebe3d3] hover:border-amber-300/45 hover:text-white transition-colors"
            >
              <span>Back to top</span>
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#9c9484]">
          <p>
            © {siteConfig.currentYear} {siteConfig.copyrightOwner}. {siteConfig.game.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setModalType('privacy')}
              className="min-h-[40px] hover:text-amber-300 underline underline-offset-4 decoration-amber-200/25 transition-colors"
            >
              Privacy
            </button>
            <button
              type="button"
              onClick={() => setModalType('credits')}
              className="min-h-[40px] hover:text-amber-300 underline underline-offset-4 decoration-amber-200/25 transition-colors"
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
          className="fixed inset-0 z-50 bg-[#060911]/85 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl border border-amber-200/25 bg-[#101829] p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between gap-4">
              <h2 id="legal-modal-title" className="font-display text-xl font-semibold text-[#faf5ea]">
                {modalType === 'privacy' ? 'Privacy Notice' : 'Credits'}
              </h2>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setModalType(null)}
                className="min-h-[44px] px-3.5 rounded-lg border border-amber-200/20 bg-[#172238] text-xs font-medium text-[#efe8d8] hover:border-amber-200/45 transition-colors"
              >
                Close
              </button>
            </div>

            <div className="space-y-3 text-sm text-[#cfc7b7] leading-relaxed">
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
