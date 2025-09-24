function IndicatorsCard({ commited, savings }) {
    return (
        <>
            <div className="card">
                <h3>Key Indicators</h3>
                <p>Income Commited: {commited.toFixed(2)}%</p>
                <p>Savings rate: {savings.toFixed(2)}%</p>
            </div>
        </>
    );
}

export default IndicatorsCard;