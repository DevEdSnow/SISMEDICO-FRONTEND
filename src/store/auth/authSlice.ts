
import {
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";

import type {
    PayloadAction,
} from "@reduxjs/toolkit";

import {
    login as iniciarSesion,
} from "../../api/auth";

import type {
    LoginRequest,
} from "../../api/auth";

export interface AuthUser {
    id?: number;
    uuid?: string;

    nombre: string;

    apellido: string;

    correo: string;

    telefono?: string;

    direccion?: string;

    foto?: string;

    genero?: string;

    fechaNacimiento?: string;

    rol?: string;

    activo?: boolean;

    emailVerificado?: boolean;
}

interface AuthState {
    usuario: AuthUser | null;

    token: string | null;

    loading: boolean;

    error: string | null;

    isAuthenticated: boolean;
}

const TOKEN_KEY = "sismedico_token";

const USER_KEY = "sismedico_usuario";

const getStoredUser = (): AuthUser | null => {
    try {
        const user =
            localStorage.getItem(
                USER_KEY
            );

        if (!user) {
            return null;
        }

        return JSON.parse(user);
    } catch {
        return null;
    }
};

const getStoredToken = (): string | null => {
    return localStorage.getItem(
        TOKEN_KEY
    );
};

const initialToken =
    getStoredToken();

const initialUser =
    getStoredUser();

const initialState: AuthState = {
    usuario: initialUser,

    token: initialToken,

    loading: false,

    error: null,

    isAuthenticated:
        Boolean(initialToken),
};

/**
 * Login
 */
export const login = createAsyncThunk<
    {
        token: string;
        usuario?: AuthUser;
    },
    LoginRequest,
    {
        rejectValue: string;
    }
>(
    "auth/login",
    async (
        credentials,
        { rejectWithValue }
    ) => {
        try {
            const response =
                await iniciarSesion(
                    credentials
                );

            /*
             * El backend puede devolver
             * directamente el token o un
             * objeto con el token.
             */

            const data =
                response as any;

            const token =
                typeof data === "string"
                    ? data
                    : data.token;

            if (!token) {
                return rejectWithValue(
                    "El servidor no devolvió un token."
                );
            }

            const usuario =
                data.usuario ??
                data.user ??
                undefined;

            localStorage.setItem(
                TOKEN_KEY,
                token
            );

            if (usuario) {
                localStorage.setItem(
                    USER_KEY,
                    JSON.stringify(
                        usuario
                    )
                );
            }

            return {
                token,
                usuario,
            };
        } catch (error: any) {
            const message =
                error?.response?.data
                    ?.message ??
                error?.response?.data ??
                error?.message ??
                "Error al iniciar sesión.";

            return rejectWithValue(
                String(message)
            );
        }
    }
);

/**
 * Auth Slice
 */
const authSlice =
    createSlice({
        name: "auth",

        initialState,

        reducers: {
            setCredentials: (
                state,
                action: PayloadAction<{
                    token: string;
                    usuario: AuthUser;
                }>
            ) => {
                state.token =
                    action.payload.token;

                state.usuario =
                    action.payload.usuario;

                state.isAuthenticated =
                    true;

                state.error = null;

                localStorage.setItem(
                    TOKEN_KEY,
                    action.payload.token
                );

                localStorage.setItem(
                    USER_KEY,
                    JSON.stringify(
                        action.payload.usuario
                    )
                );
            },

            setUser: (
                state,
                action: PayloadAction<AuthUser>
            ) => {
                state.usuario =
                    action.payload;

                localStorage.setItem(
                    USER_KEY,
                    JSON.stringify(
                        action.payload
                    )
                );
            },

            setToken: (
                state,
                action: PayloadAction<string>
            ) => {
                state.token =
                    action.payload;

                state.isAuthenticated =
                    true;

                localStorage.setItem(
                    TOKEN_KEY,
                    action.payload
                );
            },

            clearError: (
                state
            ) => {
                state.error = null;
            },

            logout: (
                state
            ) => {
                state.usuario = null;

                state.token = null;

                state.loading = false;

                state.error = null;

                state.isAuthenticated =
                    false;

                localStorage.removeItem(
                    TOKEN_KEY
                );

                localStorage.removeItem(
                    USER_KEY
                );
            },
        },

        extraReducers: (
            builder
        ) => {
            builder
                .addCase(
                    login.pending,
                    (state) => {
                        state.loading =
                            true;

                        state.error =
                            null;
                    }
                )

                .addCase(
                    login.fulfilled,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.token =
                            action.payload.token;

                        state.usuario =
                            action.payload.usuario ??
                            null;

                        state.isAuthenticated =
                            true;

                        state.error =
                            null;
                    }
                )

                .addCase(
                    login.rejected,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.isAuthenticated =
                            false;

                        state.error =
                            action.payload ??
                            "No se pudo iniciar sesión.";
                    }
                );
        },
    });

export const {
    setCredentials,
    setUser,
    setToken,
    clearError,
    logout,
} = authSlice.actions;

export default authSlice.reducer;

