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
    fetchPacientes,
    removePaciente,
} from "../../store/paciente/pacienteSlice";

import PacienteTable from "../../components/tables/PacienteTable";

function Pacientes() {
    const dispatch = useAppDispatch();

    const {
        pacientes,
        loading,
        error,
    } = useAppSelector(
        (state) => state.paciente
    );

    const [busqueda, setBusqueda] =
        useState("");

    useEffect(() => {
        dispatch(fetchPacientes());
    }, [dispatch]);

    const pacientesFiltrados =
        pacientes.filter((paciente) => {
            const texto =
                busqueda
                    .toLowerCase()
                    .trim();

            if (!texto) {
                return true;
            }

            return (
                String(
                    paciente.nombre
                )
                    .toLowerCase()
                    .includes(texto) ||
                String(
                    paciente.apellido
                )
                    .toLowerCase()
                    .includes(texto) ||
                String(
                    paciente.correo
                )
                    .toLowerCase()
                    .includes(texto) ||
                String(
                    paciente.telefono
                )
                    .toLowerCase()
                    .includes(texto) ||
                String(
                    paciente.curp
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
                "¿Deseas eliminar este paciente?"
            );

        if (!confirmar) {
            return;
        }

        await dispatch(
            removePaciente(id)
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
                        Pacientes
                    </h1>

                    <p
                        style={{
                            color: "#666",
                            marginTop: "8px",
                        }}
                    >
                        Administración de
                        pacientes del sistema.
                    </p>
                </div>

                <Button
                    variant="contained"
                    onClick={() =>
                        console.log(
                            "Nuevo paciente"
                        )
                    }
                >
                    Nuevo paciente
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
                    label="Buscar paciente"
                    placeholder="Nombre, apellido, correo, teléfono o CURP..."
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

            <PacienteTable
                pacientes={
                    pacientesFiltrados
                }
                loading={loading}
                onView={(paciente) => {
                    console.log(
                        "Ver paciente:",
                        paciente
                    );
                }}
                onEdit={(paciente) => {
                    console.log(
                        "Editar paciente:",
                        paciente
                    );
                }}
                onDelete={(paciente) =>
                    handleDelete(
                        paciente.id
                    )
                }
            />
        </DashboardLayout>
    );
}

export default Pacientes;