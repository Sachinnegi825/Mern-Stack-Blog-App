import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

const SinglePost = () => {
  const { id } = useParams();
  const [loading,setLoading]=useState(false)
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const baseUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${baseUrl}/api/v1/posts/getPost/${id}`);
        setPost(response.data.data);
        setComments(response.data.data.comments);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

  const handleAddComment = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("You need to login to add a comment!");
      return;
    }

    try {
      const response = await axios.post(
        `${baseUrl}/api/v1/posts/${id}/comments`,
        { content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments((prevComments) => [...prevComments, response.data.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeletePost = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("You need to login to delete this post!");
      return;
    }

    try {
      const response = await axios.delete(`${baseUrl}/api/v1/posts/deletePost/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        toast.success("Post deleted successfully!");
        navigate('/');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error("Failed to delete the post. Please try again later.");
    }
  };

  if(loading) return <Loading/>

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      {post.image && (
        <img
          src={`${baseUrl}${post.image}`}
          alt="Post"
          className="w-full h-60 object-cover rounded-lg"
        />
      )}
      <p>{post.content}</p>
      <p>{post.description}</p>

     
      <button
        onClick={handleDeletePost}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4"
      >
        Delete Post
      </button>

      <div>
        <h2 className="text-xl font-semibold">Comments</h2>
        {comments.map((comment) => (
          <div key={comment._id} className="border-b border-gray-200 py-2">
            <p className="font-semibold">{comment.author.username}</p>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-semibold">Add a Comment</h3>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment here..."
          className="w-full border border-gray-300 rounded p-2"
        />
        <button
          onClick={handleAddComment}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
        >
          Submit Comment
        </button>
      </div>
    </div>
  );
};

export default SinglePost;
