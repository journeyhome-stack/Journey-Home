import {useEffect, useRef, type TouchEvent} from 'react';
import type {ScreenshotItem} from '../config/siteConfig';

interface LightboxProps {
  items: ScreenshotItem[];
  activeIndex: number | null;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}

export function Lightbox({items, activeIndex, onClose, onChangeIndex}: LightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const isOpen = activeIndex !== null && items[activeIndex] !== undefined;

  useEffect(() => {
    if (!isOpen || activeIndex === null) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        onChangeIndex((activeIndex + 1) % items.length);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onChangeIndex((activeIndex - 1 + items.length) % items.length);
      } else if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus();
    };
  }, [isOpen, activeIndex, items.length, onClose, onChangeIndex]);

  if (!isOpen || activeIndex === null) return null;

  const current = items[activeIndex];

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
        onChangeIndex((activeIndex + 1) % items.length);
      } else {
        onChangeIndex((activeIndex - 1 + items.length) % items.length);
      }
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Screenshot viewer: ${current.caption}`}
      ref={dialogRef}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="fixed inset-0 z-50 bg-[#060911]/92 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl rounded-2xl border border-amber-200/25 bg-[#0e1524] p-3 sm:p-5 shadow-2xl"
      >
        <div className="flex items-center justify-between gap-4 pb-3">
          <p className="text-xs sm:text-sm font-medium text-[#d7d0c0] tabular-nums">
            Screenshot {activeIndex + 1} of {items.length}
          </p>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close screenshot viewer"
            className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] px-3 rounded-lg border border-amber-200/20 bg-[#141e33] text-[#f3ede0] hover:border-amber-200/45 transition-colors"
          >
            Close
          </button>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#070b13]">
          <img
            src={current.src}
            alt={current.alt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-sm text-[#e8e0cf]">{current.caption}</p>
          {items.length > 1 && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => onChangeIndex((activeIndex - 1 + items.length) % items.length)}
                aria-label="Previous screenshot"
                className="min-h-[44px] px-4 rounded-lg border border-amber-200/20 bg-[#141e33] text-xs font-medium text-[#efe8d8] hover:border-amber-200/45 transition-colors"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => onChangeIndex((activeIndex + 1) % items.length)}
                aria-label="Next screenshot"
                className="min-h-[44px] px-4 rounded-lg border border-amber-200/20 bg-[#141e33] text-xs font-medium text-[#efe8d8] hover:border-amber-200/45 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
