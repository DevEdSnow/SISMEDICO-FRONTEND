const TOKEN_KEY = "sismedico_token";
const USER_KEY = "sismedico_user";

/**
 * Guardar token JWT
 */
export const guardarToken = (
    token: string
): void => {
    localStorage.setItem(
        TOKEN_KEY,
        token
    );
};

/**
 * Obtener token JWT
 */
export const obtenerToken = (): string | null => {
    return localStorage.getItem(
        TOKEN_KEY
    );
};

/**
 * Eliminar token
 */
export const eliminarToken = (): void => {
    localStorage.removeItem(
        TOKEN_KEY
    );
};

/**
 * Verificar si existe una sesión
 */
export const tieneSesion = (): boolean => {
    return Boolean(obtenerToken());
};

/**
 * Guardar información del usuario
 */
export const guardarUsuario = <T>(
    usuario: T
): void => {
    localStorage.setItem(
        USER_KEY,
        JSON.stringify(usuario)
    );
};

/**
 * Obtener información del usuario
 */
export const obtenerUsuario = <T>(): T | null => {
    const usuario =
        localStorage.getItem(
            USER_KEY
        );

    if (!usuario) {
        return null;
    }

    try {
        return JSON.parse(usuario) as T;
    } catch {
        return null;
    }
};

/**
 * Eliminar información del usuario
 */
export const eliminarUsuario = (): void => {
    localStorage.removeItem(
        USER_KEY
    );
};

/**
 * Cerrar sesión
 */
export const cerrarSesion = (): void => {
    eliminarToken();
    eliminarUsuario();
};

/**
 * Guardar sesión completa
 */
export const guardarSesion = <T>(
    token: string,
    usuario: T
): void => {
    guardarToken(token);
    guardarUsuario(usuario);
};

/**
 * Obtener sesión completa
 */
export const obtenerSesion = <T>(): {
    token: string;
    usuario: T | null;
} | null => {
    const token = obtenerToken();

    if (!token) {
        return null;
    }

    return {
        token,
        usuario: obtenerUsuario<T>(),
    };
};

const authService = {
    guardarToken,
    obtenerToken,
    eliminarToken,
    tieneSesion,
    guardarUsuario,
    obtenerUsuario,
    eliminarUsuario,
    cerrarSesion,
    guardarSesion,
    obtenerSesion,
};

export default authService;