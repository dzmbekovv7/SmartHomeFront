import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import axios from "axios";
import toast from "react-hot-toast";

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // Добавляем состояние для email
  const [confirmation_code, setconfirmation_code] = useState("");
  const { authUser } = useAuthStore(); // Используем authUser, если нужно для проверки

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    if (!confirmation_code.trim()) {
      toast.error("Please enter the confirmation confirmation_code.");
      return;
    }

    try {
      // Отправка email и кода на сервер
      const response = await axios.post("/confirm-email/", {
        email,
        confirmation_code,
      });

      if (response.status === 200) {
        toast.success("Code confirmed successfully.");
        navigate("/login"); // Переход на страницу входа
      } else {
        toast.error("Invalid confirmation confirmation_code.");
      }
    } catch (error) {
      toast.error("An error occurred while confirming the confirmation_code.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-2xl font-bold text-center">Confirm your email</h1>
        <p className="text-center text-base-content/60">We sent a confirmation confirmation_code to your email.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Поле для ввода email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative">
              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Confirmation code</span>
            </label>
            <div className="relative">
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Enter confirmation code"
                value={confirmation_code}
                onChange={(e) => setconfirmation_code(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Confirm code
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmationPage;
