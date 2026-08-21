export type EstadoCita =
    | "PENDIENTE"
    | "CONFIRMADA"
    | "CANCELADA"
    | "COMPLETADA";

export interface CitaRequest {
    pacienteId: number;
    medicoId: number;
    fecha: string;
    hora: string;
    motivo: string;
    observaciones?: string;
}

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

export interface CancelarCitaRequest {
    motivo: string;
}

export interface CitaFiltros {
    pacienteId?: number;
    medicoId?: number;
    fecha?: string;
    estado?: EstadoCita;
}