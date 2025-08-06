import { useState } from "react";
import styles from "./CategoryForm.module.css";

function CategoryForm({ onAdd }) {
  const [name, setName] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:8000/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });
      setName("");
      onAdd();
    } catch (err) {
      console.error("Erro ao cadastrar categoria:", err);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nova categoria" required />
      <button type="submit">Cadastrar Categoria</button>
    </form>
  );
}

export default CategoryForm;