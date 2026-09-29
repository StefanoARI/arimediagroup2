import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { projectsData } from '../data';

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto" ref={containerRef}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-24"
      >
        <h1 className="text-6xl md:text-8xl font-display font-black leading-[0.9] tracking-tighter mb-6">
          I NOSTRI <br />
          <span className="gradient-text">
            CAPOLAVORI
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-white/50 max-w-2xl font-light">
          Non facciamo solo bei siti. Creiamo esperienze che convertono, brand che spaccano e campagne che la gente ricorda.
        </p>
      </motion.div>

      <div className="space-y-32">
        {projectsData.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-40 text-center"
      >
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">Vuoi essere il prossimo?</h2>
        <div className="w-full h-[1px] bg-neutral-800 mb-8" />
      </motion.div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: typeof projectsData[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [0.8, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const isEven = index % 2 === 0;

  return (
    <motion.div 
      ref={cardRef}
      style={{ opacity }}
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center`}
    >
      <div className="w-full md:w-1/2 overflow-hidden glass p-2 aspect-[4/5] relative group hover:-translate-y-2 hover:border-[#CFFF04] transition-all duration-500">
        <motion.div
          className="absolute inset-2 bg-[#0A0A0B] rounded-[20px] overflow-hidden"
          style={{ scale: scaleImage }}
        >
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700"
          />
          <div className={`absolute inset-0 mix-blend-overlay opacity-20 ${project.color}`} />
        </motion.div>
        
        {/* Animated badge */}
        <div className="absolute top-8 left-8 overflow-hidden rounded-full glass !border-white/20">
          <motion.div 
            initial={{ x: "-100%" }}
            whileInView={{ x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="px-4 py-2"
          >
            <span className="text-xs font-bold tracking-widest uppercase text-[#00D1FF]">{project.category}</span>
          </motion.div>
        </div>
      </div>

      <div className="w-full md:w-1/2 relative">
        <motion.div style={{ y: yText }} className="md:-mt-20">
          <div className="overflow-hidden">
            <motion.h3 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-7xl font-display font-black tracking-tighter mb-6"
            >
              {project.title}
            </motion.h3>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-xl text-white/60 leading-relaxed mb-8"
          >
            {project.description}
          </motion.p>
          
          <motion.button 
            whileHover={{ scale: 1.05, gap: "1rem" }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-white border-b border-white/30 pb-1 text-sm font-bold uppercase tracking-widest hover:text-[#CFFF04] hover:border-[#CFFF04] transition-colors"
          >
            Scopri il caso studio <ArrowUpRight size={20} />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
