import React from 'react';
import { useConsultStore } from '../store/useConsultStore';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export default function ConsultationForm() {
  const { formData, setFormData, resetForm } = useConsultStore();

  const handleChange = (e) => {
    setFormData(e.target.name, e.target.value);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Пожалуйста, укажите ваше имя');
      return false;
    }
    if (!formData.city.trim()) {
      toast.error('Пожалуйста, укажите город');
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error('Пожалуйста, укажите номер телефона');
      return false;
    }
    if (!formData.message.trim()) {
      toast.error('Пожалуйста, введите сообщение');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const loadingToastId = toast.loading('Отправка...');

    try {
      const response = await axiosInstance.post('http://localhost:8000/consultation/', formData);
      toast.dismiss(loadingToastId);
      toast.success(response.data.success || 'Заявка успешно отправлена');
      resetForm();
    } catch (error) {
      toast.dismiss(loadingToastId);
      toast.error(error.response?.data?.error || 'Ошибка при отправке');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow-md">
      {/* Вводный текст с рекомендациями */}
      <section className="mb-8 px-4 md:px-0">
        <h1 className="text-3xl font-bold mb-4 text-center md:text-left">Получите профессиональную консультацию</h1>
        <p className="text-gray-700 mb-2">
          Наши эксперты помогут вам выбрать оптимальное решение, учитывая все особенности вашего запроса. 
          Пожалуйста, заполните форму ниже — и мы свяжемся с вами в ближайшее время.
        </p>
        <p className="text-gray-700">
          Рекомендуем подробно описывать ваш вопрос или проблему, чтобы мы могли предоставить максимально точные рекомендации.
        </p>
      </section>

      {/* Форма */}
      <form onSubmit={handleSubmit} className="space-y-6 px-4 md:px-0">
        <input
          type="text"
          name="name"
          placeholder="Ваше имя"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="city"
          placeholder="Город"
          value={formData.city}
          onChange={handleChange}
          className="w-full px-3 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Номер телефона"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-3 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="message"
          placeholder="Ваше сообщение"
          value={formData.message}
          onChange={handleChange}
          className="w-full px-3 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows="5"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
        >
          Отправить
        </button>
      </form>

      {/* Почему выбирают нас */}
      <section className="mt-12 px-4 md:px-0">
        <h2 className="text-2xl font-semibold mb-6 text-center md:text-left">Почему выбирают нас</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div>
            <div className="text-blue-600 mb-2 text-4xl">💼</div>
            <h3 className="font-bold mb-1">Профессионализм</h3>
            <p className="text-gray-600 text-sm">Опытные консультанты с многолетней практикой.</p>
          </div>
          <div>
            <div className="text-blue-600 mb-2 text-4xl">⚡</div>
            <h3 className="font-bold mb-1">Быстрая связь</h3>
            <p className="text-gray-600 text-sm">Ответим в течение 24 часов после получения заявки.</p>
          </div>
          <div>
            <div className="text-blue-600 mb-2 text-4xl">🔒</div>
            <h3 className="font-bold mb-1">Конфиденциальность</h3>
            <p className="text-gray-600 text-sm">Ваши данные под надежной защитой.</p>
          </div>
          <div>
            <div className="text-blue-600 mb-2 text-4xl">💬</div>
            <h3 className="font-bold mb-1">Поддержка</h3>
            <p className="text-gray-600 text-sm">Помогаем на всех этапах — до полного решения.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
