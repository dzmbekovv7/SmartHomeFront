import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
axiosInstance
const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  useEffect(() => {
    if (authUser?.avatar) {
      setSelectedImg(authUser.avatar);
    }
  }, [authUser?.avatar]);
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file); // key должен совпадать с именем поля на сервере

    await updateProfile(formData);
  };
const getFullImageUrl = (path) => {
  if (!path) return "/avatar.png";
  return path.startsWith("http")
    ? path
    : `${axiosInstance.defaults.baseURL}${path}`;
};

  return (
    <div className="h-screen h-[900px]">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={getFullImageUrl(selectedImg || authUser?.avatar)}
                alt="Profile"
                className="size-36 rounded-full object-cover border-4"
              />

              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.username}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.email}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser?.created_at?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap justify-center mt-4">
            {authUser?.is_superuser && (
              <Link
                to="/admin-houses"
                className="btn btn-primary text-xs px-3 py-1 rounded-full"
              >
                Админ-панель домов
              </Link>
            )}

            <Link
              to="/predict/history"
              className="bg-white text-black font-semibold text-xs px-3 py-1 rounded-full shadow-md hover:bg-gray-100 transition-colors flex items-center justify-center"
              style={{ minWidth: "80px" }}
            >
              History
            </Link>

            {!authUser?.is_superuser && !authUser?.is_agent && (
              <Link
                to="/agent-application"
                className="bg-white text-black font-semibold text-xs px-3 py-1 rounded-full shadow-md hover:bg-gray-100 transition-colors flex items-center justify-center"
                style={{ minWidth: "80px" }}
              >
                Стать агентом
              </Link>
            )}

            {authUser?.is_superuser && (
              <Link
                to="/admin-agent-applications"
                className="bg-white text-black font-semibold text-xs px-3 py-1 rounded-full shadow-md hover:bg-gray-100 transition-colors flex items-center justify-center"
                style={{ minWidth: "80px" }}
              >
                Просмотр заявок на агентов
              </Link>
            )}

            {(authUser?.is_agent || authUser?.is_superuser) && (
              <Link
                to="/admin-users"
                className="bg-white text-black font-semibold text-xs px-3 py-1 rounded-full shadow-md hover:bg-gray-100 transition-colors flex items-center justify-center"
                style={{ minWidth: "80px" }}
              >
                Все пользователи
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
