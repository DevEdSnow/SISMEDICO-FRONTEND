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
    fetchNotificaciones,
    removeNotificacion,
} from "../../store/notificacion/notificacionSlice";

import NotificacionTable from "../../components/tables/NotificacionTable";

function Notificaciones() {
    const dispatch = useAppDispatch();

    const {
        notificaciones,
        loading,
        error,
    } = useAppSelector(
        (state) => state.notificacion
    );

    const [busqueda, setBusqueda] =
        useState("");

    useEffect(() => {
        dispatch(
            fetchNotificaciones()
        );
    }, [dispatch]);

    const notificacionesFiltradas =
        notificaciones.filter(
            (notificacion) => {
                const texto =
                    busqueda
                        .toLowerCase()
                        .trim();

                if (!texto) {
                    return true;
                }

                return (
                    String(
                        notificacion.titulo
                    )
                        .toLowerCase()
                        .includes(texto) ||
                    String(
                        notificacion.mensaje
                    )
                        .toLowerCase()
                        .includes(texto) ||
                    String(
                        notificacion.tipo
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
                "¿Deseas eliminar esta notificación?"
            );

        if (!confirmar) {
            return;
        }

        await dispatch(
            removeNotificacion(id)
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
                        Notificaciones
                    </h1>

                    <p
                        style={{
                            color: "#666",
                            marginTop: "8px",
                        }}
                    >
                        Administración de
                        notificaciones del
                        sistema.
                    </p>
                </div>

                <Button
                    variant="contained"
                    onClick={() =>
                        console.log(
                            "Nueva notificación"
                        )
                    }
                >
                    Nueva notificación
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
                    label="Buscar notificación"
                    placeholder="Título, mensaje o tipo..."
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

            <NotificacionTable
                notificaciones={
                    notificacionesFiltradas
                }
                loading={loading}
                onView={(
                    notificacion
                ) => {
                    console.log(
                        "Ver notificación:",
                        notificacion
                    );
                }}
                onEdit={(
                    notificacion
                ) => {
                    console.log(
                        "Editar notificación:",
                        notificacion
                    );
                }}
                onDelete={(
                    notificacion
                ) =>
                    handleDelete(
                        notificacion.id
                    )
                }
            />
        </DashboardLayout>
    );
}

export default Notificaciones;