import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import AuthImagePattern from "../components/AuthImagePattern";
import { Loader2, Lock, MessageSquare } from "lucide-react";

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    reset_code: "",
    new_password: "",
    confirm_password: "",
  });

  const { resetPassword, isResetting, setResetCode } = useAuthStore();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const resetCodeFromURL = searchParams.get("reset_code");

  useEffect(() => {
    if (resetCodeFromURL) {
      setResetCode(resetCodeFromURL);
    }
  }, [resetCodeFromURL, setResetCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.new_password !== formData.confirm_password) {
      toast.error("Passwords do not match.");
      return;
    }
    try {
      await resetPassword({
        new_password: formData.new_password,
        confirm_password: formData.confirm_password,
      });
      toast.success("Password has been reset successfully.");
      navigate("/login");
    } catch (err) {
      toast.error("Failed to reset password.");
    }
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Reset Your Password</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">New Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="password"
                  className="input input-bordered w-full pl-10"
                  placeholder="••••••••"
                  value={formData.new_password}
                  onChange={(e) =>
                    setFormData({ ...formData, new_password: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Confirm Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="password"
                  className="input input-bordered w-full pl-10"
                  placeholder="••••••••"
                  value={formData.confirm_password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirm_password: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={isResetting}>
              {isResetting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <AuthImagePattern
        title={"Reset Your Password!"}
        subtitle={"Please follow the steps to reset your password and regain access."}
      />
    </div>
  );
};

export default ResetPasswordPage;
