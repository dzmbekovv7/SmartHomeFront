import { useEffect, useState } from "react";
import { useAdminStore } from "../../store/useAdminStore";
import { useHouseStore } from "../../store/useHouseStore";
import HouseCard from "./AdminHouseCard";

import { Search, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const AdminHousePanel = () => {
  const { unverifiedHouses, fetchUnverified, loading } = useAdminStore();
  const { fetchHouses } = useHouseStore();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchHouses();
  }, [fetchHouses]);

  useEffect(() => {
    fetchUnverified();
  }, []);

  const filteredHouses = unverifiedHouses.filter((house) => {
    const query = searchQuery.toLowerCase();
    return (
      house.name?.toLowerCase().includes(query) ||
      house.address?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 flex flex-col items-center py-12 px-6">
      {/* Main Panel Container */}
      <div className="bg-white rounded-3xl shadow-2xl max-w-7xl w-full p-10 flex flex-col">
        {/* Title */}
        <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-4 drop-shadow-lg">
          House Verification Panel
        </h1>

        {/* Subtitle / Instructions */}
        <p className="text-center text-gray-700 text-lg max-w-3xl mx-auto mb-10">
          Review the unverified houses below. Use the search to filter by house name or address.
        </p>

        {/* Search Input */}
        <div className="relative max-w-md mx-auto mb-12">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="absolute top-3 left-4 -translate-y-1/2 text-indigo-500 opacity-80 pointer-events-none"
          >
            <Search size={28} />
          </motion.div>
          <input
            type="text"
            placeholder="Search houses by name or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-5 py-4 rounded-xl border border-indigo-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
          />
        </div>

        {/* Houses List Section */}
        <div className="flex-grow overflow-y-auto max-h-[600px] px-4 scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-indigo-100 rounded-lg">
          {loading ? (
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="flex justify-center my-32"
            >
              <Loader2 size={56} className="text-indigo-500" />
            </motion.div>
          ) : filteredHouses.length === 0 ? (
            <p className="text-center text-indigo-600 text-xl font-semibold mt-32">
              No houses match your search.
            </p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredHouses.map((house) => (
                <motion.li
                  key={house.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow:
                      "0 12px 25px rgba(131, 58, 180, 0.4), 0 10px 10px rgba(253, 29, 29, 0.3)",
                  }}
                  className="bg-gray-50 rounded-2xl p-6 shadow-lg cursor-pointer border border-gray-200 hover:border-indigo-400 transition"
                >
                  <HouseCard house={house} />
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHousePanel;
