import styles from "./TransactionList.module.css";

function TransactionList({ transactions, loading = false }) {
  const typeTranslation = {
    income: "Entrada",
    expense: "Saída",
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const [year, month, day] = dateStr.split("-").map(Number);
    return `${day.toString().padStart(2, "0")}/${month
      .toString()
      .padStart(2, "0")}/${year}`;
  };

  const formatCurrency = (value) => {
    if (value == null) return "-";
    return Number(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const rows = Array.isArray(transactions) ? transactions : [];

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
          {loading ? (
            <tr>
              <td colSpan="4" className={styles.empty}>
                Carregando...
              </td>
            </tr>
          ) : rows.length === 0 ? (
            <tr>
              <td colSpan="4" className={styles.empty}>
                Nenhuma transação encontrada.
              </td>
            </tr>
          ) : (
            rows.map((t) => (
              <tr key={t.id}>
                <td>{formatDate(t.transaction_date)}</td>
                <td>{typeTranslation[t.type] ?? t.type}</td>
                <td>{t?.category?.name ?? "-"}</td>
                <td>{formatCurrency(t.amount)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
