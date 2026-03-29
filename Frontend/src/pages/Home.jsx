import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// Import our new modular sections
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import Testimonials from '../components/home/Testimonials';
import Faq from '../components/home/Faq';

// Generic Components
import PostCard from '../components/PostCard';
import Loading from '../components/Loading';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const[loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = import.meta.env.VITE_API_URL;

  // Fetch API data exactly as you had it
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${baseUrl}/api/v1/posts/getPosts`, {
          headers: { Authorization: token ? `Bearer ${token}` : '' },
        });
        setPosts(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchPosts();
  },[]);

  return (
    <div className="min-h-screen bg-[#F4F4F0] text-stone-900 font-sans selection:bg-accent selection:text-white">
      
      {/* 1. Hero & Ticker Component */}
      <Hero />

      {/* 2. Features Grid Component */}
      <Features />

      {/* 3. THE FEED (Dynamic Data) */}
      <section className="py-20 sm:py-32 px-4 lg:px-8 border-b border-stone-300">
        <div className="container mx-auto max-w-7xl">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 border-b border-stone-300 pb-8">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-serif tracking-tight text-stone-900">
              Latest <br/> <i className="text-stone-500">Entries.</i>
            </h2>
            <Link to="/createPost" className="hidden md:flex items-center gap-2 text-stone-900 font-bold uppercase tracking-wider text-sm hover:text-accent transition-colors">
              Submit an Entry <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><Loading /></div>
          ) : error ? (
            <div className="border border-stone-300 p-8 text-center max-w-lg mx-auto bg-white">
              <h3 className="font-serif text-2xl mb-2 text-red-600">Error fetching entries</h3>
              <p className="font-sans text-stone-600">{error}</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="border border-stone-300 border-dashed p-10 sm:p-20 text-center max-w-2xl mx-auto">
              <h3 className="font-serif text-3xl sm:text-4xl mb-4 text-stone-400">The archive is empty</h3>
              <p className="font-sans text-stone-600 mb-8">Be the first to ink a story onto the canvas.</p>
              <Link to="/createPost" className="px-8 py-3 bg-stone-900 text-[#F4F4F0] font-bold rounded-full hover:bg-accent transition-colors inline-block">Start Writing</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
  {posts.slice(0, 3).map((post, index) => (
                <motion.div 
                  key={post._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} 
                  transition={{ delay: index * 0.1 }} viewport={{ once: true }}
                >
                  <PostCard post={post} />
                </motion.div>
              ))}
            </div>
          )}
          <div className="mt-16 text-center">
  <Link to="/all-posts" className="inline-flex items-center gap-2 px-12 py-4 border-2 border-stone-900 text-stone-900 font-bold uppercase tracking-widest text-sm hover:bg-stone-900 hover:text-[#F4F4F0] transition-all rounded-full">
    Explore the Full Archive <ArrowUpRight className="w-5 h-5" />
  </Link>
</div>
        </div>
      </section>

      {/* 4. Testimonials Component */}
      <Testimonials />

      {/* 5. FAQ Accordion Component */}
      <Faq />

      {/* 6. MINIMALIST CTA (Inline because it's tiny) */}
      <section className="bg-accent text-[#F4F4F0] py-24 sm:py-40 text-center px-4">
        <h2 className="text-5xl sm:text-7xl lg:text-8xl font-serif mb-6 sm:mb-8">Ready to <br className="sm:hidden"/> <i>begin?</i></h2>
        <p className="font-sans text-lg sm:text-xl lg:text-2xl mb-10 sm:mb-12 max-w-xl mx-auto opacity-90 px-4">
          Join the platform where design meets content. Setup takes less than a minute.
        </p>
        <Link to="/register" className="inline-block px-10 sm:px-14 py-4 sm:py-5 bg-[#F4F4F0] text-accent font-bold text-lg sm:text-xl rounded-full hover:scale-105 transition-transform duration-300 shadow-2xl">
          Create Account
        </Link>
      </section>

    </div>
  );
};

export default Home;