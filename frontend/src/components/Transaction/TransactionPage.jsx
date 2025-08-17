import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TransactionForm from "../Transaction/TransactionForm";
import styles from "./TransactionPage.module.css";

function TransactionPage() {
  const [categories, setCategories] = useState([]);
  const [transaction, setTransaction] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { id } = useParams(); // pega o id da rota se for edição

  useEffect(() => {
    fetchCategories();
    if (id) {
      fetchTransactionById(id);
      setIsEditing(true);
    }
  }, [id]);

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

  const fetchTransactionById = async (transactionId) => {
    try {
      const res = await fetch(`http://localhost:8000/transactions/${transactionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Erro ao buscar transação para edição");
      const data = await res.json();
      setTransaction(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTransactionSaved = () => {
    navigate("/home");
  };

  const handleBack = () => {
    navigate("/home");
  };

  return (
    <div className={styles.container}>
      <h2>{isEditing ? "Editar Transação" : "Cadastrar Transação"}</h2>

      <button className={styles.backButton} onClick={handleBack}>
        Voltar
      </button>

      <div className={styles.formSection}>
        <TransactionForm
          onAdd={handleTransactionSaved}
          categories={categories}
          refreshCategories={fetchCategories}
          initialData={transaction} // passa a transação se estiver editando
          isEditing={isEditing}    // flag de edição
        />
      </div>
    </div>
  );
}

export default TransactionPage;
