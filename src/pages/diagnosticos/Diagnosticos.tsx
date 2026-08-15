import {
    useEffect,
    useState,
} from "react";

import {
    Button,
    Paper,
    TextField,
} from "@mui/material";

import DashboardLayout from "../../layouts/DashboardLayout";

import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";

import {
    fetchDiagnosticos,
    removeDiagnostico,
} from "../../store/diagnostico/diagnosticoSlice";

import DiagnosticoTable from "../../components/tables/DiagnosticoTable";

function Diagnosticos() {
    const dispatch = useAppDispatch();

    const {
        diagnosticos,
        loading,
        error,
    } = useAppSelector(
        (state) => state.diagnostico
    );

    const [busqueda, setBusqueda] =
        useState("");

    useEffect(() => {
        dispatch(fetchDiagnosticos());
    }, [dispatch]);

    const diagnosticosFiltrados =
        diagnosticos.filter(
            (diagnostico) => {
                const texto =
                    busqueda
                        .toLowerCase()
                        .trim();

                if (!texto) {
                    return true;
                }

                return (
                    String(
                        diagnostico.id
                    )
                        .toLowerCase()
                        .includes(texto) ||
                    String(
                        diagnostico.diagnostico
                    )
                        .toLowerCase()
                        .includes(texto) ||
                    String(
                        diagnostico.tratamiento
                    )
                        .toLowerCase()
                        .includes(texto) ||
                    String(
                        diagnostico.observaciones
                    )
                        .toLowerCase()
                        .includes(texto)
                );
            }
        );

    const handleDelete = async (
        id: number
    ) => {
        const confirmar =
            window.confirm(
                "¿Deseas eliminar este diagnóstico?"
            );

        if (!confirmar) {
            return;
        }

        await dispatch(
            removeDiagnostico(id)
        );
    };

    return (
        <DashboardLayout>
            <div
                style={{
                    display: "flex",
                    justifyContent:
                        "space-between",
                    alignItems: "center",
                    marginBottom: "24px",
                    gap: "16px",
                }}
            >
                <div>
                    <h1
                        style={{
                            margin: 0,
                            fontSize: "28px",
                        }}
                    >
                        Diagnósticos
                    </h1>

                    <p
                        style={{
                            color: "#666",
                        }}
                    >
                        Administración de
                        diagnósticos médicos.
                    </p>
                </div>

                <Button
                    variant="contained"
                    onClick={() =>
                        console.log(
                            "Nuevo diagnóstico"
                        )
                    }
                >
                    Nuevo diagnóstico
                </Button>
            </div>

            <Paper
                elevation={2}
                sx={{
                    padding: 2,
                    marginBottom: 3,
                }}
            >
                <TextField
                    label="Buscar diagnóstico"
                    placeholder="Diagnóstico, tratamiento u observaciones..."
                    value={busqueda}
                    onChange={(event) =>
                        setBusqueda(
                            event.target.value
                        )
                    }
                    fullWidth
                />
            </Paper>

            {error && (
                <div
                    style={{
                        marginBottom: "16px",
                        padding: "12px",
                        borderRadius: "6px",
                        backgroundColor:
                            "#ffebee",
                        color: "#c62828",
                    }}
                >
                    {error}
                </div>
            )}

            <DiagnosticoTable
                diagnosticos={
                    diagnosticosFiltrados
                }
                loading={loading}
                onView={(diagnostico) => {
                    console.log(
                        "Ver diagnóstico:",
                        diagnostico
                    );
                }}
                onEdit={(diagnostico) => {
                    console.log(
                        "Editar diagnóstico:",
                        diagnostico
                    );
                }}
                onDelete={(diagnostico) =>
                    handleDelete(
                        diagnostico.id
                    )
                }
            />
        </DashboardLayout>
    );
}

export default Diagnosticos;