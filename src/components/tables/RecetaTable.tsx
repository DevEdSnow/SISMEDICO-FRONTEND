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
    RecetaResponse,
} from "../../api/receta";

interface RecetaTableProps {
    recetas: RecetaResponse[];

    loading?: boolean;

    onView?: (
        receta: RecetaResponse
    ) => void;

    onEdit?: (
        receta: RecetaResponse
    ) => void;

    onDelete?: (
        receta: RecetaResponse
    ) => void;
}

function RecetaTable({
    recetas,
    loading = false,
    onView,
    onEdit,
    onDelete,
}: RecetaTableProps) {
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
                    Cargando recetas...
                </div>
            </Paper>
        );
    }

    if (recetas.length === 0) {
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
                    No hay recetas disponibles.
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
                            <strong>
                                Medicamento
                            </strong>
                        </TableCell>

                        <TableCell>
                            <strong>
                                Dosis
                            </strong>
                        </TableCell>

                        <TableCell>
                            <strong>
                                Frecuencia
                            </strong>
                        </TableCell>

                        <TableCell>
                            <strong>
                                Indicaciones
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
                    {recetas.map(
                        (receta) => (
                            <TableRow
                                key={receta.id}
                                hover
                            >
                                <TableCell>
                                    {receta.id}
                                </TableCell>

                                <TableCell>
                                    {receta.medicamento}
                                </TableCell>

                                <TableCell>
                                    {receta.dosis}
                                </TableCell>

                                <TableCell>
                                    {receta.frecuencia}
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
                                            receta.indicaciones
                                        }
                                    </div>
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
                                                        receta
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
                                                        receta
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
                                                        receta
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

export default RecetaTable;