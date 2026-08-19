import {
    useEffect,
} from "react";

import {
    Alert,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    Grid,
    Typography,
} from "@mui/material";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";

import {
    fetchUsuario,
} from "../../store/usuario/usuarioSlice";

function UsuarioDetalle() {
    const { id } = useParams();

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const {
        usuarioSeleccionado,
        loading,
        error,
    } = useAppSelector(
        (state) => state.usuario
    );

    useEffect(() => {
        if (id) {
            dispatch(
                fetchUsuario(
                    Number(id)
                )
            );
        }
    }, [dispatch, id]);

    if (loading) {
        return (
            <DashboardLayout>
                <div
                    style={{
                        display: "flex",
                        justifyContent:
                            "center",
                        alignItems:
                            "center",
                        minHeight:
                            "300px",
                    }}
                >
                    <CircularProgress />
                </div>
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout>
                <Alert severity="error">
                    {error}
                </Alert>

                <Button
                    variant="outlined"
                    sx={{
                        marginTop: 2,
                    }}
                    onClick={() =>
                        navigate(
                            "/usuarios"
                        )
                    }
                >
                    Volver a usuarios
                </Button>
            </DashboardLayout>
        );
    }

    if (!usuarioSeleccionado) {
        return (
            <DashboardLayout>
                <Alert severity="info">
                    Usuario no encontrado.
                </Alert>

                <Button
                    variant="outlined"
                    sx={{
                        marginTop: 2,
                    }}
                    onClick={() =>
                        navigate(
                            "/usuarios"
                        )
                    }
                >
                    Volver a usuarios
                </Button>
            </DashboardLayout>
        );
    }

    const usuario =
        usuarioSeleccionado;

    return (
        <DashboardLayout>
            <div
                style={{
                    display: "flex",
                    justifyContent:
                        "space-between",
                    alignItems: "center",
                    marginBottom: "24px",
                }}
            >
                <div>
                    <h1
    style={{
        margin: 0,
        fontSize: "28px",
        fontWeight: "bold",
    }}
>
    Detalle del usuario
</h1>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            marginTop: 1,
                        }}
                    >
                        Información del usuario
                        registrado en SISMEDICO.
                    </Typography>
                </div>

                <Button
                    variant="outlined"
                    onClick={() =>
                        navigate(
                            "/usuarios"
                        )
                    }
                >
                    Volver
                </Button>
            </div>

            <Card>
                <CardContent>
                   <h2
    style={{
        margin: 0,
        marginBottom: "16px",
        fontSize: "20px",
        fontWeight: "bold",
    }}
>
    Información personal
</h2>

                    <Divider
                        sx={{
                            marginBottom: 3,
                        }}
                    />

                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            size={{
                                xs: 12,
                                md: 6,
                            }}
                        >
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                ID
                            </Typography>

                            <p
    style={{
        margin: 0,
        fontWeight: 500,
    }}
>
    {usuario.id}
</p>
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                md: 6,
                            }}
                        >
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Nombre
                            </Typography>

                            <Typography
                                variant="body1"
                                fontWeight="500"
                            >
                                {usuario.nombre}
                            </Typography>
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                md: 6,
                            }}
                        >
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Apellido
                            </Typography>

                            <Typography
                                variant="body1"
                                fontWeight="500"
                            >
                                {usuario.apellido}
                            </Typography>
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                md: 6,
                            }}
                        >
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Correo electrónico
                            </Typography>

                            <Typography
                                variant="body1"
                                fontWeight="500"
                            >
                                {usuario.correo}
                            </Typography>
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                md: 6,
                            }}
                        >
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Teléfono
                            </Typography>

                            <Typography
                                variant="body1"
                                fontWeight="500"
                            >
                                {usuario.telefono}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </DashboardLayout>
    );
}

export default UsuarioDetalle;