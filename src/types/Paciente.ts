/**
 * Datos para crear o actualizar un paciente
 */
export interface PacienteRequest {
    usuarioId: number;

    fechaNacimiento?: string;

    curp?: string;

    sexo?: string;

    tipoSangre?: string;

    alergias?: string;

    enfermedadesCronicas?: string;

    antecedentesMedicos?: string;

    contactoEmergencia?: string;

    telefonoEmergencia?: string;

    activo?: boolean;
}

/**
 * Respuesta de un paciente
 */
export interface PacienteResponse {
    id: number;

    uuid?: string;

    usuarioId: number;

    nombre?: string;

    apellido?: string;

    correo?: string;

    telefono?: string;

    fechaNacimiento?: string;

    curp?: string;

    sexo?: string;

    tipoSangre?: string;

    alergias?: string;

    enfermedadesCronicas?: string;

    antecedentesMedicos?: string;

    contactoEmergencia?: string;

    telefonoEmergencia?: string;

    activo?: boolean;

    fechaRegistro?: string;

    fechaActualizacion?: string;
}

/**
 * Filtros para pacientes
 */
export interface PacienteFiltros {
    nombre?: string;

    curp?: string;

    activo?: boolean;
}