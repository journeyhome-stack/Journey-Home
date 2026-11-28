import {Component, useCallback, useEffect, useState, type ReactNode} from 'react';
import {BackgroundDragon} from './components/BackgroundDragon';
import {Community} from './components/Community';
import {Download} from './components/Download';
import {Faq} from './components/Faq';
import {Footer} from './components/Footer';
import {Gallery} from './components/Gallery';
import {Hero} from './components/Hero';
import {Navbar} from './components/Navbar';
import {News} from './components/News';
import {SectionDivider} from './components/SectionDivider';
import {ExploreGamePage} from './pages/ExploreGamePage';
import {SectionPage, type PageId} from './pages/SectionPage';
import {SignInPage} from './pages/SignInPage';

interface ParsedRoute {
  page: PageId;
  section?: string;
  regionId?: string;
  anchor?: string;
}

const VERIFIED_EMAIL_STORAGE_KEY = 'journey_home_verified_email';

const PAGE_TITLES: Record<PageId, string> = {
  home: 'Journey Home — Indie 3D Adventure Game',
  explore: 'Explore Game — Journey Home',
  screenshots: 'Screenshots & Trailer — Journey Home',
  signin: 'Sign In — Journey Home',
};

function parseHashRoute(hash: string): ParsedRoute {
  const clean = hash.replace(/^#\/?/, '').trim();

  if (!clean || clean === 'home' || clean === 'hero') {
    return {page: 'home'};
  }
  if (clean === 'explore') {
    return {page: 'explore'};
  }
  if (clean.startsWith('explore/')) {
    const rest = clean.slice('explore/'.length).trim();
    if (rest.startsWith('regions/')) {
      return {
        page: 'explore',
        section: 'regions',
        regionId: rest.slice('regions/'.length).trim() || undefined,
      };
    }
    return {page: 'explore', section: rest || undefined};
  }
  if (clean === 'regions') {
    return {page: 'explore', section: 'regions'};
  }
  if (clean.startsWith('regions/')) {
    const regionId = clean.slice('regions/'.length).trim();
    return {page: 'explore', section: 'regions', regionId: regionId || undefined};
  }
  if (clean === 'story' || clean === 'about' || clean === 'features') {
    return {page: 'explore', section: clean};
  }
  if (clean === 'screenshots') {
    return {page: 'screenshots'};
  }
  if (clean === 'trailer') {
    return {page: 'screenshots', anchor: 'trailer'};
  }
  if (clean === 'signin' || clean === 'sign-in' || clean === 'login') {
    return {page: 'signin'};
  }
  if (clean === 'download' || clean === 'news' || clean === 'faq' || clean === 'community') {
    return {page: 'home', anchor: clean};
  }

  return {page: 'home'};
}

function getCanonicalHash(page: PageId, options?: {section?: string; regionId?: string; anchor?: string}): string {
  if (page === 'home') {
    return options?.anchor ? `#${options.anchor}` : '#/';
  }
  if (page === 'explore') {
    if (options?.regionId) return `#/explore/regions/${options.regionId}`;
    if (options?.section) return `#/explore/${options.section}`;
    return '#/explore';
  }
  if (page === 'screenshots' && options?.anchor === 'trailer') {
    return '#/trailer';
  }
  return `#/${page}`;
}

interface RouteErrorBoundaryProps {
  children: ReactNode;
  onReset: () => void;
}

interface RouteErrorBoundaryState {
  hasError: boolean;
}

class RouteErrorBoundary extends Component<RouteErrorBoundaryProps, RouteErrorBoundaryState> {
  state: RouteErrorBoundaryState = {hasError: false};

  static getDerivedStateFromError(): RouteErrorBoundaryState {
    return {hasError: true};
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="py-20 px-4 text-center max-w-lg mx-auto space-y-4">
          <h2 className="font-display text-2xl font-semibold text-white">
            Could not load this view
          </h2>
          <p className="text-sm text-[#cccccc]">
            Please try reloading the page or returning to the home page.
          </p>
          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                this.setState({hasError: false});
                this.props.onReset();
              }}
              className="min-h-[44px] px-5 rounded-lg bg-[#22c55e] text-black font-bold text-sm hover:bg-[#4ade80] transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [route, setRoute] = useState<ParsedRoute>(() =>
    typeof window !== 'undefined' ? parseHashRoute(window.location.hash) : {page: 'home'},
  );
  const [verifiedEmail, setVerifiedEmail] = useState<string | null>(() => {
    try {
      return typeof window !== 'undefined'
        ? window.sessionStorage.getItem(VERIFIED_EMAIL_STORAGE_KEY)
        : null;
    } catch {
      return null;
    }
  });

  const handleVerified = useCallback((email: string) => {
    setVerifiedEmail(email);
    try {
      window.sessionStorage.setItem(VERIFIED_EMAIL_STORAGE_KEY, email);
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, []);

  const handleSignOut = useCallback(() => {
    setVerifiedEmail(null);
    try {
      window.sessionStorage.removeItem(VERIFIED_EMAIL_STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  }, []);

  useEffect(() => {
    document.title = PAGE_TITLES[route.page];
  }, [route.page]);

  useEffect(() => {
    const onHashChange = () => {
      const next = parseHashRoute(window.location.hash);
      setRoute(next);
      if (!next.anchor && !next.section) {
        window.scrollTo({top: 0, behavior: 'auto'});
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (!route.anchor) return;
    const anchorId = route.anchor;
    const timer = window.setTimeout(() => {
      document.getElementById(anchorId)?.scrollIntoView({behavior: 'smooth'});
    }, 60);
    return () => window.clearTimeout(timer);
  }, [route.page, route.anchor]);

  const navigate = useCallback(
    (page: PageId, options?: {section?: string; regionId?: string; anchor?: string}) => {
      const targetHash = getCanonicalHash(page, options);
      if (page === route.page && options?.anchor) {
        document.getElementById(options.anchor)?.scrollIntoView({behavior: 'smooth'});
        if (window.location.hash !== targetHash) {
          window.history.replaceState(null, '', targetHash);
        }
        return;
      }

      if (window.location.hash !== targetHash) {
        window.location.hash = targetHash;
      }
      setRoute({
        page,
        section: options?.section,
        regionId: options?.regionId,
        anchor: options?.anchor,
      });

      if (!options?.anchor && !options?.section && !options?.regionId) {
        window.scrollTo({top: 0, behavior: 'auto'});
      }
    },
    [route.page],
  );

  const renderPage = () => {
    switch (route.page) {
      case 'explore':
        return (
          <ExploreGamePage
            selectedRegionId={route.regionId}
            targetSection={route.section}
            onSelectRegion={(regionId) => {
              const targetHash = `#/explore/regions/${regionId}`;
              if (window.location.hash !== targetHash) {
                window.history.replaceState(null, '', targetHash);
              }
              setRoute({page: 'explore', section: 'regions', regionId});
            }}
            onNavigate={navigate}
          />
        );
      case 'screenshots':
        return (
          <SectionPage
            prev={{page: 'explore', label: 'Explore Game', href: '#/explore'}}
            next={{page: 'home', anchor: 'download', label: 'Download', href: '#download'}}
            onNavigate={navigate}
          >
            <Gallery />
          </SectionPage>
        );
      case 'signin':
        return (
          <SignInPage
            verifiedEmail={verifiedEmail}
            onVerified={handleVerified}
            onSignOut={handleSignOut}
            onNavigate={navigate}
          />
        );
      case 'home':
      default:
        return (
          <>
            <Hero onNavigate={navigate} />
            <SectionDivider kind="ruins" />
            <Download />
            <SectionDivider kind="waves" />
            <News />
            <SectionDivider kind="canopy" />
            <Faq />
            <SectionDivider kind="peaks" />
            <Community />
          </>
        );
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-black text-white">
      <BackgroundDragon />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2.5 focus:rounded-lg focus:bg-[#22c55e] focus:text-black focus:font-semibold"
      >
        Skip to content
      </a>

      <Navbar currentPage={route.page} signedInEmail={verifiedEmail} onNavigate={navigate} />

      <main id="main-content" className="relative z-10 flex-1">
        <RouteErrorBoundary onReset={() => navigate('home')}>
          {renderPage()}
        </RouteErrorBoundary>
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
}
