import {
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";

import type {
    PayloadAction,
} from "@reduxjs/toolkit";

import {
    listarNotificaciones,
    obtenerNotificacion,
    crearNotificacion,
    actualizarNotificacion,
    eliminarNotificacion,
} from "../../api/notificacion";

import type {
    NotificacionRequest,
    NotificacionResponse,
} from "../../api/notificacion";

interface NotificacionState {
    notificaciones: NotificacionResponse[];

    notificacionSeleccionada:
        | NotificacionResponse
        | null;

    loading: boolean;

    error: string | null;
}

const initialState: NotificacionState = {
    notificaciones: [],

    notificacionSeleccionada: null,

    loading: false,

    error: null,
};

/**
 * Obtener todas las notificaciones
 */
export const fetchNotificaciones =
    createAsyncThunk<
        NotificacionResponse[],
        void,
        {
            rejectValue: string;
        }
    >(
        "notificacion/fetchNotificaciones",
        async (
            _,
            { rejectWithValue }
        ) => {
            try {
                return await listarNotificaciones();
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudieron obtener las notificaciones."
                );
            }
        }
    );

/**
 * Obtener notificación por ID
 */
export const fetchNotificacion =
    createAsyncThunk<
        NotificacionResponse,
        number,
        {
            rejectValue: string;
        }
    >(
        "notificacion/fetchNotificacion",
        async (
            id,
            { rejectWithValue }
        ) => {
            try {
                return await obtenerNotificacion(
                    id
                );
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudo obtener la notificación."
                );
            }
        }
    );

/**
 * Crear notificación
 */
export const addNotificacion =
    createAsyncThunk<
        NotificacionResponse,
        NotificacionRequest,
        {
            rejectValue: string;
        }
    >(
        "notificacion/addNotificacion",
        async (
            request,
            { rejectWithValue }
        ) => {
            try {
                return await crearNotificacion(
                    request
                );
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudo crear la notificación."
                );
            }
        }
    );

/**
 * Actualizar notificación
 */
export const updateNotificacion =
    createAsyncThunk<
        NotificacionResponse,
        {
            id: number;
            request: NotificacionRequest;
        },
        {
            rejectValue: string;
        }
    >(
        "notificacion/updateNotificacion",
        async (
            { id, request },
            { rejectWithValue }
        ) => {
            try {
                return await actualizarNotificacion(
                    id,
                    request
                );
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudo actualizar la notificación."
                );
            }
        }
    );

/**
 * Eliminar notificación
 */
export const removeNotificacion =
    createAsyncThunk<
        number,
        number,
        {
            rejectValue: string;
        }
    >(
        "notificacion/removeNotificacion",
        async (
            id,
            { rejectWithValue }
        ) => {
            try {
                await eliminarNotificacion(
                    id
                );

                return id;
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudo eliminar la notificación."
                );
            }
        }
    );

const notificacionSlice =
    createSlice({
        name: "notificacion",

        initialState,

        reducers: {
            setNotificacionSeleccionada: (
                state,
                action: PayloadAction<
                    NotificacionResponse | null
                >
            ) => {
                state.notificacionSeleccionada =
                    action.payload;
            },

            limpiarNotificacionSeleccionada: (
                state
            ) => {
                state.notificacionSeleccionada =
                    null;
            },

            limpiarError: (
                state
            ) => {
                state.error = null;
            },

            limpiarNotificaciones: (
                state
            ) => {
                state.notificaciones = [];

                state.notificacionSeleccionada =
                    null;
            },
        },

        extraReducers: (
            builder
        ) => {
            builder

                /*
                 * LISTAR
                 */
                .addCase(
                    fetchNotificaciones.pending,
                    (state) => {
                        state.loading =
                            true;

                        state.error =
                            null;
                    }
                )

                .addCase(
                    fetchNotificaciones.fulfilled,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.notificaciones =
                            action.payload;
                    }
                )

                .addCase(
                    fetchNotificaciones.rejected,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.error =
                            action.payload ??
                            "Error al cargar las notificaciones.";
                    }
                )

                /*
                 * OBTENER
                 */
                .addCase(
                    fetchNotificacion.pending,
                    (state) => {
                        state.loading =
                            true;

                        state.error =
                            null;
                    }
                )

                .addCase(
                    fetchNotificacion.fulfilled,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.notificacionSeleccionada =
                            action.payload;
                    }
                )

                .addCase(
                    fetchNotificacion.rejected,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.error =
                            action.payload ??
                            "Error al obtener la notificación.";
                    }
                )

                /*
                 * CREAR
                 */
                .addCase(
                    addNotificacion.pending,
                    (state) => {
                        state.loading =
                            true;

                        state.error =
                            null;
                    }
                )

                .addCase(
                    addNotificacion.fulfilled,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.notificaciones.push(
                            action.payload
                        );

                        state.notificacionSeleccionada =
                            action.payload;
                    }
                )

                .addCase(
                    addNotificacion.rejected,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.error =
                            action.payload ??
                            "Error al crear la notificación.";
                    }
                )

                /*
                 * ACTUALIZAR
                 */
                .addCase(
                    updateNotificacion.pending,
                    (state) => {
                        state.loading =
                            true;

                        state.error =
                            null;
                    }
                )

                .addCase(
                    updateNotificacion.fulfilled,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        const index =
                            state.notificaciones.findIndex(
                                (
                                    notificacion
                                ) =>
                                    notificacion.id ===
                                    action.payload.id
                            );

                        if (
                            index !== -1
                        ) {
                            state.notificaciones[
                                index
                            ] =
                                action.payload;
                        }

                        state.notificacionSeleccionada =
                            action.payload;
                    }
                )

                .addCase(
                    updateNotificacion.rejected,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.error =
                            action.payload ??
                            "Error al actualizar la notificación.";
                    }
                )

                /*
                 * ELIMINAR
                 */
                .addCase(
                    removeNotificacion.pending,
                    (state) => {
                        state.loading =
                            true;

                        state.error =
                            null;
                    }
                )

                .addCase(
                    removeNotificacion.fulfilled,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.notificaciones =
                            state.notificaciones.filter(
                                (
                                    notificacion
                                ) =>
                                    notificacion.id !==
                                    action.payload
                            );

                        if (
                            state
                                .notificacionSeleccionada
                                ?.id ===
                            action.payload
                        ) {
                            state.notificacionSeleccionada =
                                null;
                        }
                    }
                )

                .addCase(
                    removeNotificacion.rejected,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.error =
                            action.payload ??
                            "Error al eliminar la notificación.";
                    }
                );
        },
    });

export const {
    setNotificacionSeleccionada,
    limpiarNotificacionSeleccionada,
    limpiarError,
    limpiarNotificaciones,
} = notificacionSlice.actions;

export default notificacionSlice.reducer;