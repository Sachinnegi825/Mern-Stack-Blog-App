import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import PostCard from '../components/PostCard';
import Loading from '../components/Loading';

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/v1/posts/getPosts`);
        setPosts(response.data.data);
        setFilteredPosts(response.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [baseUrl]);

  // Handle Search Logic
  useEffect(() => {
    const filtered = posts.filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#F4F4F0]"><Loading /></div>;

  return (
    <div className="min-h-screen bg-[#F4F4F0] text-stone-900 font-sans pb-20">
      <header className="pt-20 pb-12 border-b border-stone-300 px-4 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-6xl sm:text-8xl font-serif mb-8 tracking-tighter">The <i className="text-stone-400">Archive.</i></h1>
          
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white border border-stone-300 p-2 rounded-full shadow-sm focus-within:border-accent transition-colors">
            <div className="flex items-center gap-3 pl-6 flex-grow w-full">
              <Search className="w-5 h-5 text-stone-400" />
              <input 
                type="text" 
                placeholder="Search by title or keywords..."
                className="bg-transparent outline-none w-full py-3 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="hidden md:flex items-center gap-2 px-6 py-3 bg-stone-100 rounded-full text-stone-600 font-bold text-xs uppercase tracking-widest hover:bg-stone-200 transition-all">
              <SlidersHorizontal className="w-4 h-4" /> Filter
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl px-4 lg:px-8 py-16">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filteredPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-40 border border-dashed border-stone-300">
            <p className="font-serif text-3xl text-stone-400 italic">No entries match your search.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AllPosts;