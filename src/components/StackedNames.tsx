import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

const NAMES = [
  { name: "Iremide", meaning: "My goodness has arrived" },
  { name: "Ore Oluwa", meaning: "God's gift" },
  { name: "Opemipo", meaning: "my praise is enormous" },
  { name: "Boluwatife", meaning: "As God pleases" },
  { name: "Oluwadamilare", meaning: "God has vindicated me" },
  { name: "Olamide", meaning: "my wealth has come" },
  { name: "Ajibola", meaning: "one who wakes up to meet wealth" },
  { name: "Ademide", meaning: "my crown has arrived" },
  { name: "Ayokunnumi", meaning: "I am full of joy" },
  { name: "Moriopeda", meaning: "I have reasons to be grateful" },
  { name: "Oluwatamilore", meaning: "God has given me a gift" },
  { name: "Ayinla", meaning: "A child meant to be praised, fetted, and disciplined" }
];

function LikeButton() {
  const [isLiked, setIsLiked] = useState(false);
  const [bubbles, setBubbles] = useState<{ id: number; x: number; delay: number }[]>([]);

  const handleLike = () => {
    if (!isLiked) {
      setIsLiked(true);
      const newBubbles = Array.from({ length: 6 }).map((_, i) => ({
        id: Date.now() + i,
        x: (Math.random() - 0.5) * 60,
        delay: Math.random() * 0.2
      }));
      setBubbles(newBubbles);
      setTimeout(() => setBubbles([]), 1000);
    } else {
      setIsLiked(false);
    }
  };

  return (
    <div className="relative inline-flex items-center justify-center mt-2">
      <button 
        onClick={handleLike}
        className={`group relative flex items-center gap-3 px-6 py-3 rounded-full border transition-all duration-300 ${
          isLiked 
            ? 'bg-blue-50/80 border-blue-200 text-blue-500 shadow-sm shadow-blue-100/50' 
            : 'bg-white/50 border-[var(--color-natural-border)] text-[var(--color-natural-text)]/50 hover:bg-white hover:text-blue-400 hover:border-blue-200 hover:shadow-md'
        }`}
      >
        <Heart 
          size={18} 
          className={`transition-all duration-500 ${
            isLiked ? 'fill-blue-500 text-blue-500 scale-110' : 'group-hover:scale-110'
          }`} 
        />
        <span className="text-xs font-sans uppercase tracking-[0.2em] font-semibold mt-0.5">
          {isLiked ? 'Loved' : 'Like'}
        </span>
      </button>
      
      <AnimatePresence>
        {bubbles.map(b => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, y: 0, x: b.x, scale: 0.5 }}
            animate={{ 
              opacity: [0, 1, 0], 
              y: -80 - Math.random() * 40, 
              x: b.x + (Math.random() - 0.5) * 40, 
              scale: [0.5, 1.2, 1] 
            }}
            transition={{ duration: 0.8, delay: b.delay, ease: "easeOut" }}
            className="absolute pointer-events-none text-blue-400 z-50"
            style={{ top: '10px' }}
          >
            <Heart size={16} fill="currentColor" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

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
    <section className="py-16 md:py-24 relative z-20" ref={containerRef}>
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="section-header text-center mb-16 md:mb-20 flex flex-col items-center">
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

        <div className="relative w-full pb-[8vh]">
          {NAMES.map((item, index) => (
            <div 
              key={index}
              className="name-card-container sticky flex items-center justify-center w-full"
              style={{ 
                top: `${120 + index * 16}px`, 
                height: '60vh',
                minHeight: '400px',
                marginBottom: '8vh',
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
                  <LikeButton />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
