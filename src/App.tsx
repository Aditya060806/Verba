import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import DebateCoach from "./components/DebateCoach";
import { AuthProvider } from "./components/auth/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import Home from "./pages/Home";
import CasePrep from "./pages/CasePrep";
import RoleSelect from "./pages/RoleSelect";
import DebateArena from "./pages/DebateArena";
import Verdict from "./pages/Verdict";
import PastRounds from "./pages/PastRounds";
import Profile from "./pages/Profile";
import MotionVault from "./pages/MotionVault";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-animated-gradient">
            <Routes>
              {/* Auth Routes - No Navigation */}
              <Route path="/auth/sign-in" element={<SignIn />} />
              <Route path="/auth/sign-up" element={<SignUp />} />
              <Route path="/auth/forgot-password" element={<ForgotPassword />} />
              
              {/* Main App Routes - With Navigation */}
              <Route path="/*" element={
                <>
                  <Navigation />
                  <main className="relative">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/motion-vault" element={<MotionVault />} />
                      <Route path="/leaderboard" element={<Leaderboard />} />
                      
                      {/* Protected Routes */}
                      <Route path="/case-prep" element={
                        <ProtectedRoute>
                          <CasePrep />
                        </ProtectedRoute>
                      } />
                      <Route path="/role-select" element={
                        <ProtectedRoute>
                          <RoleSelect />
                        </ProtectedRoute>
                      } />
                      <Route path="/debate-arena" element={
                        <ProtectedRoute>
                          <DebateArena />
                        </ProtectedRoute>
                      } />
                      <Route path="/verdict" element={
                        <ProtectedRoute>
                          <Verdict />
                        </ProtectedRoute>
                      } />
                      <Route path="/past-rounds" element={
                        <ProtectedRoute>
                          <PastRounds />
                        </ProtectedRoute>
                      } />
                      <Route path="/profile" element={
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      } />
                      
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                    
                    {/* Global AI Debate Coach - available on all main pages */}
                    <DebateCoach />
                  </main>
                </>
              } />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
