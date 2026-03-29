import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs =[
  { q: "Is the platform completely free?", a: "Yes. Reading, writing, and publishing will always be free. We believe in open access to well-crafted ideas." },
  { q: "Can I use my own domain?", a: "Currently, all blogs are hosted under the platform's domain, but custom domain mapping is on our roadmap for Q4." },
  { q: "Do I retain the rights to my content?", a: "Absolutely. You own 100% of the rights to the essays and articles you publish here." },
  { q: "Does the editor support image uploads?", a: "Yes, our minimalist editor supports high-resolution image uploads seamlessly integrated into your text." }
];

const Faq = () => {
  const[openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 sm:py-32 border-b border-stone-300 px-4 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-16">
          <h2 className="text-4xl sm:text-6xl font-serif tracking-tight text-stone-900">Inquiries <i className="text-stone-500">&</i> <br/> Clarifications.</h2>
        </div>

        <div className="border-t border-stone-300">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-stone-300">
              <button 
                onClick={() => toggleFAQ(index)}
                className="w-full py-6 cursor-pointer sm:py-8 flex justify-between items-center text-left hover:text-accent transition-colors focus:outline-none"
              >
                <span className="text-xl sm:text-3xl font-serif pr-8">{faq.q}</span>
                <span className="text-stone-400 flex-shrink-0">
                  {openIndex === index ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 text-stone-600 font-sans text-base sm:text-lg leading-relaxed max-w-2xl">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;