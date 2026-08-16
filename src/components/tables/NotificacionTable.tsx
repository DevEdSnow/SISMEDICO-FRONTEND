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
    NotificacionResponse,
} from "../../api/notificacion";

interface NotificacionTableProps {
    notificaciones: NotificacionResponse[];

    loading?: boolean;

    onView?: (
        notificacion: NotificacionResponse
    ) => void;

    onEdit?: (
        notificacion: NotificacionResponse
    ) => void;

    onDelete?: (
        notificacion: NotificacionResponse
    ) => void;
}

function NotificacionTable({
    notificaciones,
    loading = false,
    onView,
    onEdit,
    onDelete,
}: NotificacionTableProps) {
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
                    Cargando notificaciones...
                </div>
            </Paper>
        );
    }

    if (notificaciones.length === 0) {
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
                    No hay notificaciones
                    disponibles.
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
                                Título
                            </strong>
                        </TableCell>

                        <TableCell>
                            <strong>
                                Mensaje
                            </strong>
                        </TableCell>

                        <TableCell>
                            <strong>
                                Tipo
                            </strong>
                        </TableCell>

                        <TableCell>
                            <strong>
                                Fecha
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
                    {notificaciones.map(
                        (
                            notificacion
                        ) => (
                            <TableRow
                                key={
                                    notificacion.id
                                }
                                hover
                            >
                                <TableCell>
                                    {
                                        notificacion.id
                                    }
                                </TableCell>

                                <TableCell>
                                    {
                                        notificacion.titulo
                                    }
                                </TableCell>

                                <TableCell>
                                    <div
                                        style={{
                                            maxWidth:
                                                "300px",
                                            overflow:
                                                "hidden",
                                            textOverflow:
                                                "ellipsis",
                                            whiteSpace:
                                                "nowrap",
                                        }}
                                    >
                                        {
                                            notificacion.mensaje
                                        }
                                    </div>
                                </TableCell>

                                <TableCell>
                                    {
                                        notificacion.tipo
                                    }
                                </TableCell>

                                <TableCell>
                                    
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
                                                        notificacion
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
                                                        notificacion
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
                                                        notificacion
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

export default NotificacionTable;