import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Input from "../UI/Input";
import ThemeToggle from "../UI/ThemeToggle";

function Login() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("http://localhost:8000/auth/login", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(form)
            });

            if (!res.ok) {
                const errorData = await res.json();
                setError(errorData.detail || "Erro ao fazer login.");
                return;
            }

            const data = await res.json();
            localStorage.setItem("token", data.access_token);

            // Redirecionar para dashboard ou home protegida
            navigate("/home");
        } catch (err) {
            setError("Erro ao conectar com o servidor.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            {/* Theme Toggle */}
            <div className="fixed top-4 right-4 z-10">
                <ThemeToggle />
            </div>
            
            <div className="w-full max-w-md">
                <Card className="animate-slide-up">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Bem-vindo de volta!</h2>
                        <p className="text-gray-600">Faça login para acessar sua conta</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            type="email"
                            name="email"
                            label="Email"
                            placeholder="seu@email.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                            icon={(props) => (
                                <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                            )}
                        />

                        <Input
                            type="password"
                            name="password"
                            label="Senha"
                            placeholder="Digite sua senha"
                            value={form.password}
                            onChange={handleChange}
                            required
                            icon={(props) => (
                                <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            )}
                        />

                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <div className="flex">
                                    <svg className="w-5 h-5 text-red-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="text-sm text-red-600">{error}</p>
                                </div>
                            </div>
                        )}

                        <Button 
                            type="submit" 
                            variant="primary" 
                            size="lg" 
                            className="w-full"
                            loading={loading}
                        >
                            {loading ? "Entrando..." : "Entrar"}
                        </Button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            Não tem conta?{" "}
                            <Link 
                                to="/register" 
                                className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
                            >
                                Cadastre-se agora
                            </Link>
                        </p>
                        
                        <div className="mt-4">
                            <Link 
                                to="/" 
                                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                ← Voltar para home
                            </Link>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default Login;