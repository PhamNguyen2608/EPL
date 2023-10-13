import React from 'react';
import { Post } from '../../types/PostTypes';
import PostList from '../../component/Post/PostList';
import Navbar from '../../component/NavBar/NavBar';
import Sidebar from '../../component/NavBar/SideBar';
import { sidebarData } from '../../data/sidebarData';
const initialPosts: Post[] = [
    {
      id: 1,
      title: "How to use React with TypeScript",
      content: "This post is about using React with TypeScript...",
      image: "https://example.com/image1.jpg",
      status: "published",
      category: "Frontend Development",
    },
    {
      id: 2,
      title: "Understanding Redux Middleware",
      content: "Redux middleware is a powerful feature...",
      image: "https://example.com/image2.jpg",
      status: "draft",
      category: "State Management",
    },
    {
      id: 3,
      title: "CSS Grid Layout",
      content: "CSS Grid Layout is a 2D grid-based layout system...",
      image: "https://example.com/image3.jpg",
      status: "published",
      category: "CSS",
    },
    {
      id: 4,
      title: "Machine Learning Basics",
      content: "Machine learning is a method of data analysis...",
      image: "https://example.com/image4.jpg",
      status: "archived",
      category: "Artificial Intelligence",
    },
  ];
  

const PostManagement: React.FC = () => {
  
    return (
        <div className="flex flex-col min-h-screen bg-gray-100 p-8">
          
          <div className="mb-8">
            <Navbar />
          </div>
    
          <div className="container mx-auto">
            <h1 className="text-4xl font-semibold mb-8 text-center">Post Management</h1>
    
            <div className="flex flex-row gap-8">
              <div className="flex-grow">
                <PostList posts={initialPosts} />
              </div>
    
              <div className="w-1/4 flex-shrink-0">
                <Sidebar items={sidebarData} />
              </div>
            </div>
          </div>
        </div>
      );
};

export default PostManagement;

