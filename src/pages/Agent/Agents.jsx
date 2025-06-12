import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { motion } from "framer-motion";
import { Building2, ThumbsUp, Home, Mail } from "lucide-react";
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
        <motion.div
          className="relative z-10 max-w-4xl text-center px-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Dreaming of a Home in Kyrgyzstan?
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8">
            We help you find the perfect home quickly and reliably.
          </p>
          <a
            href="#agencies"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            View Agencies
          </a>
        </motion.div>
      </section>

      {/* Why Buy Section */}
      <section className="bg-white py-16 px-6 md:px-16 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10">Why Owning a Home Matters</h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed mb-12 text-center">
          Owning a home brings stability, comfort, and is a smart investment. In Kyrgyzstan, real estate is a secure asset that appreciates in value and provides a cozy place for your family.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <motion.div whileHover={{ scale: 1.05 }} className="bg-indigo-50 p-6 rounded-2xl shadow-md">
            <Home className="text-indigo-700 mb-4 w-8 h-8" />
            <h3 className="text-2xl font-semibold mb-2">Stability & Comfort</h3>
            <p>Home is a peaceful place to create lasting memories.</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="bg-indigo-50 p-6 rounded-2xl shadow-md">
            <ThumbsUp className="text-indigo-700 mb-4 w-8 h-8" />
            <h3 className="text-2xl font-semibold mb-2">Investments</h3>
            <p>Property value in Kyrgyzstan steadily grows—an ideal capital investment.</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="bg-indigo-50 p-6 rounded-2xl shadow-md">
            <Building2 className="text-indigo-700 mb-4 w-8 h-8" />
            <h3 className="text-2xl font-semibold mb-2">Legal Security</h3>
            <p>We offer full legal support and protection throughout transactions.</p>
          </motion.div>
        </div>
      </section>

    {/* Agencies Section */}
<section id="agencies" className="bg-gradient-to-b from-gray-50 to-white py-20 px-6 md:px-16 max-w-7xl mx-auto">
  <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-16">
    Top Real Estate Agencies in Kyrgyzstan
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
    {agencies.length === 0 ? (
      <p className="text-center text-gray-500 col-span-full">Loading agencies...</p>
    ) : (
      agencies.map(({ id, name, logo, description, website }) => (
        <motion.div
          key={id}
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-200 hover:shadow-2xl duration-300 flex flex-col items-center text-center p-8"
        >
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <img
              src={logo}
              alt={`${name} logo`}
              className="w-20 h-20 object-contain rounded-full"
              loading="lazy"
            />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-4">{description}</p>
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-block px-5 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition duration-300"
          >
            Visit Website
          </a>
        </motion.div>
      ))
    )}
  </div>
</section>


   {/* Advantages Section */}
<section className="bg-gradient-to-br from-white via-gray-50 to-white py-20 px-6 md:px-16 max-w-7xl mx-auto">
  <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-16">
    Why Choose Our Real Estate Agencies
  </h2>
  <ul className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-10 text-gray-800 text-base md:text-lg">
    {[
      {
        id: 1,
        text: 'Expert agents with deep market knowledge to guide you every step of the way.',
        icon: '🧠',
      },
      {
        id: 2,
        text: 'Verified properties with legal transparency and full documentation.',
        icon: '📄',
      },
      {
        id: 3,
        text: 'Personalized service tailored to your budget and needs.',
        icon: '🤝',
      },
      {
        id: 4,
        text: 'Fast, secure deals with professional negotiation support.',
        icon: '⚡',
      },
    ].map(({ id, text, icon }) => (
      <motion.li
        key={id}
        whileHover={{ scale: 1.03, x: 5 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 flex gap-4 items-start"
      >
        <span className="text-3xl">{icon}</span>
        <p className="text-gray-700 leading-relaxed">{text}</p>
      </motion.li>
    ))}
  </ul>
</section>

      {/* Reviews Section */}
<section className="bg-gradient-to-b from-gray-50 to-white py-20 px-6 md:px-16 max-w-7xl mx-auto">
  <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-16">
    What Our Clients Say
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
    {[
      {
        id: 1,
        name: 'Ainura T.',
        text: 'The agency found my dream apartment in just three days. Professional and caring — I highly recommend them!',
        image: 'https://randomuser.me/api/portraits/women/65.jpg',
      },
      {
        id: 2,
        name: 'Bakyt K.',
        text: 'Very transparent process. I felt safe and informed every step of the way. Thank you for making it easy!',
        image: 'https://randomuser.me/api/portraits/men/44.jpg',
      },
      {
        id: 3,
        name: 'Zamira R.',
        text: 'Super fast communication and honest guidance. I bought my first house stress-free!',
        image: 'https://randomuser.me/api/portraits/women/33.jpg',
      },
    ].map(({ id, name, text, image }) => (
      <motion.div
        key={id}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition p-8 flex flex-col"
      >
        <div className="flex items-center gap-4 mb-5">
          <img
            src={image}
            alt={name}
            className="w-14 h-14 object-cover rounded-full border-2 border-indigo-500"
          />
          <div>
            <p className="font-semibold text-lg text-gray-800">{name}</p>
            <p className="text-sm text-gray-500">Verified Buyer</p>
          </div>
        </div>
        <p className="text-gray-700 italic leading-relaxed">"{text}"</p>
      </motion.div>
    ))}
  </div>
</section>


      {/* Contact Section */}
      <section className="bg-indigo-700 text-white py-16 px-6 md:px-16 text-center">
        <Mail className="mx-auto mb-4 w-10 h-10" />
        <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
        <p className="max-w-3xl mx-auto mb-8 text-lg">
          Ready to find your dream home? Email or call us, and we'll help you every step of the way!
        </p>
        <a
          href="mailto:info@realestate.kg"
          className="inline-block bg-white text-indigo-700 font-semibold rounded px-8 py-3 hover:bg-gray-100 transition"
        >
          Email Us
        </a>
      </section>
    </div>
  );
};

export default RealEstatePage;