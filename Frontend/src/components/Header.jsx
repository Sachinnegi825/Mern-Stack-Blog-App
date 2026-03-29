import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { PenTool, LogOut, LogIn, Menu, X, ArrowUpRight, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isMenuOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out from archives.");
      navigate('/');
    } catch (error) {
      toast.error("Logout failed.");
    }
  };

  const menuVariants = {
    closed: { opacity: 0, x: "100%" }, // Slide in from right for better feel
    open: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
  };

  const linkVariants = {
    closed: { opacity: 0, x: 20 },
    open: (i) => ({
      opacity: 1, 
      x: 0, 
      transition: { delay: 0.2 + i * 0.1, duration: 0.4 }
    })
  };

  return (
    <header className="sticky top-0 z-[100] bg-[#F4F4F0] border-b border-stone-300 font-sans">
      <div className="container mx-auto px-4 lg:px-8 h-20 sm:h-24 flex items-center justify-between">
        
        {/* LEFT: LOGO */}
        <div className="z-[110] flex items-center gap-8">
          <Link to="/" className="font-serif text-3xl sm:text-4xl tracking-tight text-stone-900">
            BlogSpace<span className="text-accent">.</span>
          </Link>

          {/* CONTRIBUTOR INFO (Desktop) */}
          {user && (
            <div className="hidden lg:flex flex-col border-l border-stone-300 pl-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Contributor</span>
              <span className="text-sm font-serif text-stone-900 italic leading-none">{user.username}</span>
            </div>
          )}
        </div>

        {/* RIGHT: DESKTOP NAVIGATION */}
        <div className="hidden md:flex items-center gap-8">
          {user ? (
            <>
              <Link to="/all-posts" className="text-stone-900 font-bold uppercase tracking-widest text-[10px] hover:text-accent transition-colors">Archive</Link>
              <Link to="/my-posts" className="text-stone-900 font-bold uppercase tracking-widest text-[10px] hover:text-accent transition-colors">My Stories</Link>
              <Link to="/createPost" className="flex items-center gap-2 text-stone-900 font-bold uppercase tracking-widest text-[10px] hover:text-accent transition-colors">
                <PenTool className="w-4 h-4" /> Publish
              </Link>
              <button onClick={handleLogout} className="px-6 cursor-pointer py-2.5 border border-stone-900 text-stone-900 font-bold uppercase tracking-widest text-[10px] rounded-full hover:bg-stone-900 hover:text-[#F4F4F0] transition-all">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/all-posts" className="text-stone-900 font-bold cursor-pointer uppercase tracking-widest text-[10px] hover:text-accent transition-colors">Archive</Link>
              <Link to="/login" className="text-stone-900 cursor-pointer font-bold uppercase tracking-widest text-[10px] hover:text-accent transition-colors">Sign In</Link>
              <Link to="/register" className="px-8 py-3 cursor-pointer bg-stone-900 text-[#F4F4F0] font-bold uppercase tracking-widest text-[10px] rounded-full hover:bg-accent transition-all">
                Join Network
              </Link>
            </>
          )}
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden z-[110] p-2 text-stone-900 hover:text-accent transition-all"
        >
          {isMenuOpen ? <X size={32} strokeWidth={1.5} /> : <Menu size={32} strokeWidth={1.5} />}
        </button>

        {/* MOBILE OVERLAY MENU */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-0 bg-[#F4F4F0] z-[105] flex flex-col"
            >
              {/* Top Padding for Header Height */}
              <div className="h-20 sm:h-24 border-b border-stone-200"></div>

              {/* Mobile Contributor Identity */}
              {user && (
                <div className="px-8 py-6 bg-stone-100 border-b border-stone-200">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1">Signed in as</p>
                  <p className="text-2xl font-serif text-stone-900 italic">{user.username}</p>
                </div>
              )}

              {/* Navigation Links */}
              <div className="flex flex-col grow divide-y divide-stone-200 overflow-y-auto">
                {(user ? [
                  { label: "The Archive", path: "/all-posts" },
                  { label: "My Stories", path: "/my-posts" },
                  { label: "Publish Entry", path: "/createPost" },
                ] : [
                  { label: "The Archive", path: "/all-posts" },
                  { label: "Sign In", path: "/login" },
                  { label: "Join Network", path: "/register" },
                ]).map((link, i) => (
                  <motion.div key={link.path} custom={i} variants={linkVariants}>
                    <Link 
                      to={link.path} 
                      className="px-8 cursor-pointer py-8 text-4xl sm:text-5xl font-serif text-stone-900 hover:text-accent hover:bg-stone-50 transition-all flex items-center justify-between group"
                    >
                      {link.label}
                      <ArrowUpRight className="opacity-0 group-hover:opacity-100 group-hover:rotate-45 transition-all text-accent" size={32} />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Logout (If Auth) */}
              {user && (
                <motion.button 
                  custom={4} variants={linkVariants}
                  onClick={handleLogout}
                  className="px-8 py-8 cursor-pointer text-left bg-stone-900 text-accent font-bold uppercase tracking-[0.3em] text-sm flex items-center justify-between"
                >
                  Terminate Session <LogOut size={20} />
                </motion.button>
              )}

              {/* Footer Context */}
              <div className="p-8 border-t border-stone-200 bg-white">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">© 2024 BlogSpace Editorial Archives</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;