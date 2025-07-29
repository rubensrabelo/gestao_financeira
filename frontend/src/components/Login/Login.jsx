import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
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
                alert("Erro: " + error.detail);
                return;
            }

            const data = await res.json();
            localStorage.setItem("token", data.access_token);
            alert("Login bem-sucedido");

            // Redirecionar para dashboard ou home protegida
            // navigate('/dashboard');
        } catch (err) {
            alert("Erro ao conectar ao com o servidor.")
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
                    <button type="submit">Entrar</button>
                </form>
            </div>
        </>
    );
}

export default Login;