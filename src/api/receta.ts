import api from "./axios";

export interface RecetaRequest {

    citaId: number;

    medicamentos: string;

    indicaciones: string;

    observaciones?: string;

}

export interface RecetaResponse {

    id: number;

    citaId: number;

    paciente: string;

    medico: string;

    medicamentos: string;

    indicaciones: string;

    observaciones: string;

    fechaRegistro: string;

}

const URL = "/recetas";

/**
 * Obtener todas las recetas
 */
export const listarRecetas = async (): Promise<RecetaResponse[]> => {

    const response = await api.get<RecetaResponse[]>(URL);

    return response.data;

};

/**
 * Obtener receta por ID
 */
export const obtenerReceta = async (

    id: number

): Promise<RecetaResponse> => {

    const response = await api.get<RecetaResponse>(
        `${URL}/${id}`
    );

    return response.data;

};

/**
 * Obtener receta por cita
 */
export const obtenerPorCita = async (

    citaId: number

): Promise<RecetaResponse> => {

    const response = await api.get<RecetaResponse>(
        `${URL}/cita/${citaId}`
    );

    return response.data;

};

/**
 * Crear receta
 */
export const crearReceta = async (

    request: RecetaRequest

): Promise<RecetaResponse> => {

    const response = await api.post<RecetaResponse>(
        URL,
        request
    );

    return response.data;

};

/**
 * Actualizar receta
 */
export const actualizarReceta = async (

    id: number,

    request: RecetaRequest

): Promise<RecetaResponse> => {

    const response = await api.put<RecetaResponse>(
        `${URL}/${id}`,
        request
    );

    return response.data;

};

/**
 * Eliminar receta
 */
export const eliminarReceta = async (

    id: number

): Promise<void> => {

    await api.delete(
        `${URL}/${id}`
    );

};

/**
 * Obtener recetas de un paciente
 */
export const listarPorPaciente = async (

    pacienteId: number

): Promise<RecetaResponse[]> => {

    const response = await api.get<RecetaResponse[]>(
        `${URL}/paciente/${pacienteId}`
    );

    return response.data;

};

/**
 * Obtener recetas de un médico
 */
export const listarPorMedico = async (

    medicoId: number

): Promise<RecetaResponse[]> => {

    const response = await api.get<RecetaResponse[]>(
        `${URL}/medico/${medicoId}`
    );

    return response.data;

};