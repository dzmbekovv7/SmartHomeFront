import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Users, Building2, Home, TrendingUp, TrendingDown } from "lucide-react";
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
    axios.get("/admin-stats/")
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (!startDate || !endDate) return;
    axios.get("/graphs/all/", {
      params: { start_date: startDate, end_date: endDate }
    })
      .then(res => setCharts(res.data.charts))
      .catch(err => console.error(err));
  }, [startDate, endDate]);

   return (
    <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen px-6 py-10 max-w-7xl mx-auto font-sans">
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Admin Panel</h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          Track key platform metrics: users, agents, and properties, and visualize market trends.
        </p>
      </motion.header>

      {/* Date Filter */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
        <label className="text-gray-700 font-medium">
          Start Date:
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} max={endDate} className="ml-2 border rounded px-2 py-1" />
        </label>
        <label className="text-gray-700 font-medium">
          End Date:
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} min={startDate} max={new Date().toISOString().slice(0, 10)} className="ml-2 border rounded px-2 py-1" />
        </label>
      </div>

      {/* Stats */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-14"
      >
        <StatCard title="Users" value={stats.total_users} trend="up" icon={<Users className="w-8 h-8" />} description="Total number of registered users." />
        <StatCard title="Agents" value={stats.total_agents} trend="down" icon={<Building2 className="w-8 h-8" />} description="Number of registered real estate agents." />
        <StatCard title="Properties" value={stats.total_houses} trend="up" icon={<Home className="w-8 h-8" />} description="Current properties in the database." />
      </motion.section>

      <section className="space-y-12">
        {charts.length > 0 ? (
          charts.map((chart, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-white rounded-3xl shadow-xl p-6 md:p-10"
            >
              {chart.image ? (
                <>
                  <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
                    {chart.title}
                  </h2>
                  <img
                    src={`data:image/png;base64,${chart.image}`}
                    alt={chart.title}
                    className="w-full max-h-[400px] object-contain rounded-lg border mx-auto"
                  />
                </>
              ) : chart.data ? (
                <Graph
                  title={chart.title}
                  description={chart.description}
                  data={chart.data}
                  layout={{
                    ...chart.layout,
                    autosize: true,
                    dragmode: 'zoom',
                    margin: { t: 30, b: 50 },
                    font: { family: "Inter, sans-serif" }
                  }}
                />
              ) : (
                <p className="text-center text-gray-500">No data available to display.</p>
              )}
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-400 text-lg">Charts are loading or unavailable.</p>
        )}
      </section>

      {/* Analytics Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-20 bg-gray-100 p-6 md:p-10 rounded-xl shadow-sm text-gray-700"
      >
        <h3 className="text-xl font-bold mb-4">Analytics and Recommendations</h3>
        <p className="mb-2">
          Current data indicates a steady increase in interest in the platform from both users and agents.
          The number of properties is growing, suggesting an expanding inventory.
        </p>
        <p>
          Use the interactive charts above to track market trends, analyze agent network performance,
          and identify active regions. This will help in making informed decisions.
        </p>
      </motion.section>

      <footer className="text-center text-sm text-gray-400 mt-16">
        © 2025 RealEstate Admin Panel
      </footer>
    </div>
  );
}

function StatCard({ title, value, trend, icon, description }) {
  const isUp = trend === "up";
  const TrendIcon = isUp ? TrendingUp : TrendingDown;
  const trendColor = isUp ? "text-green-500" : "text-red-500";

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-6 rounded-3xl shadow-md"
    >
      <div className="flex items-center gap-4 mb-3 text-gray-700">
        <div className="text-blue-500">{icon}</div>
        <div>
          <h4 className="text-xl font-semibold">{title}</h4>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-900 mt-4 text-center">{value}</div>
      <div className={`flex justify-center items-center mt-3 ${trendColor}`}>
        <TrendIcon className="mr-2 w-4 h-4" />
        <span className="text-sm">{isUp ? "Increase" : "Decrease"} compared to last month</span>
      </div>
    </motion.div>
  );
}

function Graph({ title, description, data, layout }) {
  return (
    <div style={{ marginBottom: 50 }}>
      <h2 style={{ fontSize: 26, fontWeight: '600', marginBottom: 10 }}>{title}</h2>
      <div style={{
        maxWidth: 700,
        marginBottom: 20,
        color: '#555',
        fontSize: 16,
        lineHeight: 1.6
      }}>
        {description}
      </div>
      <Plot
        data={data}
        layout={{ ...layout, autosize: true, dragmode: 'zoom' }}
        useResizeHandler
        style={{ width: '100%', height: 400 }}
        config={{ responsive: true }}
      />
    </div>
  );
}