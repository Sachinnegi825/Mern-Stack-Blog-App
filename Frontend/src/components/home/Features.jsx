import React from 'react';
import { BookOpen, Quote, TrendingUp } from 'lucide-react';

const Features = () => {
  return (
    <section className="border-b border-stone-300">
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-stone-300">
        
        <div className="p-8 sm:p-12 hover:bg-stone-200 transition-colors duration-500 group">
          <BookOpen className="w-10 h-10 text-stone-400 group-hover:text-accent transition-colors mb-6 sm:mb-8" strokeWidth={1} />
          <h3 className="text-2xl sm:text-3xl font-serif mb-4 text-stone-900">Read freely.</h3>
          <p className="text-stone-600 font-sans leading-relaxed text-sm sm:text-base">No paywalls, no pop-ups. Just pure typography and content designed for the modern reader.</p>
        </div>

        <div className="p-8 sm:p-12 hover:bg-stone-200 transition-colors duration-500 group">
          <Quote className="w-10 h-10 text-stone-400 group-hover:text-accent transition-colors mb-6 sm:mb-8" strokeWidth={1} />
          <h3 className="text-2xl sm:text-3xl font-serif mb-4 text-stone-900">Write boldly.</h3>
          <p className="text-stone-600 font-sans leading-relaxed text-sm sm:text-base">Our minimalist editor gets out of your way so your ideas can take the center stage.</p>
        </div>

        <div className="p-8 sm:p-12 hover:bg-stone-200 transition-colors duration-500 group">
          <TrendingUp className="w-10 h-10 text-stone-400 group-hover:text-accent transition-colors mb-6 sm:mb-8" strokeWidth={1} />
          <h3 className="text-2xl sm:text-3xl font-serif mb-4 text-stone-900">Grow organically.</h3>
          <p className="text-stone-600 font-sans leading-relaxed text-sm sm:text-base">Connect with a network of thinkers. Share your essays and build a genuine audience.</p>
        </div>

      </div>
    </section>
  );
};

export default Features;