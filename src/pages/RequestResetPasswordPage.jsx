import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";  // Импортируем хук для навигации
import AuthImagePattern from "../components/AuthImagePattern";
const RequestPasswordResetPage = () => {
  const [email, setEmail] = useState("");
  const { requestPasswordReset, isRequesting } = useAuthStore();
  const navigate = useNavigate();  // Инициализируем хук useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    await requestPasswordReset({ email }); 
    navigate("/verify-reset-code");  // Перенаправление на страницу сброса пароля

  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
            <AuthImagePattern title="Chat in KG" subtitle="Connect with friends, share moments, and stay in touch with your loved ones." />

      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Request Password Reset</h1>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={isRequesting}>
              {isRequesting ? "Sending..." : "Send Reset Code"}
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default RequestPasswordResetPage;
