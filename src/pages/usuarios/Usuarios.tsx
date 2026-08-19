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
    fetchUsuarios,
    removeUsuario,
} from "../../store/usuario/usuarioSlice";

import UsuarioTable from "../../components/tables/UsuarioTable";

function Usuarios() {
    const dispatch = useAppDispatch();

    const {
        usuarios,
        loading,
        error,
    } = useAppSelector(
        (state) => state.usuario
    );

    const [busqueda, setBusqueda] =
        useState("");

    useEffect(() => {
        dispatch(fetchUsuarios());
    }, [dispatch]);

    const usuariosFiltrados =
        usuarios.filter((usuario) => {
            const texto =
                busqueda
                    .toLowerCase()
                    .trim();

            if (!texto) {
                return true;
            }

            return (
                String(usuario.id)
                    .toLowerCase()
                    .includes(texto) ||
                String(usuario.nombre)
                    .toLowerCase()
                    .includes(texto) ||
                String(usuario.apellido)
                    .toLowerCase()
                    .includes(texto) ||
                String(usuario.correo)
                    .toLowerCase()
                    .includes(texto) ||
                String(usuario.telefono)
                    .toLowerCase()
                    .includes(texto)
            );
        });

    const handleDelete = async (
        id: number
    ) => {
        const confirmar =
            window.confirm(
                "¿Deseas eliminar este usuario?"
            );

        if (!confirmar) {
            return;
        }

        await dispatch(
            removeUsuario(id)
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
                        Usuarios
                    </h1>

                    <p
                        style={{
                            color: "#666",
                            marginTop: "8px",
                        }}
                    >
                        Administración de
                        usuarios del sistema.
                    </p>
                </div>

                <Button
                    variant="contained"
                    onClick={() =>
                        console.log(
                            "Nuevo usuario"
                        )
                    }
                >
                    Nuevo usuario
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
                    label="Buscar usuario"
                    placeholder="Nombre, apellido, correo o teléfono..."
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

            <UsuarioTable
                usuarios={
                    usuariosFiltrados
                }
                loading={loading}
                onView={(usuario) => {
                    console.log(
                        "Ver usuario:",
                        usuario
                    );
                }}
                onEdit={(usuario) => {
                    console.log(
                        "Editar usuario:",
                        usuario
                    );
                }}
                onDelete={(usuario) =>
                    handleDelete(
                        usuario.id
                    )
                }
            />
        </DashboardLayout>
    );
}

export default Usuarios;