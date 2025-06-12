import React from 'react';
import { useConsultStore } from '../store/useConsultStore';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import {
  Briefcase,
  ShieldCheck,
  Bolt,
  MessageSquareText,
} from 'lucide-react';

export default function ConsultationForm() {
  const { formData, setFormData, resetForm } = useConsultStore();

  const handleChange = (e) => {
    setFormData(e.target.name, e.target.value);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      return false;
    }
    if (!formData.city.trim()) {
      toast.error('Please enter your city');
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error('Please enter your phone number');
      return false;
    }
    if (!formData.message.trim()) {
      toast.error('Please enter a message');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const loadingToastId = toast.loading('Sending...');

    try {
      const response = await axiosInstance.post('http://localhost:8000/consultation/', formData);
      toast.dismiss(loadingToastId);
      toast.success(response.data.success || 'Request sent successfully!');
      resetForm();
    } catch (error) {
      toast.dismiss(loadingToastId);
      toast.error(error.response?.data?.error || 'Submission error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8"
      >
        {/* Header Section */}
        <section className="mb-10">
          <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-4">
            Get a Free Consultation
          </h1>
          <p className="text-center text-gray-600">
            Our experts will help you find the best solution based on your needs. Fill out the form
            and we’ll get back to you shortly.
          </p>
        </section>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <motion.textarea
            whileFocus={{ scale: 1.02 }}
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            rows="5"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-all"
          >
            Submit
          </motion.button>
        </form>

        {/* Why Us Section */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Why Choose Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-4 bg-blue-50 rounded-xl shadow-sm"
            >
              <Briefcase className="mx-auto text-blue-600" size={40} />
              <h3 className="font-bold mt-2">Professionalism</h3>
              <p className="text-sm text-gray-600">Experienced consultants with years of expertise.</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-4 bg-blue-50 rounded-xl shadow-sm"
            >
              <Bolt className="mx-auto text-blue-600" size={40} />
              <h3 className="font-bold mt-2">Fast Response</h3>
              <p className="text-sm text-gray-600">We'll get back to you within 24 hours.</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-4 bg-blue-50 rounded-xl shadow-sm"
            >
              <ShieldCheck className="mx-auto text-blue-600" size={40} />
              <h3 className="font-bold mt-2">Privacy First</h3>
              <p className="text-sm text-gray-600">Your data is safe and confidential with us.</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-4 bg-blue-50 rounded-xl shadow-sm"
            >
              <MessageSquareText className="mx-auto text-blue-600" size={40} />
              <h3 className="font-bold mt-2">Full Support</h3>
              <p className="text-sm text-gray-600">We assist you through every step of the way.</p>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
