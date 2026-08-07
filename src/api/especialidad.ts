import api from "./axios";

export interface EspecialidadRequest {

    nombre: string;

    descripcion?: string;

    duracionConsulta: number;

    costoConsulta: number;

    color?: string;

    ubicacion?: string;

    activa: boolean;

}

export interface EspecialidadResponse {

    id: number;

    nombre: string;

    descripcion: string;

    duracionConsulta: number;

    costoConsulta: number;

    color: string;

    ubicacion: string;

    activa: boolean;

    fechaRegistro: string;

}

const URL = "/especialidades";

/**
 * Obtener todas las especialidades
 */
export const listarEspecialidades = async (): Promise<EspecialidadResponse[]> => {

    const response = await api.get<EspecialidadResponse[]>(URL);

    return response.data;

};

/**
 * Obtener especialidad por ID
 */
export const obtenerEspecialidad = async (

    id: number

): Promise<EspecialidadResponse> => {

    const response = await api.get<EspecialidadResponse>(
        `${URL}/${id}`
    );

    return response.data;

};

/**
 * Crear especialidad
 */
export const crearEspecialidad = async (

    request: EspecialidadRequest

): Promise<EspecialidadResponse> => {

    const response = await api.post<EspecialidadResponse>(
        URL,
        request
    );

    return response.data;

};

/**
 * Actualizar especialidad
 */
export const actualizarEspecialidad = async (

    id: number,

    request: EspecialidadRequest

): Promise<EspecialidadResponse> => {

    const response = await api.put<EspecialidadResponse>(
        `${URL}/${id}`,
        request
    );

    return response.data;

};

/**
 * Eliminar especialidad
 */
export const eliminarEspecialidad = async (

    id: number

): Promise<void> => {

    await api.delete(
        `${URL}/${id}`
    );

};

/**
 * Buscar por nombre
 */
export const buscarPorNombre = async (

    nombre: string

): Promise<EspecialidadResponse> => {

    const response = await api.get<EspecialidadResponse>(
        `${URL}/nombre/${nombre}`
    );

    return response.data;

};

/**
 * Obtener especialidades activas
 */
export const listarActivas = async (): Promise<EspecialidadResponse[]> => {

    const response = await api.get<EspecialidadResponse[]>(
        `${URL}/activas`
    );

    return response.data;

};

/**
 * Activar especialidad
 */
export const activarEspecialidad = async (

    id: number

): Promise<EspecialidadResponse> => {

    const response = await api.patch<EspecialidadResponse>(
        `${URL}/${id}/activar`
    );

    return response.data;

};

/**
 * Desactivar especialidad
 */
export const desactivarEspecialidad = async (

    id: number

): Promise<EspecialidadResponse> => {

    const response = await api.patch<EspecialidadResponse>(
        `${URL}/${id}/desactivar`
    );

    return response.data;

};