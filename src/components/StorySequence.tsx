import { ReactNode, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SceneProps {
  children: ReactNode;
  className?: string;
}

function Scene({ children, className = "" }: SceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 40, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`min-h-[35svh] md:min-h-[55svh] flex items-center justify-center px-6 py-12 md:py-16 ${className}`}
    >
      <div
        ref={contentRef}
        className="w-full text-center"
      >
        {children}
      </div>
    </div>
  );
}

interface StorySequenceProps {
  babyName: string;
}

export function StorySequence({ babyName }: StorySequenceProps) {
  const firstName = babyName.split(' ')[0];

  return (
    <div className="w-full relative z-20">
      
      <Scene>
        <p className="text-2xl md:text-4xl font-light text-[var(--color-natural-text)]/80 tracking-wide max-w-2xl mx-auto">
          A new chapter began...
        </p>
      </Scene>

      <Scene>
        <p className="text-2xl md:text-4xl font-light text-[var(--color-natural-text)]/80 tracking-wide max-w-2xl mx-auto">
          A little boy came into our lives.
        </p>
      </Scene>

      <Scene>
        <div className="flex flex-col items-center">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-[1px] w-8 bg-[var(--color-natural-accent)]/50"></div>
            <span className="text-xs italic font-sans text-[var(--color-natural-accent)] tracking-widest uppercase">
              The Day
            </span>
            <div className="h-[1px] w-8 bg-[var(--color-natural-accent)]/50"></div>
          </div>
          <h2 className="text-4xl md:text-6xl font-light text-[var(--color-natural-text)] tracking-tight">
            August 4th, 2026
          </h2>
        </div>
      </Scene>

      <Scene>
        <p className="text-2xl md:text-4xl font-light text-[var(--color-natural-text)]/80 tracking-wide max-w-2xl mx-auto">
          On a beautiful day, we prayed for his safe arrival.
        </p>
      </Scene>

      <Scene>
        <p className="text-2xl md:text-4xl font-light text-[var(--color-natural-text)]/80 tracking-wide max-w-2xl mx-auto">
          We waited.
        </p>
      </Scene>

      <Scene>
        <p className="text-2xl md:text-4xl font-light text-[var(--color-natural-text)]/80 tracking-wide max-w-2xl mx-auto">
          We wondered who he would become.
        </p>
      </Scene>

      <Scene>
        <p className="text-2xl md:text-4xl font-light text-[var(--color-natural-text)]/80 tracking-wide max-w-2xl mx-auto leading-relaxed">
          We imagined the little person<br className="hidden md:block"/> we had been waiting to meet.
        </p>
      </Scene>

      <Scene>
        <p className="text-2xl md:text-4xl font-light text-[var(--color-natural-text)]/80 tracking-wide max-w-2xl mx-auto italic">
          And then...
        </p>
      </Scene>

      <Scene>
        <h2 className="text-5xl md:text-7xl font-light text-[var(--color-natural-accent)] tracking-tight">
          He arrived.
        </h2>
      </Scene>

      <Scene>
        <p className="text-2xl md:text-4xl font-light text-[var(--color-natural-text)]/80 tracking-wide max-w-2xl mx-auto">
          And with him came a name...
        </p>
      </Scene>

      <Scene>
        <div className="relative group max-w-3xl mx-auto w-full px-4">
          <div className="absolute inset-0 bg-[var(--color-natural-border)] rounded-[32px] md:rounded-[40px] rotate-2 scale-95 opacity-50"></div>
          <div className="absolute inset-0 bg-[var(--color-natural-warm)] rounded-[32px] md:rounded-[40px] -rotate-1 scale-95 opacity-30"></div>
          <div className="relative bg-[var(--color-natural-light)] rounded-[32px] md:rounded-[40px] flex flex-col items-center justify-center overflow-hidden border-4 md:border-8 border-white shadow-xl px-6 py-16 md:px-16 md:py-32">
            <div className="text-[10px] uppercase tracking-[0.4em] font-sans text-[var(--color-natural-text)]/50 mb-6 md:mb-8 font-semibold text-center">
              The First Name
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-light text-[var(--color-natural-text)] tracking-tight mb-2 text-center w-full break-words px-2">
              {firstName}
            </h1>
          </div>
        </div>
      </Scene>

      <Scene>
        <p className="text-2xl md:text-4xl font-light text-[var(--color-natural-accent)] tracking-wide max-w-2xl mx-auto italic">
          A little name for a very big place in our hearts.
        </p>
      </Scene>

    </div>
  );
}
