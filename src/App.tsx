import {lazy, Suspense} from 'react';
import {About} from './components/About';
import {Features} from './components/Features';
import {Hero} from './components/Hero';
import {Navbar} from './components/Navbar';
import {Regions} from './components/Regions';
import {SectionDivider} from './components/SectionDivider';

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

function SectionFallback({id, label}: {id?: string; label: string}) {
  return (
    <div id={id} className="scroll-mt-20 py-20 px-4 text-center text-sm text-[#a69e8d]">
      Loading {label}…
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0b101b] text-[#efe8d8]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2.5 focus:rounded-lg focus:bg-amber-400 focus:text-[#0b101b] focus:font-semibold"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main-content" className="flex-1">
        <Hero />
        <SectionDivider kind="ruins" />
        <About />
        <SectionDivider kind="waves" />
        <Features />
        <SectionDivider kind="canopy" />
        <Regions />
        <SectionDivider kind="peaks" />

        <Suspense fallback={<SectionFallback id="screenshots" label="Screenshots & Trailer" />}>
          <Gallery />
        </Suspense>
        <SectionDivider kind="ruins" />

        <Suspense fallback={<SectionFallback id="download" label="Download options" />}>
          <Download />
        </Suspense>
        <SectionDivider kind="waves" />

        <Suspense fallback={<SectionFallback id="news" label="News" />}>
          <News />
        </Suspense>
        <SectionDivider kind="canopy" />

        <Suspense fallback={<SectionFallback id="community" label="Community" />}>
          <Community />
        </Suspense>
        <SectionDivider kind="clouds" />

        <Suspense fallback={<SectionFallback id="faq" label="FAQ" />}>
          <Faq />
        </Suspense>
      </main>

      <Suspense fallback={<div className="py-10 bg-[#080c15]" />}>
        <Footer />
      </Suspense>
    </div>
  );
}
