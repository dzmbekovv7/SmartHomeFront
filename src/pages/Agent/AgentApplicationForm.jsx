import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Phone,
  Home,
  FileText,
  Info,
  User
} from "lucide-react";
import { axiosInstance } from "../../lib/axios";
const icons = [ShieldCheck, Phone, Home, FileText, Info, User];

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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(null);
    setSubmitError(null);

    try {
      await axiosInstance.post("/apply/", formData);
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
        setSubmitError(error.response.data.message || "Ошибка отправки заявки");
      } else {
        setSubmitError("Ошибка подключения");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-sky-900 to-slate-800 flex items-center justify-center relative overflow-hidden">
      {/* Animated background icons */}
      {icons.map((Icon, i) => (
        <motion.div
          key={i}
          className="absolute text-white/10"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ delay: i * 0.4, duration: 1.2 }}
          style={{
            top: `${Math.random() * 90}%`,
            left: `${Math.random() * 90}%`,
            fontSize: "60px",
          }}
        >
          <Icon />
        </motion.div>
      ))}

      {/* Form Container */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-2xl w-full bg-white/10 backdrop-blur-md shadow-xl rounded-2xl p-8 mx-4"
      >
        <motion.h1
          className="text-white text-4xl font-extrabold text-center mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          🌟 Станьте частью нашей команды!
        </motion.h1>
        <motion.p
          className="text-white/70 text-center mb-6"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Заполните форму ниже, чтобы подать заявку на участие в агентской программе.
        </motion.p>

        <form onSubmit={handleSubmit} className="space-y-5  ">
          {[
            { label: "ФИО", name: "full_name", type: "text" },
            { label: "Телефон", name: "phone", type: "tel" },
            { label: "Номер паспорта", name: "passport_number", type: "text" },
            { label: "Кем выдан", name: "passport_issued_by", type: "text" },
            { label: "Дата выдачи", name: "passport_issue_date", type: "date" },
            { label: "Адрес", name: "address", type: "text" },
          ].map((field, i) => (
            <motion.div
              key={field.name}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <label className="block text-white mb-1">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-xl bg-white/30 border border-white/20 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-blue-400"
              />
            </motion.div>
          ))}

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <label className="block text-white mb-1">Дополнительная информация</label>
            <textarea
              name="additional_info"
              rows="4"
              value={formData.additional_info}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-white/30 border border-white/20 text-white placeholder-white/50 outline-none resize-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" />
                Отправка...
              </>
            ) : (
              <>
                <Send className="animate-bounce" />
                Отправить заявку
              </>
            )}
          </motion.button>

          {submitSuccess && (
            <motion.p
              className="text-green-400 flex items-center mt-3 gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <CheckCircle2 /> {submitSuccess}
            </motion.p>
          )}
          {submitError && (
            <motion.p
              className="text-red-400 flex items-center mt-3 gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <AlertCircle /> {submitError}
            </motion.p>
          )}
        </form>

        <motion.p
          className="text-center text-white/60 mt-6 text-sm"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          📞 Мы свяжемся с вами в течение <strong>1–3 рабочих дней</strong>. Спасибо за ваше доверие!
        </motion.p>
      </motion.div>
    </div>
  );
};

export default AgentApplicationForm;
