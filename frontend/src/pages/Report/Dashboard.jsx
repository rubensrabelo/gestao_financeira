import { useEffect, useState } from "react";
import { getExpensesByCategory, getIndicators, getSummary } from "../../api/services/reports.service";

import SummaryCard from "./Components/SummaryCard";
import IndicatorsCard from "./Components/IndicatorsCard";
import ExpensesByCategoryChart from "./Components/ExpensesByCategoryChart";

function Dashboard() {
    const [summary, setSummary] = useState(null);
    const [indicators, setIndicators] = useState(null);
    const [expenseByCat, setExpenseByCat] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const summaryData = await getSummary(9, 2025);
                const indicatorsData = await getIndicators(9, 2025);
                const expensesData = await getExpensesByCategory()

                setSummary(summaryData);
                setIndicators(indicatorsData);
                setExpenseByCat(expensesData);
            } catch (err) {
                console.error("Erro ao buscar dados: ", err);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <div>
                <h1>Finance Dashboard</h1>
                {
                    summary && (
                        <SummaryCard
                            income={summary.total_income}
                            expenses={summary.total_expenses}
                            balance={summary.balance}
                        />
                    )
                }
                {
                    indicators && (
                        <IndicatorsCard
                            commited={indicators.income_commited_ratio}
                            savings={indicators.savings_rate}
                        />
                    )
                }
                {
                    expenseByCat.length > 0 && (
                        <ExpensesByCategoryChart data={expenseByCat} />
                    )
                }
            </div>
        </>
    );
}

export default Dashboard;