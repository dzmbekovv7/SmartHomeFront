import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

export const useHouseStore = create((set) => ({
  houses: [],
  loading: false,
  error: null,

  fetchHouses: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get('http://localhost:8000/houses/');
      set({ houses: res.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error('Failed to load houses');
    }
  },
  
}));
