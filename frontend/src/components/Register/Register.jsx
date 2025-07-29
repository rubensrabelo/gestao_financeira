import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Register.module.css";

function Register() {
    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
        setSuccess("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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

            setSuccess("Usuário cadastrado com sucesso!");
            setForm({ firstname: "", lastname: "", email: "", password: "" });
        } catch (error) {
            console.error("Erro na conexão:", error);
            setError("Erro ao conectar com o servidor.");
        }
    };

    return (
        <div className={styles.container}>
            <h2>Cadastro de Usuário</h2>

            <form onSubmit={handleSubmit} className={styles.form}>
                {error && <p className={styles.error}>{error}</p>}
                {success && <p className={styles.success}>{success}</p>}

                <input
                    className={styles.input}
                    name="firstname"
                    placeholder="Nome"
                    value={form.firstname}
                    onChange={handleChange}
                    required
                />
                <input
                    className={styles.input}
                    name="lastname"
                    placeholder="Sobrenome"
                    value={form.lastname}
                    onChange={handleChange}
                    required
                />
                <input
                    className={styles.input}
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <input
                    className={styles.input}
                    type="password"
                    name="password"
                    placeholder="Senha"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className={styles.button}>
                    Cadastrar
                </button>
            </form>

            <p className={styles.linkText}>
                Já tem uma conta? <Link to="/login">Entrar</Link>
            </p>
        </div>
    );
}

export default Register;
