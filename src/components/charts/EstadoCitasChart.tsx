
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

interface EstadoCita {
    name: string;
    value: number;
}

interface EstadoCitasChartProps {
    data?: EstadoCita[];
}

const defaultData: EstadoCita[] = [
    {
        name: "Pendientes",
        value: 35,
    },
    {
        name: "Confirmadas",
        value: 45,
    },
    {
        name: "Completadas",
        value: 60,
    },
    {
        name: "Canceladas",
        value: 15,
    },
];

const COLORS = [
    "#f59e0b",
    "#3b82f6",
    "#22c55e",
    "#ef4444",
];

function EstadoCitasChart({
    data = defaultData,
}: EstadoCitasChartProps) {
    return (
        <div
            style={{
                width: "100%",
                height: 350,
            }}
        >
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={110}
                        innerRadius={60}
                        paddingAngle={3}
                        label
                    >
                        {data.map((_, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={
                                    COLORS[
                                        index % COLORS.length
                                    ]
                                }
                            />
                        ))}
                    </Pie>

                    <Tooltip />

                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default EstadoCitasChart;

