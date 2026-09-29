import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function QuoteForm({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    goal: '',
    budget: '',
    timeline: '',
    email: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNext = () => setStep(s => s + 1);
  const handlePrev = () => setStep(s => s - 1);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
      setTimeout(() => {
        setStep(1);
        setIsSubmitted(false);
        setFormData({ goal: '', budget: '', timeline: '', email: '' });
      }, 500);
    }, 2500);
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
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="glass w-full max-w-lg relative overflow-hidden p-8"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            {!isSubmitted ? (
              <div className="relative">
                <div className="flex items-center gap-2 mb-8">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= step ? 'bg-[#CFFF04] shadow-[0_0_10px_#CFFF04]' : 'bg-white/10'}`}
                    />
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h3 className="text-2xl font-display font-bold tracking-tighter">Qual è il tuo obiettivo principale?</h3>
                      <div className="space-y-3">
                        {['Rebranding totale', 'Nuovo sito web', 'Campagna marketing', 'Non lo so, stupitemi'].map((opt) => (
                          <button
                            key={opt}
                            onClick={() => { setFormData({ ...formData, goal: opt }); handleNext(); }}
                            className={`w-full text-left p-4 rounded-xl border transition-all ${formData.goal === opt ? 'border-[#CFFF04] bg-[#CFFF04]/10 text-[#CFFF04]' : 'bg-white/5 border-white/10 hover:border-white/40 text-white/80'}`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h3 className="text-2xl font-display font-bold tracking-tighter">Che budget hai in mente?</h3>
                      <div className="space-y-3">
                        {['< 5.000€', '5.000€ - 15.000€', '15.000€ - 50.000€', '> 50.000€'].map((opt) => (
                          <button
                            key={opt}
                            onClick={() => { setFormData({ ...formData, budget: opt }); handleNext(); }}
                            className={`w-full text-left p-4 rounded-xl border transition-all ${formData.budget === opt ? 'border-[#00D1FF] bg-[#00D1FF]/10 text-[#00D1FF]' : 'bg-white/5 border-white/10 hover:border-white/40 text-white/80'}`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                      <button onClick={handlePrev} className="text-sm font-bold uppercase tracking-widest text-white/50 hover:text-white">← Indietro</button>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h3 className="text-2xl font-display font-bold tracking-tighter">Quando vorresti partire?</h3>
                      <div className="space-y-3">
                        {['Il prima possibile', 'Entro 1 mese', 'Entro 3 mesi', 'Sto solo esplorando'].map((opt) => (
                          <button
                            key={opt}
                            onClick={() => { setFormData({ ...formData, timeline: opt }); handleNext(); }}
                            className={`w-full text-left p-4 rounded-xl border transition-all ${formData.timeline === opt ? 'border-[#FF2E63] bg-[#FF2E63]/10 text-[#FF2E63]' : 'bg-white/5 border-white/10 hover:border-white/40 text-white/80'}`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                      <button onClick={handlePrev} className="text-sm font-bold uppercase tracking-widest text-white/50 hover:text-white">← Indietro</button>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.form
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <h3 className="text-2xl font-display font-bold tracking-tighter">Ultimo step. Dove ti mandiamo l'idea?</h3>
                      <div>
                        <input
                          type="email"
                          required
                          placeholder="tua@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white/5 border border-white/20 rounded-xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-[#CFFF04] transition-colors"
                        />
                      </div>
                      <div className="flex items-center gap-4 pt-4">
                        <button type="button" onClick={handlePrev} className="text-sm text-white/50 hover:text-white px-4">←</button>
                        <button
                          type="submit"
                          className="flex-1 bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 uppercase tracking-tighter hover:bg-[#CFFF04] transition-colors"
                        >
                          Genera Preventivo <ArrowRight size={18} />
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-[#CFFF04]/20 text-[#CFFF04] rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-3xl font-display font-bold tracking-tighter mb-2">Ricevuto!</h3>
                <p className="text-white/60">Stiamo elaborando la magia. Controlla la tua email tra poco.</p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
