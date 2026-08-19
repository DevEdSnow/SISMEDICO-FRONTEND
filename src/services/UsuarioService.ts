import {
    listarUsuarios,
    obtenerUsuario,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
} from "../api/usuario";

import type {
    UsuarioRequest,
    UsuarioResponse,
} from "../api/usuario";

/**
 * Obtener todos los usuarios
 */
export const obtenerUsuarios =
    async (): Promise<UsuarioResponse[]> => {
        return await listarUsuarios();
    };

/**
 * Obtener usuario por ID
 */
export const obtenerUsuarioPorId =
    async (
        id: number
    ): Promise<UsuarioResponse> => {
        return await obtenerUsuario(id);
    };

/**
 * Crear usuario
 */
export const crearNuevoUsuario =
    async (
        request: UsuarioRequest
    ): Promise<UsuarioResponse> => {
        return await crearUsuario(request);
    };

/**
 * Actualizar usuario
 */
export const actualizarUsuarioExistente =
    async (
        id: number,
        request: UsuarioRequest
    ): Promise<UsuarioResponse> => {
        return await actualizarUsuario(
            id,
            request
        );
    };

/**
 * Eliminar usuario
 */
export const eliminarUsuarioPorId =
    async (
        id: number
    ): Promise<void> => {
        await eliminarUsuario(id);
    };

const usuarioService = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearNuevoUsuario,
    actualizarUsuarioExistente,
    eliminarUsuarioPorId,
};

export default usuarioService;