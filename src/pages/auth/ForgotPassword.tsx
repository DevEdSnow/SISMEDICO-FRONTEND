import {
    Button,
    Paper,
    TextField,
} from "@mui/material";

import {
    Link as RouterLink,
} from "react-router-dom";

import {
    useState,
} from "react";

import AuthLayout from "../../layouts/AuthLayout";

function ForgotPassword() {
    const [correo, setCorreo] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");
        setMessage("");

        if (!correo.trim()) {
            setError(
                "Ingresa tu correo electrónico."
            );
            return;
        }

        try {
            setLoading(true);

            /*
             * Aquí posteriormente conectaremos
             * el endpoint de recuperación de
             * contraseña del backend.
             */

            await new Promise(
                (resolve) =>
                    setTimeout(resolve, 800)
            );

            setMessage(
                "Si el correo está registrado, recibirás instrucciones para recuperar tu contraseña."
            );
        } catch {
            setError(
                "No se pudo procesar la solicitud."
            );
        } finally {
            setLoading(false);
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
                            fontSize: "28px",
                        }}
                    >
                        Recuperar contraseña
                    </h1>

                    <p
                        style={{
                            color: "#666",
                            marginTop: "10px",
                        }}
                    >
                        Ingresa tu correo electrónico
                        y te enviaremos instrucciones
                        para recuperar tu cuenta.
                    </p>
                </div>

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

                {message && (
                    <div
                        style={{
                            marginBottom: "16px",
                            padding: "12px",
                            borderRadius: "6px",
                            backgroundColor:
                                "#e8f5e9",
                            color: "#2e7d32",
                        }}
                    >
                        {message}
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

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                        sx={{
                            marginBottom: 2,
                        }}
                    >
                        {loading
                            ? "Enviando..."
                            : "Recuperar contraseña"}
                    </Button>

                    <Button
                        component={RouterLink}
                        to="/login"
                        variant="text"
                        fullWidth
                    >
                        Volver al inicio de sesión
                    </Button>
                </form>
            </Paper>
        </AuthLayout>
    );
}

export default ForgotPassword;