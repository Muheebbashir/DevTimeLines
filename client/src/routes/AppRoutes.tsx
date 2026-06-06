import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import DashboardPage from "../pages/DashboardPage";
import ProfilePage from "../pages/ProfilePage";
import TimelinePage from "../pages/TimelinePage";
import ProjectsPage from "../pages/ProjectsPage";
import ProtectedRoute from "./ProtectedRoute";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import { Navigate } from "react-router-dom";
import PublicLandingRoute from "./PublicLandingRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/sign-in/*"
        element={
          <PublicLandingRoute>
            <SignInPage />
          </PublicLandingRoute>
        }
      />

      <Route
        path="/sign-up/*"
        element={
          <PublicLandingRoute>
            <SignUpPage />
          </PublicLandingRoute>
        }
      />

      <Route
        path="/"
        element={
          <PublicLandingRoute>
            <LandingPage />
          </PublicLandingRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/timeline"
        element={
          <ProtectedRoute>
            <TimelinePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <ProjectsPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
