import { useEffect, useState } from "react";
import { useAdminStore } from "../../store/useAdminStore";
import { useHouseStore } from '../../store/useHouseStore';
import HouseCard from "./AdminHouseCard";

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

  // Фильтрация домов по названию или адресу (если такие есть)
  const filteredHouses = unverifiedHouses.filter(house => {
    const query = searchQuery.toLowerCase();
    return (
      house.name?.toLowerCase().includes(query) || 
      house.address?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="p-6 max-w-6xl mx-auto h-[700px] bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">
        Панель проверки домов
      </h1>

      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Поиск домов по названию или адресу..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-8 overflow-y-auto h-[500px]">
        {loading ? (
          <p className="text-center text-gray-600 text-lg">Загрузка домов...</p>
        ) : filteredHouses.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            Нет домов, соответствующих запросу.
          </p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {filteredHouses.map(house => (
              <HouseCard key={house.id} house={house} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminHousePanel;
