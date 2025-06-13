import React, { useEffect, useState, useRef } from 'react';
import { axiosInstance } from '../lib/axios';
import { motion, useAnimation } from 'framer-motion';


const CurrencyCard = ({ currency }) => {
  const controls = useAnimation();
  const ref = React.useRef();

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Если карточка видна — плавно показываем и поднимаем
          controls.start({
            opacity: 1,
            y: 0,
            transition: { duration: 1.2, ease: 'easeOut' },
          });
        } else {
          // Если карточка вышла из видимости — плавно скрываем и опускаем вниз
          controls.start({
            opacity: 0,
            y: 40,
            transition: { duration: 1.2, ease: 'easeIn' },
          });
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={controls}
      className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-default"
    >
      <h2 className="text-2xl font-bold text-blue-800 mb-2">{currency.code}</h2>
      <p className="text-gray-900 text-lg font-semibold">Курс: {currency.rate}</p>
      <p className="text-gray-500 mt-3 text-sm leading-snug">{currency.description}</p>
    </motion.div>
  );
};




const Exchange = () => {
  const [currencies, setCurrencies] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get('/currencies/')
      .then((res) => {
        setCurrencies(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Ошибка при получении данных:', err);
        setLoading(false);
      });
  }, []);

  const filtered = currencies.filter(currency =>
    currency.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white px-4 py-12 ">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-blue-900 mb-6 tracking-wide drop-shadow-md">
          💱 Актуальный Курс Валют
        </h1>
        <p className="text-center text-gray-700 mb-10 max-w-3xl mx-auto text-lg leading-relaxed">
          Проверяйте актуальные курсы валют в реальном времени. Используйте поиск, чтобы быстро найти нужную валюту.
        </p>

        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="🔍 Найти валюту (например: USD)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-5 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-500 transition duration-300 text-gray-800 placeholder-gray-400"
          />
        </div>

        {loading ? (
          <p className="text-center text-blue-700 text-xl font-semibold animate-pulse">Загрузка курсов...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.length > 0 ? (
              filtered.map((currency) => (
                <CurrencyCard key={currency.code} currency={currency} />
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500 text-lg mt-8">Ничего не найдено.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Exchange;
