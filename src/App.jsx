import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { Loader } from "lucide-react";
import LoadingScreen from "./components/LoadingScreen.jsx";

// Импорты страниц
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import RequestPasswordResetPage from "./pages/RequestResetPasswordPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import VerifyResetCodePage from "./pages/VerifyResetCode";

import PostForm from "./components/PostForm";
import PostsPage from "./pages/PostsPage";
import { FAQ } from "./pages/FAQ";
import PredictForm from './pages/Predicts/PredictForm.jsx';
import Exchange from "./pages/Exchange.jsx";
import PredictRentForm from "./pages/Predicts/PredictRentForm.jsx";
import AgentApplicationForm from "./pages/Agent/AgentApplicationForm.jsx";
import MainHouses from "./pages/House/MainHouses.jsx";
import RealEstateAgenciesPage from "./pages/Agent/Agents.jsx";
import HouseDetail from "./pages/House/HouseDetail.jsx";
import PredictionHistory from './pages/Predicts/PredictionHistory.jsx';
import AdminHousePanel from "./pages/Admin/AdminHousePanel.jsx";
import UsersPage from "./pages/UsersPage.jsx";
import Chat from "./pages/Chat.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import MarketTrends from "./pages/MarketTrendsGraph.jsx";
import AgentApplicationsPage from "./pages/Agent/AgentApplicationsPage.jsx";
import ConsultationForm from "./pages/ConsultationForm.jsx";
import { Toaster } from "react-hot-toast";

// Компонент защиты приватных роутов
const ProtectedRoute = ({ authUser, children }) => {
  if (!authUser) {
    // Если нет авторизации — редирект на логин
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);



  return (
    <div data-theme={theme}>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes>
          {/* Публичные маршруты (доступны без авторизации) */}
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/requestreset" element={<RequestPasswordResetPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/verify-reset-code" element={<VerifyResetCodePage />} />

          {/* Защищённые маршруты (требуют авторизацию) */}
          <Route
            path="/"
            element={
              <ProtectedRoute authUser={authUser}>
                <MainHouses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute authUser={authUser}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute authUser={authUser}>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/houses/:id"
            element={
              <ProtectedRoute authUser={authUser}>
                <HouseDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts"
            element={
              <ProtectedRoute authUser={authUser}>
                <PostsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/postform"
            element={
              <ProtectedRoute authUser={authUser}>
                <PostForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-houses"
            element={
              <ProtectedRoute authUser={authUser}>
                <AdminHousePanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute authUser={authUser}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-agent-applications"
            element={
              <ProtectedRoute authUser={authUser}>
                <AgentApplicationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-users"
            element={
              <ProtectedRoute authUser={authUser}>
                <UsersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/agents"
            element={
              <ProtectedRoute authUser={authUser}>
                <RealEstateAgenciesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/agent-application"
            element={
              <ProtectedRoute authUser={authUser}>
                <AgentApplicationForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exchange"
            element={
              <ProtectedRoute authUser={authUser}>
                <Exchange />
              </ProtectedRoute>
            }
          />
          <Route
            path="/predict/history"
            element={
              <ProtectedRoute authUser={authUser}>
                <PredictionHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute authUser={authUser}>
                <Chat />
              </ProtectedRoute>
            }
          />
          <Route
            path="/faq"
            element={
              <ProtectedRoute authUser={authUser}>
                <FAQ />
              </ProtectedRoute>
            }
          />
          <Route
            path="/market-trends"
            element={
              <ProtectedRoute authUser={authUser}>
                <MarketTrends />
              </ProtectedRoute>
            }
          />
          <Route
            path="/consultation"
            element={
              <ProtectedRoute authUser={authUser}>
                <ConsultationForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/predict/form"
            element={
              <ProtectedRoute authUser={authUser}>
                <PredictForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/predict/rent-form"
            element={
              <ProtectedRoute authUser={authUser}>
                <PredictRentForm />
              </ProtectedRoute>
            }
          />

          {/* Любой неизвестный путь — редирект на главную (если авторизован) или на логин */}
          <Route
            path="*"
            element={<Navigate to={authUser ? "/" : "/login"} replace />}
          />
        </Routes>
      </AnimatePresence>
      <Toaster />
    </div>
  );
};

export default App;
