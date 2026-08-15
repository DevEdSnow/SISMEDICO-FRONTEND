import {
    Paper,
} from "@mui/material";

import DashboardLayout from "../../layouts/DashboardLayout";

import EstadoCitasChart from "../../components/charts/EstadoCitasChart";
import MedicosChart from "../../components/charts/MedicosChart";
import PacientesChart from "../../components/charts/PacientesChart";

function Dashboard() {
    return (
        <DashboardLayout>
            <div
                style={{
                    marginBottom: "24px",
                }}
            >
                <h1
                    style={{
                        margin: 0,
                        fontSize: "28px",
                    }}
                >
                    Dashboard
                </h1>

                <p
                    style={{
                        color: "#666",
                        marginTop: "8px",
                    }}
                >
                    Resumen general del sistema
                    SISMEDICO.
                </p>
            </div>

            {/* Tarjetas de resumen */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "20px",
                    marginBottom: "24px",
                }}
            >
                <Paper
                    elevation={2}
                    sx={{
                        padding: 3,
                    }}
                >
                    <div
                        style={{
                            fontSize: "14px",
                            color: "#666",
                        }}
                    >
                        Pacientes
                    </div>

                    <div
                        style={{
                            fontSize: "32px",
                            fontWeight: "bold",
                            marginTop: "8px",
                        }}
                    >
                        --
                    </div>
                </Paper>

                <Paper
                    elevation={2}
                    sx={{
                        padding: 3,
                    }}
                >
                    <div
                        style={{
                            fontSize: "14px",
                            color: "#666",
                        }}
                    >
                        Médicos
                    </div>

                    <div
                        style={{
                            fontSize: "32px",
                            fontWeight: "bold",
                            marginTop: "8px",
                        }}
                    >
                        --
                    </div>
                </Paper>

                <Paper
                    elevation={2}
                    sx={{
                        padding: 3,
                    }}
                >
                    <div
                        style={{
                            fontSize: "14px",
                            color: "#666",
                        }}
                    >
                        Citas
                    </div>

                    <div
                        style={{
                            fontSize: "32px",
                            fontWeight: "bold",
                            marginTop: "8px",
                        }}
                    >
                        --
                    </div>
                </Paper>

                <Paper
                    elevation={2}
                    sx={{
                        padding: 3,
                    }}
                >
                    <div
                        style={{
                            fontSize: "14px",
                            color: "#666",
                        }}
                    >
                        Usuarios
                    </div>

                    <div
                        style={{
                            fontSize: "32px",
                            fontWeight: "bold",
                            marginTop: "8px",
                        }}
                    >
                        --
                    </div>
                </Paper>
            </div>

            {/* Gráficas */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(350px, 1fr))",
                    gap: "24px",
                }}
            >
                <Paper
                    elevation={2}
                    sx={{
                        padding: 2,
                    }}
                >
                    <h2
                        style={{
                            fontSize: "18px",
                            marginTop: 0,
                        }}
                    >
                        Estado de citas
                    </h2>

                    <EstadoCitasChart />
                </Paper>

                <Paper
                    elevation={2}
                    sx={{
                        padding: 2,
                    }}
                >
                    <h2
                        style={{
                            fontSize: "18px",
                            marginTop: 0,
                        }}
                    >
                        Médicos
                    </h2>

                    <MedicosChart />
                </Paper>

                <Paper
                    elevation={2}
                    sx={{
                        padding: 2,
                    }}
                >
                    <h2
                        style={{
                            fontSize: "18px",
                            marginTop: 0,
                        }}
                    >
                        Pacientes
                    </h2>

                    <PacientesChart />
                </Paper>
            </div>
        </DashboardLayout>
    );
}

export default Dashboard;