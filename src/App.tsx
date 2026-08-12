/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StorySequence } from './components/StorySequence';
import { WelcomeMessage } from './components/WelcomeMessage';
import { Gallery } from './components/Gallery';
import { Guestbook } from './components/Guestbook';
import { StackedNames } from './components/StackedNames';

export default function App() {
  const babyName = "Khaleed The Eternal";

  return (
    <main className="min-h-screen bg-[var(--color-natural-bg)] text-[var(--color-natural-text)] font-serif relative overflow-x-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none fixed" style={{ backgroundImage: 'radial-gradient(var(--color-natural-accent) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <nav className="flex justify-between items-center px-6 md:px-12 py-6 border-b border-[var(--color-natural-border)]/30 sticky top-0 bg-[var(--color-natural-bg)]/80 backdrop-blur-md z-50">
          <div className="text-sm md:text-xl tracking-[0.2em] font-light uppercase">The Harrison Family</div>
          <div className="hidden md:flex gap-8 text-xs tracking-widest uppercase font-sans font-medium opacity-70">
            <span>Our Story</span>
            <span>Gallery</span>
            <span>Guestbook</span>
          </div>
        </nav>

        <div className="flex-1">
          <WelcomeMessage babyName={babyName} />
          
          <StorySequence babyName={babyName} />
          
          <div className="animate-in fade-in duration-1000">
            <StackedNames />
            <Gallery />
            <Guestbook />
            
            <footer className="px-10 py-12 bg-[var(--color-natural-light)] border-t border-[var(--color-natural-border)]/30 text-center relative z-20">
              <p className="text-[10px] font-sans opacity-50 tracking-widest uppercase">
                Designed with love • {new Date().getFullYear()}
              </p>
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}

