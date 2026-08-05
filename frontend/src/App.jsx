import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { WebSocketProvider } from "./context/WebSocketContext";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import QuestionsPage from "./pages/QuestionsPage";
import QuestionDetailPage from "./pages/QuestionDetailPage";
import AskQuestionPage from "./pages/AskQuestionPage";
import ProfilePage from "./pages/ProfilePage";
import AssessmentsPage from "./pages/AssessmentsPage";
import LeaderDashboard from "./pages/LeaderDashboard";
import StudyGroupsPage from "./pages/StudyGroupsPage";
import RxCalculationsPage from "./pages/RxCalculationsPage";
import AdminLayout from "./pages/admin/AdminLayout";
import AnalyticsDashboard from "./pages/admin/AnalyticsDashboard";
import UserManagement from "./pages/admin/UserManagement";
import LeaderManagement from "./pages/admin/LeaderManagement";
import ContentModeration from "./pages/admin/ContentModeration";
import EcosystemManagement from "./pages/admin/EcosystemManagement";
import AuditLogs from "./pages/admin/AuditLogs";
import SystemSettings from "./pages/admin/SystemSettings";
import LeaderboardPage from "./pages/LeaderboardPage";
import GoogleSearchPage from "./pages/GoogleSearchPage";
import EcosystemPage from "./pages/EcosystemPage";

import React from "react";

import { useAuth } from './context/AuthContext';

function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/question/:id" element={<QuestionDetailPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/assessments" element={<AssessmentsPage />} />
        <Route path="/groups" element={<StudyGroupsPage />} />
        <Route path="/rxcalculations" element={<RxCalculationsPage />} />
        <Route path="/resources" element={<GoogleSearchPage />} />
        <Route path="/ecosystem" element={<EcosystemPage />} />
        <Route 
          path="/ask" 
          element={
            <PrivateRoute>
              <AskQuestionPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/leader" 
          element={
            <PrivateRoute>
              <LeaderDashboard />
            </PrivateRoute>
          } 
        />
        <Route path="/admin" element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
          <Route index element={<AnalyticsDashboard />} />
          <Route path="content" element={<ContentModeration />} />
          <Route path="ecosystem" element={<EcosystemManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="leaders" element={<LeaderManagement />} />
          <Route path="audit" element={<AuditLogs />} />
          <Route path="settings" element={<SystemSettings />} />
        </Route>
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WebSocketProvider>
          <AppRoutes />
        </WebSocketProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
