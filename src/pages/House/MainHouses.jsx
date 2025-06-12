import React, { useEffect, useState } from 'react';
import { useHouseStore } from '../../store/useHouseStore';
import { useThemeStore } from '../../store/useThemeStore'; // Подключаем тему
import HouseCard from './HouseCard';
import PredictForm from '../Predicts/PredictForm';
import PredictRentForm from '../Predicts/PredictRentForm';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import MapComponent from '../../components/MapComponent';
import { motion, useAnimation } from "framer-motion";
import {Building2, Castle, Map, Tent } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { Home, Search, Info } from "lucide-react";
import {  MapPin, Bed, Ruler, Heart, Star } from "lucide-react";
import { Calendar, CheckCircle2 } from "lucide-react";
import ServiceCard from '../../components/ServiceCard'
const floatingIcons = [
  { Icon: MapPin, size: 24, color: "text-blue-400" },
  { Icon: Bed, size: 28, color: "text-blue-300" },
  { Icon: Ruler, size: 20, color: "text-blue-500" },
  { Icon: Heart, size: 22, color: "text-pink-400" },
  { Icon: Star, size: 26, color: "text-yellow-400" },
];
const floatingVariants = {
  animate: {
    y: [0, -10, 0], // up and down float
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};
const randomPositions = () =>
  Array.from({ length: 6 }).map(() => ({
    top: Math.floor(Math.random() * 80) + 10 + "%",
    left: Math.floor(Math.random() * 90) + 5 + "%",
    iconIndex: Math.floor(Math.random() * floatingIcons.length),
    delay: Math.random() * 3,
  }));

const MainHouses = () => {
  const { houses, loading, error, fetchHouses } = useHouseStore();
  const { theme } = useThemeStore(); // Получаем текущую тему
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 });
  const [visibleCount, setVisibleCount] = useState(9);

  const showMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, houses.length));
  };
  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const positions = React.useMemo(() => randomPositions(), []);

  useEffect(() => {
    fetchHouses();
  }, [fetchHouses]);

  const backgroundStyles = {
    coffee: 'from-yellow-50 to-yellow-100',
    dark: 'from-gray-800 to-black',
    ocean: 'from-blue-100 to-blue-200',
    light: 'from-white to-gray-50',
    rose: 'from-rose-100 to-white',
  };
  return (
    <div className={`bg-gradient-to-r from-blue-100 via-white to-blue-200 || 'from-gray-100 to-white'} min-h-screen`}>
    <section className="relative bg-gradient-to-r from-blue-100 via-white to-blue-200 py-24 sm:py-32 overflow-hidden">
      {/* Decorative Blur Circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-blue-300 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-0 w-[300px] h-[300px] bg-blue-400 opacity-30 rounded-full blur-2xl"></div>
      </div>

      {/* Floating Icons */}
      {positions.map(({ top, left, iconIndex, delay }, i) => {
        const { Icon, size, color } = floatingIcons[iconIndex];
        return (
          <motion.div
            key={i}
            initial={{ y: 0 }}
            animate={{
              y: ["0%", "-15%", "0%"],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              delay,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
            style={{ top, left }}
            className={`absolute ${color} pointer-events-none select-none`}
          >
            <Icon size={size} />
          </motion.div>
        );
      })}

      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center z-10"
      >
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-5xl sm:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight flex justify-center items-center gap-3"
        >
          <Home className="w-10 h-10 text-blue-600" />
          Find Your <span className="text-blue-600 ml-2">Dream Home</span>
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-4 max-w-2xl mx-auto text-lg text-gray-700"
        >
          Discover homes that match your lifestyle. Analyze real estate prices,
          get rental predictions, and make confident decisions — all in one place.
        </motion.p>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-10 flex justify-center gap-4 flex-wrap"
        >
          <a
            href="#explore"
            className="flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3 text-white font-semibold shadow-md hover:bg-blue-700 transition"
          >
            <Search className="w-5 h-5" />
            Browse Listings
          </a>
          <a
            href="#learn-more"
            className="flex items-center gap-2 rounded-full border border-blue-600 px-8 py-3 text-blue-600 font-semibold hover:bg-blue-50 transition"
          >
            <Info className="w-5 h-5" />
            Learn More
          </a>
        </motion.div>
      </motion.div>
    </section>
    <section className="relative max-w-6xl mx-auto px-6 py-20">
      {/* Floating Icons */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 0.1, y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-10 left-10 text-blue-400"
      >
        <Home size={50} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.08, y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 text-blue-300"
      >
        <Castle size={40} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.1, y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-20 right-20 text-blue-200"
      >
        <Building2 size={45} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 0.06, y: [0, -25, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute bottom-20 right-10 text-blue-300"
      >
        <Tent size={35} />
      </motion.div>

      {/* Main Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-semibold mb-8 text-gray-800 text-center"
      >
        🏡 Available Houses
      </motion.h2>

      {/* Conditional Status Messages */}
      {loading && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-10 text-gray-500"
        >
          Loading houses...
        </motion.p>
      )}
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-10 text-red-600"
        >
          {error}
        </motion.p>
      )}
      {!loading && !error && houses.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-600"
        >
          Houses not found.
        </motion.p>
      )}

      {/* Houses Grid */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap justify-center gap-8"
      >
        {houses.slice(0, visibleCount).map((house) => (
          <HouseCard key={house.id} house={house} />
        ))}
      </motion.div>

      {/* More Button */}
      {visibleCount < houses.length && (
        <div className="mt-10 text-center">
          <button
            onClick={showMore}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            More
          </button>
        </div>
      )}
    </section>

<section className="max-w-7xl mx-auto px-6 mt-20 grid grid-cols-1 md:grid-cols-2 gap-20 items-center relative text-blue-900">

      {/* Floating icons with glowing pill backgrounds and pulse */}
      <motion.div
        className="absolute top-14 left-14 bg-blue-100/70 rounded-full p-3 shadow-lg"
        variants={floatingVariants}
        animate="animate"
        style={{ zIndex: 0 }}
      >
        <Info className="w-10 h-10 text-blue-600 drop-shadow-md" />
      </motion.div>
      <motion.div
        className="absolute bottom-28 right-24 bg-blue-200/80 rounded-full p-4 shadow-xl"
        variants={floatingVariants}
        animate="animate"
        style={{ zIndex: 0, animationDelay: "1.8s" }}
      >
        <Star className="w-12 h-12 text-blue-700 drop-shadow-md" />
      </motion.div>
      <motion.div
        className="absolute top-1/2 right-1/3 bg-blue-100/50 rounded-full p-2 shadow-md"
        variants={floatingVariants}
        animate="animate"
        style={{ zIndex: 0, animationDelay: "3s" }}
      >
        <Heart className="w-8 h-8 text-blue-500 drop-shadow-sm" />
      </motion.div>
      <motion.div
        className="absolute bottom-12 left-1/3 bg-blue-200/60 rounded-full p-3 shadow-lg"
        variants={floatingVariants}
        animate="animate"
        style={{ zIndex: 0, animationDelay: "2.4s" }}
      >
        <Map className="w-9 h-9 text-blue-600 drop-shadow-sm" />
      </motion.div>

      {/* Left text block with gradient underline and tilt image */}
      <div className="relative z-10 space-y-8 bg-white p-10 rounded-3xl shadow-2xl">
        <h3 className="text-4xl font-extrabold text-blue-700 relative inline-block">
          Want to know how much your dream home costs?
          <span className="absolute left-0 bottom-0 h-1 w-24 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse"></span>
        </h3>
        <p className="text-blue-900 leading-relaxed text-lg max-w-xl">
          Fill out a simple form and get an instant property valuation, considering room count,
          area, number of floors, and more. Use our data and AI model for accurate results.
        </p>
        <ul className="list-disc list-inside text-blue-700 space-y-3 pl-6 max-w-md text-base">
          <li>Supports all types of real estate — apartments, houses, villas.</li>
          <li>We consider pools, number of floors, and region.</li>
          <li>Simple and intuitive form accessible from any device.</li>
        </ul>
        <motion.img
          src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&q=80"
          alt="Dream House"
          className="rounded-xl shadow-lg w-full max-w-md mx-auto md:mx-0 mt-8"
          animate={{ rotate: [0, 6, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Right form block with subtle gradient background and smooth button hover */}
      <div className="">
        <PredictForm />


      </div>
    </section>
     <section className="max-w-7xl mx-auto px-6 mt-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      {/* Форма аренды */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <PredictRentForm />
      </motion.div>

      {/* Текст справа от формы аренды */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h3
          className="text-3xl font-bold text-blue-600 flex items-center space-x-3"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        >
          <Home size={32} />
          <span>Planning to rent?</span>
        </motion.h3>

        <p className="text-gray-700 leading-relaxed">
          Find out the rental price based on area, rooms, and region. Our service will help you
          find the best rental options and forecast future prices.
        </p>

        <ul className="list-disc list-inside text-gray-600 space-y-4">
          <motion.li
            className="flex items-center space-x-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <CheckCircle2 size={20} className="text-blue-500" />
            <span>Detailed analysis by districts and real estate types.</span>
          </motion.li>
          <motion.li
            className="flex items-center space-x-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <MapPin size={20} className="text-blue-500" />
            <span>We consider additional amenities and infrastructure.</span>
          </motion.li>
          <motion.li
            className="flex items-center space-x-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Calendar size={20} className="text-blue-500" />
            <span>Up-to-date market data and forecasts.</span>
          </motion.li>
        </ul>

        <motion.img
          src="https://newphoto.club/pics/uploads/posts/2023-03/1678767042_newphoto-club-p-krasivie-doma-v-zhizni-48.jpg"
          alt="House Rent"
          className="rounded-lg shadow-lg w-full max-w-md mx-auto md:mx-0"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />
      </motion.div>
    </section>  

     <section className="max-w-7xl mx-auto px-6 mt-32">
  <h2 className="text-3xl font-bold text-blue-800 mb-12 text-center">
    Other Services and Sections
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
    <Link to="/consultation">
      <ServiceCard
        title="Expert Consultations"
        text="Our specialists are always ready to help you choose a property and answer your questions."
        img="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=400&q=80"
      />
    </Link>

    <ServiceCard
      title="Mortgage Lending"
      text="We’ll help find the best mortgage terms for your budget and goals."
      img="https://150242471.v2.pressablecdn.com/wp-content/uploads/2023/10/10CharacteristicsofaQualityMortgageLoanOfficer-scaled.jpeg.webp"
    />

    <ServiceCard
      title="Renovation and Design"
      text="We realize your interior design dreams and turnkey renovations."
      img="https://images.ctfassets.net/o2gysnvd04sg/1e96sXuaKhVEknWGg9j9JK/90c4dba12d20c25a850c5f49e822e0a4/Lendi_blog_hero__29___1_.png"
    />

    <ServiceCard
      title="Real Estate Rental"
      text="A wide selection of rental options for comfortable living and business."
      img="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=400&q=80"
    />
  </div>
</section>


      {/* Dropdown с текстом и кнопками */}
      <section className="max-w-4xl mx-auto px-6 mt-32">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Frequently Asked Questions</h2>

        <DropdownItem
  question="How is the house price calculated?"
  answer="The price is calculated based on the parameters you enter: area, number of rooms, presence of a pool, number of floors, and region."
/>
<DropdownItem
  question="Can I change the prediction parameters?"
  answer="Yes, you can change any parameter in the form and get a new prediction in real time."
/>
<DropdownItem
  question="Are all regions of Kyrgyzstan supported?"
  answer="We support major regions: Bishkek, Issyk-Kul Region, Chuy, Osh, and Jalal-Abad."
/>
<DropdownItem
  question="Is there a mobile app?"
  answer="A mobile app is currently in development, but our website is fully responsive for all devices."
/>
        <div className="mt-12 text-center">
          <button className="px-6 py-3 rounded-full bg-pink-600 text-white font-semibold hover:bg-pink-700 transition">
            <Link to="/faq">More</Link>
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mt-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
  <div className="rounded-xl shadow-md overflow-hidden h-[500px]">
    <MapComponent houses={houses} />
  </div>
  <div className="space-y-4">
    <h2 className="text-3xl font-bold text-gray-800">Where are the houses located?</h2>
    <p className="text-gray-700">
    See the location of each house on an interactive map. Just hover over or click a house to see details.
    </p>
    <ul className="list-disc list-inside text-gray-600 space-y-2">
    <li>Full object visualization</li>
  <li>Convenient location filtering</li>
  <li>Support for all devices</li>
    </ul>
  </div>
</section>
<Footer/>
    </div>
  );
};


const DropdownItem = ({ question, answer }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="border-b border-gray-300 py-4 cursor-pointer">
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center text-lg font-semibold text-pink-600"
      >
        <span>{question}</span>
        <span className="text-2xl select-none">{open ? '−' : '+'}</span>
      </div>
      {open && <p className="mt-3 text-gray-700">{answer}</p>}
    </div>
  );
};

export default MainHouses;
