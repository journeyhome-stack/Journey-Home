import type {ReactNode} from 'react';
import {Button} from '../components/Button';

export type PageId = 'home' | 'explore' | 'screenshots' | 'signin';

interface PageNavTarget {
  page: PageId;
  anchor?: string;
  label: string;
  href: string;
}

interface SectionPageProps {
  prev?: PageNavTarget;
  next?: PageNavTarget;
  onNavigate: (page: PageId, options?: {anchor?: string}) => void;
  children: ReactNode;
}

export function SectionPage({prev, next, onNavigate, children}: SectionPageProps) {
  return (
    <div className="bg-transparent text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 -mb-6 sm:-mb-8">
        <a
          href="#/"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
          className="inline-flex items-center gap-2 min-h-[40px] text-sm font-semibold text-[#22c55e] hover:text-[#4ade80] transition-colors"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
              clipRule="evenodd"
            />
          </svg>
          <span>Back to Home</span>
        </a>
      </div>

      {children}

      {(prev || next) && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="stone-panel rounded-2xl p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              {prev && (
                <Button
                  variant="ghost"
                  size="sm"
                  href={prev.href}
                  onClick={() => onNavigate(prev.page, {anchor: prev.anchor})}
                >
                  ← {prev.label}
                </Button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                href="#/"
                onClick={() => onNavigate('home')}
              >
                Home
              </Button>
              {next && (
                <Button
                  variant="primary"
                  size="sm"
                  href={next.href}
                  onClick={() => onNavigate(next.page, {anchor: next.anchor})}
                >
                  {next.label} →
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
