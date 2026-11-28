/**
 * ============================================================================
 * JOURNEY HOME — CENTRAL SITE CONFIGURATION
 * ============================================================================
 * Edit this single file to update links, images, trailer, news, FAQ, and text.
 *
 * HOW IMAGES WORK:
 * - Leave `src` as "" (empty string) to show a designed placeholder frame with
 *   the recommended pixel dimensions.
 * - To use a real image, place your file inside `public/images/` (for example
 *   `public/images/hero.jpg`) and set `src: "./images/hero.jpg"` (always use
 *   a relative path starting with "./" so GitHub Pages subfolder hosting works).
 *
 * HOW LINKS WORK:
 * - Social icons with an empty `url: ""` remain visible so you can preview the
 *   layout, rendered as dimmed, non-clickable items with "Link coming soon".
 * - Download buttons with `available: false` or an empty `url: ""` show
 *   "Coming soon" and are disabled until you add a URL and set `available: true`.
 * ============================================================================
 */

export type SocialPlatformId =
  | 'youtube'
  | 'instagram'
  | 'tiktok'
  | 'x'
  | 'facebook'
  | 'discord'
  | 'reddit'
  | 'twitch'
  | 'github'
  | 'itch'
  | 'steam'
  | 'email';

export type DownloadPlatformId = 'windows' | 'macos' | 'linux' | 'android' | 'other';

export type NewsTag = 'Announcement' | 'Update' | 'Dev Log' | 'Patch Notes';

export interface ImageAsset {
  /** Relative path such as "./images/hero.jpg", or "" to show the placeholder frame. */
  src: string;
  /** Accessible description of the image for screen readers. */
  alt: string;
  /** Optional caption shown in the gallery and lightbox. */
  caption?: string;
}

export interface DownloadOption {
  id: DownloadPlatformId;
  label: string;
  /** Direct download URL or store page URL. Leave "" until ready. */
  url: string;
  /** Version label, e.g. "v1.0" or "Coming soon". */
  version: string;
  /** File size text, e.g. "240 MB" or "To be announced". */
  fileSize: string;
  /** Set to true once `url` is filled and ready for players. */
  available: boolean;
  /** Short format note shown on the download card. */
  formatNote: string;
}

export interface SocialLink {
  id: SocialPlatformId;
  label: string;
  /** Full profile/invite URL (or "mailto:you@example.com" for email). Leave "" until ready. */
  url: string;
  /** Set to false to completely hide this icon from the page. */
  enabled: boolean;
}

export interface RegionItem {
  id: string;
  levelNumber: number;
  name: string;
  subtitle: string;
  isFinal?: boolean;
  description: string;
  mechanics: string[];
  theme: {
    /** Primary accent hex for highlights and active borders */
    accentHex: string;
    /** Secondary accent hex */
    secondaryHex: string;
    /** Solid surface class */
    cardSurface: string;
    /** Placeholder illustration variant */
    sceneVariant: 'shore' | 'woods' | 'sunken' | 'peaks' | 'sky';
  };
  image: ImageAsset;
}

export interface FeatureItem {
  id: string;
  icon: 'compass' | 'map' | 'crystal' | 'chest' | 'puzzle' | 'devices' | 'save' | 'replay';
  title: string;
  description: string;
}

export interface ScreenshotItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

