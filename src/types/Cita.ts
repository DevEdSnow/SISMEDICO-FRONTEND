export enum EstadoCita {
    PENDIENTE = "PENDIENTE",
    CONFIRMADA = "CONFIRMADA",
    CANCELADA = "CANCELADA",
    COMPLETADA = "COMPLETADA",
}

/**
 * Datos necesarios para crear o actualizar una cita
 */
export interface CitaRequest {
    pacienteId: number;
    medicoId: number;
    fecha: string;
    hora: string;
    motivo: string;
    observaciones?: string;
}

/**
 * Respuesta de una cita
 */
export interface CitaResponse {
    id: number;
    uuid?: string;

    pacienteId: number;
    nombrePaciente: string;

    medicoId: number;
    nombreMedico: string;

    especialidadId?: number;
    especialidad?: string;

    fecha: string;
    hora: string;

    motivoConsulta: string;
    observaciones?: string;

    estado: EstadoCita;

    tieneDiagnostico?: boolean;
    tieneReceta?: boolean;

    fechaRegistro?: string;
    fechaActualizacion?: string;
}

/**
 * Datos para cancelar una cita
 */
export interface CancelarCitaRequest {
    motivo: string;
}

/**
 * Filtros para consultar citas
 */
export interface CitaFiltros {
    pacienteId?: number;
    medicoId?: number;
    fecha?: string;
    estado?: EstadoCita;
}