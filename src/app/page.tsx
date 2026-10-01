import { Header } from '@/components/layout/header';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Services } from '@/components/sections/services';
import { Projects } from '@/components/sections/projects';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/layout/footer';
import { FocusMainOnMount } from '@/components/focus-main-on-mount';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-grow focus:outline-none">
        {/* a11y (WCAG 2.4.3): same as /singularity — client-side navigation
            back to / must move focus onto the new page's <main> landmark. */}
        <FocusMainOnMount />
        <Hero />
        <Projects />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
