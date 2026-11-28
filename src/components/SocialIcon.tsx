import type {SocialLink, SocialPlatformId} from '../config/siteConfig';

interface SocialIconProps {
  social: SocialLink;
  variant?: 'compact' | 'card';
}

function PlatformGlyph({id, className = 'w-5 h-5'}: {id: SocialPlatformId; className?: string}) {
  switch (id) {
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
          <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
          <path d="M10 9.5L15.5 12L10 14.5V9.5Z" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
          <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="M14 4v10.2a3.8 3.8 0 1 1-3-3.7" />
          <path d="M14 4c.8 2.6 2.6 4.2 5 4.6" />
        </svg>
      );
    case 'x':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" className={className} aria-hidden="true">
          <path d="M4.5 4.5L19.5 19.5" />
          <path d="M19.5 4.5L4.5 19.5" />
        </svg>
      );
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="M15 3.5h-2.5A4 4 0 0 0 8.5 7.5V11H6v3.5h2.5V21h3.8v-6.5H15l.7-3.5h-3.4V7.8c0-.6.5-1.1 1.1-1.1H15V3.5Z" />
        </svg>
      );
    case 'discord':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="M8.5 6.5c2.2-.6 4.8-.6 7 0l1.2 1.1c1.8 2.3 2.5 5 2.3 8.1-1.6 1.3-3.3 2-5 2.3l-.9-1.5m-4.2 0L8 18c-1.7-.3-3.4-1-5-2.3-.2-3.1.5-5.8 2.3-8.1l1.2-1.1Z" />
          <circle cx="9.2" cy="12.2" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="14.8" cy="12.2" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'reddit':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <ellipse cx="12" cy="14" rx="7.5" ry="5.2" />
          <path d="M12 8.8l1.6-4.3 3.4.8" />
          <circle cx="17.8" cy="5.6" r="1.2" />
          <circle cx="9.2" cy="13.2" r="1" fill="currentColor" stroke="none" />
          <circle cx="14.8" cy="13.2" r="1" fill="currentColor" stroke="none" />
          <path d="M9.5 16.2c1.5.9 3.5.9 5 0" />
        </svg>
      );
    case 'twitch':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="M4.5 4h15v10.5l-4 4h-4L8.5 21v-2.5h-4V4Z" />
          <path d="M11 8.5v4" />
          <path d="M15 8.5v4" />
        </svg>
      );
    case 'github':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="M9 19c-4 1.2-4-2-5.5-2.5M14.5 20.5v-3.2a2.8 2.8 0 0 0-.8-2.2c2.7-.3 5.5-1.3 5.5-5.8a4.5 4.5 0 0 0-1.2-3.1 4.2 4.2 0 0 0-.1-3.1s-1-.3-3.2 1.2a11 11 0 0 0-5.4 0C7.1 2.8 6.1 3.1 6.1 3.1a4.2 4.2 0 0 0-.1 3.1 4.5 4.5 0 0 0-1.2 3.1c0 4.5 2.8 5.5 5.5 5.8a2.8 2.8 0 0 0-.8 2.2v3.2" />
        </svg>
      );
    case 'itch':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="M4.5 5.5h15l1.5 3.8a2.2 2.2 0 0 1-4 1.2 2.2 2.2 0 0 1-3.3.2 2.2 2.2 0 0 1-3.4 0 2.2 2.2 0 0 1-3.3-.2 2.2 2.2 0 0 1-4-1.2L4.5 5.5Z" />
          <path d="M5.5 11.5v7.5h13v-7.5" />
          <path d="M10 15.5h4" />
        </svg>
      );
    case 'steam':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <circle cx="15" cy="8.5" r="3.5" />
          <circle cx="9.2" cy="16.2" r="2.6" />
          <path d="M12.2 10.6L10.3 13.8" />
          <path d="M3.5 13.5l4.2 1.8" />
        </svg>
      );
    case 'email':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
          <path d="M4.5 7l7.5 5.5L19.5 7" />
        </svg>
      );
  }
}

export function SocialIcon({social, variant = 'compact'}: SocialIconProps) {
  if (!social.enabled) {
    return null;
  }

  const hasUrl = social.url.trim().length > 0;
  const isMail = social.id === 'email' && social.url.startsWith('mailto:');

  if (variant === 'card') {
    if (hasUrl) {
      return (
        <a
          href={social.url}
          target={isMail ? undefined : '_blank'}
          rel={isMail ? undefined : 'noopener noreferrer'}
          aria-label={`${social.label} (opens in a new window)`}
          className="group flex items-center gap-3.5 min-h-[52px] px-4 py-3 rounded-xl bg-[#111111] border border-[#2e2e2e] hover:border-[#22c55e] transition-colors active:translate-y-px"
        >
          <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#22c55e] text-black group-hover:bg-[#4ade80] transition-colors shrink-0">
            <PlatformGlyph id={social.id} className="w-5 h-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold text-white truncate">{social.label}</span>
            <span className="block text-xs text-[#22c55e] font-medium">Visit channel</span>
          </span>
        </a>
      );
    }

    return (
      <span
        role="img"
        aria-label={`${social.label} — link coming soon`}
        title="Link coming soon"
        className="flex items-center gap-3.5 min-h-[52px] px-4 py-3 rounded-xl border border-[#222222] bg-[#0b0b0b] cursor-not-allowed select-none"
      >
        <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#171717] text-[#737373] shrink-0">
          <PlatformGlyph id={social.id} className="w-5 h-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-medium text-[#a3a3a3] truncate">{social.label}</span>
          <span className="block text-xs text-[#737373]">Coming soon</span>
        </span>
      </span>
    );
  }

  // Compact icon mode (navbar / footer)
  if (hasUrl) {
    return (
      <a
        href={social.url}
        target={isMail ? undefined : '_blank'}
        rel={isMail ? undefined : 'noopener noreferrer'}
        aria-label={social.label}
        title={social.label}
        className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-[#d4d4d4] hover:text-[#22c55e] hover:bg-[#141414] transition-colors"
      >
        <PlatformGlyph id={social.id} className="w-4 h-4" />
      </a>
    );
  }

  return (
    <span
      role="img"
      aria-label={`${social.label} (Link coming soon)`}
      title="Link coming soon"
      className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-[#525252] cursor-not-allowed select-none"
    >
      <PlatformGlyph id={social.id} className="w-4 h-4" />
    </span>
  );
}