export interface NewsEntry {
  id: string;
  date: string;
  title: string;
  summary: string;
  tag?: NewsTag;
  /** Optional longer details (e.g. patch notes) revealed via an expand toggle. */
  details?: string[];
  /** Optional flag for example content so you know which entry to replace or delete. */
  isExample?: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface RequirementRow {
  label: string;
  value: string;
}

export const siteConfig = {
  game: {
    name: 'Journey Home',
    tagline: 'Every journey leads somewhere. Yours leads home.',
    genre: 'Stylized 3D third-person adventure',
    shortPitch:
      'Explore a forgotten ancient island across five distinct regions, solve environmental puzzles, recover five lost fragments, and uncover the path back home.',
    longDescription: [
      'A lone explorer washes ashore on a quiet, uncharted island crowned with the ruins of an ancient civilization. Long ago, the island thrived on a radiant energy that has since vanished, leaving stone sanctuaries dormant and pathways sealed.',
      'Step into the explorer’s boots and chart five interconnected regions at your own pace—from sun-bleached coastal caves and bioluminescent forests to flooded temples, aurora-lit mountain peaks, and floating ruins high above the clouds.',
      'Along the way, gather ancient energy crystals, unlock hidden chests, decipher switches and sealed doors, and piece together the story of what befell the island—all on a journey that ultimately leads back home.',
    ],
  },

  /**
   * Browser Play URL:
   * Paste the URL to your WebGL / HTML5 playable build here (e.g. "./play/" or an itch.io embed link).
   * Leave "" while the browser version is not yet linked.
   */
  playInBrowserUrl: '',
  recommendedBrowsersNote:
    'Recommended on up-to-date Chrome, Firefox, Edge, or Safari (desktop and mobile browsers supported).',

  /**
   * Wishlist / Follow URL (used by the secondary Hero action).
   * Paste your Steam, Itch.io, or community link here, or leave "" to jump to the Community section.
   */
  wishlistUrl: '',

  /**
   * Artwork & Social Share Slots
   * Place files in `public/images/` and use relative paths like "./images/hero-art.jpg".
   */
  heroImage: {
    src: '',
    alt: 'Journey Home key artwork showing an explorer overlooking ancient island ruins at twilight',
  } satisfies ImageAsset,

  aboutImage: {
    src: '',
    alt: 'Explorer standing before weathered stone arches and glowing energy crystals in Journey Home',
  } satisfies ImageAsset,

  socialShareImage: {
    src: '',
    alt: 'Journey Home 1200x630 social share preview banner',
  } satisfies ImageAsset,

  /**
   * Trailer Configuration
   * Paste only the YouTube video ID (for example "dQw4w9WgXcQ"), NOT the full URL.
   * Leave "" to display the "Trailer coming soon" frame.
   */
  trailer: {
    youtubeId: '',
    title: 'Journey Home — Official Trailer',
    thumbnailSrc: '',
    thumbnailAlt: 'Journey Home trailer thumbnail preview',
  },

  /**
   * Platform Downloads
   * Set `available: true` and fill `url`, `version`, and `fileSize` when a build is ready.
   */
  downloads: [
    {
      id: 'windows',
      label: 'Windows',
      url: '',
      version: 'To be announced',
      fileSize: 'To be announced',
      available: false,
      formatNote: 'Desktop installer / archive',
    },
    {
      id: 'macos',
      label: 'macOS',
      url: '',
      version: 'To be announced',
      fileSize: 'To be announced',
      available: false,
      formatNote: 'Universal app bundle',
    },
    {
      id: 'linux',
      label: 'Linux',
      url: '',
      version: 'To be announced',
      fileSize: 'To be announced',
      available: false,
      formatNote: 'Desktop archive / AppImage',
    },
    {
      id: 'android',
      label: 'Android (APK)',
      url: '',
      version: 'To be announced',
      fileSize: 'To be announced',
      available: false,
      formatNote: 'Touch controls built in',
    },
    {
      id: 'other',
      label: 'Other Builds',
      url: '',
      version: 'To be announced',
      fileSize: 'To be announced',
      available: false,
      formatNote: 'Additional platforms',
    },
  ] satisfies DownloadOption[],

  /**
   * Shown automatically in the Download section when the Android download is enabled.
   */
  androidInstallTips:
    'To install the APK on Android, open the downloaded file from your Notifications or Files app and allow installs from your browser when prompted.',

  /**
   * System Requirements (fill in real hardware targets once finalized)
   */
  systemRequirements: {
    minimum: [
      {label: 'Operating System', value: 'To be announced'},
      {label: 'Processor', value: 'To be announced'},
      {label: 'Memory', value: 'To be announced'},
      {label: 'Graphics', value: 'To be announced'},
      {label: 'Storage', value: 'To be announced'},
    ] satisfies RequirementRow[],
    recommended: [
      {label: 'Operating System', value: 'To be announced'},
      {label: 'Processor', value: 'To be announced'},
      {label: 'Memory', value: 'To be announced'},
      {label: 'Graphics', value: 'To be announced'},
      {label: 'Storage', value: 'To be announced'},
    ] satisfies RequirementRow[],
  },

  /**
   * Social & Store Links
   * Empty `url` values render as dimmed icons with "Link coming soon".
   */
  socialLinks: [
    {id: 'youtube', label: 'YouTube', url: '', enabled: true},
    {id: 'instagram', label: 'Instagram', url: '', enabled: true},
    {id: 'tiktok', label: 'TikTok', url: '', enabled: true},
    {id: 'x', label: 'X (Twitter)', url: '', enabled: true},
    {id: 'facebook', label: 'Facebook', url: '', enabled: true},
    {id: 'discord', label: 'Discord', url: '', enabled: true},
    {id: 'reddit', label: 'Reddit', url: '', enabled: true},
    {id: 'twitch', label: 'Twitch', url: '', enabled: true},
    {id: 'github', label: 'GitHub', url: '', enabled: true},
    {id: 'itch', label: 'Itch.io', url: '', enabled: true},
    {id: 'steam', label: 'Steam', url: '', enabled: true},
    {id: 'email', label: 'Email', url: '', enabled: true},
  ] satisfies SocialLink[],

  /**
   * Features / Gameplay Freedom Cards
   */
  features: [
    {
      id: 'explore-pace',
      icon: 'compass',
      title: 'Explore at Your Own Pace',
      description:
        'Wander quiet coastlines, forest trails, and ancient sanctuaries without timers rushing your curiosity.',
    },
    {
      id: 'five-worlds',
      icon: 'map',
      title: 'Five Distinct Regions',
      description:
        'Travel across five separate explorable levels linked together through an island world map.',
    },
    {
      id: 'crystals-fragments',
      icon: 'crystal',
      title: 'Crystals & Lost Fragments',
      description:
        'Gather shimmering ancient energy crystals and recover five core fragments to awaken the island.',
    },
    {
      id: 'hidden-chests',
      icon: 'chest',
      title: 'Hidden Paths & Treasure Chests',
      description:
        'Look behind waterfalls, climb quiet ledges, and track collectibles in your explorer inventory.',
    },
    {
      id: 'environmental-puzzles',
      icon: 'puzzle',
      title: 'Tactile Island Puzzles',
      description:
        'Trigger ancient switches, find keys, unseal temple doors, and solve thoughtful environmental challenges.',
    },
    {
      id: 'any-device',
      icon: 'devices',
      title: 'Play on Desktop or Mobile',
      description:
        'Move seamlessly with keyboard and mouse on desktop, or touch joystick, jump, and interact controls on mobile.',
    },
    {
      id: 'auto-save',
      icon: 'save',
      title: 'Automatic Device Saving',
      description:
        'Your quests, inventory, and collected crystals save automatically on your device—no account required.',
    },
    {
      id: 'replay-levels',
      icon: 'replay',
      title: 'Replay Any Region',
      description:
        'Revisit unlocked regions from the world map anytime to uncover missed chests and lingering secrets.',
    },
  ] satisfies FeatureItem[],

  /**
   * The Five Regions
   */
  regions: [
    {
      id: 'forgotten-shore',
      levelNumber: 1,
      name: 'The Forgotten Shore',
      subtitle: 'Sunlit Coves & Coastal Ruins',
      description:
        'Your journey begins where tidewater meets weathered stone. Follow tropical beaches into echoing sea caves and awaken the first dormant shrines along the coast.',
      mechanics: ['Coastal traversal', 'Echoing sea caves', 'Introductory switches & ruins'],
      theme: {
        accentHex: '#22c55e',
        secondaryHex: '#4ade80',
        cardSurface: 'bg-[#111111]',
        sceneVariant: 'shore',
      },
      image: {
        src: '',
        alt: 'The Forgotten Shore featuring tropical beaches, sea caves, and weathered coastal ruins',
      },
    },
    {
      id: 'whispering-woods',
      levelNumber: 2,
      name: 'Whispering Woods',
      subtitle: 'Bioluminescent Canopy & Waterfalls',
      description:
        'Step beneath a glowing canopy alive with lantern-lit flora, cascading waterfalls, and suspended bridges connecting overgrown stone terraces.',
      mechanics: ['Suspended rope bridges', 'Waterfall paths', 'Forest light beacons'],
      theme: {
        accentHex: '#22c55e',
        secondaryHex: '#4ade80',
        cardSurface: 'bg-[#111111]',
        sceneVariant: 'woods',
      },
      image: {
        src: '',
        alt: 'Whispering Woods with glowing forest flora, waterfalls, and ancient bridges',
      },
    },
    {
      id: 'sunken-kingdom',
      levelNumber: 3,
      name: 'The Sunken Kingdom',
      subtitle: 'Flooded Temples & Sealed Vaults',
      description:
        'Descend into half-submerged marble halls where golden light filters through deep water. Search for ancient keys to unlock sealed temple doors.',
      mechanics: ['Flooded chambers', 'Ancient keys & locked gates', 'Submerged stone walkways'],
      theme: {
        accentHex: '#4ade80',
        secondaryHex: '#22c55e',
        cardSurface: 'bg-[#111111]',
        sceneVariant: 'sunken',
      },
      image: {
        src: '',
        alt: 'The Sunken Kingdom showing flooded temple halls, golden trim, and sealed doors',
      },
    },
    {
      id: 'frozen-peaks',
      levelNumber: 4,
      name: 'The Frozen Peaks',
      subtitle: 'Aurora Skies & Glacial Ledges',
      description:
        'Climb high above the treeline into crystalline ridges swept by winter winds. Time your jumps across slippery ice platforms beneath shimmering auroras.',
      mechanics: ['Slippery ice platforms', 'High-altitude jumps', 'Aurora-lit cliffs'],
      theme: {
        accentHex: '#22c55e',
        secondaryHex: '#4ade80',
        cardSurface: 'bg-[#111111]',
        sceneVariant: 'peaks',
      },
      image: {
        src: '',
        alt: 'The Frozen Peaks with icy mountains, slippery platforms, and aurora skies',
      },
    },
    {
      id: 'sky-temple',
      levelNumber: 5,
      name: 'The Sky Temple',
      subtitle: 'Floating Islands & The Final Mystery',
      isFinal: true,
      description:
        'Rise to the drifting sanctuaries suspended above the island. Unite the five ancient fragments, solve the final sanctuary puzzles, and uncover the truth behind your journey home.',
      mechanics: ['Floating islands', 'Five-fragment convergence', 'Final sanctuary mystery'],
      theme: {
        accentHex: '#4ade80',
        secondaryHex: '#22c55e',
        cardSurface: 'bg-[#111111]',
        sceneVariant: 'sky',
      },
      image: {
        src: '',
        alt: 'The Sky Temple with floating stone islands bathed in golden and emerald light',
      },
    },
  ] satisfies RegionItem[],

  /**
   * Screenshot Gallery (8 slots in 16:9)
   * Leave `src: ""` to show the designed 1920x1080 placeholder frame.
   */
  screenshots: [
    {
      id: 'shot-1',
      src: '',
      alt: 'Screenshot 1 — Exploring the sunlit ruins of The Forgotten Shore',
      caption: 'The Forgotten Shore — First steps along the ancient coast',
    },
    {
      id: 'shot-2',
      src: '',
      alt: 'Screenshot 2 — Crossing wooden bridges in Whispering Woods',
      caption: 'Whispering Woods — Lantern-lit canopy and waterfalls',
    },
    {
      id: 'shot-3',
      src: '',
      alt: 'Screenshot 3 — Unlocking a sealed chamber in The Sunken Kingdom',
      caption: 'The Sunken Kingdom — Flooded halls and golden reliefs',
    },
    {
      id: 'shot-4',
      src: '',
      alt: 'Screenshot 4 — Traversing icy ledges in The Frozen Peaks',
      caption: 'The Frozen Peaks — Crossing glacial platforms under the aurora',
    },
    {
      id: 'shot-5',
      src: '',
      alt: 'Screenshot 5 — Floating sanctuaries of The Sky Temple',
      caption: 'The Sky Temple — Approaching the final floating island',
    },
    {
      id: 'shot-6',
      src: '',
      alt: 'Screenshot 6 — Collecting an ancient energy crystal and treasure chest',
      caption: 'Discovery — Hidden treasure chests and glowing crystals',
    },
    {
      id: 'shot-7',
      src: '',
      alt: 'Screenshot 7 — World map connecting all five island regions',
      caption: 'World Map — Choose your next destination across the island',
    },
    {
      id: 'shot-8',
      src: '',
      alt: 'Screenshot 8 — Mobile touch controls with joystick, jump, and interact buttons',
      caption: 'Play Anywhere — Responsive controls on desktop and mobile',
    },
  ] satisfies ScreenshotItem[],

  /**
   * News & Updates
   * Keep, edit, or remove entries as development progresses.
   */
  news: [
    {
      id: 'welcome-to-journey-home',
      date: 'Example Post',
      title: 'Welcome to Journey Home',
      tag: 'Announcement',
      isExample: true,
      summary:
        'The official home for Journey Home is now live. Here you will find future development logs, regional previews, playable browser links, and release updates as the island takes shape.',
      details: [
        'Explore the five planned regions—from The Forgotten Shore to The Sky Temple—right from this page.',
        'Replace or delete this example entry inside src/config/siteConfig.ts whenever you publish your first real dev log or patch notes.',
      ],
    },
  ] satisfies NewsEntry[],

  /**
   * Frequently Asked Questions
   */
  faq: [
    {
      id: 'pricing',
      question: 'Is the game free?',
      answer:
        'Pricing is to be announced. Details will be shared here and across our official community channels ahead of release.',
    },
    {
      id: 'devices',
      question: 'What devices can I play on?',
      answer:
        'Journey Home is designed for web browsers on both desktop and mobile devices. Dedicated downloadable builds for Windows, macOS, Linux, and Android may be added later.',
    },
    {
      id: 'account',
      question: 'Do I need an account?',
      answer:
        'No account or sign-in is required to play Journey Home.',
    },
    {
      id: 'saving',
      question: 'How does saving work?',
      answer:
        'Your progress—including recovered fragments, energy crystals, inventory items, and quest progress—is saved automatically on your device.',
    },
    {
      id: 'controls',
      question: 'What are the controls?',
      answer:
        'On desktop, move with WASD, press E to interact with switches, chests, and doors, and press Space to jump. On mobile, use the on-screen joystick along with dedicated jump and interact buttons.',
    },
    {
      id: 'levels',
      question: 'How many levels are there?',
      answer:
        'There are five separate explorable regions connected by a world map: The Forgotten Shore, Whispering Woods, The Sunken Kingdom, The Frozen Peaks, and The Sky Temple.',
    },
    {
      id: 'bugs',
      question: 'Where do I report bugs or share feedback?',
      answer:
        'Bug reports and feedback channels will be linked in the Community section below as soon as our community and contact links are added.',
    },
  ] satisfies FaqItem[],

  /**
   * Contact & Legal
   */
  contactEmail: '',
  copyrightOwner: 'Journey Home',
  currentYear: new Date().getFullYear(),

  legal: {
    privacy: [
      'This official website is a static page and does not use analytics trackers, advertising cookies, or account tracking.',
      'When you play Journey Home, your game progress (collected crystals, fragments, inventory, and quest state) is stored locally on your own device so you can continue where you left off.',
      'If an optional trailer is played from the Screenshots & Trailer section, clicking play loads an embedded video player via YouTube’s privacy-enhanced domain (youtube-nocookie.com).',
    ],
    credits: [
      'Journey Home — Game concept, 3D world design, puzzles, and story by the creator of Journey Home.',
      'Official website built as a lightweight static web experience ready for browser play links, screenshots, and community updates.',
    ],
  },
} as const;
