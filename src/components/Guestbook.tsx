import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { db } from '../lib/firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';

interface Entry {
  id: string;
  name: string;
  message: string;
  createdAt: any;
}

export function Guestbook() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [entries, setEntries] = useState<Entry[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'guestbook'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newEntries = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Entry[];
      setEntries(newEntries);
    }, (error) => {
      console.error("Error fetching guestbook:", error);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'guestbook'), {
        name: name.trim(),
        message: message.trim(),
        createdAt: serverTimestamp()
      });
      setName('');
      setMessage('');
    } catch (error) {
      console.error("Error adding entry:", error);
      alert("There was an error saving your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pt-32 pb-16 bg-[var(--color-natural-light)] relative border-t border-[var(--color-natural-border)]/30" ref={ref}>
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--color-natural-accent) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 flex flex-col items-center"
        >
          <div className="mb-4 flex items-center gap-3 justify-center">
            <div className="h-[1px] w-12 bg-[var(--color-natural-accent)]"></div>
            <span className="text-sm italic font-sans text-[var(--color-natural-accent)] tracking-widest uppercase">
              GUESTBOOK
            </span>
            <div className="h-[1px] w-12 bg-[var(--color-natural-accent)]"></div>
          </div>
          <h2 className="text-5xl font-light mb-6 text-[var(--color-natural-text)]">Warm Wishes</h2>
          <p className="text-[var(--color-natural-text)]/80 font-light max-w-xl mx-auto">
            Leave a warm wish, a piece of advice, or a simple hello for our little one.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6 sticky top-8 bg-white/60 backdrop-blur-sm border border-[var(--color-natural-border)]/50 p-8 rounded-3xl shadow-sm">
              <div>
                <label htmlFor="name" className="block text-[10px] uppercase tracking-widest font-sans font-bold mb-3 text-[var(--color-natural-accent)]">Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  maxLength={100}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/80 border border-[var(--color-natural-border)]/30 text-[var(--color-natural-text)] px-4 py-3 rounded-xl focus:outline-none focus:border-[var(--color-natural-accent)] transition-colors font-sans"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-[10px] uppercase tracking-widest font-sans font-bold mb-3 text-[var(--color-natural-accent)]">Message</label>
                <textarea
                  id="message"
                  required
                  maxLength={1000}
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white/80 border border-[var(--color-natural-border)]/30 text-[var(--color-natural-text)] px-4 py-3 rounded-xl focus:outline-none focus:border-[var(--color-natural-accent)] transition-colors font-sans resize-none"
                  placeholder="Your Message"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting || !name.trim() || !message.trim()}
                className="w-full py-4 bg-[var(--color-natural-text)] text-[var(--color-natural-bg)] uppercase tracking-[0.2em] text-xs hover:bg-[var(--color-natural-accent)] transition-colors disabled:opacity-50 flex items-center justify-center font-sans font-medium rounded-full"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Leave a Wish'}
              </button>
            </form>
          </motion.div>

          <motion.div 
            className="lg:col-span-3 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="h-[600px] overflow-y-auto pr-4 space-y-4">
              {entries.length === 0 ? (
                <div className="text-center py-12 text-[var(--color-natural-text)]/50 font-light italic">
                  Be the first to leave a message.
                </div>
              ) : (
                entries.map((entry) => (
                  <motion.div 
                    key={entry.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-white/80 border border-[var(--color-natural-border)]/20 rounded-2xl shadow-sm"
                  >
                    <p className="text-[var(--color-natural-text)] font-serif italic leading-relaxed mb-4 text-lg">"{entry.message}"</p>
                    <div className="flex items-center justify-between text-[10px] tracking-widest uppercase font-sans font-semibold opacity-50">
                      <span>— {entry.name}</span>
                      <span>
                        {entry.createdAt?.toDate ? format(entry.createdAt.toDate(), 'MMM d, yyyy') : 'Just now'}
                      </span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
