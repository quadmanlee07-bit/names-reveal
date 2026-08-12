import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function WelcomeMessage({ babyName }: { babyName: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gentle staggered entrance for hero elements
      gsap.fromTo('.welcome-stagger', 
        { opacity: 0, y: 30, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          stagger: 0.2,
          ease: 'power3.out',
          delay: 0.1 // slight delay so it feels intentional on page load
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="min-h-[85svh] flex items-center justify-center py-20 relative z-20" ref={containerRef}>
      <div className="container mx-auto px-6 max-w-3xl text-center flex flex-col items-center">
        <div className="flex flex-col items-center">
          <div className="welcome-stagger mb-6 flex items-center gap-3 justify-center">
            <div className="h-[1px] w-12 bg-[var(--color-natural-accent)]"></div>
            <span className="text-sm italic font-sans text-[var(--color-natural-accent)] tracking-widest uppercase">
              HEAVEN SENT
            </span>
            <div className="h-[1px] w-12 bg-[var(--color-natural-accent)]"></div>
          </div>
          
          <h2 className="welcome-stagger text-5xl md:text-7xl font-light leading-none mb-10">
            Welcome our <br/>
            <span className="italic text-[var(--color-natural-accent)] font-medium">Firstborn</span>
          </h2>

          <p className="welcome-stagger text-lg md:text-xl font-light opacity-80 leading-relaxed max-w-2xl mx-auto mb-16">
            After months of anticipation, we are overjoyed to finally introduce the newest member of our world. A tiny heart that has stolen ours forever.
          </p>

          <button 
            onClick={() => {
              window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
              });
            }}
            className="welcome-stagger group relative px-10 py-5 bg-[var(--color-natural-text)] text-[var(--color-natural-bg)] rounded-full overflow-hidden shadow-lg shadow-[var(--color-natural-text)]/10 hover:shadow-xl hover:shadow-[var(--color-natural-text)]/20 transition-all duration-500 transform hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out rounded-full"></div>
            <span className="relative z-10 text-xs tracking-[0.3em] font-sans font-medium uppercase flex items-center gap-3">
              Meet our little one 
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
