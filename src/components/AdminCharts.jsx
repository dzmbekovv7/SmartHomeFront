import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminCharts() {
  const [charts, setCharts] = useState([]);

  useEffect(() => {
    const fetchCharts = async () => {
      try {
        const res = await axios.get("http://localhost:8000/graphs/all/");
        setCharts(res.data.charts);
      } catch (error) {
        console.error("Ошибка загрузки графиков", error);
      }
    };
    fetchCharts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6 flex flex-col items-center gap-10">
      <h1 className="text-3xl font-extrabold text-blue-900 mb-8">
        Админка: Статистика недвижимости
      </h1>

      {charts.map(({ title, image }, idx) => (
        <div
          key={idx}
          className={`bg-white shadow-xl rounded-3xl p-6 w-full max-w-[700px] transition hover:shadow-2xl duration-300
            ${title.toLowerCase().includes("бассейн") ? "border-4 border-blue-400" : ""}
            ${title.toLowerCase().includes("комнат") ? "border-4 border-green-400" : ""}
            ${title.toLowerCase().includes("локация") ? "border-4 border-purple-400" : ""}
            ${title.toLowerCase().includes("площадь") ? "border-4 border-orange-400" : ""}
          `}
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">{title}</h3>

          {/* Пояснительный текст под каждым графиком */}
          {title === "Площадь дома vs Цена" && (
            <p className="text-gray-600 mb-4 text-center">
              График показывает, как меняется цена дома в зависимости от его площади.
              Чем больше площадь — тем выше цена, но есть исключения.
            </p>
          )}
          {title === "Распределение количества комнат" && (
            <p className="text-gray-600 mb-4 text-center">
              Здесь вы видите, как часто встречается разное количество комнат в домах.
            </p>
          )}
          {title === "Дома с бассейном и без" && (
            <p className="text-gray-600 mb-4 text-center">
              Доля домов с бассейном и без. Это поможет понять популярность и доступность домов с бассейном.
            </p>
          )}
          {title === "Топ 10 локаций по количеству домов" && (
            <p className="text-gray-600 mb-4 text-center">
              Топ 10 локаций с наибольшим количеством домов в нашей базе данных.
            </p>
          )}

          <div className="flex justify-center">
            <img
              src={`data:image/png;base64,${image}`}
              alt={title}
              className="max-w-full max-h-[350px] rounded-xl object-contain border border-gray-200 shadow-md"
            />
          </div>
        </div>
      ))}

      <footer className="mt-12 text-gray-500 text-sm text-center">
        © 2025 RealEstate Admin Dashboard. Все права защищены.
      </footer>
    </div>
  );
}
