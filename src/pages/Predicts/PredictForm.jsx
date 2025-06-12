import { motion } from "framer-motion";
import { usePredictStore } from "../../store/usePredictStore";
import { Bed, Droplet, Layers, Home, Ruler, MapPin } from "lucide-react";

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
    "w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400";

  const iconWrapper = "absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600";

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="w-full max-w-xl rounded-3xl border border-gray-200 bg-white shadow-2xl p-8 sm:p-10">
        <h2 className="text-3xl font-bold text-center tracking-wide mb-8 text-gray-900 uppercase">
          Home Price Estimation
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 relative">
          {/* Bedrooms */}
          <div className="relative">
            <Bed size={20} className={iconWrapper} />
            <input
              name="bedrooms"
              type="number"
              placeholder="Number of Bedrooms"
              value={form.bedrooms}
              onChange={handleChange}
              required
              min={0}
              className={inputClass}
            />
          </div>

          {/* Bathrooms */}
          <div className="relative">
            <Droplet size={20} className={iconWrapper} />
            <input
              name="bathrooms"
              type="number"
              placeholder="Number of Bathrooms"
              value={form.bathrooms}
              onChange={handleChange}
              required
              min={0}
              className={inputClass}
            />
          </div>

          {/* Floors */}
          <div className="relative">
            <Layers size={20} className={iconWrapper} />
            <input
              name="floors"
              type="number"
              placeholder="Number of Floors"
              value={form.floors}
              onChange={handleChange}
              required
              min={0}
              className={inputClass}
            />
          </div>

          {/* Square footage */}
          <div className="relative">
            <Ruler size={20} className={iconWrapper} />
            <input
              name="sqft"
              type="number"
              placeholder="Area (sq.m)"
              value={form.sqft}
              onChange={handleChange}
              required
              min={0}
              className={inputClass}
            />
          </div>

          {/* Pool checkbox */}
          <label className="flex items-center space-x-3 text-gray-700 relative pl-10 cursor-pointer select-none">
            <Droplet size={20} className="absolute left-3 text-blue-600" />
            <input
              type="checkbox"
              name="has_pool"
              checked={form.has_pool}
              onChange={handleChange}
              className="accent-blue-500 scale-110"
            />
            <span>Has Swimming Pool</span>
          </label>

          {/* Property Type */}
          <div className="relative">
            <Home size={20} className={iconWrapper} />
            <select
              name="property_type"
              value={form.property_type}
              onChange={handleChange}
              required
              className={inputClass}
            >
              <option value="">Select Property Type</option>
              <option value="Apartment">Apartment</option>
<option value="House">House</option>
<option value="Cottage">Cottage</option>
<option value="Villa">Villa</option>

            </select>
          </div>

          {/* Region */}
          <div className="relative">
            <MapPin size={20} className={iconWrapper} />
            <select
              name="region"
              value={form.region}
              onChange={handleChange}
              required
              className={inputClass}
            >
              <option value="">Select Region</option>
           <option value="Bishkek">Bishkek</option>
<option value="Osh">Osh</option>
<option value="Chuy Region">Chuy Region</option>
<option value="Issyk-Kul Region">Issyk-Kul Region</option>
<option value="Batken Region">Batken Region</option>
<option value="Talas Region">Talas Region</option>
<option value="Jalal-Abad Region">Jalal-Abad Region</option>

            </select>
          </div>

          <motion.button
            type="submit"
            disabled={isPredicting}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 transition-colors text-white font-semibold py-3 px-4 rounded-xl uppercase tracking-wide shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {isPredicting ? "Predicting..." : "Predict"}
          </motion.button>
        </form>

        {price !== null && (
          <motion.p
            className="text-center mt-8 text-green-600 text-lg font-semibold select-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            💰 Predicted Price: ${price.toLocaleString()}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
