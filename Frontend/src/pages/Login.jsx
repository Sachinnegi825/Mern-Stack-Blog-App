import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { ArrowRight, Eye, EyeOff, Lock } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/api/v1/users/login', formData);
      if (response.data.success) {
        login(response.data.data.user);
        toast.success("Welcome back to the archives.");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F0] flex items-center justify-center p-4 font-sans selection:bg-accent selection:text-white">
      <div className="w-full max-w-xl bg-white border border-stone-300 shadow-[20px_20px_0px_#1c191710]">
        
        {/* Header Section */}
        <div className="p-8 sm:p-12 border-b border-stone-300 text-center">
          <h1 className="text-5xl sm:text-6xl font-serif text-stone-900 tracking-tighter mb-4">
            Sign <i className="text-stone-400 font-light">In.</i>
          </h1>
          <p className="text-stone-500 uppercase tracking-widest text-xs font-bold">
            Access your contributor dashboard
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="p-8 sm:p-12 space-y-8">
          <div className="space-y-6">
            <div className="relative group">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-2 group-focus-within:text-accent transition-colors">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="editor@blogspace.com"
                className="w-full bg-stone-50 border border-stone-200 p-4 outline-none focus:border-stone-900 focus:bg-white transition-all font-medium text-stone-800"
                required
              />
            </div>

            <div className="relative group">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-2 group-focus-within:text-accent transition-colors">
                Secret Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-stone-50 border border-stone-200 p-4 outline-none focus:border-stone-900 focus:bg-white transition-all font-medium text-stone-800"
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-900"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer bg-stone-900 text-[#F4F4F0] py-5 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-accent transition-all duration-300 disabled:bg-stone-300"
          >
            {loading ? "Verifying..." : "Enter the Archive"}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        {/* Footer Section */}
        <div className="p-6 bg-stone-50 border-t border-stone-300 text-center">
          <p className="text-stone-500 text-sm">
            New to the platform?{' '}
            <Link to="/register" className="text-stone-900 font-bold hover:text-accent underline underline-offset-4">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;