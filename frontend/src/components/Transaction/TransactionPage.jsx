import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TransactionForm from "../Transaction/TransactionForm";

import styles from "./TransactionPage.module.css";

function TransactionPage() {
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:8000/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Erro ao buscar categorias:", err);
    }
  };

  const handleTransactionAdded = () => {
    navigate("/home");
  };

  const handleBack = () => {
    navigate("/home");
  };

  return (
    <div className={styles.container}>
      <h2>Cadastrar Transação e Categoria</h2>

      <button className={styles.backButton} onClick={handleBack}>
        Voltar
      </button>

      <div className={styles.formSection}>
        <h3>Nova Transação</h3>
        <TransactionForm
          onAdd={handleTransactionAdded}
          categories={categories}
          refreshCategories={fetchCategories}
        />
      </div>
    </div>
  );
}

export default TransactionPage;
