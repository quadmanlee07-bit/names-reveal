import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';

export function WelcomeMessage({ babyName }: { babyName: string }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section className="min-h-[85svh] flex items-center justify-center py-20 relative z-20" ref={ref}>
      <div className="container mx-auto px-6 max-w-3xl text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <div className="mb-6 flex items-center gap-3 justify-center">
            <div className="h-[1px] w-12 bg-[var(--color-natural-accent)]"></div>
            <span className="text-sm italic font-sans text-[var(--color-natural-accent)] tracking-widest uppercase">
              HEAVEN SENT
            </span>
            <div className="h-[1px] w-12 bg-[var(--color-natural-accent)]"></div>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-light leading-none mb-10">
            Welcome our <br/>
            <span className="italic text-[var(--color-natural-accent)] font-medium">Firstborn</span>
          </h2>

          <p className="text-lg md:text-xl font-light opacity-80 leading-relaxed max-w-2xl mx-auto mb-16">
            After months of anticipation, we are overjoyed to finally introduce the newest member of our world. A tiny heart that has stolen ours forever.
          </p>

          <button 
            onClick={() => {
              window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
              });
            }}
            className="group relative px-10 py-5 bg-[var(--color-natural-text)] text-[var(--color-natural-bg)] rounded-full overflow-hidden shadow-lg shadow-[var(--color-natural-text)]/10 hover:shadow-xl hover:shadow-[var(--color-natural-text)]/20 transition-all duration-500 transform hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out rounded-full"></div>
            <span className="relative z-10 text-xs tracking-[0.3em] font-sans font-medium uppercase flex items-center gap-3">
              Meet our little one 
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
