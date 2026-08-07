import api from "./axios";

export interface NotificacionRequest {

    usuarioId: number;

    titulo: string;

    mensaje: string;

    tipo: string;

}

export interface NotificacionResponse {

    id: number;

    usuarioId: number;

    nombreUsuario: string;

    titulo: string;

    mensaje: string;

    tipo: string;

    leida: boolean;

    fechaRegistro: string;

}

const URL = "/notificaciones";

/**
 * Obtener todas las notificaciones
 */
export const listarNotificaciones = async (): Promise<NotificacionResponse[]> => {

    const response = await api.get<NotificacionResponse[]>(URL);

    return response.data;

};

/**
 * Obtener una notificación por ID
 */
export const obtenerNotificacion = async (

    id: number

): Promise<NotificacionResponse> => {

    const response = await api.get<NotificacionResponse>(
        `${URL}/${id}`
    );

    return response.data;

};

/**
 * Crear notificación
 */
export const crearNotificacion = async (

    request: NotificacionRequest

): Promise<NotificacionResponse> => {

    const response = await api.post<NotificacionResponse>(
        URL,
        request
    );

    return response.data;

};

/**
 * Actualizar notificación
 */
export const actualizarNotificacion = async (

    id: number,

    request: NotificacionRequest

): Promise<NotificacionResponse> => {

    const response = await api.put<NotificacionResponse>(
        `${URL}/${id}`,
        request
    );

    return response.data;

};

/**
 * Eliminar notificación
 */
export const eliminarNotificacion = async (

    id: number

): Promise<void> => {

    await api.delete(
        `${URL}/${id}`
    );

};

/**
 * Obtener notificaciones por usuario
 */
export const listarPorUsuario = async (

    usuarioId: number

): Promise<NotificacionResponse[]> => {

    const response = await api.get<NotificacionResponse[]>(
        `${URL}/usuario/${usuarioId}`
    );

    return response.data;

};

/**
 * Obtener notificaciones no leídas
 */
export const listarNoLeidas = async (

    usuarioId: number

): Promise<NotificacionResponse[]> => {

    const response = await api.get<NotificacionResponse[]>(
        `${URL}/usuario/${usuarioId}/no-leidas`
    );

    return response.data;

};

/**
 * Marcar como leída
 */
export const marcarComoLeida = async (

    id: number

): Promise<NotificacionResponse> => {

    const response = await api.patch<NotificacionResponse>(
        `${URL}/${id}/leer`
    );

    return response.data;

};

/**
 * Marcar todas como leídas
 */
export const marcarTodasComoLeidas = async (

    usuarioId: number

): Promise<void> => {

    await api.patch(
        `${URL}/usuario/${usuarioId}/leer-todas`
    );

};

/**
 * Eliminar todas las notificaciones de un usuario
 */
export const eliminarTodas = async (

    usuarioId: number

): Promise<void> => {

    await api.delete(
        `${URL}/usuario/${usuarioId}`
    );

};