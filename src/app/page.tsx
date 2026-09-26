import { Header } from '@/components/layout/header';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Projects } from '@/components/sections/projects';
import { Contact } from '@/components/sections/contact';
import { DesignVariations } from '@/components/sections/design-variations';
import { Footer } from '@/components/layout/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main id="main-content" className="flex-grow">
        <Hero />
        <Projects />
        <About />
        <DesignVariations />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
