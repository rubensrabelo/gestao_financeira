import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8000/auth/login", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(form)
            });

            if (!res.ok) {
                const error = await res.json();
                setError(data.detail || "Erro ao fazer login.");
                return;
            }

            const data = await res.json();
            localStorage.setItem("token", data.access_token);

            // Redirecionar para dashboard ou home protegida
            navigate("/home");
        } catch (err) {
            setError("Erro ao conectar com o servidor.");
        }
    };

    return (
        <>
            <div className={styles.container}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Senha"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />

                    {error && <p className={styles.error}>{error}</p>}

                    <button type="submit">Entrar</button>
                </form>

                <p className={styles.linkText}>
                    Não tem conta? <Link to="/register">Cadastre-se</Link>
                </p>
            </div>
        </>
    );
}

export default Login;