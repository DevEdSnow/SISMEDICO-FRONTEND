
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
    PacienteResponse,
} from "../../api/paciente";

interface PacienteTableProps {
    pacientes: PacienteResponse[];

    loading?: boolean;

    onView?: (
        paciente: PacienteResponse
    ) => void;

    onEdit?: (
        paciente: PacienteResponse
    ) => void;

    onDelete?: (
        paciente: PacienteResponse
    ) => void;
}

function PacienteTable({
    pacientes,
    loading = false,
    onView,
    onEdit,
    onDelete,
}: PacienteTableProps) {
    if (loading) {
        return (
            <div
                style={{
                    width: "100%",
                    padding: "40px",
                    textAlign: "center",
                }}
            >
                Cargando pacientes...
            </div>
        );
    }

    if (pacientes.length === 0) {
        return (
            <div
                style={{
                    width: "100%",
                    padding: "40px",
                    textAlign: "center",
                }}
            >
                No hay pacientes registrados.
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
                                Paciente
                            </strong>
                        </TableCell>

                        <TableCell>
                            <strong>
                                Correo
                            </strong>
                        </TableCell>

                        <TableCell>
                            <strong>
                                CURP
                            </strong>
                        </TableCell>

                        <TableCell>
                            <strong>
                                Fecha de nacimiento
                            </strong>
                        </TableCell>

                        <TableCell>
                            <strong>
                                Tipo de sangre
                            </strong>
                        </TableCell>

                        <TableCell>
                            <strong>
                                Peso
                            </strong>
                        </TableCell>

                        <TableCell>
                            <strong>
                                Altura
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
                    {pacientes.map(
                        (paciente) => (
                            <TableRow
                                key={paciente.id}
                                hover
                            >
                                <TableCell>
                                    {paciente.nombre}{" "}
                                    {paciente.apellido}
                                </TableCell>

                                <TableCell>
                                    {paciente.correo}
                                </TableCell>

                                <TableCell>
                                    {paciente.curp}
                                </TableCell>

                                <TableCell>
                                    {
                                        paciente.fechaNacimiento
                                    }
                                </TableCell>

                                <TableCell>
                                    {
                                        paciente.tipoSangre ||
                                        "—"
                                    }
                                </TableCell>

                                <TableCell>
                                    {paciente.peso} kg
                                </TableCell>

                                <TableCell>
                                    {paciente.altura} cm
                                </TableCell>

                                <TableCell>
                                    <span
                                        style={{
                                            fontWeight:
                                                "bold",
                                            color:
                                                paciente.activo
                                                    ? "green"
                                                    : "red",
                                        }}
                                    >
                                        {paciente.activo
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
                                                        paciente
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
                                                        paciente
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
                                                        paciente
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

export default PacienteTable;

