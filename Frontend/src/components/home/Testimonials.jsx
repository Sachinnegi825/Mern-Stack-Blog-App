import React from 'react';
import { motion } from 'framer-motion';

const reviews =[
  { text: "A breath of fresh air. The focus on typography makes my essays feel like they belong in a high-end magazine.", author: "Elena R.", role: "Cultural Critic" },
  { text: "I left WordPress for this. The sheer speed and raw minimalist aesthetic is exactly what my readers want.", author: "Marcus T.", role: "Tech Essayist" },
  { text: "Finally, a platform that respects the reader's attention. No clutter, just the pure impact of well-written words.", author: "Sarah W.", role: "Independent Journalist" }
];

const Testimonials = () => {
  return (
    <section className="py-20 sm:py-32 border-b border-stone-300 px-4 lg:px-8 bg-stone-200/50">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16 md:mb-24">
          <h2 className="text-4xl sm:text-6xl font-serif tracking-tight text-stone-900">Voices of the <br/> <i className="text-stone-500">Avant-Garde.</i></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
          {reviews.map((review, i) => (
            <motion.div 
              key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              className="relative flex flex-col"
            >
              <span className="absolute -top-12 -left-6 text-[8rem] font-serif text-stone-300 leading-none select-none">“</span>
              <p className="text-lg sm:text-xl font-sans text-stone-800 leading-relaxed mb-8 relative z-10 pt-4">
                {review.text}
              </p>
              <div className="mt-auto border-t border-stone-300 pt-4">
                <p className="font-bold text-stone-900 uppercase tracking-widest text-sm">{review.author}</p>
                <p className="text-stone-500 text-sm italic font-serif">{review.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;