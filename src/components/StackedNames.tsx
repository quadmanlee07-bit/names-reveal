import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NAMES = [
  { name: "Theodore", meaning: "Gift of God", origin: "Greek" },
  { name: "James", meaning: "Supplanter", origin: "Hebrew" },
  { name: "Alexander", meaning: "Defender of Men", origin: "Greek" },
  { name: "Benjamin", meaning: "Son of the Right Hand", origin: "Hebrew" },
  { name: "Arthur", meaning: "Bear", origin: "Celtic" },
  { name: "Harrison", meaning: "Son of Harry", origin: "English" },
  { name: "Nathaniel", meaning: "God has Given", origin: "Hebrew" },
  { name: "Julian", meaning: "Youthful", origin: "Latin" },
  { name: "Oliver", meaning: "Olive Tree", origin: "Latin" },
  { name: "Sebastian", meaning: "Venerable", origin: "Greek" },
  { name: "Finn", meaning: "Fair", origin: "Irish" },
  { name: "Silas", meaning: "Wood, Forest", origin: "Latin" }
];

export function StackedNames() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header animation
      gsap.fromTo('.section-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.section-header',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // 2. Cards entrance and stacking animations
      const cards = gsap.utils.toArray<HTMLElement>('.name-card-container');
      
      cards.forEach((card, i) => {
        const inner = card.querySelector('.name-card-inner');
        const stickyTop = 120 + i * 16;
        
        // Entrance animation
        gsap.fromTo(inner, 
          { opacity: 0, y: 100, scale: 0.9 },
          {
            opacity: 1, 
            y: 0, 
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%", 
              toggleActions: "play none none reverse"
            }
          }
        );

        // Stacking / Overlay effect (scale down & fade as next card covers it)
        if (i < cards.length - 1) {
          const nextStickyTop = 120 + (i + 1) * 16;
          
          gsap.to(inner, {
            scale: 0.92,
            opacity: 1, // Keep card visible, just scale down
            y: -20,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: `top ${stickyTop}px`,
              endTrigger: cards[i + 1],
              end: `top ${nextStickyTop}px`,
              scrub: true,
            }
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 md:py-32 relative z-20" ref={containerRef}>
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="section-header text-center mb-24 md:mb-32 flex flex-col items-center">
          <div className="mb-4 flex items-center gap-3 justify-center">
            <div className="h-[1px] w-12 bg-[var(--color-natural-accent)]"></div>
            <span className="text-sm italic font-sans text-[var(--color-natural-accent)] tracking-widest uppercase">
              THE NAMES
            </span>
            <div className="h-[1px] w-12 bg-[var(--color-natural-accent)]"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-[var(--color-natural-text)]">
            A Legacy in Twelve Names
          </h2>
          <p className="text-[var(--color-natural-text)]/70 font-light max-w-xl text-lg">
            Each name carries a story, a wish, and a heritage. Scroll to discover the names that will shape his journey.
          </p>
        </div>

        <div className="relative w-full pb-[15vh]">
          {NAMES.map((item, index) => (
            <div 
              key={index}
              className="name-card-container sticky flex items-center justify-center w-full"
              style={{ 
                top: `${120 + index * 16}px`, 
                height: '60vh',
                minHeight: '400px',
                marginBottom: '10vh',
                zIndex: index
              }}
            >
              <div 
                className="name-card-inner w-full max-w-3xl h-full bg-[var(--color-natural-light)] border-[4px] md:border-[6px] border-white rounded-[32px] md:rounded-[40px] shadow-2xl p-8 md:p-16 flex flex-col items-center justify-center relative overflow-hidden origin-top"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent z-0 pointer-events-none"></div>
                
                {/* Decorative background element */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-[var(--color-natural-soft)] rounded-full mix-blend-multiply opacity-50 blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white rounded-full opacity-50 blur-3xl pointer-events-none"></div>

                <div className="relative z-10 text-center w-full">
                  <div className="text-[10px] uppercase tracking-[0.4em] font-sans text-[var(--color-natural-accent)] mb-6 md:mb-8 font-semibold">
                    No. {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-4xl sm:text-5xl md:text-7xl font-light text-[var(--color-natural-text)] mb-4 md:mb-6 tracking-tight break-words px-2">
                    {item.name}
                  </h3>
                  <p className="text-lg sm:text-xl md:text-3xl italic text-[var(--color-natural-accent)] font-medium mb-8 md:mb-10 px-4">
                    "{item.meaning}"
                  </p>
                  <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
                    <div className="hidden sm:block h-[1px] w-8 md:w-12 bg-[var(--color-natural-border)]"></div>
                    <div className="text-[10px] uppercase tracking-[0.2em] font-sans text-[var(--color-natural-text)]/50 font-bold">
                      Origin: {item.origin}
                    </div>
                    <div className="hidden sm:block h-[1px] w-8 md:w-12 bg-[var(--color-natural-border)]"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
