import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Input from "../UI/Input";
import ThemeToggle from "../UI/ThemeToggle";

function Register() {
    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
   
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("http://localhost:8000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.detail || "Erro ao cadastrar.");
                return;
            }

            setSuccess(true);
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            console.error("Erro na conexão:", error);
            setError("Erro ao conectar com o servidor.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                {/* Theme Toggle */}
                <div className="fixed top-4 right-4 z-10">
                    <ThemeToggle />
                </div>
                
                <div className="w-full max-w-md">
                    <Card className="text-center animate-bounce-in">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Cadastro realizado!</h2>
                        <p className="text-gray-600 mb-4">Sua conta foi criada com sucesso. Redirecionando para o login...</p>
                        <div className="spinner mx-auto"></div>
                    </Card>
                </div>
            </div>
        );
    }

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
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Criar sua conta</h2>
                        <p className="text-gray-600">Preencha os dados para começar</p>
                    </div>

                    {/* Register Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                name="firstname"
                                label="Nome"
                                placeholder="Seu nome"
                                value={form.firstname}
                                onChange={handleChange}
                                required
                                icon={(props) => (
                                    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                )}
                            />

                            <Input
                                name="lastname"
                                label="Sobrenome"
                                placeholder="Seu sobrenome"
                                value={form.lastname}
                                onChange={handleChange}
                                required
                            />
                        </div>

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
                            placeholder="Crie uma senha segura"
                            value={form.password}
                            onChange={handleChange}
                            required
                            helperText="Mínimo de 6 caracteres"
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
                            className="w-full mt-6"
                            loading={loading}
                        >
                            {loading ? "Criando conta..." : "Criar conta"}
                        </Button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            Já tem uma conta?{" "}
                            <Link 
                                to="/login" 
                                className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
                            >
                                Faça login
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

export default Register;
