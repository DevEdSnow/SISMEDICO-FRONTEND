import {
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";

import type {
    PayloadAction,
} from "@reduxjs/toolkit";

import {
    listarCitas,
    obtenerCita,
    crearCita,
    actualizarCita,
    eliminarCita,
} from "../../api/cita";

import type {
    CitaRequest,
    CitaResponse,
} from "../../api/cita";

interface CitaState {
    citas: CitaResponse[];

    citaSeleccionada:
        | CitaResponse
        | null;

    loading: boolean;

    error: string | null;
}

const initialState: CitaState = {
    citas: [],

    citaSeleccionada: null,

    loading: false,

    error: null,
};

/**
 * Obtener todas las citas
 */
export const fetchCitas =
    createAsyncThunk<
        CitaResponse[],
        void,
        {
            rejectValue: string;
        }
    >(
        "cita/fetchCitas",
        async (
            _,
            { rejectWithValue }
        ) => {
            try {
                return await listarCitas();
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudieron obtener las citas."
                );
            }
        }
    );

/**
 * Obtener cita por ID
 */
export const fetchCita =
    createAsyncThunk<
        CitaResponse,
        number,
        {
            rejectValue: string;
        }
    >(
        "cita/fetchCita",
        async (
            id,
            { rejectWithValue }
        ) => {
            try {
                return await obtenerCita(
                    id
                );
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudo obtener la cita."
                );
            }
        }
    );

/**
 * Crear cita
 */
export const addCita =
    createAsyncThunk<
        CitaResponse,
        CitaRequest,
        {
            rejectValue: string;
        }
    >(
        "cita/addCita",
        async (
            request,
            { rejectWithValue }
        ) => {
            try {
                return await crearCita(
                    request
                );
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudo crear la cita."
                );
            }
        }
    );

/**
 * Actualizar cita
 */
export const updateCita =
    createAsyncThunk<
        CitaResponse,
        {
            id: number;
            request: CitaRequest;
        },
        {
            rejectValue: string;
        }
    >(
        "cita/updateCita",
        async (
            { id, request },
            { rejectWithValue }
        ) => {
            try {
                return await actualizarCita(
                    id,
                    request
                );
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudo actualizar la cita."
                );
            }
        }
    );

/**
 * Eliminar cita
 */
export const removeCita =
    createAsyncThunk<
        number,
        number,
        {
            rejectValue: string;
        }
    >(
        "cita/removeCita",
        async (
            id,
            { rejectWithValue }
        ) => {
            try {
                await eliminarCita(id);

                return id;
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudo eliminar la cita."
                );
            }
        }
    );

/**
 * Slice de citas
 */
const citaSlice =
    createSlice({
        name: "cita",

        initialState,

        reducers: {
            setCitaSeleccionada: (
                state,
                action: PayloadAction<
                    CitaResponse | null
                >
            ) => {
                state.citaSeleccionada =
                    action.payload;
            },

            limpiarCitaSeleccionada: (
                state
            ) => {
                state.citaSeleccionada =
                    null;
            },

            limpiarError: (
                state
            ) => {
                state.error = null;
            },

            limpiarCitas: (
                state
            ) => {
                state.citas = [];

                state.citaSeleccionada =
                    null;
            },
        },

        extraReducers: (
            builder
        ) => {
            builder

                // Obtener citas
                .addCase(
                    fetchCitas.pending,
                    (state) => {
                        state.loading =
                            true;

                        state.error =
                            null;
                    }
                )

                .addCase(
                    fetchCitas.fulfilled,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.citas =
                            action.payload;
                    }
                )

                .addCase(
                    fetchCitas.rejected,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.error =
                            action.payload ??
                            "Error al cargar las citas.";
                    }
                )

                // Obtener una cita
                .addCase(
                    fetchCita.pending,
                    (state) => {
                        state.loading =
                            true;

                        state.error =
                            null;
                    }
                )

                .addCase(
                    fetchCita.fulfilled,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.citaSeleccionada =
                            action.payload;
                    }
                )

                .addCase(
                    fetchCita.rejected,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.error =
                            action.payload ??
                            "Error al obtener la cita.";
                    }
                )

                // Crear cita
                .addCase(
                    addCita.pending,
                    (state) => {
                        state.loading =
                            true;

                        state.error =
                            null;
                    }
                )

                .addCase(
                    addCita.fulfilled,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.citas.push(
                            action.payload
                        );

                        state.citaSeleccionada =
                            action.payload;
                    }
                )

                .addCase(
                    addCita.rejected,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.error =
                            action.payload ??
                            "Error al crear la cita.";
                    }
                )

                // Actualizar cita
                .addCase(
                    updateCita.pending,
                    (state) => {
                        state.loading =
                            true;

                        state.error =
                            null;
                    }
                )

                .addCase(
                    updateCita.fulfilled,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        const index =
                            state.citas.findIndex(
                                (cita) =>
                                    cita.id ===
                                    action.payload.id
                            );

                        if (
                            index !== -1
                        ) {
                            state.citas[
                                index
                            ] =
                                action.payload;
                        }

                        state.citaSeleccionada =
                            action.payload;
                    }
                )

                .addCase(
                    updateCita.rejected,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.error =
                            action.payload ??
                            "Error al actualizar la cita.";
                    }
                )

                // Eliminar cita
                .addCase(
                    removeCita.pending,
                    (state) => {
                        state.loading =
                            true;

                        state.error =
                            null;
                    }
                )

                .addCase(
                    removeCita.fulfilled,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.citas =
                            state.citas.filter(
                                (cita) =>
                                    cita.id !==
                                    action.payload
                            );

                        if (
                            state
                                .citaSeleccionada
                                ?.id ===
                            action.payload
                        ) {
                            state.citaSeleccionada =
                                null;
                        }
                    }
                )

                .addCase(
                    removeCita.rejected,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.error =
                            action.payload ??
                            "Error al eliminar la cita.";
                    }
                );
        },
    });

export const {
    setCitaSeleccionada,
    limpiarCitaSeleccionada,
    limpiarError,
    limpiarCitas,
} = citaSlice.actions;

export default citaSlice.reducer;