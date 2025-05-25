import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import RequestPasswordResetPage from "./pages/RequestResetPasswordPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";
import PostForm from "./components/PostForm";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import PostsPage from "./pages/PostsPage";
import { FAQ } from "./pages/FAQ";
import PredictForm from './pages/Predicts/PredictForm.jsx'
import Exchange from "./pages/Exchange.jsx";
import PredictRentForm from "./pages/Predicts/PredictRentForm.jsx";
import VerifyResetCodePage from "./pages/VerifyResetCode";
import AgentApplicationForm from "./pages/Agent/AgentApplicationForm.jsx";
import MainHouses from "./pages/House/MainHouses.jsx";
import RealEstateAgenciesPage from "./pages/Agent/Agents.jsx";
import HouseDetail from "./pages/House/HouseDetail.jsx";
import PredictionHistory from './pages/Predicts/PredictionHistory.jsx'
import AdminHousePanel from "./pages/Admin/AdminHousePanel.jsx";
import UsersPage from "./pages/UsersPage.jsx";
import Chat from "./pages/Chat.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import MarketTrends from "./pages/MarketTrendsGraph.jsx";
import AgentApplicationsPage from "./pages/Agent/AgentApplicationsPage.jsx";
import ConsultationForm from "./pages/ConsultationForm.jsx";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme={theme}>
      <Navbar />

      <Routes>
        {/* auth */}
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/confirmation" element={<ConfirmationPage />} /> {/* Новый маршрут */}
        <Route path="/requestreset" element={<RequestPasswordResetPage/>}></Route>
        <Route path="/reset-password" element={<ResetPasswordPage/>}></Route>
        <Route path="/verify-reset-code" element={<VerifyResetCodePage />} />

        {/* profile */}
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />

        {/* houses */}
        <Route path="/" element={<MainHouses/>}></Route>
        <Route path="/houses/:id" element={<HouseDetail/>}></Route>


        {/* admin pages */}
        <Route path="/admin-houses" element={<AdminHousePanel />} />
        <Route path="/admin-dashboard" element={<AdminDashboard/>}></Route>
        <Route path="/admin-agent-applications" element={<AgentApplicationsPage/>}></Route>
        <Route path="/admin-users" element={<UsersPage/>}></Route>

        
        {/* agents pages */}
        <Route path="/agents" element={<RealEstateAgenciesPage/>}></Route>
        <Route path="/agent-application" element={<AgentApplicationForm />} />

        {/* users page */}
        <Route path="/exchange" element={<Exchange/>}></Route>
        <Route path="/predict/history" element={<PredictionHistory/>}></Route>
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/chat" element={<Chat/>}></Route>
        <Route path="/faq" element={<FAQ/>}></Route>
        <Route path="/market-trends" element={<MarketTrends/>}></Route>
        <Route path="/consultation" element={<ConsultationForm/>}></Route>
      </Routes>

      <Toaster />
    </div>
  );
};
export default App;