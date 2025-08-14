import { Link } from "react-router-dom";
import styles from "./Home_NEW.module.css";

function Home() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.logo}>
                    <h1>FinanceApp</h1>
                    <span className={styles.tagline}>Gerencie suas finanças com facilidade</span>
                </div>
            </header>

            <main className={styles.main}>
                <div className={styles.hero}>
                    <h2 className={styles.heroTitle}>
                        Controle total das suas <span className={styles.highlight}>finanças</span>
                    </h2>
                    <p className={styles.heroDescription}>
                        Organize suas transferências, categorize seus gastos e tenha uma visão clara 
                        da sua vida financeira em um só lugar.
                    </p>
                </div>

                <div className={styles.features}>
                    <div className={styles.feature}>
                        <div className={styles.featureIcon}>📊</div>
                        <h3>Dashboard Intuitivo</h3>
                        <p>Visualize suas transferências de forma clara e organizada</p>
                    </div>
                    <div className={styles.feature}>
                        <div className={styles.featureIcon}>🏷️</div>
                        <h3>Categorização</h3>
                        <p>Organize seus gastos por categorias personalizadas</p>
                    </div>
                    <div className={styles.feature}>
                        <div className={styles.featureIcon}>🔒</div>
                        <h3>Segurança</h3>
                        <p>Seus dados financeiros protegidos com total segurança</p>
                    </div>
                </div>

                <div className={styles.actions}>
                    <Link to="/login" className={`${styles.button} ${styles.primary}`}>
                        Fazer Login
                    </Link>
                    <Link to="/register" className={`${styles.button} ${styles.secondary}`}>
                        Criar Conta
                    </Link>
                </div>
            </main>

            <footer className={styles.footer}>
                <p>&copy; 2024 FinanceApp. Simplifique sua vida financeira.</p>
            </footer>
        </div>
    );
}

export default Home;