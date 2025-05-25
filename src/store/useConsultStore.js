import {create} from 'zustand';

export const useConsultStore = create((set) => ({
  formData: {
    name: '',
    city: '',
    phone: '',
    message: '',
  },
  setFormData: (field, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    })),
  resetForm: () =>
    set({
      formData: { name: '', city: '', phone: '', message: '' },
    }),
}));
