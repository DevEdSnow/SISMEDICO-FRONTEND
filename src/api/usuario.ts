import api from "./axios";

export interface UsuarioRequest {

    nombre: string;

    apellido: string;

    correo: string;

    password?: string;

    telefono?: string;

    direccion?: string;

    foto?: string;

    genero: string;

    fechaNacimiento: string;

    rolId: number;

    activo?: boolean;

}

export interface UsuarioResponse {

    id: number;

    uuid: string;

    nombre: string;

    apellido: string;

    correo: string;

    telefono: string;

    direccion: string;

    foto: string;

    genero: string;

    fechaNacimiento: string;

    rol: string;

    activo: boolean;

    emailVerificado: boolean;

    tokenFirebase: string;

    ultimoAcceso: string;

    fechaRegistro: string;

    ultimaActualizacion: string;

}

const URL = "/usuarios";

/**
 * Obtener todos los usuarios
 */
export const listarUsuarios = async (): Promise<UsuarioResponse[]> => {

    const response = await api.get<UsuarioResponse[]>(URL);

    return response.data;

};

/**
 * Obtener usuario por ID
 */
export const obtenerUsuario = async (

    id: number

): Promise<UsuarioResponse> => {

    const response = await api.get<UsuarioResponse>(
        `${URL}/${id}`
    );

    return response.data;

};

/**
 * Crear usuario
 */
export const crearUsuario = async (

    request: UsuarioRequest

): Promise<UsuarioResponse> => {

    const response = await api.post<UsuarioResponse>(
        URL,
        request
    );

    return response.data;

};

/**
 * Actualizar usuario
 */
export const actualizarUsuario = async (

    id: number,

    request: UsuarioRequest

): Promise<UsuarioResponse> => {

    const response = await api.put<UsuarioResponse>(
        `${URL}/${id}`,
        request
    );

    return response.data;

};

/**
 * Eliminar usuario
 */
export const eliminarUsuario = async (

    id: number

): Promise<void> => {

    await api.delete(
        `${URL}/${id}`
    );

};

/**
 * Obtener usuarios activos
 */
export const listarActivos = async (): Promise<UsuarioResponse[]> => {

    const response = await api.get<UsuarioResponse[]>(
        `${URL}/activos`
    );

    return response.data;

};

/**
 * Buscar usuario por correo
 */
export const buscarPorCorreo = async (

    correo: string

): Promise<UsuarioResponse> => {

    const response = await api.get<UsuarioResponse>(
        `${URL}/correo/${correo}`
    );

    return response.data;

};

/**
 * Activar usuario
 */
export const activarUsuario = async (

    id: number

): Promise<UsuarioResponse> => {

    const response = await api.patch<UsuarioResponse>(
        `${URL}/${id}/activar`
    );

    return response.data;

};

/**
 * Desactivar usuario
 */
export const desactivarUsuario = async (

    id: number

): Promise<UsuarioResponse> => {

    const response = await api.patch<UsuarioResponse>(
        `${URL}/${id}/desactivar`
    );

    return response.data;

};

/**
 * Verificar correo electrónico
 */
export const verificarEmail = async (

    id: number

): Promise<UsuarioResponse> => {

    const response = await api.patch<UsuarioResponse>(
        `${URL}/${id}/verificar-email`
    );

    return response.data;

};

/**
 * Actualizar token de Firebase
 */
export const actualizarTokenFirebase = async (

    id: number,

    token: string

): Promise<UsuarioResponse> => {

    const response = await api.patch<UsuarioResponse>(
        `${URL}/${id}/firebase-token`,
        {
            token
        }
    );

    return response.data;

};