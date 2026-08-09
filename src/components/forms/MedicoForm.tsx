
import {
    Button,
    TextField,
    MenuItem,
} from "@mui/material";

import { useEffect, useState } from "react";

import type {
    MedicoRequest,
} from "../../api/medico";

interface UsuarioOption {
    id: number;
    nombre: string;
    apellido: string;
}

interface EspecialidadOption {
    id: number;
    nombre: string;
}

interface MedicoFormProps {
    initialData?: Partial<MedicoRequest>;

    usuarios?: UsuarioOption[];

    especialidades?: EspecialidadOption[];

    loading?: boolean;

    onSubmit: (
        data: MedicoRequest
    ) => void;

    onCancel?: () => void;
}

function MedicoForm({
    initialData,
    usuarios = [],
    especialidades = [],
    loading = false,
    onSubmit,
    onCancel,
}: MedicoFormProps) {
    const [form, setForm] = useState<MedicoRequest>({
        usuarioId: initialData?.usuarioId ?? 0,
        especialidadId:
            initialData?.especialidadId ?? 0,
        cedulaProfesional:
            initialData?.cedulaProfesional ?? "",
        consultorio:
            initialData?.consultorio ?? "",
        experiencia:
            initialData?.experiencia ?? 0,
        biografia:
            initialData?.biografia ?? "",
        activo:
            initialData?.activo ?? true,
    });

    useEffect(() => {
        if (initialData) {
            setForm({
                usuarioId:
                    initialData.usuarioId ?? 0,

                especialidadId:
                    initialData.especialidadId ?? 0,

                cedulaProfesional:
                    initialData.cedulaProfesional ?? "",

                consultorio:
                    initialData.consultorio ?? "",

                experiencia:
                    initialData.experiencia ?? 0,

                biografia:
                    initialData.biografia ?? "",

                activo:
                    initialData.activo ?? true,
            });
        }
    }, [initialData]);

    const handleChange = (
        field: keyof MedicoRequest,
        value: string | number | boolean
    ) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

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
                select
                label="Usuario"
                value={form.usuarioId || ""}
                onChange={(event) =>
                    handleChange(
                        "usuarioId",
                        Number(event.target.value)
                    )
                }
                required
                fullWidth
            >
                <MenuItem value="">
                    Seleccionar usuario
                </MenuItem>

                {usuarios.map((usuario) => (
                    <MenuItem
                        key={usuario.id}
                        value={usuario.id}
                    >
                        {usuario.nombre}{" "}
                        {usuario.apellido}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                select
                label="Especialidad"
                value={form.especialidadId || ""}
                onChange={(event) =>
                    handleChange(
                        "especialidadId",
                        Number(event.target.value)
                    )
                }
                required
                fullWidth
            >
                <MenuItem value="">
                    Seleccionar especialidad
                </MenuItem>

                {especialidades.map(
                    (especialidad) => (
                        <MenuItem
                            key={especialidad.id}
                            value={especialidad.id}
                        >
                            {especialidad.nombre}
                        </MenuItem>
                    )
                )}
            </TextField>

            <TextField
                label="Cédula profesional"
                value={form.cedulaProfesional}
                onChange={(event) =>
                    handleChange(
                        "cedulaProfesional",
                        event.target.value
                    )
                }
                required
                fullWidth
            />

            <TextField
                label="Consultorio"
                value={form.consultorio}
                onChange={(event) =>
                    handleChange(
                        "consultorio",
                        event.target.value
                    )
                }
                fullWidth
            />

            <TextField
                label="Años de experiencia"
                type="number"
                value={form.experiencia}
                onChange={(event) =>
                    handleChange(
                        "experiencia",
                        Number(event.target.value)
                    )
                }
                inputProps={{
                    min: 0,
                }}
                fullWidth
            />

            <TextField
                label="Biografía"
                value={form.biografia}
                onChange={(event) =>
                    handleChange(
                        "biografia",
                        event.target.value
                    )
                }
                multiline
                rows={4}
                fullWidth
            />

            <TextField
                select
                label="Estado"
                value={form.activo ? "true" : "false"}
                onChange={(event) =>
                    handleChange(
                        "activo",
                        event.target.value === "true"
                    )
                }
                fullWidth
            >
                <MenuItem value="true">
                    Activo
                </MenuItem>

                <MenuItem value="false">
                    Inactivo
                </MenuItem>
            </TextField>

            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
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
                        : "Guardar médico"}
                </Button>
            </div>
        </form>
    );
}

export default MedicoForm;

