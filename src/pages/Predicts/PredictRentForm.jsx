import { motion } from "framer-motion";
import { useRentStore } from "../../store/useRentStore";

export default function PredictRentForm() {
  const { form, rent, isPredicting, setFormField, submitPrediction } = useRentStore();

  // Handles input changes (including checkboxes)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormField(name, type === "checkbox" ? checked : value);
  };

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    submitPrediction();
  };

  // Common styles for inputs
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
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center tracking-wide mb-6 uppercase">
          Rent Prediction
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="bedrooms"
            type="number"
            placeholder="Number of bedrooms"
            value={form.bedrooms}
            onChange={handleChange}
            required
            className={inputClass}
          />
          <input
            name="bathrooms"
            type="number"
            placeholder="Number of bathrooms"
            value={form.bathrooms}
            onChange={handleChange}
            required
            className={inputClass}
          />
          <input
            name="floors"
            type="number"
            placeholder="Number of floors"
            value={form.floors}
            onChange={handleChange}
            required
            className={inputClass}
          />
          <input
            name="sqft"
            type="number"
            placeholder="Area (sq.m)"
            value={form.sqft}
            onChange={handleChange}
            required
            className={inputClass}
          />

          {/* Checkbox for pool */}
          <label className="flex items-center space-x-2 text-sm text-zinc-300">
            <input
              type="checkbox"
              name="has_pool"
              checked={form.has_pool}
              onChange={handleChange}
              className="accent-blue-500 scale-110"
            />
            <span>Has a pool</span>
          </label>

          {/* Property type select */}
          <select
            name="property_type"
            value={form.property_type}
            onChange={handleChange}
            required
            className={inputClass}
          >
            <option value="">Property type</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Cottage">Cottage</option>
            <option value="Villa">Villa</option>
          </select>

          {/* Region select */}
          <select
            name="region"
            value={form.region}
            onChange={handleChange}
            required
            className={inputClass}
          >
            <option value="">Region</option>
            <option value="Bishkek">Bishkek</option>
            <option value="Osh">Osh</option>
            <option value="Chuy Region">Chuy Region</option>
            <option value="Issyk-Kul Region">Issyk-Kul Region</option>
            <option value="Batken Region">Batken Region</option>
            <option value="Talas Region">Talas Region</option>
            <option value="Jalal-Abad Region">Jalal-Abad Region</option>
          </select>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isPredicting}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-3 px-4 rounded-lg uppercase tracking-wider"
          >
            {isPredicting ? "Predicting..." : "Predict Rent"}
          </button>
        </form>

        {/* Display predicted rent */}
        {rent !== null && (
          <motion.p
            className="text-center mt-6 text-green-400 text-lg font-semibold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            🏠 Expected rent: ${rent.toLocaleString()}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
