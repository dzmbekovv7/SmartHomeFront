import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

const VerifyResetCodePage = () => {
  const [resetCode, setResetCode] = useState("");
  const { verifyResetCode, setResetCodeInStore, email } = useAuthStore(); // email should be stored from page 1
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await verifyResetCode({ reset_code: resetCode });
    if (success) {
      setResetCodeInStore(resetCode);
      navigate("/reset-password");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-6 sm:p-12 h-screen">
      <h1 className="text-2xl font-bold mb-6">Enter Reset Code</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md w-full">
        <input
          type="text"
          placeholder="Reset code"
          value={resetCode}
          onChange={(e) => setResetCode(e.target.value)}
          className="input input-bordered w-full"
        />
        <button type="submit" className="btn btn-primary w-full">
          Verify Code
        </button>
      </form>
    </div>
  );
};

export default VerifyResetCodePage;
