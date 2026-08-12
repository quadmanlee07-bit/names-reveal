import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';

const PHOTOS = [
  "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80",
];

export function Gallery() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-32" ref={ref}>
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 flex flex-col items-center"
        >
          <div className="mb-4 flex items-center gap-3 justify-center">
            <div className="h-[1px] w-12 bg-[var(--color-natural-accent)]"></div>
            <span className="text-sm italic font-sans text-[var(--color-natural-accent)] tracking-widest uppercase">
              GALLERY
            </span>
            <div className="h-[1px] w-12 bg-[var(--color-natural-accent)]"></div>
          </div>
          <h2 className="text-4xl font-light mb-4 text-[var(--color-natural-text)]">First Moments</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { src: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80", bg: "bg-[var(--color-natural-light)]" },
            { src: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80", bg: "bg-[var(--color-natural-warm)]" },
            { src: "https://images.unsplash.com/photo-1513258496099-48166314914b?auto=format&fit=crop&q=80", bg: "bg-[var(--color-natural-soft)]" }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className={`aspect-[4/5] relative overflow-hidden rounded-2xl group ${item.bg} border-4 border-white shadow-sm flex items-center justify-center`}
            >
              <img 
                src={item.src} 
                alt={`Baby photo ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 mix-blend-multiply"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
