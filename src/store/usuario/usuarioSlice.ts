import {
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";

import type {
    PayloadAction,
} from "@reduxjs/toolkit";

import {
    listarUsuarios,
    obtenerUsuario,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
} from "../../api/usuario";

import type {
    UsuarioRequest,
    UsuarioResponse,
} from "../../api/usuario";

interface UsuarioState {
    usuarios: UsuarioResponse[];

    usuarioSeleccionado:
        | UsuarioResponse
        | null;

    loading: boolean;

    error: string | null;
}

const initialState: UsuarioState = {
    usuarios: [],

    usuarioSeleccionado: null,

    loading: false,

    error: null,
};

/**
 * Obtener todos los usuarios
 */
export const fetchUsuarios =
    createAsyncThunk<
        UsuarioResponse[],
        void,
        {
            rejectValue: string;
        }
    >(
        "usuario/fetchUsuarios",
        async (
            _,
            { rejectWithValue }
        ) => {
            try {
                return await listarUsuarios();
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudieron obtener los usuarios."
                );
            }
        }
    );

/**
 * Obtener usuario por ID
 */
export const fetchUsuario =
    createAsyncThunk<
        UsuarioResponse,
        number,
        {
            rejectValue: string;
        }
    >(
        "usuario/fetchUsuario",
        async (
            id,
            { rejectWithValue }
        ) => {
            try {
                return await obtenerUsuario(
                    id
                );
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudo obtener el usuario."
                );
            }
        }
    );

/**
 * Crear usuario
 */
export const addUsuario =
    createAsyncThunk<
        UsuarioResponse,
        UsuarioRequest,
        {
            rejectValue: string;
        }
    >(
        "usuario/addUsuario",
        async (
            request,
            { rejectWithValue }
        ) => {
            try {
                return await crearUsuario(
                    request
                );
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudo crear el usuario."
                );
            }
        }
    );

/**
 * Actualizar usuario
 */
export const updateUsuario =
    createAsyncThunk<
        UsuarioResponse,
        {
            id: number;
            request: UsuarioRequest;
        },
        {
            rejectValue: string;
        }
    >(
        "usuario/updateUsuario",
        async (
            { id, request },
            { rejectWithValue }
        ) => {
            try {
                return await actualizarUsuario(
                    id,
                    request
                );
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudo actualizar el usuario."
                );
            }
        }
    );

/**
 * Eliminar usuario
 */
export const removeUsuario =
    createAsyncThunk<
        number,
        number,
        {
            rejectValue: string;
        }
    >(
        "usuario/removeUsuario",
        async (
            id,
            { rejectWithValue }
        ) => {
            try {
                await eliminarUsuario(id);

                return id;
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudo eliminar el usuario."
                );
            }
        }
    );

const usuarioSlice = createSlice({
    name: "usuario",

    initialState,

    reducers: {
        setUsuarioSeleccionado: (
            state,
            action: PayloadAction<
                UsuarioResponse | null
            >
        ) => {
            state.usuarioSeleccionado =
                action.payload;
        },

        limpiarUsuarioSeleccionado: (
            state
        ) => {
            state.usuarioSeleccionado =
                null;
        },

        limpiarError: (
            state
        ) => {
            state.error = null;
        },

        limpiarUsuarios: (
            state
        ) => {
            state.usuarios = [];

            state.usuarioSeleccionado =
                null;
        },
    },

    extraReducers: (builder) => {
        builder

            // LISTAR
            .addCase(
                fetchUsuarios.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                fetchUsuarios.fulfilled,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.usuarios =
                        action.payload;
                }
            )

            .addCase(
                fetchUsuarios.rejected,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.error =
                        action.payload ??
                        "Error al cargar los usuarios.";
                }
            )

            // OBTENER
            .addCase(
                fetchUsuario.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                fetchUsuario.fulfilled,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.usuarioSeleccionado =
                        action.payload;
                }
            )

            .addCase(
                fetchUsuario.rejected,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.error =
                        action.payload ??
                        "Error al obtener el usuario.";
                }
            )

            // CREAR
            .addCase(
                addUsuario.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                addUsuario.fulfilled,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.usuarios.push(
                        action.payload
                    );

                    state.usuarioSeleccionado =
                        action.payload;
                }
            )

            .addCase(
                addUsuario.rejected,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.error =
                        action.payload ??
                        "Error al crear el usuario.";
                }
            )

            // ACTUALIZAR
            .addCase(
                updateUsuario.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                updateUsuario.fulfilled,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    const index =
                        state.usuarios.findIndex(
                            (usuario) =>
                                usuario.id ===
                                action.payload.id
                        );

                    if (index !== -1) {
                        state.usuarios[index] =
                            action.payload;
                    }

                    state.usuarioSeleccionado =
                        action.payload;
                }
            )

            .addCase(
                updateUsuario.rejected,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.error =
                        action.payload ??
                        "Error al actualizar el usuario.";
                }
            )

            // ELIMINAR
            .addCase(
                removeUsuario.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                removeUsuario.fulfilled,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.usuarios =
                        state.usuarios.filter(
                            (usuario) =>
                                usuario.id !==
                                action.payload
                        );

                    if (
                        state
                            .usuarioSeleccionado
                            ?.id ===
                        action.payload
                    ) {
                        state.usuarioSeleccionado =
                            null;
                    }
                }
            )

            .addCase(
                removeUsuario.rejected,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.error =
                        action.payload ??
                        "Error al eliminar el usuario.";
                }
            );
    },
});

export const {
    setUsuarioSeleccionado,
    limpiarUsuarioSeleccionado,
    limpiarError,
    limpiarUsuarios,
} = usuarioSlice.actions;

export default usuarioSlice.reducer;