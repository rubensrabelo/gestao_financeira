import { useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/home");
  };

  const handleDashBoard = () => {
    navigate("/dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>FinanceApp</div>
      <div className={styles.actions}>
        <button onClick={handleHome}>Home</button>
        <button onClick={handleDashBoard}>Dashboard</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
