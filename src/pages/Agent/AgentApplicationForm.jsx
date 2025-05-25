import { useState } from "react";
import { axiosInstance } from "../../lib/axios";
const AgentApplicationForm = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    passport_number: "",
    passport_issued_by: "",
    passport_issue_date: "",
    address: "",
    additional_info: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(null);
    setSubmitError(null);

    try {
      const response = await axiosInstance.post(
        "http://localhost:8000/apply/",
        formData,
      );

      setSubmitSuccess("Заявка успешно отправлена!");
      setFormData({
        full_name: "",
        phone: "",
        passport_number: "",
        passport_issued_by: "",
        passport_issue_date: "",
        address: "",
        additional_info: "",
      });
    } catch (error) {
      if (error.response) {
        // Сервер ответил с ошибкой
        setSubmitError(error.response.data.message || "Ошибка отправки заявки");
      } else if (error.request) {
        // Запрос был отправлен, но ответа не получили
        setSubmitError("Нет ответа от сервера");
      } else {
        // Другая ошибка
        setSubmitError(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-[60px]">
      <h2 className="text-2xl font-bold mb-6">Заявка на роль агента</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold" htmlFor="full_name">
            ФИО
          </label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold" htmlFor="phone">
            Телефон
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold" htmlFor="passport_number">
            Номер паспорта
          </label>
          <input
            type="text"
            id="passport_number"
            name="passport_number"
            value={formData.passport_number}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold" htmlFor="passport_issued_by">
            Кем выдан паспорт
          </label>
          <input
            type="text"
            id="passport_issued_by"
            name="passport_issued_by"
            value={formData.passport_issued_by}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold" htmlFor="passport_issue_date">
            Дата выдачи паспорта
          </label>
          <input
            type="date"
            id="passport_issue_date"
            name="passport_issue_date"
            value={formData.passport_issue_date}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold" htmlFor="address">
            Адрес проживания
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold" htmlFor="additional_info">
            Дополнительная информация
          </label>
          <textarea
            id="additional_info"
            name="additional_info"
            value={formData.additional_info}
            onChange={handleChange}
            rows="3"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          {isSubmitting ? "Отправка..." : "Отправить заявку"}
        </button>

        {submitSuccess && <p className="text-green-600 mt-2">{submitSuccess}</p>}
        {submitError && <p className="text-red-600 mt-2">{submitError}</p>}
      </form>
    </div>
  );
};

export default AgentApplicationForm;
