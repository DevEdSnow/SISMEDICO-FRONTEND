
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface MedicoData {
    especialidad: string;
    cantidad: number;
}

interface MedicosChartProps {
    data?: MedicoData[];
}

const defaultData: MedicoData[] = [
    {
        especialidad: "Medicina General",
        cantidad: 8,
    },
    {
        especialidad: "Pediatría",
        cantidad: 5,
    },
    {
        especialidad: "Cardiología",
        cantidad: 4,
    },
    {
        especialidad: "Dermatología",
        cantidad: 3,
    },
    {
        especialidad: "Ginecología",
        cantidad: 6,
    },
];

function MedicosChart({
    data = defaultData,
}: MedicosChartProps) {
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
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{
                        top: 10,
                        right: 20,
                        left: 20,
                        bottom: 10,
                    }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                    />

                    <XAxis
                        type="number"
                        allowDecimals={false}
                    />

                    <YAxis
                        type="category"
                        dataKey="especialidad"
                        width={140}
                    />

                    <Tooltip />

                    <Bar
                        dataKey="cantidad"
                        name="Médicos"
                        radius={[
                            0,
                            6,
                            6,
                            0,
                        ]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default MedicosChart;

