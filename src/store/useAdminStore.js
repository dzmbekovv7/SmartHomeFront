import { create } from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance} from '../lib/axios.js'

export const useAdminStore = create((set, get) => ({
  unverifiedHouses: [],
  loading: false,
  error: null,

  fetchUnverified: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get('http://127.0.0.1:8000/houses/unverified/');
      const data = Array.isArray(res.data) ? res.data : res.data.houses || [];
      set({ unverifiedHouses: data, loading: false });
    } catch (error) {
      toast.error('Не удалось загрузить дома');
      set({ error: error.message, loading: false });
    }
  },

  verifyHouse: async (id) => {
    try {
      await axiosInstance.post(`http://127.0.0.1:8000/houses/verify/${id}/`);
      toast.success('Дом подтверждён ✅');
      get().fetchUnverified();
    } catch (error) {
      toast.error('Ошибка при подтверждении дома ❌');
    }
  },

  rejectHouse: async (id) => {
    try {
      await axiosInstance.delete(`http://127.0.0.1:8000/houses/reject/${id}/`);
      toast.success('Дом отклонён ❌');
      get().fetchUnverified();
    } catch (error) {
      toast.error('Ошибка при отклонении дома');
    }
  },
}));
