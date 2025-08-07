import styles from "./TransactionList.module.css";

function TransactionList({ transactions }) {
  const typeTranslation = {
    income: "Entrada",
    expense: "Saída"
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-BR");
  };

  const formatCurrency = (value) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  };

  return (
    <div className={styles.list}>
      <h3>Histórico</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Data</th>
            <th>Tipo</th>
            <th>Categoria</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{formatDate(t.transaction_date)}</td>
              <td>{typeTranslation[t.type]}</td>
              <td>{t.category.name}</td>
              <td>{formatCurrency(t.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
