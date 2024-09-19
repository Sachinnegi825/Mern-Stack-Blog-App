import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';
import Loading from '../components/Loading';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = import.meta.env.VITE_API_URL;


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get(`${baseUrl}/api/v1/posts/getPosts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPosts(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <Loading/>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 space-y-4">
    
      <h1 className='text-center font-extrabold text-3xl sm:text-5xl'>Posts</h1>
     

{posts.map(post => (
        <div key={post._id}>
          <PostCard post={post} />
        </div>
      ))}

    </div>
  );
};

export default Home;
