import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowUp, FaArrowDown, FaUserFriends, FaHome, FaUserTie } from "react-icons/fa";
import Plot from "react-plotly.js";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total_users: 0, total_agents: 0, total_houses: 0 });
  const [charts, setCharts] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const priorDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    setStartDate(priorDate);
    setEndDate(today);
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8000/admin-stats/")
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (!startDate || !endDate) return;
    axios.get("http://localhost:8000/graphs/all/", {
      params: { start_date: startDate, end_date: endDate }
    })
      .then(res => setCharts(res.data.charts))
      .catch(err => console.error(err));
  }, [startDate, endDate]);

  return (
    <div className="bg-gray-50 min-h-screen px-6 py-10 max-w-7xl mx-auto font-sans">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Админ-панель</h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          Отслеживайте ключевые показатели платформы: пользователи, агенты и объекты недвижимости, а также визуализируйте рыночные тренды.
        </p>
      </header>

      {/* Фильтрация по дате */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
        <label className="text-gray-700 font-medium">
          Начальная дата:
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} max={endDate} className="ml-2 border rounded px-2 py-1" />
        </label>
        <label className="text-gray-700 font-medium">
          Конечная дата:
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} min={startDate} max={new Date().toISOString().slice(0, 10)} className="ml-2 border rounded px-2 py-1" />
        </label>
      </div>

      {/* Блоки статистики */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-14">
        <StatCard title="Пользователи" value={stats.total_users} trend="up" icon={<FaUserFriends />} description="Общее количество зарегистрированных пользователей." />
        <StatCard title="Агенты" value={stats.total_agents} trend="down" icon={<FaUserTie />} description="Количество зарегистрированных агентов недвижимости." />
        <StatCard title="Объекты" value={stats.total_houses} trend="up" icon={<FaHome />} description="Текущие объекты недвижимости в базе." />
      </section>

      {/* Графики */}
      <section className="space-y-12">
        {charts.length > 0 ? (
          charts.map(({ title, image, data, layout }, idx) => (
            <div key={idx} className="bg-white rounded-3xl shadow-xl p-6 md:p-10">
              <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
                {title}
              </h2>
              {image ? (
                <img
                  src={`data:image/png;base64,${image}`}
                  alt={title}
                  className="w-full max-h-[400px] object-contain rounded-lg border mx-auto"
                />
              ) : data ? (
                <Plot
                data={chart.data}
                layout={{
                  ...chart.layout,
                  autosize: true,
                  dragmode: 'zoom',
                }}
                useResizeHandler
                style={{ width: '100%', height: 400 }}
                config={{ responsive: true }}
              />
              
              ) : (
                <p className="text-center text-gray-500">Нет данных для отображения.</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 text-lg">Графики загружаются или отсутствуют.</p>
        )}
      </section>

      {/* Аналитика */}
      <section className="mt-20 bg-gray-100 p-6 md:p-10 rounded-xl shadow-sm text-gray-700">
        <h3 className="text-xl font-bold mb-4">Аналитика и рекомендации</h3>
        <p className="mb-2">
          По текущим данным наблюдается стабильный рост интереса к платформе со стороны как пользователей, так и агентов.
          Количество объектов увеличивается, что говорит о расширении базы предложений.
        </p>
        <p>
          Используйте интерактивные графики выше, чтобы отслеживать рыночные тренды, анализировать эффективность агентской сети
          и определять активные регионы. Это поможет принимать обоснованные решения.
        </p>
      </section>

      <footer className="text-center text-sm text-gray-400 mt-16">
        © 2025 RealEstate Admin Panel
      </footer>
    </div>
  );
}

function StatCard({ title, value, trend, icon, description }) {
  const isUp = trend === "up";
  const TrendIcon = isUp ? FaArrowUp : FaArrowDown;
  const trendColor = isUp ? "text-green-500" : "text-red-500";
  const trendText = isUp ? "Рост по сравнению с прошлым месяцем" : "Падение по сравнению с прошлым месяцем";

  return (
    <div className="bg-white p-6 rounded-3xl shadow-md hover:shadow-lg transition duration-300">
      <div className="flex items-center gap-4 mb-2 text-gray-700">
        <div className="text-4xl text-blue-500">{icon}</div>
        <div>
          <h4 className="text-xl font-semibold">{title}</h4>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-900 mt-4 text-center">{value}</div>
      <div className={`flex justify-center items-center mt-3 ${trendColor}`}>
        <TrendIcon className="mr-2" />
        <span className="text-sm">{trendText}</span>
      </div>
    </div>
  );
}
