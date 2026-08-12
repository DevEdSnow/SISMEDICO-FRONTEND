
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
    UsuarioResponse,
} from "../../api/usuario";

interface UsuarioTableProps {
    usuarios: UsuarioResponse[];

    loading?: boolean;

    onView?: (
        usuario: UsuarioResponse
    ) => void;

    onEdit?: (
        usuario: UsuarioResponse
    ) => void;

    onDelete?: (
        usuario: UsuarioResponse
    ) => void;
}

function UsuarioTable({
    usuarios,
    loading = false,
    onView,
    onEdit,
    onDelete,
}: UsuarioTableProps) {
    if (loading) {
        return (
            <div
                style={{
                    width: "100%",
                    padding: "40px",
                    textAlign: "center",
                }}
            >
                Cargando usuarios...
            </div>
        );
    }

    if (usuarios.length === 0) {
        return (
            <div
                style={{
                    width: "100%",
                    padding: "40px",
                    textAlign: "center",
                }}
            >
                No hay usuarios registrados.
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
                                Usuario
                            </strong>
                        </TableCell>

                        <TableCell>
                            <strong>
                                Correo
                            </strong>
                        </TableCell>

                        <TableCell>
                            <strong>
                                Teléfono
                            </strong>
                        </TableCell>

                        <TableCell>
                            <strong>
                                Género
                            </strong>
                        </TableCell>

                        <TableCell>
                            <strong>
                                Fecha de nacimiento
                            </strong>
                        </TableCell>

                        <TableCell>
                            <strong>
                                Rol
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
                    {usuarios.map(
                        (usuario) => (
                            <TableRow
                                key={usuario.id}
                                hover
                            >
                                <TableCell>
                                    {usuario.nombre}{" "}
                                    {usuario.apellido}
                                </TableCell>

                                <TableCell>
                                    {usuario.correo}
                                </TableCell>

                                <TableCell>
                                    {usuario.telefono ||
                                        "—"}
                                </TableCell>

                                <TableCell>
                                    {usuario.genero ||
                                        "—"}
                                </TableCell>

                                <TableCell>
                                    {
                                        usuario.fechaNacimiento
                                    }
                                </TableCell>

                                <TableCell>
                                    {usuario.rol ||
                                        "—"}
                                </TableCell>

                                <TableCell>
                                    <span
                                        style={{
                                            fontWeight:
                                                "bold",
                                            color:
                                                usuario.activo
                                                    ? "green"
                                                    : "red",
                                        }}
                                    >
                                        {usuario.activo
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
                                                        usuario
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
                                                        usuario
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
                                                        usuario
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

export default UsuarioTable;

