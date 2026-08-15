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
    HorarioResponse,
} from "../../api/horario";

interface HorarioTableProps {
    horarios: HorarioResponse[];

    loading?: boolean;

    onView?: (
        horario: HorarioResponse
    ) => void;

    onEdit?: (
        horario: HorarioResponse
    ) => void;

    onDelete?: (
        horario: HorarioResponse
    ) => void;
}

function HorarioTable({
    horarios,
    loading = false,
    onView,
    onEdit,
    onDelete,
}: HorarioTableProps) {
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
                    Cargando horarios...
                </div>
            </Paper>
        );
    }

    if (horarios.length === 0) {
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
                    No hay horarios disponibles.
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
                            <strong>ID</strong>
                        </TableCell>

                        <TableCell>
                            <strong>Médico</strong>
                        </TableCell>

                        <TableCell>
                            <strong>
                                Día
                            </strong>
                        </TableCell>

                        <TableCell>
                            <strong>
                                Hora inicio
                            </strong>
                        </TableCell>

                        <TableCell>
                            <strong>
                                Hora fin
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
                    {horarios.map(
                        (horario) => (
                            <TableRow
                                key={
                                    horario.id
                                }
                                hover
                            >
                                <TableCell>
                                    {
                                        horario.id
                                    }
                                </TableCell>

                                <TableCell>
                                    {horario.medicoId ??
                                        "-"}
                                </TableCell>

                                <TableCell>
                                    {
                                        horario.diaSemana
                                    }
                                </TableCell>

                                <TableCell>
                                    {
                                        horario.horaInicio
                                    }
                                </TableCell>

                                <TableCell>
                                    {
                                        horario.horaFin
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
                                                        horario
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
                                                        horario
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
                                                        horario
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

export default HorarioTable;