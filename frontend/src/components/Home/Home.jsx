import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TransactionList from "../Transaction/TransactionList";

import styles from "./Home.module.css";

function Home() {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return navigate("/login");
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await fetch("http://localhost:8000/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error("Erro ao buscar transações:", err);
    }
  };

  const goToTransactionPage = () => {
    navigate("/transactions");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <h2>Dashboard Financeiro</h2>
      <button className={styles.addButton} onClick={goToTransactionPage}>
        Nova Transação
      </button>

      <TransactionList transactions={transactions} />

      <button className={styles.logoutButton} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Home;
