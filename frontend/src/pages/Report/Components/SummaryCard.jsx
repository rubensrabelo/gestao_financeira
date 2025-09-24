function SummaryCard({ income, expenses, balance }) {
    return (
        <>
            <div className="card">
                <h3>Summary</h3>
                <p>Income: ${income}</p>
                <p>Expenses: ${expenses}</p>
                <p>Balance: ${balance}</p>
            </div>
        </>
    );
}

export default SummaryCard;