import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User, MessageCircle, Users2, FileQuestion } from "lucide-react";

const Footer = () => {
  const { authUser, logout } = useAuthStore();

  return (
    <footer className="bg-base-100 border-t border-base-300 w-full  backdrop-blur-md bg-base-100/80">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Logo and name */}
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-xl font-bold">SweetHome</h1>
          </Link>

          {/* Navigation */}
          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
            {authUser && (
              <Link to="/" className="btn btn-ghost btn-sm gap-1">
                <Users2 className="size-4" />
                Chat
              </Link>
            )}
            <Link to="/houses" className="btn btn-ghost btn-sm gap-1">
              <Users2 className="size-4" />
              Houses
            </Link>
            <Link to="/posts" className="btn btn-ghost btn-sm gap-1">
              <MessageCircle className="size-4" />
              Posts
            </Link>
            <Link to="/settings" className="btn btn-ghost btn-sm gap-1">
              <Settings className="size-4" />
              Settings
            </Link>
            <Link to="/faq" className="btn btn-ghost btn-sm gap-1">
              <FileQuestion className="size-4" />
              FAQ
            </Link>
            {authUser && (
              <>
                <Link to="/profile" className="btn btn-ghost btn-sm gap-1">
                  <User className="size-4" />
                  Profile
                </Link>
                <button onClick={logout} className="btn btn-ghost btn-sm gap-1">
                  <LogOut className="size-4" />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-base-content/60">
          © {new Date().getFullYear()} SweetHome — All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
