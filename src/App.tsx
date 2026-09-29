/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ViewState } from './types';
import Home from './components/Home';
import Projects from './components/Projects';
import QuoteForm from './components/QuoteForm';
import BookingForm from './components/BookingForm';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Menu, X } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<ViewState>('home');
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (v: ViewState) => {
    setView(v);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white selection:bg-[#CFFF04]/30 font-sans">
      
      {/* Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'glass !rounded-none !border-l-0 !border-r-0 !border-t-0 border-b-white/10 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button onClick={() => navigate('home')} className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <div className="w-6 h-6 bg-black rounded-sm rotate-45"></div>
            </div>
            <span className="text-2xl font-black tracking-tighter">ARI<span className="text-[#CFFF04]">MEDIA</span></span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-white/50">
            <button 
              onClick={() => navigate('home')}
              className={`transition-colors ${view === 'home' ? 'text-white' : 'hover:text-white'}`}
            >
              Home
            </button>
            <button 
              onClick={() => navigate('projects')}
              className={`transition-colors ${view === 'projects' ? 'text-white' : 'hover:text-white'}`}
            >
              Progetti
            </button>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => setIsQuoteOpen(true)}
              className="text-sm font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors"
            >
              Preventivo
            </button>
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="px-6 py-2 bg-white text-black font-bold rounded-full text-sm uppercase tracking-tighter hover:bg-[#CFFF04] transition-colors"
            >
              Prenota call
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-black/95 backdrop-blur-xl pt-24 px-6 flex flex-col gap-8 md:hidden"
          >
            <button onClick={() => navigate('home')} className="text-4xl font-display font-bold text-left">Home</button>
            <button onClick={() => navigate('projects')} className="text-4xl font-display font-bold text-left">Progetti</button>
            <hr className="border-white/10" />
            <button onClick={() => { setIsQuoteOpen(true); setIsMobileMenuOpen(false); }} className="text-2xl font-display font-bold text-left text-[#CFFF04]">Preventivo Veloce</button>
            <button onClick={() => { setIsBookingOpen(true); setIsMobileMenuOpen(false); }} className="text-2xl font-display font-bold text-left text-[#00D1FF]">Prenota Consulenza</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main>
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
              <Home onOpenQuote={() => setIsQuoteOpen(true)} onOpenBooking={() => setIsBookingOpen(true)} />
            </motion.div>
          )}
          {view === 'projects' && (
            <motion.div key="projects" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
              <Projects />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="glass m-6 p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#CFFF04] rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-black rounded-full"></div>
          </div>
          <span className="font-display font-bold text-xl tracking-tighter">ARI<span className="text-white/50">MEDIA</span></span>
        </div>
        <p className="text-white/40 text-sm font-medium uppercase tracking-widest">© {new Date().getFullYear()} BEYOND CREATIVE.</p>
      </footer>

      {/* Modals */}
      <QuoteForm isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
      <BookingForm isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      
    </div>
  );
}
