import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const Hero = () => {
  return (
    <>
      <section className="pt-20 lg:pt-32 pb-12 border-b border-stone-300 px-4 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            
            {/* Left: Typography */}
            <div className="lg:col-span-8 relative z-10">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-accent font-bold tracking-widest uppercase text-xs sm:text-sm mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div> The Daily Chronicle
              </motion.div>
              
              <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="text-6xl sm:text-[10vw] lg:text-[9rem] leading-[0.85] font-serif tracking-tight text-stone-900">
                Words <br/>
                <i className="text-stone-500 font-light">that</i> Matter.
              </motion.h1>
            </div>

            {/* Right: Context & CTA */}
            <div className="lg:col-span-4 lg:pb-6">
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-lg sm:text-xl lg:text-2xl text-stone-600 font-sans leading-relaxed mb-8 border-l-2 border-accent pl-6">
                A curated space for raw thoughts, unfiltered essays, and modern storytelling.
              </motion.p>
              
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <Link to="/register" className="group flex items-center justify-between w-full sm:w-max px-8 py-4 sm:py-5 bg-stone-900 text-[#F4F4F0] font-bold text-base sm:text-lg rounded-full hover:bg-accent transition-colors duration-300">
                  <span>Start Publishing</span>
                  <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 ml-4 group-hover:rotate-45 transition-transform duration-300" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="border-b border-stone-300 bg-stone-900 text-[#F4F4F0] py-3 sm:py-4 overflow-hidden relative flex">
        <div className="flex whitespace-nowrap animate-ticker font-sans text-lg sm:text-xl uppercase tracking-widest font-light">
          <span className="mx-4 sm:mx-8">Culture</span> • <span className="mx-4 sm:mx-8">Technology</span> • <span className="mx-4 sm:mx-8">Design</span> • <span className="mx-4 sm:mx-8">Philosophy</span> • <span className="mx-4 sm:mx-8">Art</span> • 
          <span className="mx-4 sm:mx-8">Culture</span> • <span className="mx-4 sm:mx-8">Technology</span> • <span className="mx-4 sm:mx-8">Design</span> • <span className="mx-4 sm:mx-8">Philosophy</span> • <span className="mx-4 sm:mx-8">Art</span> • 
          <span className="mx-4 sm:mx-8">Culture</span> • <span className="mx-4 sm:mx-8">Technology</span> • <span className="mx-4 sm:mx-8">Design</span> • <span className="mx-4 sm:mx-8">Philosophy</span> • <span className="mx-4 sm:mx-8">Art</span> • 
        </div>
      </div>
    </>
  );
};

export default Hero;