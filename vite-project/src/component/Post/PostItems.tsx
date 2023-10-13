import React from 'react';
import { Post } from '../../types/PostTypes';

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
      <img className="w-full h-48 object-cover mb-4" src={post.image} alt={post.title} />
      <p className="text-sm mb-2">{post.content}</p>
      <p className="text-xs text-gray-500 mb-2">Status: {post.status}</p>
      <p className="text-xs text-gray-500">Category: {post.category}</p>
    </div>
  );
};

export default PostItem;
