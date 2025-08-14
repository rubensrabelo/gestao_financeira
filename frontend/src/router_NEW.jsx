import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home_NEW"; // Nova Home como página inicial
import Landing from "./components/Landing/Landing_NEW"; // Nova Landing como dashboard
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Nova estrutura sugerida */}
                <Route path="/" element={<Home />} />              {/* Home inicial com navegação para login/registro */}
                <Route path="/login" element={<Login />} />        {/* Login existente */}
                <Route path="/register" element={<Register />} />  {/* Registro existente */}
                <Route path="/dashboard" element={<Landing />} />  {/* Dashboard protegido (ex-Landing) */}
                
                {/* Rotas antigas mantidas para compatibilidade - podem ser removidas depois */}
                <Route path="/home" element={<Landing />} />       {/* Redireciona /home para dashboard */}
                <Route path="/landing" element={<Landing />} />    {/* Redireciona /landing para dashboard */}
            </Routes>
        </BrowserRouter>
    );
}