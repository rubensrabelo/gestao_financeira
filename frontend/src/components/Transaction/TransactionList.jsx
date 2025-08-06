import styles from "./TransactionList.module.css";

function TransactionList({ transactions }) {
  return (
    <div className={styles.list}>
      <h3>Histórico</h3>
      <ul>
        {transactions.map((t) => (
          <li key={t.id} className={styles.item}>
            <strong>{t.type.toUpperCase()}</strong> - R${t.value} - {t.category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;