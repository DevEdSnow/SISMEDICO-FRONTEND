
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

import type { MedicoResponse } from "../../api/medico";

interface MedicoTableProps {
    medicos: MedicoResponse[];

    loading?: boolean;

    onEdit?: (
        medico: MedicoResponse
    ) => void;

    onDelete?: (
        medico: MedicoResponse
    ) => void;

    onView?: (
        medico: MedicoResponse
    ) => void;
}

function MedicoTable({
    medicos,
    loading = false,
    onEdit,
    onDelete,
    onView,
}: MedicoTableProps) {
    if (loading) {
        return (
            <div
                style={{
                    width: "100%",
                    padding: "40px",
                    textAlign: "center",
                }}
            >
                Cargando médicos...
            </div>
        );
    }

    if (medicos.length === 0) {
        return (
            <div
                style={{
                    width: "100%",
                    padding: "40px",
                    textAlign: "center",
                }}
            >
                No hay médicos registrados.
            </div>
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
                                Médico
                            </strong>
                        </TableCell>

                        <TableCell>
                            <strong>
                                Correo
                            </strong>
                        </TableCell>

                        <TableCell>
                            <strong>
                                Especialidad
                            </strong>
                        </TableCell>

                        <TableCell>
                            <strong>
                                Cédula
                            </strong>
                        </TableCell>

                        <TableCell>
                            <strong>
                                Consultorio
                            </strong>
                        </TableCell>

                        <TableCell>
                            <strong>
                                Experiencia
                            </strong>
                        </TableCell>

                        <TableCell>
                            <strong>
                                Estado
                            </strong>
                        </TableCell>

                        <TableCell align="right">
                            <strong>
                                Acciones
                            </strong>
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {medicos.map((medico) => (
                        <TableRow
                            key={medico.id}
                            hover
                        >
                            <TableCell>
                                {medico.nombre}{" "}
                                {medico.apellido}
                            </TableCell>

                            <TableCell>
                                {medico.correo}
                            </TableCell>

                            <TableCell>
                                {medico.especialidad}
                            </TableCell>

                            <TableCell>
                                {
                                    medico.cedulaProfesional
                                }
                            </TableCell>

                            <TableCell>
                                {medico.consultorio ||
                                    "—"}
                            </TableCell>

                            <TableCell>
                                {medico.experiencia}{" "}
                                años
                            </TableCell>

                            <TableCell>
                                <span
                                    style={{
                                        fontWeight:
                                            "bold",
                                        color:
                                            medico.activo
                                                ? "green"
                                                : "red",
                                    }}
                                >
                                    {medico.activo
                                        ? "Activo"
                                        : "Inactivo"}
                                </span>
                            </TableCell>

                            <TableCell align="right">
                                <div
                                    style={{
                                        display:
                                            "flex",
                                        justifyContent:
                                            "flex-end",
                                        gap: "8px",
                                    }}
                                >
                                    {onView && (
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            onClick={() =>
                                                onView(
                                                    medico
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
                                                    medico
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
                                                    medico
                                                )
                                            }
                                        >
                                            Eliminar
                                        </Button>
                                    )}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default MedicoTable;

