import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Edit3, User, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PostCard = ({ post }) => {
  const { user } = useAuth();
const isAuthor = user && (user._id === (post.author?._id || post.author));

  // 2. Formatting Date
  const formattedDate = new Date(post?.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).toUpperCase();

  // 3. Image URL Handling
  const defaultImage = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop";
const imageUrl = post?.image || defaultImage;


  return (
    <div className="group relative flex flex-col h-full bg-[#F4F4F0] border border-stone-300 hover:bg-white transition-all duration-500 overflow-hidden">
      
      {/* AUTHOR ACTION: EDIT BUTTON */}
      {isAuthor && (
        <Link 
          to={`/edit-post/${post._id}`}
          className="absolute top-4 right-4 z-20 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur border border-stone-300 rounded-full text-stone-900 font-bold uppercase tracking-widest text-[10px] hover:bg-accent hover:text-white hover:border-accent transition-all shadow-sm"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit Post</span>
        </Link>
      )}

      {/* IMAGE CONTAINER */}
      <div className="relative aspect-[4/3] overflow-hidden border-b border-stone-300 bg-stone-200">
        <Link to={`/post/${post._id}`} className="block w-full h-full">
          <img
            src={imageUrl}
            alt={post?.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out grayscale-[20%] group-hover:grayscale-0"
            loading="lazy"
          />
          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/5 transition-colors duration-500"></div>
        </Link>
      </div>

      {/* CONTENT AREA */}
      <div className="p-6 sm:p-8 flex flex-col flex-grow">
        
        {/* Top Meta: Author & Date */}
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-6">
          <div className="flex items-center gap-1.5">
            <User className="w-3 h-3 text-stone-300" />
            <span className="text-stone-500">{post?.author?.username || "Anonymous"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-stone-300" />
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Title: Huge Serif Typography */}
        <Link to={`/post/${post._id}`} className="block mb-4">
          <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 leading-[1.15] group-hover:text-accent transition-colors duration-300 line-clamp-2 italic sm:not-italic group-hover:italic">
            {post?.title}
          </h2>
        </Link>

        {/* Description: Clean Sans Excerpt */}
        <p className="font-sans text-stone-500 text-sm sm:text-base leading-relaxed mb-8 line-clamp-3 flex-grow">
          {post?.description}
        </p>

        {/* Bottom Action: Read Link */}
        <div className="mt-auto pt-6 border-t border-stone-200">
          <Link 
            to={`/post/${post._id}`} 
            className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-stone-900 group-hover:text-accent transition-colors duration-300"
          >
            <span>Read full essay</span>
            <div className="w-8 h-[1px] bg-stone-300 group-hover:w-12 group-hover:bg-accent transition-all duration-300"></div>
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

      </div>

      {/* Hover Line Decoration (Visual Polish) */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-accent group-hover:w-full transition-all duration-700"></div>
    </div>
  );
};

export default PostCard;