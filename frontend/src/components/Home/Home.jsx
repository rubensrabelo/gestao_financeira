import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TransactionList from "../Transaction/TransactionList";
import TransactionForm from "../Transaction/TransactionForm";
import CategoryForm from "../Category/CategoryForm";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ThemeToggle from "../UI/ThemeToggle";

function Home() {
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ income: 0, expenses: 0, balance: 0 });
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token)
            return navigate("/login");
        fetchTransactions();
        fetchCategories();
    }, []);

    useEffect(() => {
        calculateStats();
    }, [transactions]);

    const calculateStats = () => {
        const income = transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
        
        const expenses = transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
        
        setStats({
            income,
            expenses,
            balance: income - expenses
        });
    };

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const res = await fetch("http://localhost:8000/transactions", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setTransactions(data);
        } catch (err) {
            console.error("Erro ao buscar transações:", err);
        } finally {
            setLoading(false);
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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="spinner mx-auto mb-4"></div>
                    <p className="text-gray-600">Carregando seu dashboard...</p>
                </div>
            </div>
        );
    }

            return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard Financeiro</h1>
                        <p className="text-gray-600 dark:text-gray-300">Gerencie suas finanças de forma inteligente</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <Button 
                            variant="ghost" 
                            onClick={handleLogout}
                            className="self-start md:self-auto"
                        >
                            Sair
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100 text-sm font-medium">Receitas</p>
                                <p className="text-2xl font-bold">
                                    R$ {stats.income.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                                </svg>
                            </div>
                        </div>
                    </Card>

                    <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-red-100 text-sm font-medium">Despesas</p>
                                <p className="text-2xl font-bold">
                                    R$ {stats.expenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                                </svg>
                            </div>
                        </div>
                    </Card>

                    <Card className={`${stats.balance >= 0 ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gradient-to-r from-orange-500 to-orange-600'} text-white`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100 text-sm font-medium">Saldo</p>
                                <p className="text-2xl font-bold">
                                    R$ {stats.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Transaction Form */}
                    <div className="lg:col-span-1">
                        <Card>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Nova Transação</h3>
                            <TransactionForm onAdd={fetchTransactions} categories={categories} />
                        </Card>
                    </div>

                    {/* Transaction List */}
                    <div className="lg:col-span-2">
                        <Card>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Transações Recentes</h3>
                            <TransactionList transactions={transactions.slice(0, 10)} />
                        </Card>
                    </div>
                </div>

                {/* Category Management */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Gerenciar Categorias</h3>
                        <CategoryForm onAdd={fetchCategories} />
                    </Card>

                    <Card>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Categorias Existentes</h3>
                        <div className="space-y-2">
                            {categories.length > 0 ? (
                                categories.map((category) => (
                                    <div key={category.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <span className="font-medium text-gray-900 dark:text-white">{category.name}</span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">{category.type}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400 text-center py-4">Nenhuma categoria encontrada</p>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Home;