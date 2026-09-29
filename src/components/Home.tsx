import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Sparkles, Zap, Target } from 'lucide-react';

export default function Home({ onOpenQuote, onOpenBooking }: { onOpenQuote: () => void, onOpenBooking: () => void }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <div ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: yBg }}
          className="absolute inset-0 z-0"
        >
          {/* Abstract colorful blobs */}
          <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-[#00D1FF]/20 rounded-full blur-[120px] mix-blend-screen" />
          <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-[#CFFF04]/20 rounded-full blur-[120px] mix-blend-screen" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF2E63]/20 rounded-full blur-[80px] mix-blend-screen" />
        </motion.div>

        <motion.div 
          style={{ opacity }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-20"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 border-white/20"
          >
            <div className="w-2 h-2 bg-[#CFFF04] rounded-full shadow-[0_0_10px_#CFFF04]"></div>
            <span className="text-xs font-bold tracking-widest uppercase text-white/80">Non la solita agenzia</span>
          </motion.div>

          <motion.h1 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="text-6xl md:text-8xl lg:text-9xl font-display font-black leading-[0.9] tracking-tighter mb-8"
          >
            PORTIAMO <br />
            <span className="gradient-text">
              RISULTATI
            </span>
            <br /> SUL MERCATO.
          </motion.h1>

          <motion.p 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="text-xl md:text-2xl text-white/60 font-light mb-12 max-w-2xl mx-auto"
          >
            Siamo l'agenzia creativa che non si ferma all'estetica. Creiamo brand, siti e campagne che spaccano lo schermo e riempiono le casse.
          </motion.p>

          <motion.div 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={onOpenQuote}
              className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold uppercase tracking-tighter rounded-full hover:bg-[#CFFF04] transition-colors duration-300"
            >
              Calcola Preventivo
            </button>
            <button 
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-8 py-4 glass text-white font-bold uppercase tracking-tighter rounded-full hover:border-white/40 transition-all duration-300"
            >
              Consulenza Gratuita
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Marquee Section */}
      <div className="py-12 bg-[#CFFF04] transform -rotate-2 scale-110 overflow-hidden relative z-20 shadow-[0_0_50px_rgba(207,255,4,0.1)]">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center text-[#0A0A0B] font-display font-black tracking-tighter text-4xl md:text-6xl mx-8">
              <span>DESIGN AUDACE</span>
              <span className="mx-8 opacity-20">✦</span>
              <span>MARKETING LETALE</span>
              <span className="mx-8 opacity-20">✦</span>
              <span>CODICE PERFETTO</span>
              <span className="mx-8 opacity-20">✦</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Differentiator Section */}
      <div className="py-32 px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-8 leading-[0.9]"
            >
              Perché siamo <br/><span className="gradient-text">diversi?</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/60 leading-relaxed mb-12"
            >
              La maggior parte delle agenzie fa cose carine. Noi facciamo cose che funzionano. Uniamo creatività esplosiva a strategie basate sui dati.
            </motion.p>
            
            <div className="space-y-6">
              {[
                { icon: Zap, title: "Creatività Senza Limiti", desc: "Usciamo dagli schemi noiosi del corporate." },
                { icon: Target, title: "Focus sul ROI", desc: "Se non porta soldi, è solo un bell'esercizio di stile." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  className="flex items-start gap-4 p-6 glass hover:border-white/20 transition-all"
                >
                  <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center shrink-0">
                    <item.icon size={24} className="text-[#CFFF04]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 tracking-tight">{item.title}</h3>
                    <p className="text-white/50 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-square glass p-2"
            >
              <div className="w-full h-full rounded-[20px] bg-[#0A0A0B] overflow-hidden relative group border border-white/5">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop" 
                  alt="Team" 
                  className="w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:mix-blend-normal group-hover:scale-110 transition-all duration-700"
                />
              </div>
            </motion.div>
            
            {/* Floating element */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 glass p-6 shadow-2xl border-[#CFFF04]/20"
            >
              <p className="font-display font-black text-4xl mb-1 text-[#CFFF04]">+200%</p>
              <p className="text-xs font-bold uppercase tracking-widest text-white/50">Crescita media clienti</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
