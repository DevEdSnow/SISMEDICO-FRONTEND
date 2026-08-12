import {
    Button,
    MenuItem,
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

interface RegisterForm {
    nombre: string;
    apellido: string;
    correo: string;
    password: string;
    confirmarPassword: string;
    telefono: string;
    direccion: string;
    rolId: number;
}

function Register() {
    const navigate = useNavigate();

    const [form, setForm] =
        useState<RegisterForm>({
            nombre: "",
            apellido: "",
            correo: "",
            password: "",
            confirmarPassword: "",
            telefono: "",
            direccion: "",
            rolId: 1,
        });

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    const handleChange = (
        field: keyof RegisterForm,
        value: string | number
    ) => {
        setForm((previous) => ({
            ...previous,
            [field]: value,
        }));
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (
            !form.nombre.trim() ||
            !form.apellido.trim()
        ) {
            setError(
                "Ingresa tu nombre y apellido."
            );
            return;
        }

        if (!form.correo.trim()) {
            setError(
                "Ingresa tu correo electrónico."
            );
            return;
        }

        if (form.password.length < 6) {
            setError(
                "La contraseña debe tener al menos 6 caracteres."
            );
            return;
        }

        if (
            form.password !==
            form.confirmarPassword
        ) {
            setError(
                "Las contraseñas no coinciden."
            );
            return;
        }

        try {
            setLoading(true);

            /*
             * Aquí conectaremos el endpoint
             * /auth/register del backend.
             */

            const response =
                await fetch(
                    "http://localhost:8080/api/auth/register",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body: JSON.stringify(
                            form
                        ),
                    }
                );

            if (!response.ok) {
                let message =
                    "No se pudo registrar el usuario.";

                try {
                    const data =
                        await response.json();

                    message =
                        data.message ??
                        message;
                } catch {
                    // La respuesta no contiene JSON.
                }

                throw new Error(
                    message
                );
            }

            setSuccess(
                "Usuario registrado correctamente."
            );

            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "No se pudo registrar el usuario."
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
                            fontWeight: "bold",
                        }}
                    >
                        Crear cuenta
                    </h1>

                    <p
                        style={{
                            color: "#666",
                            marginTop: "8px",
                        }}
                    >
                        Regístrate en SISMEDICO
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

                {success && (
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
                        {success}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                >
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "1fr 1fr",
                            gap: "16px",
                        }}
                    >
                        <TextField
                            label="Nombre"
                            value={form.nombre}
                            onChange={(event) =>
                                handleChange(
                                    "nombre",
                                    event.target
                                        .value
                                )
                            }
                            required
                            fullWidth
                        />

                        <TextField
                            label="Apellido"
                            value={form.apellido}
                            onChange={(event) =>
                                handleChange(
                                    "apellido",
                                    event.target
                                        .value
                                )
                            }
                            required
                            fullWidth
                        />
                    </div>

                    <TextField
                        label="Correo electrónico"
                        type="email"
                        value={form.correo}
                        onChange={(event) =>
                            handleChange(
                                "correo",
                                event.target
                                    .value
                            )
                        }
                        required
                        fullWidth
                        autoComplete="email"
                        sx={{
                            marginTop: 2,
                        }}
                    />

                    <TextField
                        label="Teléfono"
                        value={form.telefono}
                        onChange={(event) =>
                            handleChange(
                                "telefono",
                                event.target
                                    .value
                            )
                        }
                        fullWidth
                        sx={{
                            marginTop: 2,
                        }}
                    />

                    <TextField
                        label="Dirección"
                        value={form.direccion}
                        onChange={(event) =>
                            handleChange(
                                "direccion",
                                event.target
                                    .value
                            )
                        }
                        fullWidth
                        multiline
                        rows={2}
                        sx={{
                            marginTop: 2,
                        }}
                    />

                    <TextField
                        select
                        label="Rol"
                        value={form.rolId}
                        onChange={(event) =>
                            handleChange(
                                "rolId",
                                Number(
                                    event.target
                                        .value
                                )
                            )
                        }
                        fullWidth
                        sx={{
                            marginTop: 2,
                        }}
                    >
                        <MenuItem value={1}>
                            Paciente
                        </MenuItem>

                        <MenuItem value={2}>
                            Médico
                        </MenuItem>

                        <MenuItem value={3}>
                            Administrador
                        </MenuItem>
                    </TextField>

                    <TextField
                        label="Contraseña"
                        type="password"
                        value={form.password}
                        onChange={(event) =>
                            handleChange(
                                "password",
                                event.target
                                    .value
                            )
                        }
                        required
                        fullWidth
                        autoComplete="new-password"
                        sx={{
                            marginTop: 2,
                        }}
                    />

                    <TextField
                        label="Confirmar contraseña"
                        type="password"
                        value={
                            form.confirmarPassword
                        }
                        onChange={(event) =>
                            handleChange(
                                "confirmarPassword",
                                event.target
                                    .value
                            )
                        }
                        required
                        fullWidth
                        autoComplete="new-password"
                        sx={{
                            marginTop: 2,
                        }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                        sx={{
                            marginTop: 3,
                        }}
                    >
                        {loading
                            ? "Registrando..."
                            : "Crear cuenta"}
                    </Button>

                    <Button
                        component={RouterLink}
                        to="/login"
                        variant="text"
                        fullWidth
                        sx={{
                            marginTop: 1,
                        }}
                    >
                        Ya tengo una cuenta
                    </Button>
                </form>
            </Paper>
        </AuthLayout>
    );
}

export default Register;