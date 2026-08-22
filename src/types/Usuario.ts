/**
 * Datos para crear un usuario
 */
export interface UsuarioRequest {
    nombre: string;

    apellido: string;

    correo: string;

    password?: string;

    telefono?: string;

    direccion?: string;

    roles?: string[];
}

/**
 * Respuesta de un usuario
 */
export interface UsuarioResponse {
    id: number;

    uuid?: string;

    nombre: string;

    apellido: string;

    correo: string;

    telefono?: string;

    direccion?: string;

    roles?: string[];

    fechaRegistro?: string;

    fechaActualizacion?: string;
}

/**
 * Filtros para usuarios
 */
export interface UsuarioFiltros {
    nombre?: string;

    apellido?: string;

    correo?: string;
}