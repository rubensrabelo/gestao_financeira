import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";


export default function AppRouter() {
    return (
        <>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
        </Routes>
        </BrowserRouter>
        </>
    );
}