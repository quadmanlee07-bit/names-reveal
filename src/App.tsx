/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StorySequence } from './components/StorySequence';
import { WelcomeMessage } from './components/WelcomeMessage';
import { Guestbook } from './components/Guestbook';
import { StackedNames } from './components/StackedNames';

export default function App() {
  const babyName = "Khaleed The Eternal";

  return (
    <main className="min-h-screen bg-[var(--color-natural-bg)] text-[var(--color-natural-text)] font-serif relative overflow-x-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none fixed" style={{ backgroundImage: 'radial-gradient(var(--color-natural-accent) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <nav className="flex justify-between items-center px-6 md:px-12 py-6 border-b border-[var(--color-natural-border)]/30 sticky top-0 bg-[var(--color-natural-bg)]/80 backdrop-blur-md z-50">
          <div className="text-sm md:text-xl tracking-[0.2em] font-light uppercase">The ADENEKAN Family</div>
          <div className="hidden md:flex gap-8 text-xs tracking-widest uppercase font-sans font-medium opacity-70">
            <button onClick={() => document.getElementById('story-sequence')?.scrollIntoView({ behavior: 'smooth' })} className="hover:opacity-100 hover:text-[var(--color-natural-accent)] transition-all cursor-pointer uppercase tracking-widest">Our Story</button>
            <button onClick={() => document.getElementById('guestbook')?.scrollIntoView({ behavior: 'smooth' })} className="hover:opacity-100 hover:text-[var(--color-natural-accent)] transition-all cursor-pointer uppercase tracking-widest">Guestbook</button>
          </div>
        </nav>

        <div className="flex-1">
          <WelcomeMessage babyName={babyName} />
          
          <StorySequence babyName={babyName} />
          
          <div className="animate-in fade-in duration-1000">
            <StackedNames />
            <Guestbook />
            
            <footer className="px-6 md:px-10 py-10 md:py-12 bg-[var(--color-natural-light)] border-t border-[var(--color-natural-border)]/30 text-center relative z-20 flex flex-col items-center justify-center">
              <p className="text-xs font-sans opacity-60 tracking-widest uppercase mb-4">
                Designed with love by Dad
              </p>
              
              <div className="max-w-md mx-auto bg-white/60 p-5 md:p-6 rounded-2xl border border-[var(--color-natural-border)]/40 shadow-sm flex flex-col items-center">
                <p className="text-sm font-light text-[var(--color-natural-text)]/80 mb-3 leading-relaxed">
                  Want to recreate something like this for your loved ones? Or need any type of website?
                </p>
                <a 
                  href="https://wa.me/08127833861" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-full text-xs font-sans font-bold uppercase tracking-wider hover:bg-[#20b858] transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Contact Us
                </a>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}

