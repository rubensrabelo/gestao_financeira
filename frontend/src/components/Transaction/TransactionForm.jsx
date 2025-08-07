import { useState } from "react";
import styles from "./TransactionForm.module.css";

function TransactionForm({ onAdd, categories }) {
  const [form, setForm] = useState({
    transaction_date: "",
    type: "income",
    amount: "",
    category_id: "",
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      transaction_date: form.transaction_date,
      type: form.type,
      amount: parseFloat(form.amount),
      category_id: parseInt(form.category_id),
    };

    try {
      await fetch("http://localhost:8000/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      setForm({
        transaction_date: "",
        type: "income",
        amount: "",
        category_id: "",
      });

      onAdd();
    } catch (err) {
      console.error("Erro ao adicionar transação:", err);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="date"
        name="transaction_date"
        value={form.transaction_date}
        onChange={handleChange}
        required
      />

      <select name="type" value={form.type} onChange={handleChange}>
        <option value="income">Entrada</option>
        <option value="expense">Saída</option>
      </select>

      <input
        name="amount"
        type="number"
        placeholder="Valor"
        value={form.amount}
        onChange={handleChange}
        required
        min={0}
      />

      <select
        name="category_id"
        value={form.category_id}
        onChange={handleChange}
        required
      >
        <option value="">Selecione Categoria</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <button type="submit">Adicionar</button>
    </form>
  );
}

export default TransactionForm;
