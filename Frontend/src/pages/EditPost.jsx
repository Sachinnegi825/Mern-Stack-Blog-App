import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Save, Loader2, ArrowLeft, ImagePlus, X, Type } from 'lucide-react';
import api from '../services/api';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/api/v1/posts/getPost/${id}`);
        const post = response.data.data;
        setTitle(post.title);
        setDescription(post.description);
        setContent(post.content);
        setImagePreview(post.image);
      } catch (error) {
        toast.error("Failed to retrieve the entry.");
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('content', content);
    if (imageFile) formData.append('image', imageFile);

    try {
      const response = await api.put(`/api/v1/posts/editPost/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.data.success) {
        toast.success("Archives updated.");
        navigate(`/post/${id}`);
      }
    } catch (error) {
      toast.error("Failed to save changes.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#F4F4F0] font-serif italic text-2xl">Opening the Archives...</div>;

  return (
    <div className="min-h-screen bg-[#F4F4F0] font-sans selection:bg-accent selection:text-white pb-32">
      
      {/* STICKY HEADER */}
      <div className="sticky top-0 z-40 bg-[#F4F4F0]/90 backdrop-blur-md border-b border-stone-300 py-4 px-4 sm:px-8 flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="text-stone-500 hover:text-stone-900 flex items-center gap-2 font-bold uppercase tracking-widest text-[10px]">
          <ArrowLeft className="w-4 h-4" /> Discard
        </button>
        
        <button
          onClick={handleUpdate}
          disabled={isSubmitting}
          className="flex items-center gap-2 px-8 py-3 bg-stone-900 text-[#F4F4F0] font-bold uppercase tracking-widest text-[10px] rounded-full hover:bg-accent disabled:bg-stone-300 transition-all shadow-lg"
        >
          {isSubmitting ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <main className="max-w-3xl mx-auto px-6 mt-12">
        <form onSubmit={handleUpdate} className="flex flex-col">
          
          {/* IMAGE EDITOR (Smaller, more controlled aspect ratio) */}
          <div className="mb-10 relative w-full aspect-[21/9] bg-stone-200 border border-stone-300 group overflow-hidden">
            {imagePreview ? (
              <>
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <label className="cursor-pointer bg-white text-stone-900 px-4 py-2 rounded-full font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 hover:bg-accent hover:text-white transition-colors">
                    <ImagePlus className="w-4 h-4" /> Change
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                  <button type="button" onClick={() => setImagePreview(null)} className="bg-white/20 backdrop-blur text-white p-2 rounded-full hover:bg-red-500 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer text-stone-400 hover:text-stone-700 transition-colors">
                <ImagePlus className="w-8 h-8 mb-2 stroke-[1px]" />
                <span className="font-bold uppercase tracking-widest text-[9px]">Add Cover Image</span>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            )}
          </div>

          {/* REFINED TITLE (Reduced size for better usability) */}
          <div className="group mb-6">
             <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-2 block">Entry Title</label>
             <textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Name your story..."
                rows="1"
                required
                className="w-full bg-white/50 border border-transparent focus:border-stone-300 focus:bg-white p-4 font-serif text-4xl sm:text-5xl text-stone-900 placeholder:text-stone-300 outline-none resize-none leading-tight transition-all"
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
              />
          </div>

          {/* REFINED DESCRIPTION */}
          <div className="group mb-10">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-2 block">Abstract</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A brief introduction..."
              rows="1"
              required
              className="w-full bg-white/50 border border-transparent focus:border-stone-300 focus:bg-white p-4 font-sans text-lg text-stone-500 placeholder:text-stone-300 outline-none resize-none leading-relaxed transition-all"
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
            />
          </div>

          {/* CONTENT BODY */}
          <div className="group">
             <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-2 block">Main Content</label>
             <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="The floor is yours..."
                required
                className="w-full min-h-[40vh] bg-white/50 border border-transparent focus:border-stone-300 focus:bg-white p-4 font-sans text-lg text-stone-800 placeholder:text-stone-200 outline-none resize-y leading-loose transition-all"
              />
          </div>

        </form>
      </main>
    </div>
  );
};

export default EditPost;