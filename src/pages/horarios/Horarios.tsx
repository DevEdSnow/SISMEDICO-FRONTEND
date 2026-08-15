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
    fetchHorarios,
    removeHorario,
} from "../../store/horario/horarioSlice";

import HorarioTable from "../../components/tables/HorarioTable";

function Horarios() {
    const dispatch = useAppDispatch();

    const {
        horarios,
        loading,
        error,
    } = useAppSelector(
        (state) => state.horario
    );

    const [busqueda, setBusqueda] =
        useState("");

    useEffect(() => {
        dispatch(fetchHorarios());
    }, [dispatch]);

    const horariosFiltrados =
        horarios.filter((horario) => {
            const texto =
                busqueda
                    .toLowerCase()
                    .trim();

            if (!texto) {
                return true;
            }

            return (
                String(
                    horario.diaSemana
                )
                    .toLowerCase()
                    .includes(texto) ||
                String(
                    horario.horaInicio
                )
                    .toLowerCase()
                    .includes(texto) ||
                String(
                    horario.horaFin
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
                "¿Deseas eliminar este horario?"
            );

        if (!confirmar) {
            return;
        }

        await dispatch(
            removeHorario(id)
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
                        Horarios
                    </h1>

                    <p
                        style={{
                            color: "#666",
                            marginTop: "8px",
                        }}
                    >
                        Administración de
                        horarios médicos.
                    </p>
                </div>

                <Button
                    variant="contained"
                    onClick={() =>
                        console.log(
                            "Nuevo horario"
                        )
                    }
                >
                    Nuevo horario
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
                    label="Buscar horario"
                    placeholder="Día, hora de inicio u hora de fin..."
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

            <HorarioTable
                horarios={
                    horariosFiltrados
                }
                loading={loading}
                onView={(horario) => {
                    console.log(
                        "Ver horario:",
                        horario
                    );
                }}
                onEdit={(horario) => {
                    console.log(
                        "Editar horario:",
                        horario
                    );
                }}
                onDelete={(horario) =>
                    handleDelete(
                        horario.id
                    )
                }
            />
        </DashboardLayout>
    );
}

export default Horarios;