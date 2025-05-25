import { motion } from "framer-motion";
import { useRentStore } from "../../store/useRentStore";
export default function PredictRentForm() {
  const { form, rent, isPredicting, setFormField, submitPrediction } = useRentStore();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormField(name, type === "checkbox" ? checked : value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitPrediction();  };

  const inputClass =
    "w-full px-4 py-2 rounded-lg bg-neutral-800 text-white placeholder-zinc-400 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <motion.div
      className="flex justify-center rounded-3xl bg-gradient-to-br from-black via-zinc-900 to-neutral-950 text-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="w-full max-w-xl rounded-2xl border border-neutral-700 bg-neutral-900/60 backdrop-blur-md shadow-2xl p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center tracking-wide mb-6 uppercase">
          Прогноз аренды
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <label className="flex items-center space-x-2 text-sm text-zinc-300">
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
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-3 px-4 rounded-lg uppercase tracking-wider"
          >
            {isPredicting ? "Предсказание..." : "Предсказать аренду"}
          </button>
        </form>

        {rent !== null && (
          <motion.p
            className="text-center mt-6 text-green-400 text-lg font-semibold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            🏠 Ожидаемая аренда: ${rent.toLocaleString()}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
