import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoutes";
import { useAuth } from "@/contexts/AuthContext";
import theme from "@/contexts/ThemeContext"
import HomePage from "@/pages/Home";
import LoginPage from "@/pages/Login";
import RegistrationPage from "@/pages/SignUp";
import ForgotPasswordPage from "@/pages/ForgotPassword";
import ExchangeMaterialsPage from "./pages/ExchangeMaterials";
import VirtualWalletPage from "./pages/VirtualWallet";

function LoginRedirect() {
  const { currentUser } = useAuth();

  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return <LoginPage />;
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/trocar-materiais" 
            element={
              <ProtectedRoute>
                <ExchangeMaterialsPage />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/carteira" 
            element={
              <ProtectedRoute>
                <VirtualWalletPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginRedirect />} />
          <Route path="/cadastro" element={<RegistrationPage />} />
          <Route path="/redefinir-senha" element={<ForgotPasswordPage />} />
        </Routes>
      </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;