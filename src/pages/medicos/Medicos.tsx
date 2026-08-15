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
    fetchMedicos,
    removeMedico,
} from "../../store/medico/medicoSlice";

import MedicoTable from "../../components/tables/MedicoTable";

function Medicos() {
    const dispatch = useAppDispatch();

    const {
        medicos,
        loading,
        error,
    } = useAppSelector(
        (state) => state.medico
    );

    const [busqueda, setBusqueda] =
        useState("");

    useEffect(() => {
        dispatch(fetchMedicos());
    }, [dispatch]);

    const medicosFiltrados =
        medicos.filter((medico) => {
            const texto =
                busqueda
                    .toLowerCase()
                    .trim();

            if (!texto) {
                return true;
            }

            return (
                String(
                    medico.nombre
                )
                    .toLowerCase()
                    .includes(texto) ||
                String(
                    medico.apellido
                )
                    .toLowerCase()
                    .includes(texto) ||
                String(
                    medico.correo
                )
                    .toLowerCase()
                    .includes(texto) ||
                String(
                    medico.telefono
                )
                    .toLowerCase()
                    .includes(texto) ||
                String(
                    medico.especialidad
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
                "¿Deseas eliminar este médico?"
            );

        if (!confirmar) {
            return;
        }

        await dispatch(
            removeMedico(id)
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
                        Médicos
                    </h1>

                    <p
                        style={{
                            color: "#666",
                            marginTop: "8px",
                        }}
                    >
                        Administración de
                        médicos del sistema.
                    </p>
                </div>

                <Button
                    variant="contained"
                    onClick={() =>
                        console.log(
                            "Nuevo médico"
                        )
                    }
                >
                    Nuevo médico
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
                    label="Buscar médico"
                    placeholder="Nombre, apellido, correo, teléfono o especialidad..."
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

            <MedicoTable
                medicos={
                    medicosFiltrados
                }
                loading={loading}
                onView={(medico) => {
                    console.log(
                        "Ver médico:",
                        medico
                    );
                }}
                onEdit={(medico) => {
                    console.log(
                        "Editar médico:",
                        medico
                    );
                }}
                onDelete={(medico) =>
                    handleDelete(
                        medico.id
                    )
                }
            />
        </DashboardLayout>
    );
}

export default Medicos;