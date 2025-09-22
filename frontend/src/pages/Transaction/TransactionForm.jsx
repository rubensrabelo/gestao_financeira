import { useState, useEffect } from "react";
import CategoryForm from "../Category/CategoryForm";
import styles from "./TransactionForm.module.css";

function TransactionForm({ onAdd, categories, refreshCategories, initialData }) {
  const [form, setForm] = useState({
    transaction_date: "",
    type: "income",
    amount: "",
    category_id: "",
  });
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const token = localStorage.getItem("token");

  // Preenche os campos se for edição
  useEffect(() => {
    if (initialData) {
      setForm({
        transaction_date: initialData.transaction_date
          ? initialData.transaction_date.split("T")[0]
          : "",
        type: initialData.type || "income",
        amount: initialData.amount || "",
        category_id: initialData.category?.id || initialData.category_id || "",
      });
    }
  }, [initialData]);

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
      const url = initialData
        ? `http://localhost:8000/transactions/${initialData.id}`
        : "http://localhost:8000/transactions";
      const method = initialData ? "PUT" : "POST";

      await fetch(url, {
        method,
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

      onAdd(); // volta ou atualiza a lista
    } catch (err) {
      console.error("Erro ao salvar transação:", err);
    }
  };

  const handleCategoryAdded = () => {
    refreshCategories();
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
          <option value="income">Entrada</option>
          <option value="expense">Saída</option>
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

        <button type="submit">
          {initialData ? "Salvar Alterações" : "Adicionar"}
        </button>
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
