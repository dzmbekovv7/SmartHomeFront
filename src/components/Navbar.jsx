import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import {
  LogOut,
  Settings,
  User,
  Users2,
  FileQuestion,
  Menu,
  ChevronDown,
  MessageCircleMore,
  ArrowRightLeft,
  LayoutDashboard,
    Cpu,
  Code2,
  CloudCog,
  MousePointerClick,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeStore } from "../store/useThemeStore";
import {
  Code,
} from 'lucide-react';

const icons = [Cpu, Code2, CloudCog, MousePointerClick];
const slogans = [
  "IT is life.",
  "Code. Create. Conquer.",
  "Eat. Sleep. Code. Repeat.",
  "Think <Code/>.",
  "Frontend & Backend Magic",
];
const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const [sloganIndex, setSloganIndex] = useState(0);
  const { theme } = useThemeStore(); // <-- используем тему

  useEffect(() => {
    const interval = setInterval(() => {
      setSloganIndex((prevIndex) => (prevIndex + 1) % slogans.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const handleLinkClick = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  return (
    <header
      data-theme={theme} // <-- применяем тему
      className="bg-base-100 backdrop-blur-xl border-b border-base-200 shadow-sm top-0 z-50"
    >
  {/* Slogan Bar */}
  <div className="bg-gradient-to-r from-indigo-100 via-white to-indigo-200 py-1 text-center">
    <AnimatePresence mode="wait">
      <motion.div
        key={slogans[sloganIndex]}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center gap-2 text-sm md:text-base font-medium text-indigo-700"
      >
        <Code className="w-5 h-5" />
        <span>{slogans[sloganIndex]}</span>
      </motion.div>
    </AnimatePresence>
  </div>

  {/* Main Navbar */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative">
    {/* Logo & Icons */}
    <div className="relative flex items-center space-x-4">
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
        className="bg-indigo-100 text-indigo-600 rounded-full p-2"
      >
        <Users2 className="w-5 h-5" />
      </motion.div>

      <div>
        <motion.h1
          className="text-xl font-bold text-indigo-800"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          SweetHome
        </motion.h1>
        <motion.p
          className="text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          Do you know the real price of your home?
        </motion.p>
      </div>

      {/* Floating Icons */}
      {icons.map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute text-indigo-300"
          style={{
            top: `${Math.random() * 40}px`,
            left: `${Math.random() * 100 + 50}px`,
          }}
          animate={{
            y: [0, -6, 0],
            opacity: [0.6, 1, 0.6],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            delay: index * 0.4,
          }}
        >
          <Icon className="w-4 h-4 md:w-5 md:h-5" />
        </motion.div>
      ))}
    </div>

    {/* Navigation Items */}
    <div className="hidden lg:flex items-center gap-6">
      {authUser ? (
        <>
          <NavLink to="/" icon={<Users2 />} text="Houses" />
          <NavLink to="/settings" icon={<Settings />} text="Settings" />
          <NavLink to="/faq" icon={<FileQuestion />} text="FAQ" />
          <NavLink to="/chat" icon={<MessageCircleMore />} text="Chat" />
          <NavLink to="/profile" icon={<User />} text="Profile" />

          {/* Pages Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-1 px-4 py-2 text-sm bg-indigo-100 text-indigo-700 hover:bg-indigo-200 rounded-md transition-all shadow-sm"
            >
              Pages <ChevronDown className="w-4 h-4" />
            </button>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden"
                >
                  <ul className="flex flex-col divide-y divide-gray-100">
                    {authUser?.is_superuser && (
                      <DropdownLink
                        to="/admin-dashboard"
                        icon={<LayoutDashboard className="w-4 h-4 mr-2" />}
                        text="Dashboard"
                        onClick={handleLinkClick}
                      />
                    )}
                    <DropdownLink
                      to="/exchange"
                      icon={<ArrowRightLeft className="w-4 h-4 mr-2" />}
                      text="Exchange"
                      onClick={handleLinkClick}
                    />
                    <DropdownLink
                      to="/agents"
                      icon={<ShieldCheck className="w-4 h-4 mr-2" />}
                      text="Agents"
                      onClick={handleLinkClick}
                    />
                    <DropdownLink
                      to="/market-trends"
                      icon={<TrendingUp className="w-4 h-4 mr-2" />}
                      text="Trends"
                      onClick={handleLinkClick}
                    />
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={logout}
            className="flex gap-2 items-center text-sm text-gray-600 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </>
      ) : (
        <>
          <NavLink to="/login" text="Login" />
          <NavLink to="/signup" text="Sign Up" />
        </>
      )}
    </div>

    {/* Mobile Toggle */}
    <button
      className="lg:hidden p-2 rounded-md text-gray-600"
      onClick={toggleMenu}
    >
      <Menu
        className={`w-6 h-6 transition-transform duration-300 ${
          menuOpen ? "rotate-90" : ""
        }`}
      />
    </button>

    {/* Mobile Menu */}
    {menuOpen && (
      <div className="absolute top-20 left-0 w-full bg-white shadow-lg p-4 flex flex-col gap-2 lg:hidden z-40">
        {/* reuse logic here as in desktop */}
      </div>
    )}
  </div>
</header>

  );
};

// Reusable link component
const NavLink = ({ to, icon, text }) => (
  <Link
    to={to}
    className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors"
    onClick={() => {}}
  >
    {icon}
    {text}
  </Link>
);

// Dropdown link
const DropdownLink = ({ to, icon, text, onClick }) => (
  <Link
    to={to}
    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all"
    onClick={onClick}
  >
    {icon}
    {text}
  </Link>
);

export default Navbar;
