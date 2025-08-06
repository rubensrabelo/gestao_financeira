import { useState } from "react";
import styles from "./TransactionForm.module.css";

function TransactionForm({ onAdd, categories }) {
  const [form, setForm] = useState({ type: "income", value: "", category: "" });
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:8000/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      setForm({ type: "income", value: "", category: "" });
      onAdd();
    } catch (err) {
      console.error("Erro ao adicionar transação:", err);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <select name="type" value={form.type} onChange={handleChange}>
        <option value="income">Ganho</option>
        <option value="expense">Gasto</option>
      </select>
      <input name="value" type="number" placeholder="Valor" value={form.value} onChange={handleChange} required />
      <select name="category" value={form.category} onChange={handleChange} required>
        <option value="">Selecione Categoria</option>
        {categories.map((c) => (
          <option key={c.id} value={c.name}>{c.name}</option>
        ))}
      </select>
      <button type="submit">Adicionar</button>
    </form>
  );
}