import api from "./axios";

export interface PacienteRequest {

    usuarioId: number;

    curp: string;

    numeroSeguroSocial?: string;

    fechaNacimiento: string;

    tipoSangre?: string;

    alergias?: string;

    enfermedadesCronicas?: string;

    medicamentosActuales?: string;

    contactoEmergencia?: string;

    telefonoEmergencia?: string;

    peso: number;

    altura: number;

}

export interface PacienteResponse {

    id: number;

    usuarioId: number;

    nombre: string;

    apellido: string;

    correo: string;

    telefono: string;

    curp: string;

    numeroSeguroSocial: string;

    fechaNacimiento: string;

    tipoSangre: string;

    alergias: string;

    enfermedadesCronicas: string;

    medicamentosActuales: string;

    contactoEmergencia: string;

    telefonoEmergencia: string;

    peso: number;

    altura: number;

    activo: boolean;

    fechaRegistro: string;

}

const URL = "/pacientes";

/**
 * Obtener todos los pacientes
 */
export const listarPacientes = async (): Promise<PacienteResponse[]> => {

    const response = await api.get<PacienteResponse[]>(URL);

    return response.data;

};

/**
 * Obtener paciente por ID
 */
export const obtenerPaciente = async (

    id: number

): Promise<PacienteResponse> => {

    const response = await api.get<PacienteResponse>(
        `${URL}/${id}`
    );

    return response.data;

};

/**
 * Crear paciente
 */
export const crearPaciente = async (

    request: PacienteRequest

): Promise<PacienteResponse> => {

    const response = await api.post<PacienteResponse>(
        URL,
        request
    );

    return response.data;

};

/**
 * Actualizar paciente
 */
export const actualizarPaciente = async (

    id: number,

    request: PacienteRequest

): Promise<PacienteResponse> => {

    const response = await api.put<PacienteResponse>(
        `${URL}/${id}`,
        request
    );

    return response.data;

};

/**
 * Eliminar paciente
 */
export const eliminarPaciente = async (

    id: number

): Promise<void> => {

    await api.delete(
        `${URL}/${id}`
    );

};

/**
 * Obtener pacientes activos
 */
export const listarActivos = async (): Promise<PacienteResponse[]> => {

    const response = await api.get<PacienteResponse[]>(
        `${URL}/activos`
    );

    return response.data;

};

/**
 * Buscar paciente por CURP
 */
export const buscarPorCurp = async (

    curp: string

): Promise<PacienteResponse> => {

    const response = await api.get<PacienteResponse>(
        `${URL}/curp/${curp}`
    );

    return response.data;

};

/**
 * Activar paciente
 */
export const activarPaciente = async (

    id: number

): Promise<PacienteResponse> => {

    const response = await api.patch<PacienteResponse>(
        `${URL}/${id}/activar`
    );

    return response.data;

};

/**
 * Desactivar paciente
 */
export const desactivarPaciente = async (

    id: number

): Promise<PacienteResponse> => {

    const response = await api.patch<PacienteResponse>(
        `${URL}/${id}/desactivar`
    );

    return response.data;

};