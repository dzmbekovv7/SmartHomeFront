import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';
export const useHomeStore = create((set, get) => ({
  
  form: {
    bedrooms: "",
    bathrooms: "",
    floors: "",
    has_pool: false,
    sqft: "",
    property_type: "Квартира",
    region: "Бишкек",
  },
  price: null,
  isPredicting: false,

  setFormField: (name, value) => {
    set((state) => ({
      form: {
        ...state.form,
        [name]: value,
      },
    }));
  },

  submitPrediction: async () => {
    const form = get().form;

    // Format data
    const formattedData = {
      bedrooms: parseInt(form.bedrooms, 10),
      bathrooms: parseInt(form.bathrooms, 10),
      floors: parseInt(form.floors, 10),
      sqft: parseInt(form.sqft, 10),
      property_type: form.property_type,
      region: form.region,
      has_pool: form.has_pool,
    };

    // Validate numbers
    if (
      isNaN(formattedData.bedrooms) ||
      isNaN(formattedData.bathrooms) ||
      isNaN(formattedData.floors) ||
      isNaN(formattedData.sqft)
    ) {
      toast.error("Пожалуйста, введите корректные числовые значения");
      return;
    }

    set({ isPredicting: true, price: null });

    try {
      const res = await axiosInstance.post("/predict/price/", formattedData  );      
      set({ price: res.data.price });
      toast.success("Цена успешно предсказана");
    } catch (error) {
      toast.error(error.response?.data?.message || "Ошибка при предсказании цены");
    } finally {
      set({ isPredicting: false });
    }
  },

  resetPrice: () => set({ price: null }),
}));
