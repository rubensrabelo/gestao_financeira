import { useState } from "react";
import CategoryForm from "../Category/CategoryForm";
import styles from "./TransactionForm.module.css";

function TransactionForm({ onAdd, categories, refreshCategories }) {
  const [form, setForm] = useState({
    transaction_date: "", // campo de data
    type: "income",
    amount: "",
    category_id: "",
  });
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "category_id" && value === "new") {
      setShowCategoryModal(true);
    }
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

  const handleCategoryAdded = () => {
    refreshCategories(); // atualiza categorias sem recarregar
    setShowCategoryModal(false);
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="date"
          name="transaction_date"
          value={form.transaction_date}
          onChange={handleChange}
          required
        />

        <select name="type" value={form.type} onChange={handleChange}>
          <option value="income">Ganho</option>
          <option value="expense">Gasto</option>
        </select>

        <input
          type="number"
          name="amount"
          placeholder="Valor"
          value={form.amount}
          onChange={handleChange}
          required
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
          <option value="new">Nova Categoria</option>
        </select>

        <button type="submit">Adicionar</button>
      </form>

      {showCategoryModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button
              className={styles.closeButton}
              onClick={() => setShowCategoryModal(false)}
            >
              X
            </button>
            <h3>Nova Categoria</h3>
            <CategoryForm onAdd={handleCategoryAdded} />
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionForm;
