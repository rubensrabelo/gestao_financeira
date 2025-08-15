import styles from "./TransactionList.module.css";
import { FaEdit, FaTrash } from "react-icons/fa";

function TransactionList({ transactions, loading = false, onEdit, onDelete }) {
  const typeTranslation = { income: "Entrada", expense: "Saída" };

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
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className={styles.empty}>
                Carregando...
              </td>
            </tr>
          ) : rows.length === 0 ? (
            <tr>
              <td colSpan="5" className={styles.empty}>
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
                <td>
                  <button onClick={() => onEdit?.(t)} className={styles.editBtn}>
                    <FaEdit />
                  </button>
                  <button onClick={() => onDelete?.(t.id)} className={styles.deleteBtn}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
