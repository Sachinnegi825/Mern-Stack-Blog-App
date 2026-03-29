import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-[#F4F4F0] pt-20 pb-8 px-4 lg:px-8 font-sans border-t border-stone-900">
      <div className="container mx-auto max-w-7xl">
        
        {/* Top Section: Massive Branding & Nav */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-stone-700">
          
          {/* Brand */}
          <div className="lg:col-span-6">
            <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight mb-6">
              BlogSpace<span className="text-accent">.</span>
            </h2>
            <p className="text-stone-400 text-lg sm:text-xl max-w-md font-light leading-relaxed">
              Curating raw thoughts, unfiltered essays, and modern storytelling on the web.
            </p>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8 pt-4 lg:pt-0">
            
            {/* Sitemap */}
            <div className="flex flex-col gap-4">
              <h4 className="font-bold uppercase tracking-widest text-xs text-stone-500 mb-2">Platform</h4>
              <Link to="/" className="hover:text-accent transition-colors">Latest Entries</Link>
              <Link to="/register" className="hover:text-accent transition-colors">Join Network</Link>
              <Link to="/login" className="hover:text-accent transition-colors">Sign In</Link>
            </div>

            {/* Socials (Your Links) */}
            <div className="flex flex-col gap-4">
              <h4 className="font-bold uppercase tracking-widest text-xs text-stone-500 mb-2">Connect</h4>
              <a href="https://x.com/SACHINN68557499" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-accent transition-colors group">
                Twitter <ArrowUpRight className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
              <a href="https://www.linkedin.com/in/sachin-negi-54aaba222/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-accent transition-colors group">
                LinkedIn <ArrowUpRight className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-accent transition-colors group">
                Facebook <ArrowUpRight className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-4 col-span-2 sm:col-span-1">
              <h4 className="font-bold uppercase tracking-widest text-xs text-stone-500 mb-2">Legal</h4>
              <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
            </div>

          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-stone-500 text-sm">
          <p>&copy; {new Date().getFullYear()} SachinBlogApp. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 flex items-center gap-2">
            Designed with <span className="text-accent">♥</span> for the web.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;