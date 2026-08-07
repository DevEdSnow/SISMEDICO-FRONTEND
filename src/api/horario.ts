import api from "./axios";

export interface HorarioRequest {

    medicoId: number;

    diaSemana: string;

    horaInicio: string;

    horaFin: string;

}

export interface HorarioResponse {

    id: number;

    medicoId: number;

    nombreMedico: string;

    especialidad: string;

    diaSemana: string;

    horaInicio: string;

    horaFin: string;

    activo: boolean;

}

const URL = "/horarios";

/**
 * Listar horarios
 */
export const listarHorarios = async (): Promise<HorarioResponse[]> => {

    const response = await api.get<HorarioResponse[]>(URL);

    return response.data;

};

/**
 * Obtener horario por ID
 */
export const obtenerHorario = async (

    id: number

): Promise<HorarioResponse> => {

    const response = await api.get<HorarioResponse>(
        `${URL}/${id}`
    );

    return response.data;

};

/**
 * Crear horario
 */
export const crearHorario = async (

    request: HorarioRequest

): Promise<HorarioResponse> => {

    const response = await api.post<HorarioResponse>(
        URL,
        request
    );

    return response.data;

};

/**
 * Actualizar horario
 */
export const actualizarHorario = async (

    id: number,

    request: HorarioRequest

): Promise<HorarioResponse> => {

    const response = await api.put<HorarioResponse>(
        `${URL}/${id}`,
        request
    );

    return response.data;

};

/**
 * Eliminar horario
 */
export const eliminarHorario = async (

    id: number

): Promise<void> => {

    await api.delete(
        `${URL}/${id}`
    );

};

/**
 * Obtener horarios por médico
 */
export const listarPorMedico = async (

    medicoId: number

): Promise<HorarioResponse[]> => {

    const response = await api.get<HorarioResponse[]>(
        `${URL}/medico/${medicoId}`
    );

    return response.data;

};

/**
 * Obtener horarios activos
 */
export const listarActivos = async (): Promise<HorarioResponse[]> => {

    const response = await api.get<HorarioResponse[]>(
        `${URL}/activos`
    );

    return response.data;

};

/**
 * Activar horario
 */
export const activarHorario = async (

    id: number

): Promise<HorarioResponse> => {

    const response = await api.patch<HorarioResponse>(
        `${URL}/${id}/activar`
    );

    return response.data;

};

/**
 * Desactivar horario
 */
export const desactivarHorario = async (

    id: number

): Promise<HorarioResponse> => {

    const response = await api.patch<HorarioResponse>(
        `${URL}/${id}/desactivar`
    );

    return response.data;

};