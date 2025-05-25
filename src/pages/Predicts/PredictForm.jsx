import { motion } from "framer-motion";
import { usePredictStore } from "../../store/usePredictStore";

export default function PredictForm() {
  const { form, price, isPredicting, setFormField, submitPricePrediction } = usePredictStore();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormField(name, type === "checkbox" ? checked : value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitPricePrediction();
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400";

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="w-full max-w-xl rounded-3xl border border-gray-200 bg-white shadow-2xl p-8 sm:p-10">
        <h2 className="text-3xl font-bold text-center tracking-wide mb-8 text-gray-900 uppercase">
          Оценка жилья
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="bedrooms"
            type="number"
            placeholder="Количество спален"
            value={form.bedrooms}
            onChange={handleChange}
            required
            className={inputClass}
          />
          <input
            name="bathrooms"
            type="number"
            placeholder="Количество ванных"
            value={form.bathrooms}
            onChange={handleChange}
            required
            className={inputClass}
          />
          <input
            name="floors"
            type="number"
            placeholder="Количество этажей"
            value={form.floors}
            onChange={handleChange}
            required
            className={inputClass}
          />
          <input
            name="sqft"
            type="number"
            placeholder="Площадь (кв.м)"
            value={form.sqft}
            onChange={handleChange}
            required
            className={inputClass}
          />

          <label className="flex items-center space-x-2 text-sm text-gray-700">
            <input
              type="checkbox"
              name="has_pool"
              checked={form.has_pool}
              onChange={handleChange}
              className="accent-blue-500 scale-110"
            />
            <span>Есть бассейн</span>
          </label>

          <select
            name="property_type"
            value={form.property_type}
            onChange={handleChange}
            required
            className={inputClass}
          >
            <option value="">Тип недвижимости</option>
            <option value="Квартира">Квартира</option>
            <option value="Дом">Дом</option>
            <option value="Вилла">Вилла</option>
            <option value="Коттедж">Коттедж</option>
            <option value="Участок">Участок</option>
          </select>

          <select
            name="region"
            value={form.region}
            onChange={handleChange}
            required
            className={inputClass}
          >
            <option value="">Регион</option>
            <option value="Бишкек">Бишкек</option>
            <option value="Иссык-Кульская область">Иссык-Кульская область</option>
            <option value="Чуйская область">Чуйская область</option>
            <option value="Ошская область">Ошская область</option>
            <option value="Джалал-Абадская область">Джалал-Абадская область</option>
          </select>

          <button
            type="submit"
            disabled={isPredicting}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-3 px-4 rounded-xl uppercase tracking-wide shadow-md"
          >
            {isPredicting ? "Предсказание..." : "Предсказать"}
          </button>
        </form>

        {price !== null && (
          <motion.p
            className="text-center mt-8 text-green-600 text-lg font-semibold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            💰 Предсказанная цена: ${price.toLocaleString()}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
