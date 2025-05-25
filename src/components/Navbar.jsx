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
} from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  return (
    <header className="bg-base-100 border-b border-base-300 w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            onClick={handleLinkClick}
          >
            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users2 className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-lg font-bold">SweetHome</h1>
          </Link>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2 rounded-md focus:outline-none"
            onClick={toggleMenu}
          >
            <Menu
              className={`w-6 h-6 text-primary transition-transform duration-300 ${
                menuOpen ? "rotate-90" : ""
              }`}
            />
          </button>

          {/* Menu */}
          <div
            className={`lg:flex items-center gap-4 ${
              menuOpen
                ? "flex flex-col absolute top-16 left-0 right-0 bg-base-100/95 p-4 shadow-md z-30"
                : "hidden"
            } lg:static lg:p-0`}
          >
            {authUser ? (
              <>
                <Link
                  to="/"
                  className="btn btn-sm gap-2 transition-colors py-2"
                  onClick={handleLinkClick}
                >
                  <Users2 className="w-4 h-4" />
                  <span>Houses</span>
                </Link>

                <Link
                  to="/settings"
                  className="btn btn-sm gap-2 transition-colors py-2"
                  onClick={handleLinkClick}
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </Link>

                <Link
                  to="/faq"
                  className="btn btn-sm gap-2 transition-colors py-2"
                  onClick={handleLinkClick}
                >
                  <FileQuestion className="w-4 h-4" />
                  <span>FAQ</span>
                </Link>

                <Link
                  to="/chat"
                  className="btn btn-sm gap-2 py-2 w-full lg:w-auto text-left"
                  onClick={handleLinkClick}
                >
                  <Users2 className="w-4 h-4" />
                  <span>Chat</span>
                </Link>

                <Link
                  to="/profile"
                  className="btn btn-sm gap-2 py-1.5 w-full lg:w-auto text-left"
                  onClick={handleLinkClick}
                >
                  <User className="size-5" />
                  <span>Profile</span>
                </Link>

                <div className="relative z-50">
  <button
    onClick={() => setDropdownOpen(!dropdownOpen)}
    className="btn btn-sm gap-1 items-center"
  >
    Pages <ChevronDown className="w-4 h-4" />
  </button>
  {dropdownOpen && (
    <div className="absolute mt-2 w-40 bg-base-100 rounded-md shadow-lg border border-base-300 z-50">
      <ul className="flex flex-col py-2">
        {authUser?.is_superuser && (
          <Link
            to="/admin-dashboard"
            className="px-4 py-2 hover:bg-base-200"
            onClick={handleLinkClick}
          >
            Dashboard
          </Link>
        )}
        <Link
          to="/exchange"
          className="px-4 py-2 hover:bg-base-200"
          onClick={handleLinkClick}
        >
          Exchange
        </Link>
        <Link
          to="/agents"
          className="px-4 py-2 hover:bg-base-200"
          onClick={handleLinkClick}
        >
          Agents
        </Link>
        <Link
          to="/market-trends"
          className="px-4 py-2 hover:bg-base-200"
          onClick={handleLinkClick}
        >
          Market Trends
        </Link>
      </ul>
    </div>
  )}
</div>

                <button
                  className="flex gap-2 items-center py-2 w-full lg:w-auto text-left"
                  onClick={logout}
                >
                  <LogOut className="size-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                {/* Для неавторизованных оставляем только ссылки на логин и регистрацию */}
                <Link
                  to="/login"
                  className="btn btn-sm gap-2 transition-colors py-2"
                  onClick={handleLinkClick}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn btn-sm gap-2 transition-colors py-2"
                  onClick={handleLinkClick}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
