import {
    Button,
    Paper,
    TextField,
} from "@mui/material";

import {
    useState,
} from "react";

import {
    Link as RouterLink,
    useNavigate,
} from "react-router-dom";

import AuthLayout from "../../layouts/AuthLayout";
import useAuth from "../../hooks/useAuth";

function Login() {
    const navigate = useNavigate();

    const {
        login,
        loading,
        error,
        isAuthenticated,
    } = useAuth();

    const [correo, setCorreo] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [localError, setLocalError] =
        useState("");

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setLocalError("");

        if (!correo.trim()) {
            setLocalError(
                "Ingresa tu correo electrónico."
            );
            return;
        }

        if (!password) {
            setLocalError(
                "Ingresa tu contraseña."
            );
            return;
        }

        try {
            const result =
                await login({
                    correo: correo.trim(),
                    password,
                });

            if (
                "meta" in result &&
                result.meta.requestStatus ===
                    "fulfilled"
            ) {
                navigate("/dashboard");
            }
        } catch {
            setLocalError(
                "No se pudo iniciar sesión."
            );
        }
    };

    return (
        <AuthLayout>
            <Paper
                elevation={4}
                sx={{
                    padding: 4,
                    borderRadius: 2,
                }}
            >
                <div
                    style={{
                        textAlign: "center",
                        marginBottom: "24px",
                    }}
                >
                    <h1
                        style={{
                            margin: 0,
                            fontSize: "30px",
                            fontWeight: "bold",
                        }}
                    >
                        SISMEDICO
                    </h1>

                    <p
                        style={{
                            marginTop: "10px",
                            color: "#666",
                        }}
                    >
                        Inicia sesión en tu cuenta
                    </p>
                </div>

                {(localError || error) && (
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
                        {localError || error}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                >
                    <TextField
                        label="Correo electrónico"
                        type="email"
                        value={correo}
                        onChange={(event) =>
                            setCorreo(
                                event.target.value
                            )
                        }
                        fullWidth
                        required
                        autoComplete="email"
                        sx={{
                            marginBottom: 2,
                        }}
                    />

                    <TextField
                        label="Contraseña"
                        type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(
                                event.target.value
                            )
                        }
                        fullWidth
                        required
                        autoComplete="current-password"
                        sx={{
                            marginBottom: 1,
                        }}
                    />

                    <div
                        style={{
                            textAlign: "right",
                            marginBottom: "20px",
                        }}
                    >
                        <Button
                            component={
                                RouterLink
                            }
                            to="/forgot-password"
                            variant="text"
                            size="small"
                        >
                            ¿Olvidaste tu contraseña?
                        </Button>
                    </div>

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={
                            loading ||
                            isAuthenticated
                        }
                    >
                        {loading
                            ? "Iniciando sesión..."
                            : "Iniciar sesión"}
                    </Button>
                </form>

                <div
                    style={{
                        textAlign: "center",
                        marginTop: "24px",
                    }}
                >
                    <span
                        style={{
                            color: "#666",
                        }}
                    >
                        ¿No tienes una cuenta?
                    </span>

                    <Button
                        component={RouterLink}
                        to="/register"
                        variant="text"
                    >
                        Crear cuenta
                    </Button>
                </div>
            </Paper>
        </AuthLayout>
    );
}

export default Login;