import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
export const useRentStore = create((set, get) => ({
  form: {
    bedrooms: "",
    bathrooms: "",
    floors: "",
    has_pool: false,
    sqft: "",
    property_type: "Apartment",
    region: "Bishkek",
  },
  rent: null,
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

    const formattedData = {
      bedrooms: parseInt(form.bedrooms, 10),
      bathrooms: parseInt(form.bathrooms, 10),
      floors: parseInt(form.floors, 10),
      sqft: parseInt(form.sqft, 10),
      property_type: form.property_type,
      region: form.region,
      has_pool: form.has_pool,
    };

    if (
      isNaN(formattedData.bedrooms) ||
      isNaN(formattedData.bathrooms) ||
      isNaN(formattedData.floors) ||
      isNaN(formattedData.sqft)
    ) {
      toast.error("Введите корректные числовые значения");
      return;
    }

    set({ isPredicting: true, rent: null });

    try {
      const res = await axiosInstance.post("/predict/rent/", formattedData);
      set({ rent: res.data.rent });
      toast.success("Аренда успешно предсказана");
    } catch (error) {
      toast.error(error.response?.data?.message || "Ошибка при предсказании аренды");
    } finally {
      set({ isPredicting: false });
    }
  },

  resetRent: () => set({ rent: null }),
}));
