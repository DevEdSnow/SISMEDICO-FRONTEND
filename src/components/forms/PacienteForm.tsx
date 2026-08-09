
import {
    Button,
    MenuItem,
    TextField,
} from "@mui/material";

import { useEffect, useState } from "react";

import type {
    PacienteRequest,
} from "../../api/paciente";

interface UsuarioOption {
    id: number;
    nombre: string;
    apellido: string;
}

interface PacienteFormProps {
    initialData?: Partial<PacienteRequest>;

    usuarios?: UsuarioOption[];

    loading?: boolean;

    onSubmit: (
        data: PacienteRequest
    ) => void;

    onCancel?: () => void;
}

function PacienteForm({
    initialData,
    usuarios = [],
    loading = false,
    onSubmit,
    onCancel,
}: PacienteFormProps) {
    const [form, setForm] = useState<PacienteRequest>({
        usuarioId: initialData?.usuarioId ?? 0,
        curp: initialData?.curp ?? "",
        numeroSeguroSocial:
            initialData?.numeroSeguroSocial ?? "",
        fechaNacimiento:
            initialData?.fechaNacimiento ?? "",
        tipoSangre:
            initialData?.tipoSangre ?? "",
        alergias:
            initialData?.alergias ?? "",
        enfermedadesCronicas:
            initialData?.enfermedadesCronicas ?? "",
        medicamentosActuales:
            initialData?.medicamentosActuales ?? "",
        contactoEmergencia:
            initialData?.contactoEmergencia ?? "",
        telefonoEmergencia:
            initialData?.telefonoEmergencia ?? "",
        peso: initialData?.peso ?? 0,
        altura: initialData?.altura ?? 0,
        activo: initialData?.activo ?? true,
    });

    useEffect(() => {
        if (initialData) {
            setForm({
                usuarioId:
                    initialData.usuarioId ?? 0,

                curp:
                    initialData.curp ?? "",

                numeroSeguroSocial:
                    initialData.numeroSeguroSocial ?? "",

                fechaNacimiento:
                    initialData.fechaNacimiento ?? "",

                tipoSangre:
                    initialData.tipoSangre ?? "",

                alergias:
                    initialData.alergias ?? "",

                enfermedadesCronicas:
                    initialData.enfermedadesCronicas ?? "",

                medicamentosActuales:
                    initialData.medicamentosActuales ?? "",

                contactoEmergencia:
                    initialData.contactoEmergencia ?? "",

                telefonoEmergencia:
                    initialData.telefonoEmergencia ?? "",

                peso:
                    initialData.peso ?? 0,

                altura:
                    initialData.altura ?? 0,

                activo:
                    initialData.activo ?? true,
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
            {/* Usuario */}

            <TextField
                select
                label="Usuario"
                value={form.usuarioId || ""}
                onChange={(event) =>
                    setForm({
                        ...form,
                        usuarioId: Number(
                            event.target.value
                        ),
                    })
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

            {/* CURP */}

            <TextField
                label="CURP"
                value={form.curp}
                onChange={(event) =>
                    setForm({
                        ...form,
                        curp: event.target.value
                            .toUpperCase(),
                    })
                }
                required
                fullWidth
            />

            {/* Número de seguro social */}

            <TextField
                label="Número de Seguro Social"
                value={form.numeroSeguroSocial}
                onChange={(event) =>
                    setForm({
                        ...form,
                        numeroSeguroSocial:
                            event.target.value,
                    })
                }
                fullWidth
            />

            {/* Fecha de nacimiento */}

            <TextField
                label="Fecha de nacimiento"
                type="date"
                value={form.fechaNacimiento}
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

            {/* Tipo de sangre */}

            <TextField
                select
                label="Tipo de sangre"
                value={form.tipoSangre}
                onChange={(event) =>
                    setForm({
                        ...form,
                        tipoSangre:
                            event.target.value,
                    })
                }
                fullWidth
            >
                <MenuItem value="">
                    Seleccionar
                </MenuItem>

                <MenuItem value="A+">
                    A+
                </MenuItem>

                <MenuItem value="A-">
                    A-
                </MenuItem>

                <MenuItem value="B+">
                    B+
                </MenuItem>

                <MenuItem value="B-">
                    B-
                </MenuItem>

                <MenuItem value="AB+">
                    AB+
                </MenuItem>

                <MenuItem value="AB-">
                    AB-
                </MenuItem>

                <MenuItem value="O+">
                    O+
                </MenuItem>

                <MenuItem value="O-">
                    O-
                </MenuItem>
            </TextField>

            {/* Peso */}

            <TextField
                label="Peso (kg)"
                type="number"
                value={form.peso}
                onChange={(event) => {
                    const value = Number(
                        event.target.value
                    );

                    setForm({
                        ...form,
                        peso:
                            value < 0
                                ? 0
                                : value,
                    });
                }}
                required
                fullWidth
            />

            {/* Altura */}

            <TextField
                label="Altura (cm)"
                type="number"
                value={form.altura}
                onChange={(event) => {
                    const value = Number(
                        event.target.value
                    );

                    setForm({
                        ...form,
                        altura:
                            value < 0
                                ? 0
                                : value,
                    });
                }}
                required
                fullWidth
            />

            {/* Alergias */}

            <TextField
                label="Alergias"
                value={form.alergias}
                onChange={(event) =>
                    setForm({
                        ...form,
                        alergias:
                            event.target.value,
                    })
                }
                multiline
                rows={3}
                fullWidth
            />

            {/* Enfermedades crónicas */}

            <TextField
                label="Enfermedades crónicas"
                value={form.enfermedadesCronicas}
                onChange={(event) =>
                    setForm({
                        ...form,
                        enfermedadesCronicas:
                            event.target.value,
                    })
                }
                multiline
                rows={3}
                fullWidth
            />

            {/* Medicamentos */}

            <TextField
                label="Medicamentos actuales"
                value={form.medicamentosActuales}
                onChange={(event) =>
                    setForm({
                        ...form,
                        medicamentosActuales:
                            event.target.value,
                    })
                }
                multiline
                rows={3}
                fullWidth
            />

            {/* Contacto de emergencia */}

            <TextField
                label="Contacto de emergencia"
                value={form.contactoEmergencia}
                onChange={(event) =>
                    setForm({
                        ...form,
                        contactoEmergencia:
                            event.target.value,
                    })
                }
                fullWidth
            />

            {/* Teléfono de emergencia */}

            <TextField
                label="Teléfono de emergencia"
                type="tel"
                value={form.telefonoEmergencia}
                onChange={(event) =>
                    setForm({
                        ...form,
                        telefonoEmergencia:
                            event.target.value,
                    })
                }
                fullWidth
            />

            {/* Estado */}

            <TextField
                select
                label="Estado"
                value={
                    form.activo
                        ? "true"
                        : "false"
                }
                onChange={(event) =>
                    setForm({
                        ...form,
                        activo:
                            event.target.value ===
                            "true",
                    })
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

            {/* Botones */}

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
                        : "Guardar paciente"}
                </Button>
            </div>
        </form>
    );
}

export default PacienteForm;

