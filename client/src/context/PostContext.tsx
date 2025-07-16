import React, { createContext, useContext, useState, useEffect } from 'react';
import * as postService from '../services/postService';
import * as commentService from '../services/commentService';
import {convertImageToDataURL} from '../utils/ConvertImage';

const PostContext = createContext<any>(null);
export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<any[]>([]);
  // ==================== Create Post ====================
  const createPost = async (postData: FormData) => {
      try{
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
  // ======================================================
  
  // ==================== Get All Posts ====================
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
  // ======================================================
  // ==================== Detele Posts ====================
  // ======================================================
  // ==================== Update Posts ====================
  // ======================================================

  // ======================= COMMENTS =====================
  const createComment = async (dataComment: FormData) => {
    try {
      const response = await commentService.createComment(dataComment);
      if (response) {
        return { success: true, message: 'Comentario creado exitosamente' };
      }
    } catch (error: any) {
      console.log("Error al crear el comentario");
    }
  }

const getAllCommentsPost = async (id_publicacion: string) => {
  try {
    const response = await commentService.getAllComments(id_publicacion);
    const commentdata = response.data;

    // Convertir la imagen de cada comentario
    for (const comment of commentdata) {
      if (comment.foto) {
        comment.foto = convertImageToDataURL(comment.foto);
      }
    }

    return commentdata;
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
};

  // ======================================================
  // ======================= Consultas ====================
  
  // ======================================================
  return (
    <PostContext.Provider value={{ posts, createPost, getAllPosts , createComment,getAllCommentsPost}}>
      {children}
    </PostContext.Provider>
  );
}

export const usePost = () => useContext(PostContext);