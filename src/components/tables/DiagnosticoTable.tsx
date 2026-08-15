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
    DiagnosticoResponse,
} from "../../api/diagnostico";

interface DiagnosticoTableProps {
    diagnosticos: DiagnosticoResponse[];

    loading?: boolean;

    onView?: (
        diagnostico: DiagnosticoResponse
    ) => void;

    onEdit?: (
        diagnostico: DiagnosticoResponse
    ) => void;

    onDelete?: (
        diagnostico: DiagnosticoResponse
    ) => void;
}

function DiagnosticoTable({
    diagnosticos,
    loading = false,
    onView,
    onEdit,
    onDelete,
}: DiagnosticoTableProps) {
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
                    Cargando diagnósticos...
                </div>
            </Paper>
        );
    }

    if (diagnosticos.length === 0) {
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
                    No hay diagnósticos disponibles.
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
                                Cita
                            </strong>
                        </TableCell>

                        <TableCell>
                            <strong>
                                Diagnóstico
                            </strong>
                        </TableCell>

                        <TableCell>
                            <strong>
                                Tratamiento
                            </strong>
                        </TableCell>

                        <TableCell>
                            <strong>
                                Temperatura
                            </strong>
                        </TableCell>

                        <TableCell>
                            <strong>
                                Frecuencia cardíaca
                            </strong>
                        </TableCell>

                        <TableCell>
                            <strong>
                                Presión arterial
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
                    {diagnosticos.map(
                        (diagnostico) => (
                            <TableRow
                                key={
                                    diagnostico.id
                                }
                                hover
                            >
                                <TableCell>
                                    {
                                        diagnostico.id
                                    }
                                </TableCell>

                                <TableCell>
                                    {
                                        diagnostico.citaId
                                    }
                                </TableCell>

                                <TableCell>
                                    <div
                                        style={{
                                            maxWidth:
                                                "250px",
                                            overflow:
                                                "hidden",
                                            textOverflow:
                                                "ellipsis",
                                            whiteSpace:
                                                "nowrap",
                                        }}
                                    >
                                        {
                                            diagnostico.diagnostico
                                        }
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <div
                                        style={{
                                            maxWidth:
                                                "250px",
                                            overflow:
                                                "hidden",
                                            textOverflow:
                                                "ellipsis",
                                            whiteSpace:
                                                "nowrap",
                                        }}
                                    >
                                        {
                                            diagnostico.tratamiento
                                        }
                                    </div>
                                </TableCell>

                                <TableCell>
                                    {
                                        diagnostico.temperatura ??
                                        "-"
                                    }
                                </TableCell>

                                <TableCell>
                                    {
                                        diagnostico.frecuenciaCardiaca ??
                                        "-"
                                    }
                                </TableCell>

                                <TableCell>
                                    {
                                        diagnostico.presionArterial ??
                                        "-"
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
                                                        diagnostico
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
                                                        diagnostico
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
                                                        diagnostico
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

export default DiagnosticoTable;