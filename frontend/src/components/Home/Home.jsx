import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TransactionList from "../Transaction/TransactionList";

import styles from "./Home.module.css";

function Home() {
  const [transactions, setTransactions] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const limit = 10;

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchTransactions(offset);
  }, [offset]);

  const fetchTransactions = async (currentOffset) => {
    try {
      setIsLoading(true);
      setErrMsg("");

      const res = await fetch(
        `http://localhost:8000/transactions?offset=${currentOffset}&limit=${limit}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        setTransactions([]);
        setErrMsg(`Falha ao buscar transações (${res.status}): ${txt}`);
        return;
      }

      const data = await res.json();

      const sortedData = [...data].sort(
        (a, b) => new Date(a.transaction_date) - new Date(b.transaction_date)
      );

      setTransactions(sortedData);

      setTransactions(Array.isArray(sortedData) ? sortedData : []);
    } catch (err) {
      console.error("Erro ao buscar transações:", err);
      setTransactions([]);
      setErrMsg("Erro de rede ao buscar transações.");
    } finally {
      setIsLoading(false);
    }
  };

  const goToTransactionPage = () => {
    navigate("/transactions");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handlePrevious = () => {
    setOffset((prev) => Math.max(prev - limit, 0));
  };

  const handleNext = () => {
    if (transactions.length === limit) {
      setOffset((prev) => prev + limit);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Dashboard Financeiro</h2>

      <button className={styles.addButton} onClick={goToTransactionPage}>
        Nova Transação
      </button>

      {errMsg && <div className={styles.error}>{errMsg}</div>}

      <TransactionList transactions={transactions} loading={isLoading} />

      <div className={styles.pagination}>
        <button onClick={handlePrevious} disabled={offset === 0}>
          ◀ Anterior
        </button>

        <span className={styles.pageInfo}>
          {offset + 1}–{offset + (transactions.length || 0)}
          {transactions.length === limit ? ` (até +)` : ""}
        </span>

        <button onClick={handleNext} disabled={transactions.length < limit}>
          Próximo ▶
        </button>
      </div>

      <button className={styles.logoutButton} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Home;
