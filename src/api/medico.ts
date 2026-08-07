import api from "./axios";

export interface MedicoRequest {

    usuarioId: number;

    especialidadId: number;

    cedulaProfesional: string;

    consultorio?: string;

    experiencia?: number;

    biografia?: string;

    activo?: boolean;

}

export interface MedicoResponse {

    id: number;

    usuarioId: number;

    nombre: string;

    apellido: string;

    correo: string;

    telefono: string;

    especialidadId: number;

    especialidad: string;

    cedulaProfesional: string;

    consultorio: string;

    experiencia: number;

    biografia: string;

    activo: boolean;

    fechaRegistro: string;

}

const URL = "/medicos";

/**
 * Obtener todos los médicos
 */
export const listarMedicos = async (): Promise<MedicoResponse[]> => {

    const response = await api.get<MedicoResponse[]>(URL);

    return response.data;

};

/**
 * Obtener médico por ID
 */
export const obtenerMedico = async (

    id: number

): Promise<MedicoResponse> => {

    const response = await api.get<MedicoResponse>(
        `${URL}/${id}`
    );

    return response.data;

};

/**
 * Crear médico
 */
export const crearMedico = async (

    request: MedicoRequest

): Promise<MedicoResponse> => {

    const response = await api.post<MedicoResponse>(
        URL,
        request
    );

    return response.data;

};

/**
 * Actualizar médico
 */
export const actualizarMedico = async (

    id: number,

    request: MedicoRequest

): Promise<MedicoResponse> => {

    const response = await api.put<MedicoResponse>(
        `${URL}/${id}`,
        request
    );

    return response.data;

};

/**
 * Eliminar médico
 */
export const eliminarMedico = async (

    id: number

): Promise<void> => {

    await api.delete(
        `${URL}/${id}`
    );

};

/**
 * Obtener médicos activos
 */
export const listarActivos = async (): Promise<MedicoResponse[]> => {

    const response = await api.get<MedicoResponse[]>(
        `${URL}/activos`
    );

    return response.data;

};

/**
 * Buscar por especialidad
 */
export const listarPorEspecialidad = async (

    especialidadId: number

): Promise<MedicoResponse[]> => {

    const response = await api.get<MedicoResponse[]>(
        `${URL}/especialidad/${especialidadId}`
    );

    return response.data;

};

/**
 * Activar médico
 */
export const activarMedico = async (

    id: number

): Promise<MedicoResponse> => {

    const response = await api.patch<MedicoResponse>(
        `${URL}/${id}/activar`
    );

    return response.data;

};

/**
 * Desactivar médico
 */
export const desactivarMedico = async (

    id: number

): Promise<MedicoResponse> => {

    const response = await api.patch<MedicoResponse>(
        `${URL}/${id}/desactivar`
    );

    return response.data;

};