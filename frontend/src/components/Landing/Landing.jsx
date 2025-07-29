import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

function Home() {
    return (
        <>
            <div className={styles.container}>
                <h1>Bem-vindo!</h1>
                <div className={styles.buttons}>
                    <Link to="/login" className={styles.link}>Entrar</Link>
                    <Link to="/register" className={styles.link}>Cadastrar</Link>
                </div>
            </div>
        </>
    );
}

export default Home;