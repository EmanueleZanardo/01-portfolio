import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section id="hero" className="relative h-[calc(100vh)] min-h-[500px] w-full flex items-center justify-center text-center text-white">
      <Image
        src="https://i.postimg.cc/0j6WsZRn/istockphoto-1372200846-612x612.jpg"
        alt="Emanuele Zanardo"
        fill
        className="object-cover"
        priority
        data-ai-hint="portrait man"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl tracking-wider text-primary">
          EMANUELE ZANARDO
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-neutral-300">
          Electronic Engineer with a passion for creating modern and responsive web experiences from scratch.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="#projects">
              Experiences
            </Link>
          </Button>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="#about">
              About Me
            </Link>
          </Button>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="#contact">
              Contact
            </Link>
          </Button>
          
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <a href="https://czpox8o8x6arnxw96txnvt.streamlit.app/" target="_blank" rel="noopener noreferrer">
              Singularity ETRM
            </a>
          </Button>

        </div>
      </div>
    </section>
  );
}
