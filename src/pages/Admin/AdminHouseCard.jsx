// components/HouseCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useHouseStore } from '../../store/useHouseStore';
import { useAdminStore } from "../../store/useAdminStore";

const HouseCard = ({ house }) => {
  const navigate = useNavigate();
  const { unverifiedHouses, fetchUnverified, verifyHouse, rejectHouse, loading } = useAdminStore();
  console.log(house.image)
  return (
    <div
      onClick={() => navigate(`/houses/${house.id}`)}
      className="cursor-pointer bg-white rounded-3xl shadow-lg w-full sm:w-80 overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 ease-in-out"
    >
      <div className="relative h-52">
      <img
  src={`http://127.0.0.1:8000${house.image}`}
  alt={house.name}
  onError={(e) => (e.target.src = '/default-house.jpg')}
  className="w-full h-full object-cover rounded-t-3xl"
/>

        <div className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full px-3 py-1 text-sm shadow">
          ${house.price.toLocaleString()}
        </div>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="text-xl font-semibold truncate">{house.name}</h3>
        <p className="text-gray-500 text-sm line-clamp-2">{house.description}</p>
        <div className="flex justify-between text-xs text-gray-400">
          <span>📍 {house.location}</span>
          <span>🛏 {house.rooms} | 📐 {house.square} m²</span>
        </div>
        <div className="flex justify-between pt-2 text-sm text-gray-500 border-t mt-2">
          <span>👍 {house.likes?.length || 0}</span>
          <span>👁️ {house.views?.length || 0}</span>
          <span>💬 {house.comments?.length || 0}</span>
        </div>
        <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => verifyHouse(house.id)}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    ✅ Подтвердить
                  </button>
                  <button
                    onClick={() => rejectHouse(house.id)}
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    ❌ Отклонить
                  </button>
                </div>
      </div>
    </div>
  );
};

export default HouseCard;
