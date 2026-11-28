import {lazy, Suspense, useCallback, useEffect, useState} from 'react';
import {Hero} from './components/Hero';
import {Navbar} from './components/Navbar';
import {SectionDivider} from './components/SectionDivider';

const ExploreGamePage = lazy(() =>
  import('./pages/ExploreGamePage').then((m) => ({default: m.ExploreGamePage})),
);
const Gallery = lazy(() =>
  import('./components/Gallery').then((m) => ({default: m.Gallery})),
);
const Download = lazy(() =>
  import('./components/Download').then((m) => ({default: m.Download})),
);
const News = lazy(() =>
  import('./components/News').then((m) => ({default: m.News})),
);
const Community = lazy(() =>
  import('./components/Community').then((m) => ({default: m.Community})),
);
const Faq = lazy(() =>
  import('./components/Faq').then((m) => ({default: m.Faq})),
);
const Footer = lazy(() =>
  import('./components/Footer').then((m) => ({default: m.Footer})),
);

interface ParsedRoute {
  page: 'home' | 'explore';
  section?: string;
  regionId?: string;
}

function parseHashRoute(hash: string): ParsedRoute {
  const clean = hash.replace(/^#/, '');
  if (clean === 'explore' || clean === '/explore') {
    return {page: 'explore'};
  }
  if (clean.startsWith('/explore/')) {
    const rest = clean.slice('/explore/'.length).trim();
    if (rest.startsWith('regions/')) {
      return {
        page: 'explore',
        section: 'regions',
        regionId: rest.slice('regions/'.length).trim() || undefined,
      };
    }
    return {page: 'explore', section: rest || undefined};
  }
  if (clean === 'regions' || clean === '/regions') {
    return {page: 'explore', section: 'regions'};
  }
  if (clean.startsWith('/regions/')) {
    const regionId = clean.slice('/regions/'.length).trim();
    return {page: 'explore', section: 'regions', regionId: regionId || undefined};
  }
  return {page: 'home'};
}

function SectionFallback({id, label}: {id?: string; label: string}) {
  return (
    <div id={id} className="scroll-mt-20 py-20 px-4 text-center text-sm text-[#999999]">
      Loading {label}…
    </div>
  );
}

export default function App() {
  const [route, setRoute] = useState<ParsedRoute>(() =>
    typeof window !== 'undefined' ? parseHashRoute(window.location.hash) : {page: 'home'},
  );
  const [pendingSectionId, setPendingSectionId] = useState<string | null>(null);

  useEffect(() => {
    const onHashChange = () => {
      const next = parseHashRoute(window.location.hash);
      setRoute(next);
      if (next.page === 'explore' && !next.section) {
        window.scrollTo({top: 0, behavior: 'auto'});
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (route.page !== 'home' || !pendingSectionId) return;

    let attempts = 0;
    const timer = window.setInterval(() => {
      attempts += 1;
      const el = document.getElementById(pendingSectionId);
      if (el) {
        el.scrollIntoView({behavior: 'smooth'});
        setPendingSectionId(null);
        window.clearInterval(timer);
      } else if (attempts > 20) {
        setPendingSectionId(null);
        window.clearInterval(timer);
      }
    }, 50);

    return () => window.clearInterval(timer);
  }, [route.page, pendingSectionId]);

  const navigateToExplore = useCallback((options?: {section?: string; regionId?: string}) => {
    const section = options?.section;
    const regionId = options?.regionId;
    let targetHash = '#/explore';
    if (regionId) {
      targetHash = `#/explore/regions/${regionId}`;
    } else if (section) {
      targetHash = `#/explore/${section}`;
    }

    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
    setRoute({page: 'explore', section, regionId});
    setPendingSectionId(null);
    if (!section && !regionId) {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  }, []);

  const navigateToHomeSection = useCallback(
    (sectionId?: string) => {
      const targetHash = sectionId ? `#${sectionId}` : '#/';
      if (route.page === 'home') {
        if (sectionId) {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({behavior: 'smooth'});
          } else {
            setPendingSectionId(sectionId);
          }
          if (window.location.hash !== `#${sectionId}`) {
            window.history.replaceState(null, '', `#${sectionId}`);
          }
        } else {
          window.scrollTo({top: 0, behavior: 'smooth'});
          if (window.location.hash) {
            window.history.replaceState(null, '', '#/');
          }
        }
        return;
      }

      window.location.hash = targetHash;
      setRoute({page: 'home'});
      if (sectionId) {
        setPendingSectionId(sectionId);
      } else {
        window.scrollTo({top: 0, behavior: 'auto'});
      }
    },
    [route.page],
  );

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2.5 focus:rounded-lg focus:bg-[#facc15] focus:text-black focus:font-semibold"
      >
        Skip to content
      </a>

      <Navbar
        currentPage={route.page}
        onNavigateHomeSection={navigateToHomeSection}
        onNavigateExplore={() => navigateToExplore()}
      />

      <main id="main-content" className="flex-1">
        {route.page === 'explore' ? (
          <Suspense fallback={<SectionFallback label="Explore Game" />}>
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
              onBackHome={navigateToHomeSection}
            />
          </Suspense>
        ) : (
          <>
            <Hero onOpenExplore={() => navigateToExplore()} />
            <SectionDivider kind="ruins" />

            <Suspense fallback={<SectionFallback id="screenshots" label="Screenshots & Trailer" />}>
              <Gallery />
            </Suspense>
            <SectionDivider kind="waves" />

            <Suspense fallback={<SectionFallback id="download" label="Download options" />}>
              <Download />
            </Suspense>
            <SectionDivider kind="canopy" />

            <Suspense fallback={<SectionFallback id="news" label="News" />}>
              <News />
            </Suspense>
            <SectionDivider kind="peaks" />

            <Suspense fallback={<SectionFallback id="community" label="Community" />}>
              <Community />
            </Suspense>
            <SectionDivider kind="canopy" />

            <Suspense fallback={<SectionFallback id="faq" label="FAQ" />}>
              <Faq />
            </Suspense>
          </>
        )}
      </main>

      <Suspense fallback={<div className="py-10 bg-black" />}>
        <Footer
          onNavigateHomeSection={navigateToHomeSection}
          onNavigateExplore={() => navigateToExplore()}
        />
      </Suspense>
    </div>
  );
}
