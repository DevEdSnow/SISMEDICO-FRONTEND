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
    fetchEspecialidades,
    removeEspecialidad,
} from "../../store/especialidad/especialidadSlice";

import EspecialidadTable from "../../components/tables/EspecialidadTable";

function Especialidades() {
    const dispatch = useAppDispatch();

    const {
        especialidades,
        loading,
        error,
    } = useAppSelector(
        (state) => state.especialidad
    );

    const [busqueda, setBusqueda] =
        useState("");

    useEffect(() => {
        dispatch(
            fetchEspecialidades()
        );
    }, [dispatch]);

    const especialidadesFiltradas =
        especialidades.filter(
            (especialidad) => {
                const texto =
                    busqueda
                        .toLowerCase()
                        .trim();

                if (!texto) {
                    return true;
                }

                return (
                    String(
                        especialidad.nombre
                    )
                        .toLowerCase()
                        .includes(texto) ||
                    String(
                        especialidad.descripcion
                    )
                        .toLowerCase()
                        .includes(texto) ||
                    String(
                        especialidad.ubicacion
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
                "¿Deseas eliminar esta especialidad?"
            );

        if (!confirmar) {
            return;
        }

        await dispatch(
            removeEspecialidad(id)
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
                        Especialidades
                    </h1>

                    <p
                        style={{
                            color: "#666",
                            marginTop: "8px",
                        }}
                    >
                        Administración de
                        especialidades médicas.
                    </p>
                </div>

                <Button
                    variant="contained"
                    onClick={() =>
                        console.log(
                            "Nueva especialidad"
                        )
                    }
                >
                    Nueva especialidad
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
                    label="Buscar especialidad"
                    placeholder="Nombre, descripción o ubicación..."
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

            <EspecialidadTable
                especialidades={
                    especialidadesFiltradas
                }
                loading={loading}
                onView={(
                    especialidad
                ) => {
                    console.log(
                        "Ver especialidad:",
                        especialidad
                    );
                }}
                onEdit={(
                    especialidad
                ) => {
                    console.log(
                        "Editar especialidad:",
                        especialidad
                    );
                }}
                onDelete={(
                    especialidad
                ) =>
                    handleDelete(
                        especialidad.id
                    )
                }
            />
        </DashboardLayout>
    );
}

export default Especialidades;