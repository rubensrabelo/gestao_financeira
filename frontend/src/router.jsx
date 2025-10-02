import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import NavBar from "./pages/layout/NavBar";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import TransactionPage from "./pages/Transaction/TransactionPage";
import Dashboard from "./pages/Report/Dashboard";

// Layouts
const PublicLayout = () => <Outlet />;

const PrivateLayout = () => {
  const token = localStorage.getItem("token");
  
  if (!token)
    return <Navigate to="/login" replace />;

  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Private routes */}
        <Route element={<PrivateLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/transactions" element={<TransactionPage />} />
          <Route path="/transactions/edit/:id" element={<TransactionPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
