import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const usePostStore = create((set, get) => ({
  posts: [],
  isLoadingPosts: false,
  isCreatingPost: false,
  isUpdatingPost: false,
  isDeletingPost: false,

  fetchPosts: async () => {
    set({ isLoadingPosts: true });
    try {
      const res = await axiosInstance.get('/posts');
      set({ posts: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Ошибка при загрузке постов');
    } finally {
      set({ isLoadingPosts: false });
    }
  },

  createPost: async (data) => {
    set({ isCreatingPost: true });
    try {
      const res = await axiosInstance.post('/posts', data);
      set((state) => ({ posts: [res.data, ...state.posts] }));
      toast.success('Пост создан');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Ошибка при создании поста');
    } finally {
      set({ isCreatingPost: false });
    }
  },

  updatePost: async (id, data) => {
    set({ isUpdatingPost: true });
    try {
      const res = await axiosInstance.put(`/posts/${id}`, data);
      set((state) => ({
        posts: state.posts.map((post) => (post._id === id ? res.data : post)),
      }));
      toast.success('Пост обновлён');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Ошибка при обновлении поста');
    } finally {
      set({ isUpdatingPost: false });
    }
  },

  deletePost: async (id) => {
    set({ isDeletingPost: true });
    try {
      await axiosInstance.delete(`/posts/${id}`);
      // set((state) => ({
      //   posts: state.posts.filter((post) => post._id !== id),
      // }));
      toast.success('Пост удалён');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Ошибка при удалении поста');
    } finally {
      set({ isDeletingPost: false });
    }
  },
}));
