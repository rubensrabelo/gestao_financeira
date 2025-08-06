import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TransactionList from "../Transaction/TransactionList";
import TransactionForm from "../Transaction/TransactionForm";
import CategoryForm from "./CategoryForm";

import styles from "./Home.module.css";


function Home() {
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token)
            return navigate("/login");
        fetchTransactions();
        fetchCategories();
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

    return (
        <div className={styles.container}>
            <h2>Dashboard Financeiro</h2>
            <TransactionForm onAdd={fetchTransactions} categories={categories} />
            <TransactionList transactions={transactions} />
            <CategoryForm onAdd={fetchCategories} />
        </div>
    );
}

export default Home;