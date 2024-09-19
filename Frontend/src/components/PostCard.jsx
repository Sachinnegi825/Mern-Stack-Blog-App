import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  const baseUrl = import.meta.env.VITE_API_URL;
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col space-y-2 w-72 sm:w-[700px] mx-auto">
      {post?.image && (
        <img
        src={`${baseUrl}${post?.image}`}
          alt="Post"
          className="w-full h-20rem sm:h-[25rem] object-cover rounded-t-lg"
        />
      )}
      <h2 className="text-xl font-semibold">{post?.title}</h2>
      <p className="text-gray-700">{post?.description}</p>
      <p className="text-gray-500 text-sm">By {post?.author?.username}</p>
      <p className="text-gray-500 text-sm">{new Date(post?.createdAt).toLocaleDateString()}</p>
      <Link 
  to={`/post/${post._id}`} 
  className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 text-center"
>
  Read More
</Link>

    </div>
  );
};

export default PostCard;
