import {useEffect, useRef, useState, type ReactNode} from 'react';

interface SectionProps {
  id: string;
  ariaLabel?: string;
  children: ReactNode;
  className?: string;
  kicker?: string;
  title?: string;
  subtitle?: string;
}

export function Section({
  id,
  ariaLabel,
  children,
  className = '',
  kicker,
  title,
  subtitle,
}: SectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      {threshold: 0.08, rootMargin: '0px 0px -30px 0px'},
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      aria-label={ariaLabel}
      className={`scroll-mt-20 py-16 sm:py-22 px-4 sm:px-6 lg:px-8 reveal-section ${
        visible ? 'is-visible' : ''
      } ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        {(kicker || title || subtitle) && (
          <header className="max-w-3xl mb-10 sm:mb-14">
            {kicker && (
              <p className="text-xs sm:text-sm font-medium tracking-[0.16em] text-teal-300/90 uppercase mb-2.5">
                {kicker}
              </p>
            )}
            {title && (
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#f6f0e3] tracking-wide">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-3 text-base sm:text-lg text-[#c5beae] leading-relaxed">
                {subtitle}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
