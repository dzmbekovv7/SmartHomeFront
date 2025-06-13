import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useHouseStore = create((set, get) => ({
  houses: [],
  loading: false,
  error: null,
  comments: [],
  likeStatus: {
    liked: false,
    likeCount: 0,
  },

  fetchHouses: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get('/houses/');
      set({ houses: res.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Не удалось загрузить дома');
    }
  },

  fetchComments: async (houseId) => {
    try {
      const res = await axiosInstance.get(`/houses/${houseId}/comments/`);
      set({ comments: res.data });
    } catch (err) {
      toast.error('Не удалось загрузить комментарии');
    }
  },

  submitComment: async ({ comment, houseId }) => {
    try {
      await axiosInstance.post(`/comments/create/`, {
        content: comment,
        house: houseId,
      });
      toast.success('Комментарий добавлен');
      await get().fetchComments(houseId); // обновить комментарии
    } catch (err) {
      toast.error('Ошибка при добавлении комментария');
    }
  },

  deleteComment: async ({ commentId, houseId }) => {
    try {
      await axiosInstance.delete(`/comments/${commentId}/delete/`);
      toast.success('Комментарий удалён');
      await get().fetchComments(houseId);
    } catch (err) {
      toast.error('Ошибка при удалении комментария');
    }
  },

  toggleLike: async (houseId) => {
    try {
      const res = await axiosInstance.post(`/houses/${houseId}/like/`);
      set({
        likeStatus: {
          liked: res.data.liked,
          likeCount: res.data.like_count,
        },
      });
    } catch (err) {
      toast.error('Ошибка при лайке');
    }
  },
}));
