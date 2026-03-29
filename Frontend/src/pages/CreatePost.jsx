import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ImagePlus, X, PenTool, Loader2 } from 'lucide-react';
import api from '../services/api';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  
  // Image handling states
  const [image, setImage] = useState(null);
  const[imagePreview, setImagePreview] = useState(null);
  
  // UX states
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const baseUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  // Handle Image Selection & Create a Preview URL
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('title', title);
  formData.append('content', content);
  formData.append('description', description);
  formData.append('image', image);

  try {
    const response = await api.post('/api/v1/posts/createPost', formData);

    if (response.data.success) {
      toast.success('Published successfully!');
      navigate("/");
    }
  } catch (error) {
    toast.error("Failed to publish.");
  }
};

  return (
    <div className="min-h-screen bg-[#F4F4F0] font-sans selection:bg-accent selection:text-white pb-32">
      
      {/* Top Action Bar */}
      <div className="sticky top-0 z-40 bg-[#F4F4F0]/90 backdrop-blur-md border-b border-stone-300 py-4 px-4 sm:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2 text-stone-500 font-bold uppercase tracking-widest text-xs">
          <div className="w-2 h-2 rounded-full bg-stone-400 animate-pulse"></div>
          Drafting Mode
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !title || !content}
          className="flex items-center gap-2 px-6 py-2.5 bg-stone-900 text-[#F4F4F0] font-bold uppercase tracking-widest text-xs rounded-full hover:bg-accent disabled:bg-stone-400 transition-colors duration-300 shadow-lg"
        >
          {isSubmitting ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Publishing</>
          ) : (
            <><PenTool className="w-4 h-4" /> Publish</>
          )}
        </button>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-8 mt-12">
        <form onSubmit={handleSubmit} className="flex flex-col">
          
          {/* COVER IMAGE SECTION */}
          <div className="mb-12 relative w-full aspect-video bg-stone-200 border border-stone-300 group overflow-hidden flex flex-col items-center justify-center transition-colors hover:border-stone-400">
            {imagePreview ? (
              <>
                <img src={imagePreview} alt="Cover Preview" className="w-full h-full object-cover" />
                <button 
                  type="button" 
                  onClick={removeImage}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur text-stone-900 p-2 rounded-full shadow-lg hover:text-accent hover:scale-110 transition-all"
                  title="Remove Image"
                >
                  <X className="w-5 h-5" />
                </button>
              </>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer text-stone-500 hover:text-stone-800 transition-colors">
                <ImagePlus className="w-10 h-10 mb-4 stroke-1" />
                <span className="font-bold uppercase tracking-widest text-xs">Add Cover Image</span>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            )}
          </div>

          {/* TITLE INPUT */}
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="The Title."
            rows="1"
            required
            className="w-full bg-transparent font-serif text-5xl sm:text-7xl lg:text-[6rem] text-stone-900 placeholder:text-stone-300 outline-none resize-none leading-[1.1] mb-8 overflow-hidden break-words"
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
          />

          {/* DESCRIPTION / ABSTRACT */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a brief abstract or description of your essay..."
            rows="2"
            required
            className="w-full bg-transparent font-sans text-xl sm:text-2xl text-stone-600 placeholder:text-stone-400 border-b-2 border-stone-300 pb-6 mb-10 outline-none resize-none leading-relaxed focus:border-stone-900 transition-colors"
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
          />

          {/* MAIN CONTENT AREA */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Begin writing your masterpiece..."
            required
            className="w-full min-h-[50vh] bg-transparent font-sans text-lg sm:text-xl text-stone-800 placeholder:text-stone-300 outline-none resize-y leading-loose"
          />

        </form>
      </main>
    </div>
  );
};

export default CreatePost;