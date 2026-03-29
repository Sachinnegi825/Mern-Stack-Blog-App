import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { 
  Trash2, 
  Edit3, 
  MessageSquare, 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Send, 
  Share2,
  CornerDownRight,
  User
} from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';

const SinglePost = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  
  // States for the Reply System
  const [replyTo, setReplyTo] = useState(null); // Stores ID of the comment being replied to
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        // This call must return the post with populated comments and comment authors
        const response = await api.get(`/api/v1/posts/getPost/${id}`);
        const postData = response.data.data;
        setPost(postData);
        setComments(postData.comments || []);
      } catch (error) {
        toast.error("Entry not found in archives.");
        navigate('/all-posts');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, navigate]);

  const isAuthor = user && (user._id === (post.author?._id || post.author));

  // --- LOGIC: THREADING COMMENTS (1-LEVEL) ---
  // Root comments have no parentComment field (or it is null)
  const rootComments = comments.filter(c => !c.parentComment);
  // Replies are comments that point to a specific parent ID
  const getRepliesForComment = (parentId) => comments.filter(c => c.parentComment === parentId);

  const calculateReadingTime = (text) => {
    const words = text?.split(/\s/g).length || 0;
    return Math.ceil(words / 200) || 1;
  };

  const handleAddComment = async (parentId = null) => {
    if (!user) {
      toast.error("Sign in to join the conversation.");
      return;
    }

    const content = parentId ? replyContent : newComment;
    if (!content.trim()) return;

    try {
      // Send content and the parent ID (if it's a reply) to the backend
      const response = await api.post(`/api/v1/posts/${id}/comments`, { 
        content,
        parentCommentId: parentId 
      });

      // The backend returns the new comment object (with author populated)
      const createdComment = response.data.data;

      // Update local state immediately so all users see it
      setComments((prev) => [...prev, createdComment]);
      
      // Reset input fields
      if (parentId) {
        setReplyTo(null);
        setReplyContent('');
      } else {
        setNewComment('');
      }
      toast.success(parentId ? "Reply added." : "Perspective shared.");
    } catch (error) {
      toast.error("Action failed. Please try again.");
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm("Permanent deletion. Proceed?")) return;
    try {
      await api.delete(`/api/v1/posts/deletePost/${id}`);
      toast.success("Entry removed from archives.");
      navigate('/all-posts');
    } catch (error) {
      toast.error("Unauthorized deletion.");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-[#F4F4F0] font-sans selection:bg-accent selection:text-white pb-32">
      
      {/* 1. STICKY NAVIGATION */}
      <nav className="sticky top-0 z-50 bg-[#F4F4F0]/80 backdrop-blur-md border-b border-stone-300">
        <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/all-posts" className="flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors font-bold uppercase tracking-widest text-[10px]">
            <ArrowLeft className="w-4 h-4" /> The Archive
          </Link>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => {navigator.clipboard.writeText(window.location.href); toast.info("Link copied");}} 
              className="text-stone-400 hover:text-stone-900 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
            {isAuthor && (
              <div className="flex items-center gap-4 border-l border-stone-300 pl-6">
                <Link to={`/edit-post/${post._id}`} className="text-stone-400 hover:text-stone-900 transition-colors">
                  <Edit3 className="w-4 h-4" />
                </Link>
                <button onClick={handleDeletePost} className="text-stone-400 hover:text-accent transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <article className="container mx-auto px-4 mt-16 sm:mt-24">
        <div className="max-w-3xl mx-auto">
          
          {/* 2. HEADER */}
          <header className="mb-12">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif text-stone-900 leading-[0.95] mb-10 tracking-tighter">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-y-4 gap-x-8 text-stone-500 border-y border-stone-300 py-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center text-[#F4F4F0] font-serif italic text-lg">
                  {post.author?.username?.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Writer</span>
                  <span className="font-serif text-stone-900 italic text-lg">{post.author?.username}</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Date</span>
                <span className="text-stone-900 font-medium">{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Read Time</span>
                <span className="text-stone-900 font-medium">{calculateReadingTime(post.content)} min</span>
              </div>
            </div>
          </header>

          {/* 3. HERO IMAGE */}
          {post.image && (
            <div className="mb-16 -mx-4 sm:mx-0">
              <img src={post.image} alt="" className="w-full h-auto border-y sm:border border-stone-300 shadow-2xl shadow-stone-900/5" />
              {post.description && <p className="mt-6 text-stone-500 italic text-lg text-center font-serif leading-relaxed px-10">"{post.description}"</p>}
            </div>
          )}

          {/* 4. MAIN CONTENT (Editorial Style) */}
          <section className="prose prose-stone max-w-none">
            <p className="text-xl sm:text-2xl text-stone-800 leading-[1.8] font-sans whitespace-pre-line first-letter:text-8xl first-letter:font-serif first-letter:text-accent first-letter:mr-4 first-letter:float-left first-letter:leading-[0.8]">
              {post.content}
            </p>
          </section>

          {/* 5. THREADED COMMENTS SECTION */}
          <section className="mt-32 pt-20 border-t border-stone-900">
            <div className="flex items-end justify-between mb-16">
              <h2 className="text-5xl font-serif tracking-tight text-stone-900">The <br/> <i className="text-stone-400">Debate.</i></h2>
              <span className="text-stone-400 font-bold uppercase tracking-widest text-[10px]">{comments.length} Perspectives</span>
            </div>

            {/* Main Input Field */}
            <div className="bg-white border border-stone-300 p-8 mb-20 shadow-[10px_10px_0px_#1c191708] focus-within:border-stone-900 transition-all">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Join the discussion..."
                className="w-full bg-transparent outline-none resize-none font-sans text-xl text-stone-800 min-h-[100px] placeholder:text-stone-200"
              />
              <div className="flex justify-end mt-4 pt-6 border-t border-stone-50">
                <button 
                  onClick={() => handleAddComment()} 
                  className="px-10 py-3 bg-stone-900 text-[#F4F4F0] font-bold uppercase tracking-widest text-[10px] rounded-full hover:bg-accent transition-all"
                >
                  Post Comment
                </button>
              </div>
            </div>

            {/* Comments Display Loop */}
            <div className="space-y-20">
              {rootComments.map((comment) => (
                <div key={comment._id} className="group">
                  
                  {/* ROOT COMMENT */}
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-bold text-stone-900 text-[10px] uppercase tracking-widest">
                      {comment.author?.username || "Deleted Account"}
                    </span>
                    {comment.author?._id === (post.author?._id || post.author) && (
                      <span className="bg-stone-900 text-white text-[8px] px-2 py-0.5 rounded-full font-bold uppercase">Writer</span>
                    )}
                    <div className="h-px bg-stone-200 flex-grow"></div>
                    <span className="text-[10px] text-stone-300 font-bold uppercase">{new Date(comment.createdAt).toLocaleDateString()}</span>
                  </div>
                  
                  <p className="text-stone-700 font-sans text-lg leading-relaxed pl-6 border-l-2 border-stone-200 group-hover:border-accent transition-colors mb-4">
                    {comment.content}
                  </p>

                  <div className="pl-6">
                    <button 
                      onClick={() => setReplyTo(replyTo === comment._id ? null : comment._id)}
                      className="text-[10px] font-bold text-stone-400 hover:text-accent uppercase tracking-widest transition-colors"
                    >
                      {replyTo === comment._id ? "Cancel Reply" : "Reply"}
                    </button>
                  </div>

                  {/* REPLY INPUT FIELD */}
                  <AnimatePresence>
                    {replyTo === comment._id && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        className="pl-6 mt-6 overflow-hidden"
                      >
                        <div className="bg-stone-50 p-6 border border-stone-200">
                          <textarea 
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder={`Replying to ${comment.author?.username}...`}
                            className="w-full bg-transparent outline-none font-sans text-base min-h-[80px]"
                          />
                          <div className="flex justify-end mt-4">
                            <button 
                              onClick={() => handleAddComment(comment._id)} 
                              className="bg-stone-900 text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase hover:bg-accent"
                            >
                              Post Reply
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* REPLIES LIST (ONE LEVEL UP) */}
                  <div className="pl-12 space-y-10 mt-10">
                    {getRepliesForComment(comment._id).map(reply => (
                      <div key={reply._id} className="relative">
                        {/* Connector Icon */}
                        <div className="absolute -left-6 top-2 text-stone-300">
                          <CornerDownRight size={16} />
                        </div>
                        
                        <div className="flex items-center gap-3 mb-3">
                          <span className="font-bold text-stone-900 text-[10px] uppercase">
                            {reply.author?.username || "Deleted Account"}
                          </span>
                          {reply.author?._id === (post.author?._id || post.author) && (
                            <span className="bg-accent text-white text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">Official Reply</span>
                          )}
                        </div>
                        <p className="text-stone-600 font-sans text-base leading-relaxed italic pl-4 border-l border-stone-200">
                          {reply.content}
                        </p>
                      </div>
                    ))}
                  </div>

                </div>
              ))}

              {/* EMPTY STATE */}
              {rootComments.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-stone-400 font-serif italic text-xl underline decoration-stone-200 underline-offset-8">No one has spoken yet.</p>
                </div>
              )}
            </div>
          </section>

        </div>
      </article>

    </div>
  );
};

export default SinglePost;