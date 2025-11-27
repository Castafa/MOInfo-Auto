import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { SocialPost, Platform, PostStatus } from '../types';
import { addDays, setHours, setMinutes } from 'date-fns';

interface PostContextType {
  posts: SocialPost[];
  addPost: (post: SocialPost) => void;
  updatePost: (id: string, updates: Partial<SocialPost>) => void;
  deletePost: (id: string) => void;
  getPostsByDate: (date: Date) => SocialPost[];
}

const PostContext = createContext<PostContextType | undefined>(undefined);

// Initial mock data
const initialPosts: SocialPost[] = [
  {
    id: '1',
    content: "Just launched our new AI features! 🚀 check it out. #AI #Tech",
    platform: Platform.Twitter,
    scheduledDate: setHours(new Date(), 10),
    status: PostStatus.Scheduled,
    topic: "Product Launch"
  },
  {
    id: '2',
    content: "We are thrilled to announce a partnership with TechCorp. This collaboration will bring...",
    platform: Platform.LinkedIn,
    scheduledDate: addDays(new Date(), 1),
    status: PostStatus.Draft,
    topic: "Partnership"
  },
  {
    id: '3',
    content: "Behind the scenes at our annual retreat! 🌲📸 #TeamBuilding",
    platform: Platform.Instagram,
    scheduledDate: addDays(new Date(), 2),
    status: PostStatus.Scheduled,
    topic: "Culture",
    imageUrl: "https://picsum.photos/400/400"
  }
];

export const PostProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<SocialPost[]>(initialPosts);

  const addPost = useCallback((post: SocialPost) => {
    setPosts(prev => [...prev, post]);
  }, []);

  const updatePost = useCallback((id: string, updates: Partial<SocialPost>) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  }, []);

  const deletePost = useCallback((id: string) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  }, []);

  const getPostsByDate = useCallback((date: Date) => {
    return posts.filter(p => 
      p.scheduledDate.getDate() === date.getDate() &&
      p.scheduledDate.getMonth() === date.getMonth() &&
      p.scheduledDate.getFullYear() === date.getFullYear()
    );
  }, [posts]);

  return (
    <PostContext.Provider value={{ posts, addPost, updatePost, deletePost, getPostsByDate }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
};