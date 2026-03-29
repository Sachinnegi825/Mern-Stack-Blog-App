import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';
import { ArrowRight, UserPlus, ShieldCheck, Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please provide a valid email.");
      return false;
    }
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const { confirmPassword, ...dataToSend } = formData;

    try {
      const response = await api.post('/api/v1/users/register', dataToSend);
      if (response.data.success) {
        toast.success("Account registered. You may now sign in.");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F0] flex items-center justify-center p-4 font-sans selection:bg-accent selection:text-white">
      <div className="w-full max-w-2xl bg-white border border-stone-300 shadow-[20px_20px_0px_#1c191710] grid md:grid-cols-5">
        
        {/* Side Info */}
        <div className="hidden md:flex md:col-span-2 bg-stone-900 p-10 flex-col justify-between text-[#F4F4F0]">
          <div>
            <ShieldCheck className="w-10 h-10 text-accent mb-6" strokeWidth={1.5} />
            <h2 className="text-3xl font-serif leading-tight">Join the <br/> Network.</h2>
          </div>
          <p className="text-stone-400 text-sm leading-relaxed">
            Create an account to publish your stories and engage with our modern community.
          </p>
        </div>

        {/* Form Section */}
        <div className="md:col-span-3">
          <div className="p-8 sm:p-10 border-b border-stone-300">
            <h1 className="text-4xl font-serif text-stone-900 tracking-tight text-center sm:text-left">Register.</h1>
          </div>

          <form onSubmit={handleSubmit} className="p-8 sm:p-10 space-y-5">
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1">Full Name</label>
                <input
                  type="text" name="username" value={formData.username} onChange={handleChange}
                  placeholder="Sachin Negi"
                  className="w-full bg-stone-50 border border-stone-200 p-3 outline-none focus:border-stone-900 transition-all text-stone-800"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1">Email</label>
                <input
                  type="email" name="email" value={formData.email} onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full bg-stone-50 border border-stone-200 p-3 outline-none focus:border-stone-900 transition-all text-stone-800"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1">Password</label>
                  <input
                    type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-stone-50 border border-stone-200 p-3 pr-10 outline-none focus:border-stone-900 transition-all text-stone-800"
                    required
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-8 text-stone-400 hover:text-stone-900"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <div className="relative">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1">Repeat</label>
                  <input
                    type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-stone-50 border border-stone-200 p-3 pr-10 outline-none focus:border-stone-900 transition-all text-stone-800"
                    required
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-8 text-stone-400 hover:text-stone-900"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-stone-900 text-[#F4F4F0] py-4 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-accent transition-all duration-300 disabled:bg-stone-300"
            >
              {loading ? "Creating..." : "Create Account"}
              {!loading && <UserPlus size={16} />}
            </button>

            <p className="text-center text-stone-500 text-xs mt-6">
              Already a contributor?{' '}
              <Link to="/login" className="text-stone-900 font-bold hover:text-accent underline underline-offset-4">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;