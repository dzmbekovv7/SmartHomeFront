import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const cardStyles = [
  {
    container: "bg-white rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out",
    imageWrapper: "relative h-52",
    image: "w-full h-full object-cover rounded-t-3xl",
    priceTag: "absolute top-2 right-2 bg-white bg-opacity-80 rounded-full px-3 py-1 text-sm shadow",
    content: "p-4 space-y-2",
    title: "text-xl font-semibold truncate",
    description: "text-gray-500 text-sm line-clamp-2",
    info: "flex justify-between text-xs text-gray-400",
    meta: "flex justify-between pt-2 text-sm text-gray-500 border-t mt-2"
  },
  {
    container: "bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-md border border-blue-200 hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300",
    imageWrapper: "relative h-48",
    image: "w-full h-full object-cover rounded-t-2xl",
    priceTag: "absolute bottom-2 left-2 bg-white bg-opacity-90 rounded px-3 py-1 text-xs shadow-md",
    content: "px-5 py-3 space-y-1",
    title: "text-lg font-bold text-blue-700",
    description: "text-gray-600 text-sm",
    info: "flex justify-between text-xs text-blue-400",
    meta: "flex justify-between pt-2 text-xs text-blue-500 border-t mt-1"
  },
  {
    container: "bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-[1.01] transform transition duration-300 ease-in-out border-t-4 border-blue-400",
    imageWrapper: "relative h-44",
    image: "w-full h-full object-cover rounded-t-xl",
    priceTag: "absolute top-3 left-3 bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-xs font-semibold shadow",
    content: "px-4 py-3 space-y-2",
    title: "text-base font-semibold text-gray-800",
    description: "text-gray-500 text-sm",
    info: "flex justify-between text-xs text-gray-400",
    meta: "flex justify-between pt-2 text-xs text-gray-600 border-t mt-1"
  }
];


const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const HouseCard = ({ house }) => {
  const navigate = useNavigate();
  const randomStyle = cardStyles[Math.floor(Math.random() * cardStyles.length)];

  return (
    <motion.div
      onClick={() => navigate(`/houses/${house.id}`)}
      className={`w-full sm:w-80 cursor-pointer ${randomStyle.container}`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className={randomStyle.imageWrapper}>
        <img
          src={house.image}
          alt={house.name}
          className={randomStyle.image}
        />
        <div className={randomStyle.priceTag}>
          ${house.price.toLocaleString()}
        </div>
      </div>
      <div className={randomStyle.content}>
        <h3 className={randomStyle.title}>{house.name}</h3>
        <p className={randomStyle.description}>{house.description}</p>
        <div className={randomStyle.info}>
          <span>📍 {house.location}</span>
          <span>🛏 {house.rooms} | 📐 {house.square} m²</span>
        </div>
        <div className={randomStyle.meta}>
          <span>👍 {house.likes?.length || 0}</span>
          <span>👁️ {house.views?.length || 0}</span>
          <span>💬 {house.comments?.length || 0}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default HouseCard;
