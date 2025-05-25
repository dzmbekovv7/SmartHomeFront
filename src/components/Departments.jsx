// src/components/Departments.jsx
import React from "react";

const departments = [
  "Умные дома", "Безопасность", "Энергосбережение", "Климат-контроль",
  "Камеры", "Освещение", "Интеркомы", "Автоматизация", "Нейросети", "Контакты"
];

export default function Departments({ onSelect }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {departments.map((dep, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(dep)}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl shadow-lg transition-all duration-200"
        >
          {dep}
        </button>
      ))}
    </div>
  );
}
