
import {
    Button,
    MenuItem,
    TextField,
} from "@mui/material";

import {
    useEffect,
    useState,
} from "react";

import type {
    UsuarioRequest,
} from "../../api/usuario";

interface RolOption {
    id: number;
    nombre: string;
}

interface UsuarioFormProps {
    initialData?: Partial<UsuarioRequest>;

    roles?: RolOption[];

    loading?: boolean;

    onSubmit: (
        data: UsuarioRequest
    ) => void;

    onCancel?: () => void;
}

function UsuarioForm({
    initialData,
    roles = [],
    loading = false,
    onSubmit,
    onCancel,
}: UsuarioFormProps) {
    const [form, setForm] =
        useState<UsuarioRequest>({
            nombre:
                initialData?.nombre ?? "",

            apellido:
                initialData?.apellido ?? "",

            correo:
                initialData?.correo ?? "",

            password:
                initialData?.password ?? "",

            confirmarPassword:
                initialData?.confirmarPassword ?? "",

            telefono:
                initialData?.telefono ?? "",

            direccion:
                initialData?.direccion ?? "",

            genero:
                initialData?.genero ?? "",

            fechaNacimiento:
                initialData?.fechaNacimiento ?? "",

            rolId:
                initialData?.rolId ?? 0,
        });

    useEffect(() => {
        if (initialData) {
            setForm({
                nombre:
                    initialData.nombre ?? "",

                apellido:
                    initialData.apellido ?? "",

                correo:
                    initialData.correo ?? "",

                password:
                    initialData.password ?? "",

                confirmarPassword:
                    initialData.confirmarPassword ?? "",

                telefono:
                    initialData.telefono ?? "",

                direccion:
                    initialData.direccion ?? "",

                genero:
                    initialData.genero ?? "",

                fechaNacimiento:
                    initialData.fechaNacimiento ?? "",

                rolId:
                    initialData.rolId ?? 0,
            });
        }
    }, [initialData]);

    const handleSubmit = (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        onSubmit(form);
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
            }}
        >
            <TextField
                label="Nombre"
                value={form.nombre}
                onChange={(event) =>
                    setForm({
                        ...form,
                        nombre:
                            event.target.value,
                    })
                }
                required
                fullWidth
            />

            <TextField
                label="Apellido"
                value={form.apellido}
                onChange={(event) =>
                    setForm({
                        ...form,
                        apellido:
                            event.target.value,
                    })
                }
                required
                fullWidth
            />

            <TextField
                label="Correo electrónico"
                type="email"
                value={form.correo}
                onChange={(event) =>
                    setForm({
                        ...form,
                        correo:
                            event.target.value,
                    })
                }
                required
                fullWidth
            />

            <TextField
                label="Contraseña"
                type="password"
                value={form.password}
                onChange={(event) =>
                    setForm({
                        ...form,
                        password:
                            event.target.value,
                    })
                }
                required={!initialData}
                fullWidth
            />

            <TextField
                label="Confirmar contraseña"
                type="password"
                value={
                    form.confirmarPassword
                }
                onChange={(event) =>
                    setForm({
                        ...form,
                        confirmarPassword:
                            event.target.value,
                    })
                }
                required={!initialData}
                fullWidth
            />

            <TextField
                label="Teléfono"
                type="tel"
                value={form.telefono}
                onChange={(event) =>
                    setForm({
                        ...form,
                        telefono:
                            event.target.value,
                    })
                }
                fullWidth
            />

            <TextField
                label="Dirección"
                value={form.direccion}
                onChange={(event) =>
                    setForm({
                        ...form,
                        direccion:
                            event.target.value,
                    })
                }
                multiline
                rows={2}
                fullWidth
            />

            <TextField
                select
                label="Género"
                value={form.genero}
                onChange={(event) =>
                    setForm({
                        ...form,
                        genero:
                            event.target.value,
                    })
                }
                required
                fullWidth
            >
                <MenuItem value="">
                    Seleccionar género
                </MenuItem>

                <MenuItem value="MASCULINO">
                    Masculino
                </MenuItem>

                <MenuItem value="FEMENINO">
                    Femenino
                </MenuItem>

                <MenuItem value="OTRO">
                    Otro
                </MenuItem>
            </TextField>

            <TextField
                label="Fecha de nacimiento"
                type="date"
                value={
                    form.fechaNacimiento
                }
                onChange={(event) =>
                    setForm({
                        ...form,
                        fechaNacimiento:
                            event.target.value,
                    })
                }
                slotProps={{
                    inputLabel: {
                        shrink: true,
                    },
                }}
                required
                fullWidth
            />

            <TextField
                select
                label="Rol"
                value={form.rolId || ""}
                onChange={(event) =>
                    setForm({
                        ...form,
                        rolId: Number(
                            event.target.value
                        ),
                    })
                }
                required
                fullWidth
            >
                <MenuItem value="">
                    Seleccionar rol
                </MenuItem>

                {roles.map((rol) => (
                    <MenuItem
                        key={rol.id}
                        value={rol.id}
                    >
                        {rol.nombre}
                    </MenuItem>
                ))}
            </TextField>

            <div
                style={{
                    display: "flex",
                    justifyContent:
                        "flex-end",
                    gap: "12px",
                }}
            >
                {onCancel && (
                    <Button
                        type="button"
                        variant="outlined"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Cancelar
                    </Button>
                )}

                <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                >
                    {loading
                        ? "Guardando..."
                        : "Guardar usuario"}
                </Button>
            </div>
        </form>
    );
}

export default UsuarioForm;

