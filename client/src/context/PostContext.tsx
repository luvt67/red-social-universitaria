import React, { createContext, useContext, useState, useEffect } from 'react';
import * as postService from '../services/postService';
const PostContext = createContext<any>(null);
export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<any[]>([]);

  const createPost = async (postData: FormData) => {
      try{
        console.log(postData.get('archivo'));
        const response = await postService.createPost(postData);
        if(response)
        {
          await getAllPosts();
        }
      }
      catch (error: any) {
        console.log("Error al crear el post");
      }
      
  }
  useEffect(() => {
    getAllPosts();
  }, []);
  
  
  const getAllPosts = async () => {
    try {
      const response = await postService.getAllPosts();

      if (response) {
        setPosts(response.data);
      }
      
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }
  return (
    <PostContext.Provider value={{ posts, createPost, getAllPosts }}>
      {children}
    </PostContext.Provider>
  );
}

export const usePost = () => useContext(PostContext);