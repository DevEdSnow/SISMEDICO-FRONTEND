
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface PacienteData {
    mes: string;
    pacientes: number;
}

interface PacientesChartProps {
    data?: PacienteData[];
}

const defaultData: PacienteData[] = [
    {
        mes: "Ene",
        pacientes: 20,
    },
    {
        mes: "Feb",
        pacientes: 35,
    },
    {
        mes: "Mar",
        pacientes: 31,
    },
    {
        mes: "Abr",
        pacientes: 48,
    },
    {
        mes: "May",
        pacientes: 55,
    },
    {
        mes: "Jun",
        pacientes: 64,
    },
];

function PacientesChart({
    data = defaultData,
}: PacientesChartProps) {
    return (
        <div
            style={{
                width: "100%",
                height: 350,
            }}
        >
            <ResponsiveContainer
                width="100%"
                height="100%"
            >
                <LineChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 20,
                        left: 10,
                        bottom: 10,
                    }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                    />

                    <XAxis
                        dataKey="mes"
                    />

                    <YAxis
                        allowDecimals={false}
                    />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="pacientes"
                        name="Pacientes"
                        strokeWidth={3}
                        dot={{
                            r: 5,
                        }}
                        activeDot={{
                            r: 7,
                        }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default PacientesChart;

