import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[70vh] w-full bg-[#F4F4F0] font-sans">
      
      {/* 1. THE EDITORIAL SPINNER */}
      <div className="relative flex items-center justify-center mb-8">
        {/* Outer sharp-rotating ring */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="w-20 h-20 border-[1px] border-stone-200 border-t-accent rounded-full"
        />
        
        {/* Middle pulsing "Ink" dot */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute w-4 h-4 bg-accent rounded-full"
        />
      </div>

      {/* 2. BRANDED TYPOGRAPHY */}
      <div className="text-center overflow-hidden">
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="font-serif text-3xl italic text-stone-900 tracking-tight"
        >
          BlogSpace<span className="text-accent">.</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400 mt-2"
        >
          Fetching Archives
        </motion.p>
      </div>

      {/* 3. SUBTLE PROGRESS LINE (Bottom Decoration) */}
      <div className="mt-12 w-32 h-[1px] bg-stone-200 relative overflow-hidden">
        <motion.div 
          animate={{ x: [-128, 128] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full bg-accent"
        />
      </div>
    </div>
  );
};

export default Loading;