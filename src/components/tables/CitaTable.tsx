import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

import type {
    CitaResponse,
} from "../../api/cita";

interface CitaTableProps {
    citas: CitaResponse[];

    loading?: boolean;

    onView?: (
        cita: CitaResponse
    ) => void;

    onEdit?: (
        cita: CitaResponse
    ) => void;

    onDelete?: (
        cita: CitaResponse
    ) => void;
}

function CitaTable({
    citas,
    loading = false,
    onView,
    onEdit,
    onDelete,
}: CitaTableProps) {
    if (loading) {
        return (
            <Paper
                elevation={2}
                sx={{
                    padding: 3,
                }}
            >
                <div
                    style={{
                        textAlign: "center",
                    }}
                >
                    Cargando citas...
                </div>
            </Paper>
        );
    }

    if (citas.length === 0) {
        return (
            <Paper
                elevation={2}
                sx={{
                    padding: 3,
                }}
            >
                <div
                    style={{
                        textAlign: "center",
                    }}
                >
                    No hay citas disponibles.
                </div>
            </Paper>
        );
    }

    return (
        <TableContainer
            component={Paper}
            elevation={2}
        >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <strong>
                                ID
                            </strong>
                        </TableCell>

                        <TableCell>
                            <strong>
                                Paciente
                            </strong>
                        </TableCell>

                        <TableCell>
                            <strong>
                                Médico
                            </strong>
                        </TableCell>

                        <TableCell>
                            <strong>
                                Especialidad
                            </strong>
                        </TableCell>

                        <TableCell>
                            <strong>
                                Fecha
                            </strong>
                        </TableCell>

                        <TableCell>
                            <strong>
                                Hora
                            </strong>
                        </TableCell>

                        <TableCell>
                            <strong>
                                Estado
                            </strong>
                        </TableCell>

                        <TableCell align="center">
                            <strong>
                                Acciones
                            </strong>
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {citas.map(
                        (cita) => (
                            <TableRow
                                key={
                                    cita.id
                                }
                                hover
                            >
                                <TableCell>
                                    {
                                        cita.id
                                    }
                                </TableCell>

                                <TableCell>
                                    {
                                        cita.nombrePaciente
                                    }
                                </TableCell>

                                <TableCell>
                                    {
                                        cita.nombreMedico
                                    }
                                </TableCell>

                                <TableCell>
                                    {
                                        cita.especialidad
                                    }
                                </TableCell>

                                <TableCell>
                                    {cita.fecha
                                        ? new Date(
                                              cita.fecha
                                          ).toLocaleDateString(
                                              "es-MX"
                                          )
                                        : "-"}
                                </TableCell>

                                <TableCell>
                                    {
                                        cita.hora
                                    }
                                </TableCell>

                                <TableCell>
                                    {
                                        cita.estado
                                    }
                                </TableCell>

                                <TableCell align="center">
                                    <div
                                        style={{
                                            display:
                                                "flex",
                                            gap: "6px",
                                            justifyContent:
                                                "center",
                                        }}
                                    >
                                        {onView && (
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                onClick={() =>
                                                    onView(
                                                        cita
                                                    )
                                                }
                                            >
                                                Ver
                                            </Button>
                                        )}

                                        {onEdit && (
                                            <Button
                                                size="small"
                                                variant="contained"
                                                onClick={() =>
                                                    onEdit(
                                                        cita
                                                    )
                                                }
                                            >
                                                Editar
                                            </Button>
                                        )}

                                        {onDelete && (
                                            <Button
                                                size="small"
                                                color="error"
                                                variant="outlined"
                                                onClick={() =>
                                                    onDelete(
                                                        cita
                                                    )
                                                }
                                            >
                                                Eliminar
                                            </Button>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CitaTable;