import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import PostCard from '../components/PostCard';
import Loading from '../components/Loading';
import { PenTool, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyPosts = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const response = await api.get('/api/v1/posts/getPosts');
        // Filter posts where the author ID matches the logged-in user ID
        const myEntries = response.data.data.filter(
          post => (post.author?._id || post.author) === user?._id
        );
        setPosts(myEntries);
      } catch (err) {
        console.error("Error fetching your archive:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) fetchMyPosts();
  }, [user]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#F4F4F0]"><Loading /></div>;

  return (
    <div className="min-h-screen bg-[#F4F4F0] text-stone-900 font-sans pb-20">
      
      {/* Header Section */}
      <header className="pt-20 pb-16 border-b border-stone-300 px-4 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <p className="text-accent font-bold uppercase tracking-[0.3em] text-xs mb-4">Personal Archive</p>
              <h1 className="text-6xl sm:text-8xl font-serif tracking-tighter leading-none">
                Your <br/> <i className="text-stone-400">Library.</i>
              </h1>
            </div>
            <div className="flex items-center gap-6 border-l border-stone-300 pl-8 h-max">
              <div className="text-center">
                <p className="text-3xl font-serif italic leading-none">{posts.length}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mt-1">Essays</p>
              </div>
              <Link to="/createPost" className="px-8 py-4 bg-stone-900 text-white rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-accent transition-all flex items-center gap-2">
                <PenTool className="w-3 h-3" /> New Entry
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="container mx-auto max-w-7xl px-4 lg:px-8 py-20">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {posts.map((post, index) => (
              <motion.div 
                key={post._id} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <PostCard post={post} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="max-w-xl mx-auto text-center py-32 border border-dashed border-stone-300 px-8">
            <BookOpen className="w-12 h-12 text-stone-300 mx-auto mb-6" strokeWidth={1} />
            <h3 className="font-serif text-3xl mb-4 italic text-stone-400">The ink has not yet touched the page.</h3>
            <p className="text-stone-500 mb-10">Start your journey by publishing your first modern essay.</p>
            <Link to="/createPost" className="inline-block px-10 py-4 bg-stone-900 text-white font-bold rounded-full uppercase tracking-widest text-xs hover:bg-accent transition-colors">
              Begin Writing
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyPosts;