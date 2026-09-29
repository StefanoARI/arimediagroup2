import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Sparkles } from 'lucide-react';

export default function BookingForm({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
      setTimeout(() => setIsSubmitted(false), 500);
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0A0B]/90 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20, rotate: -2 }}
            animate={{ scale: 1, y: 0, rotate: 0 }}
            exit={{ scale: 0.95, y: 20, rotate: 2 }}
            className="glass w-full max-w-lg relative overflow-hidden p-8 hover:border-[#00D1FF]/50 transition-colors duration-500"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D1FF]/20 blur-[100px] rounded-full pointer-events-none" />
            
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-10"
            >
              <X size={24} />
            </button>

            {!isSubmitted ? (
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-[#00D1FF] rounded-full flex items-center justify-center shadow-[0_0_15px_#00D1FF]">
                    <div className="w-3 h-3 bg-black rounded-sm rotate-45"></div>
                  </div>
                  <h3 className="text-3xl font-display font-bold tracking-tighter text-white">Strategy Session</h3>
                </div>
                <p className="text-white/60 mb-8 mt-2">30 minuti per capire come possiamo farti esplodere sul mercato. Nessun impegno, solo idee bombe.</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/50 ml-1">Giorno</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                        <input type="date" required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#00D1FF] transition-colors [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/50 ml-1">Ora</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                        <select required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#00D1FF] transition-colors appearance-none">
                          <option value="" disabled selected>Seleziona</option>
                          <option value="10:00">10:00 AM</option>
                          <option value="11:30">11:30 AM</option>
                          <option value="15:00">15:00 PM</option>
                          <option value="17:00">17:00 PM</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/50 ml-1">Nome e Cognome</label>
                    <input type="text" required placeholder="Mario Rossi" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#00D1FF] transition-colors" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/50 ml-1">Email</label>
                    <input type="email" required placeholder="mario@azienda.it" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#00D1FF] transition-colors" />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-white hover:bg-[#00D1FF] text-black font-bold py-4 rounded-full mt-4 uppercase tracking-tighter transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(0,209,255,0.2)]"
                  >
                    Prenota lo slot
                  </button>
                </form>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12 relative z-10"
              >
                <div className="w-24 h-24 bg-[#00D1FF] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_#00D1FF]">
                  <Calendar size={40} className="text-black" />
                </div>
                <h3 className="text-3xl font-display font-bold tracking-tighter text-white mb-3">Prenotazione Confermata!</h3>
                <p className="text-white/60">Ti abbiamo inviato un'email con il link per la videochiamata. Preparati a fare il botto.</p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
