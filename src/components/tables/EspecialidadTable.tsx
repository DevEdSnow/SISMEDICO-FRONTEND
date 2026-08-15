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
    EspecialidadResponse,
} from "../../api/especialidad";

interface EspecialidadTableProps {
    especialidades: EspecialidadResponse[];

    loading?: boolean;

    onView?: (
        especialidad: EspecialidadResponse
    ) => void;

    onEdit?: (
        especialidad: EspecialidadResponse
    ) => void;

    onDelete?: (
        especialidad: EspecialidadResponse
    ) => void;
}

function EspecialidadTable({
    especialidades,
    loading = false,
    onView,
    onEdit,
    onDelete,
}: EspecialidadTableProps) {
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
                    Cargando especialidades...
                </div>
            </Paper>
        );
    }

    if (especialidades.length === 0) {
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
                    No hay especialidades
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
                                Nombre
                            </strong>
                        </TableCell>

                        <TableCell>
                            <strong>
                                Descripción
                            </strong>
                        </TableCell>

                        <TableCell>
                            <strong>
                                Duración
                            </strong>
                        </TableCell>

                        <TableCell>
                            <strong>
                                Costo
                            </strong>
                        </TableCell>

                        <TableCell>
                            <strong>
                                Ubicación
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
                    {especialidades.map(
                        (especialidad) => (
                            <TableRow
                                key={
                                    especialidad.id
                                }
                                hover
                            >
                                <TableCell>
                                    {
                                        especialidad.id
                                    }
                                </TableCell>

                                <TableCell>
                                    {
                                        especialidad.nombre
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
                                            especialidad.descripcion
                                        }
                                    </div>
                                </TableCell>

                                <TableCell>
                                    {especialidad.duracionConsulta ??
                                        30}{" "}
                                    min
                                </TableCell>

                                <TableCell>
                                    $
                                    {Number(
                                        especialidad.costoConsulta ??
                                            0
                                    ).toFixed(
                                        2
                                    )}
                                </TableCell>

                                <TableCell>
                                    {
                                        especialidad.ubicacion
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
                                                        especialidad
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
                                                        especialidad
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
                                                        especialidad
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

export default EspecialidadTable;