import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Landing_NEW.module.css";

function Landing() {
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showTransactionForm, setShowTransactionForm] = useState(false);
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            return navigate("/login");
        }
        fetchTransactions();
        fetchCategories();
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const res = await fetch("http://localhost:8000/auth/me", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const userData = await res.json();
                setUser(userData);
            }
        } catch (err) {
            console.error("Erro ao buscar dados do usuário:", err);
        }
    };

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

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    const totalIncome = transactions
        .filter(t => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
        .filter(t => t.amount < 0)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const balance = totalIncome - totalExpense;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.userInfo}>
                    <h1>Dashboard Financeiro</h1>
                    {user && <span className={styles.welcome}>Olá, {user.name || user.email}!</span>}
                </div>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                    Sair
                </button>
            </header>

            <main className={styles.main}>
                {/* Cards de resumo */}
                <div className={styles.summary}>
                    <div className={styles.summaryCard}>
                        <div className={styles.cardIcon}>💰</div>
                        <div className={styles.cardContent}>
                            <h3>Saldo Total</h3>
                            <p className={`${styles.amount} ${balance >= 0 ? styles.positive : styles.negative}`}>
                                {formatCurrency(balance)}
                            </p>
                        </div>
                    </div>
                    <div className={styles.summaryCard}>
                        <div className={styles.cardIcon}>📈</div>
                        <div className={styles.cardContent}>
                            <h3>Total Receitas</h3>
                            <p className={`${styles.amount} ${styles.positive}`}>
                                {formatCurrency(totalIncome)}
                            </p>
                        </div>
                    </div>
                    <div className={styles.summaryCard}>
                        <div className={styles.cardIcon}>📉</div>
                        <div className={styles.cardContent}>
                            <h3>Total Despesas</h3>
                            <p className={`${styles.amount} ${styles.negative}`}>
                                {formatCurrency(totalExpense)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Ações rápidas */}
                <div className={styles.quickActions}>
                    <button 
                        onClick={() => setShowTransactionForm(true)}
                        className={`${styles.actionBtn} ${styles.primary}`}
                    >
                        <span className={styles.btnIcon}>➕</span>
                        Nova Transferência
                    </button>
                    <button 
                        onClick={() => setShowCategoryForm(true)}
                        className={`${styles.actionBtn} ${styles.secondary}`}
                    >
                        <span className={styles.btnIcon}>🏷️</span>
                        Nova Categoria
                    </button>
                </div>

                {/* Lista de transferências */}
                <div className={styles.transactionsSection}>
                    <div className={styles.sectionHeader}>
                        <h2>Transferências Recentes</h2>
                        <span className={styles.transactionCount}>
                            {transactions.length} transferências
                        </span>
                    </div>

                    {transactions.length === 0 ? (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}>📋</div>
                            <h3>Nenhuma transferência encontrada</h3>
                            <p>Comece adicionando sua primeira transferência!</p>
                            <button 
                                onClick={() => setShowTransactionForm(true)}
                                className={`${styles.actionBtn} ${styles.primary}`}
                            >
                                Adicionar Transferência
                            </button>
                        </div>
                    ) : (
                        <div className={styles.transactionsList}>
                            {transactions.map((transaction) => (
                                <div key={transaction.id} className={styles.transactionItem}>
                                    <div className={styles.transactionIcon}>
                                        {transaction.amount > 0 ? '💰' : '💸'}
                                    </div>
                                    <div className={styles.transactionDetails}>
                                        <h4>{transaction.description}</h4>
                                        <div className={styles.transactionMeta}>
                                            <span className={styles.category}>
                                                {categories.find(c => c.id === transaction.category_id)?.name || 'Sem categoria'}
                                            </span>
                                            <span className={styles.date}>
                                                {formatDate(transaction.date)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={`${styles.transactionAmount} ${transaction.amount > 0 ? styles.positive : styles.negative}`}>
                                        {transaction.amount > 0 ? '+' : ''}
                                        {formatCurrency(Math.abs(transaction.amount))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Modais para formulários */}
            {showTransactionForm && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <h3>Nova Transferência</h3>
                            <button 
                                onClick={() => setShowTransactionForm(false)}
                                className={styles.closeBtn}
                            >
                                ✕
                            </button>
                        </div>
                        <p className={styles.modalMessage}>
                            Aqui você integraria o componente TransactionForm.
                            Este é apenas um preview da interface sugerida.
                        </p>
                        <button 
                            onClick={() => setShowTransactionForm(false)}
                            className={styles.cancelBtn}
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}

            {showCategoryForm && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <h3>Nova Categoria</h3>
                            <button 
                                onClick={() => setShowCategoryForm(false)}
                                className={styles.closeBtn}
                            >
                                ✕
                            </button>
                        </div>
                        <p className={styles.modalMessage}>
                            Aqui você integraria o componente CategoryForm.
                            Este é apenas um preview da interface sugerida.
                        </p>
                        <button 
                            onClick={() => setShowCategoryForm(false)}
                            className={styles.cancelBtn}
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Landing;