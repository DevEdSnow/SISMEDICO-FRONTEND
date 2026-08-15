import {
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";

import type {
    PayloadAction,
} from "@reduxjs/toolkit";

import {
    listarEspecialidades,
    obtenerEspecialidad,
    crearEspecialidad,
    actualizarEspecialidad,
    eliminarEspecialidad,
} from "../../api/especialidad";

import type {
    EspecialidadRequest,
    EspecialidadResponse,
} from "../../api/especialidad";

interface EspecialidadState {
    especialidades: EspecialidadResponse[];

    especialidadSeleccionada:
        | EspecialidadResponse
        | null;

    loading: boolean;

    error: string | null;
}

const initialState: EspecialidadState = {
    especialidades: [],

    especialidadSeleccionada: null,

    loading: false,

    error: null,
};

/**
 * Obtener todas las especialidades
 */
export const fetchEspecialidades =
    createAsyncThunk<
        EspecialidadResponse[],
        void,
        {
            rejectValue: string;
        }
    >(
        "especialidad/fetchEspecialidades",
        async (
            _,
            { rejectWithValue }
        ) => {
            try {
                return await listarEspecialidades();
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudieron obtener las especialidades."
                );
            }
        }
    );

/**
 * Obtener especialidad por ID
 */
export const fetchEspecialidad =
    createAsyncThunk<
        EspecialidadResponse,
        number,
        {
            rejectValue: string;
        }
    >(
        "especialidad/fetchEspecialidad",
        async (
            id,
            { rejectWithValue }
        ) => {
            try {
                return await obtenerEspecialidad(
                    id
                );
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudo obtener la especialidad."
                );
            }
        }
    );

/**
 * Crear especialidad
 */
export const addEspecialidad =
    createAsyncThunk<
        EspecialidadResponse,
        EspecialidadRequest,
        {
            rejectValue: string;
        }
    >(
        "especialidad/addEspecialidad",
        async (
            request,
            { rejectWithValue }
        ) => {
            try {
                return await crearEspecialidad(
                    request
                );
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudo crear la especialidad."
                );
            }
        }
    );

/**
 * Actualizar especialidad
 */
export const updateEspecialidad =
    createAsyncThunk<
        EspecialidadResponse,
        {
            id: number;
            request: EspecialidadRequest;
        },
        {
            rejectValue: string;
        }
    >(
        "especialidad/updateEspecialidad",
        async (
            { id, request },
            { rejectWithValue }
        ) => {
            try {
                return await actualizarEspecialidad(
                    id,
                    request
                );
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudo actualizar la especialidad."
                );
            }
        }
    );

/**
 * Eliminar especialidad
 */
export const removeEspecialidad =
    createAsyncThunk<
        number,
        number,
        {
            rejectValue: string;
        }
    >(
        "especialidad/removeEspecialidad",
        async (
            id,
            { rejectWithValue }
        ) => {
            try {
                await eliminarEspecialidad(
                    id
                );

                return id;
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudo eliminar la especialidad."
                );
            }
        }
    );

const especialidadSlice =
    createSlice({
        name: "especialidad",

        initialState,

        reducers: {
            setEspecialidadSeleccionada: (
                state,
                action: PayloadAction<
                    EspecialidadResponse | null
                >
            ) => {
                state.especialidadSeleccionada =
                    action.payload;
            },

            limpiarEspecialidadSeleccionada: (
                state
            ) => {
                state.especialidadSeleccionada =
                    null;
            },

            limpiarError: (
                state
            ) => {
                state.error = null;
            },

            limpiarEspecialidades: (
                state
            ) => {
                state.especialidades = [];

                state.especialidadSeleccionada =
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
                    fetchEspecialidades.pending,
                    (state) => {
                        state.loading =
                            true;

                        state.error =
                            null;
                    }
                )

                .addCase(
                    fetchEspecialidades.fulfilled,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.especialidades =
                            action.payload;
                    }
                )

                .addCase(
                    fetchEspecialidades.rejected,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.error =
                            action.payload ??
                            "Error al cargar las especialidades.";
                    }
                )

                /*
                 * OBTENER
                 */
                .addCase(
                    fetchEspecialidad.pending,
                    (state) => {
                        state.loading =
                            true;

                        state.error =
                            null;
                    }
                )

                .addCase(
                    fetchEspecialidad.fulfilled,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.especialidadSeleccionada =
                            action.payload;
                    }
                )

                .addCase(
                    fetchEspecialidad.rejected,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.error =
                            action.payload ??
                            "Error al obtener la especialidad.";
                    }
                )

                /*
                 * CREAR
                 */
                .addCase(
                    addEspecialidad.pending,
                    (state) => {
                        state.loading =
                            true;

                        state.error =
                            null;
                    }
                )

                .addCase(
                    addEspecialidad.fulfilled,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.especialidades.push(
                            action.payload
                        );

                        state.especialidadSeleccionada =
                            action.payload;
                    }
                )

                .addCase(
                    addEspecialidad.rejected,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.error =
                            action.payload ??
                            "Error al crear la especialidad.";
                    }
                )

                /*
                 * ACTUALIZAR
                 */
                .addCase(
                    updateEspecialidad.pending,
                    (state) => {
                        state.loading =
                            true;

                        state.error =
                            null;
                    }
                )

                .addCase(
                    updateEspecialidad.fulfilled,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        const index =
                            state.especialidades.findIndex(
                                (
                                    especialidad
                                ) =>
                                    especialidad.id ===
                                    action.payload.id
                            );

                        if (
                            index !== -1
                        ) {
                            state.especialidades[
                                index
                            ] =
                                action.payload;
                        }

                        state.especialidadSeleccionada =
                            action.payload;
                    }
                )

                .addCase(
                    updateEspecialidad.rejected,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.error =
                            action.payload ??
                            "Error al actualizar la especialidad.";
                    }
                )

                /*
                 * ELIMINAR
                 */
                .addCase(
                    removeEspecialidad.pending,
                    (state) => {
                        state.loading =
                            true;

                        state.error =
                            null;
                    }
                )

                .addCase(
                    removeEspecialidad.fulfilled,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.especialidades =
                            state.especialidades.filter(
                                (
                                    especialidad
                                ) =>
                                    especialidad.id !==
                                    action.payload
                            );

                        if (
                            state
                                .especialidadSeleccionada
                                ?.id ===
                            action.payload
                        ) {
                            state.especialidadSeleccionada =
                                null;
                        }
                    }
                )

                .addCase(
                    removeEspecialidad.rejected,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.error =
                            action.payload ??
                            "Error al eliminar la especialidad.";
                    }
                );
        },
    });

export const {
    setEspecialidadSeleccionada,
    limpiarEspecialidadSeleccionada,
    limpiarError,
    limpiarEspecialidades,
} = especialidadSlice.actions;

export default especialidadSlice.reducer;