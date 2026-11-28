import {
  siDiscord,
  siFacebook,
  siGithub,
  siInstagram,
  siItchdotio,
  siReddit,
  siSteam,
  siTiktok,
  siTwitch,
  siX,
  siYoutube,
  type SimpleIcon,
} from 'simple-icons';
import type {SocialLink, SocialPlatformId} from '../config/siteConfig';

interface SocialIconProps {
  social: SocialLink;
  variant?: 'compact' | 'card';
}

const BRAND_ICONS: Partial<Record<SocialPlatformId, SimpleIcon>> = {
  youtube: siYoutube,
  instagram: siInstagram,
  twitch: siTwitch,
  discord: siDiscord,
  x: siX,
  tiktok: siTiktok,
  facebook: siFacebook,
  reddit: siReddit,
  github: siGithub,
  itch: siItchdotio,
  steam: siSteam,
};

function PlatformGlyph({id, className = 'w-5 h-5'}: {id: SocialPlatformId; className?: string}) {
  const brandIcon = BRAND_ICONS[id];
  if (brandIcon) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d={brandIcon.path} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4 5.5A2.5 2.5 0 0 0 1.5 8v8A2.5 2.5 0 0 0 4 18.5h16a2.5 2.5 0 0 0 2.5-2.5V8A2.5 2.5 0 0 0 20 5.5H4Zm0 2 8 5 8-5V8l-8 5-8-5v-.5Z" />
    </svg>
  );
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
          className="group flex items-center gap-3.5 min-h-[52px] px-4 py-3 rounded-xl bg-[#050806] border border-[#14532d] hover:border-[#22c55e] transition-colors active:translate-y-px"
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
        className="flex items-center gap-3.5 min-h-[52px] px-4 py-3 rounded-xl border border-[#0f381f] bg-[#030504] cursor-not-allowed select-none"
      >
        <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#0b120d] border border-[#14532d]/70 text-[#b3b3b3] shrink-0">
          <PlatformGlyph id={social.id} className="w-5 h-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-medium text-[#d4d4d4] truncate">{social.label}</span>
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
        className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-[#d4d4d4] hover:text-[#22c55e] hover:bg-[#0b120d] transition-colors"
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
      className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-[#8a8a8a] cursor-not-allowed select-none"
    >
      <PlatformGlyph id={social.id} className="w-4 h-4" />
    </span>
  );
}
