import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

function ExpensesByCategoryChart({ data }) {
    return (
        <div className="card">
            <h3>Expenses by category</h3>

            <PieChart width={400} height={300}>
                <Pie
                    data={data}
                    dataKey="percentage"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                >
                    {
                        data.map(
                            (_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            )
                        )
                    }
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
}

export default ExpensesByCategoryChart;