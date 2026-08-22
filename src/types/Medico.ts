/**
 * Datos para crear o actualizar un médico
 */
export interface MedicoRequest {
    usuarioId: number;
    especialidadId: number;
    cedulaProfesional: string;
    experiencia?: number;
    biografia?: string;
    telefonoConsultorio?: string;
    consultorio?: string;
    activo?: boolean;
}

/**
 * Respuesta de un médico
 */
export interface MedicoResponse {
    id: number;
    uuid?: string;

    usuarioId: number;

    nombre?: string;
    apellido?: string;
    nombreCompleto?: string;

    especialidadId: number;
    especialidad?: string;

    cedulaProfesional: string;

    experiencia?: number;
    biografia?: string;

    telefonoConsultorio?: string;
    consultorio?: string;

    activo?: boolean;

    fechaRegistro?: string;
    fechaActualizacion?: string;
}

/**
 * Filtros para médicos
 */
export interface MedicoFiltros {
    especialidadId?: number;
    activo?: boolean;
    nombre?: string;
}