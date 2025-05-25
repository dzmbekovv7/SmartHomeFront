import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";

const api = axiosInstance.create({
  baseURL: "http://localhost:8000/", // базовый URL API
});

const RealEstatePage = () => {
  const [agencies, setAgencies] = useState([]);
  const [advantages, setAdvantages] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [agenciesRes, advantagesRes, reviewsRes] = await Promise.all([
          api.get("/agencies/"),
          api.get("/advantages/"),
          api.get("/reviews/"),
        ]);
        setAgencies(agenciesRes.data);
        setAdvantages(advantagesRes.data);
        setReviews(reviewsRes.data);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section
        className="relative h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/4/42/Bishkek_City%27s_business_center.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 max-w-4xl text-center px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6 animate-fadeInDown">
            Мечтаете о доме в Кыргызстане?
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 animate-fadeInUp">
            Мы поможем найти идеальное жилье для вас и вашей семьи — быстро и надежно.
          </p>
          <a
            href="#agencies"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Посмотреть агентства
          </a>
        </div>
      </section>

      {/* Why Buy Section */}
      <section className="bg-white py-16 px-6 md:px-16 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10">Почему купить дом — это важно?</h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed mb-12 text-center">
          Владение собственным домом — это не только про стабильность и комфорт, но и про инвестиции в ваше будущее.
          В Кыргызстане недвижимость — надежный актив, который растет в цене, и место, где можно создавать уют и безопасность для семьи.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <div className="bg-indigo-50 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-3 text-indigo-700">Стабильность и уют</h3>
            <p>Дом — это место, куда хочется возвращаться, где создается семейное тепло и покой.</p>
          </div>
          <div className="bg-indigo-50 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-3 text-indigo-700">Инвестиции</h3>
            <p>Недвижимость в Кыргызстане стабильно растет в цене — это выгодно и надежно для вашего капитала.</p>
          </div>
          <div className="bg-indigo-50 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-3 text-indigo-700">Юридическая безопасность</h3>
            <p>Мы обеспечиваем полное сопровождение и защиту ваших прав при покупке и продаже.</p>
          </div>
        </div>
      </section>

      {/* Agencies Section */}
      <section
        id="agencies"
        className="bg-gray-50 py-16 px-6 md:px-16 max-w-7xl mx-auto"
      >
        <h2 className="text-4xl font-bold text-center mb-14">
          Топ агентств недвижимости Кыргызстана
        </h2>
        <div className="flex flex-col md:flex-row gap-10 justify-center flex-wrap">
          {agencies.length === 0 ? (
            <p className="text-center text-gray-500 w-full">Загрузка агентств...</p>
          ) : (
            agencies.map(({ id, name, logo, description, website }) => (
              <div
                key={id}
                className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center max-w-sm mx-auto hover:shadow-xl transition"
              >
                <img
                  src={logo}
                  alt={`${name} logo`}
                  className="w-32 h-32 object-contain mb-5"
                  loading="lazy"
                />
                <h3 className="text-xl font-semibold mb-3">{name}</h3>
                <p className="text-gray-700 text-center mb-5">{description}</p>
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline font-semibold"
                >
                  Перейти на сайт
                </a>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Advantages Section */}
      <section className="bg-white py-16 px-6 md:px-16 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10">
          Почему выбирают нас
        </h2>
        {advantages.length === 0 ? (
          <p className="text-center text-gray-500">Загрузка преимуществ...</p>
        ) : (
          <ul className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 list-disc pl-6 text-gray-700 text-lg">
            {advantages.map(({ id, text }) => (
              <li
                key={id}
                className="hover:text-indigo-600 transition cursor-default"
              >
                {text}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Reviews Section */}
      <section className="bg-gray-50 py-16 px-6 md:px-16 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-14">
          Отзывы наших клиентов
        </h2>
        {reviews.length === 0 ? (
          <p className="text-center text-gray-500">Загрузка отзывов...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {reviews.map(({ id, name, text }) => (
              <div
                key={id}
                className="bg-white rounded-lg shadow p-6 flex flex-col justify-between hover:shadow-xl transition"
              >
                <p className="text-gray-800 italic mb-5">"{text}"</p>
                <p className="font-semibold text-indigo-700 text-right">— {name}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Contact Section */}
      <section className="bg-indigo-700 text-white py-16 px-6 md:px-16 text-center">
        <h2 className="text-4xl font-bold mb-6">Свяжитесь с нами</h2>
        <p className="max-w-3xl mx-auto mb-8 text-lg">
          Готовы найти свой дом мечты? Напишите нам или позвоните, и мы поможем с выбором!
        </p>
        <a
          href="mailto:info@realestate.kg"
          className="inline-block bg-white text-indigo-700 font-semibold rounded px-8 py-3 hover:bg-gray-100 transition"
        >
          Написать нам
        </a>
      </section>
    </div>
  );
};

export default RealEstatePage;
