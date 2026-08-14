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
    fetchCitas,
    removeCita,
} from "../../store/cita/citaSlice";

import CitaTable from "../../components/tables/CitaTable";

function Citas() {
    const dispatch = useAppDispatch();

    const {
        citas,
        loading,
        error,
    } = useAppSelector(
        (state) => state.cita
    );

    const [busqueda, setBusqueda] =
        useState("");

    useEffect(() => {
        dispatch(fetchCitas());
    }, [dispatch]);

    const citasFiltradas =
        citas.filter((cita) => {
            const texto =
                busqueda
                    .toLowerCase()
                    .trim();

            if (!texto) {
                return true;
            }

            return (
                String(cita.id)
                    .toLowerCase()
                    .includes(texto) ||
                String(
                    cita.nombrePaciente
                )
                    .toLowerCase()
                    .includes(texto) ||
                String(
                    cita.nombreMedico
                )
                    .toLowerCase()
                    .includes(texto) ||
                String(
                    cita.estado
                )
                    .toLowerCase()
                    .includes(texto)
            );
        });

    const handleDelete = async (
        id: number
    ) => {
        const confirmar =
            window.confirm(
                "¿Deseas eliminar esta cita?"
            );

        if (!confirmar) {
            return;
        }

        await dispatch(
            removeCita(id)
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
                        Citas médicas
                    </h1>

                    <p
                        style={{
                            color: "#666",
                        }}
                    >
                        Administración de citas
                        médicas.
                    </p>
                </div>

                <Button
                    variant="contained"
                    onClick={() =>
                        console.log(
                            "Nueva cita"
                        )
                    }
                >
                    Nueva cita
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
                    label="Buscar cita"
                    placeholder="Paciente, médico, estado..."
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

            <CitaTable
                citas={citasFiltradas}
                loading={loading}
                onView={(cita) => {
                    console.log(
                        "Ver cita:",
                        cita
                    );
                }}
                onEdit={(cita) => {
                    console.log(
                        "Editar cita:",
                        cita
                    );
                }}
                onDelete={(cita) =>
                    handleDelete(
                        cita.id
                    )
                }
            />
        </DashboardLayout>
    );
}

export default Citas;