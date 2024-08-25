import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const baseUrl=import.meta.env.VITE_API_URL

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(token);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/v1/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      if (response.status === 200) {
        toast.success("User Logout Successfully")
        localStorage.removeItem('token'); 
        setIsAuthenticated(false);
        navigate('/');
      } else {
        toast.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <header className="text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-black">
          <Link to="/">MyBlog</Link>
        </div>

        <div className="space-x-4">
          <Link to="/createPost"  className="bg-green-400 px-4 py-2 rounded hover:bg-white hover:text-green-400 hover:border-2">Create Post</Link>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-blue-500 px-4 py-2 rounded hover:bg-white hover:text-blue-500 hover:border-2"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-blue-500 px-4 py-2 rounded hover:bg-white hover:text-blue-500 hover:border-2"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
