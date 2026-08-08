
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface CitaData {
    mes: string;
    citas: number;
}

interface CitasChartProps {
    data?: CitaData[];
}

const defaultData: CitaData[] = [
    { mes: "Ene", citas: 42 },
    { mes: "Feb", citas: 55 },
    { mes: "Mar", citas: 48 },
    { mes: "Abr", citas: 67 },
    { mes: "May", citas: 73 },
    { mes: "Jun", citas: 81 },
];

function CitasChart({ data = defaultData }: CitasChartProps) {
    return (
        <div
            style={{
                width: "100%",
                height: 350,
            }}
        >
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="mes" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="citas"
                        name="Citas"
                        radius={[6, 6, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default CitasChart;

