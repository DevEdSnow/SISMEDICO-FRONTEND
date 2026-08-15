import {
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";

import type {
    PayloadAction,
} from "@reduxjs/toolkit";

import {
    listarDiagnosticos,
    obtenerDiagnostico,
    crearDiagnostico,
    actualizarDiagnostico,
    eliminarDiagnostico,
} from "../../api/diagnostico";

import type {
    DiagnosticoRequest,
    DiagnosticoResponse,
} from "../../api/diagnostico";

interface DiagnosticoState {
    diagnosticos: DiagnosticoResponse[];

    diagnosticoSeleccionado:
        | DiagnosticoResponse
        | null;

    loading: boolean;

    error: string | null;
}

const initialState: DiagnosticoState = {
    diagnosticos: [],

    diagnosticoSeleccionado: null,

    loading: false,

    error: null,
};

/**
 * Obtener todos los diagnósticos
 */
export const fetchDiagnosticos =
    createAsyncThunk<
        DiagnosticoResponse[],
        void,
        {
            rejectValue: string;
        }
    >(
        "diagnostico/fetchDiagnosticos",
        async (
            _,
            { rejectWithValue }
        ) => {
            try {
                return await listarDiagnosticos();
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudieron obtener los diagnósticos."
                );
            }
        }
    );

/**
 * Obtener diagnóstico por ID
 */
export const fetchDiagnostico =
    createAsyncThunk<
        DiagnosticoResponse,
        number,
        {
            rejectValue: string;
        }
    >(
        "diagnostico/fetchDiagnostico",
        async (
            id,
            { rejectWithValue }
        ) => {
            try {
                return await obtenerDiagnostico(
                    id
                );
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudo obtener el diagnóstico."
                );
            }
        }
    );

/**
 * Crear diagnóstico
 */
export const addDiagnostico =
    createAsyncThunk<
        DiagnosticoResponse,
        DiagnosticoRequest,
        {
            rejectValue: string;
        }
    >(
        "diagnostico/addDiagnostico",
        async (
            request,
            { rejectWithValue }
        ) => {
            try {
                return await crearDiagnostico(
                    request
                );
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudo crear el diagnóstico."
                );
            }
        }
    );

/**
 * Actualizar diagnóstico
 */
export const updateDiagnostico =
    createAsyncThunk<
        DiagnosticoResponse,
        {
            id: number;
            request: DiagnosticoRequest;
        },
        {
            rejectValue: string;
        }
    >(
        "diagnostico/updateDiagnostico",
        async (
            { id, request },
            { rejectWithValue }
        ) => {
            try {
                return await actualizarDiagnostico(
                    id,
                    request
                );
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudo actualizar el diagnóstico."
                );
            }
        }
    );

/**
 * Eliminar diagnóstico
 */
export const removeDiagnostico =
    createAsyncThunk<
        number,
        number,
        {
            rejectValue: string;
        }
    >(
        "diagnostico/removeDiagnostico",
        async (
            id,
            { rejectWithValue }
        ) => {
            try {
                await eliminarDiagnostico(
                    id
                );

                return id;
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudo eliminar el diagnóstico."
                );
            }
        }
    );

const diagnosticoSlice =
    createSlice({
        name: "diagnostico",

        initialState,

        reducers: {
            setDiagnosticoSeleccionado: (
                state,
                action: PayloadAction<
                    DiagnosticoResponse | null
                >
            ) => {
                state.diagnosticoSeleccionado =
                    action.payload;
            },

            limpiarDiagnosticoSeleccionado: (
                state
            ) => {
                state.diagnosticoSeleccionado =
                    null;
            },

            limpiarError: (
                state
            ) => {
                state.error = null;
            },

            limpiarDiagnosticos: (
                state
            ) => {
                state.diagnosticos = [];

                state.diagnosticoSeleccionado =
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
                    fetchDiagnosticos.pending,
                    (state) => {
                        state.loading =
                            true;

                        state.error =
                            null;
                    }
                )

                .addCase(
                    fetchDiagnosticos.fulfilled,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.diagnosticos =
                            action.payload;
                    }
                )

                .addCase(
                    fetchDiagnosticos.rejected,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.error =
                            action.payload ??
                            "Error al cargar los diagnósticos.";
                    }
                )

                /*
                 * OBTENER
                 */
                .addCase(
                    fetchDiagnostico.pending,
                    (state) => {
                        state.loading =
                            true;

                        state.error =
                            null;
                    }
                )

                .addCase(
                    fetchDiagnostico.fulfilled,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.diagnosticoSeleccionado =
                            action.payload;
                    }
                )

                .addCase(
                    fetchDiagnostico.rejected,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.error =
                            action.payload ??
                            "Error al obtener el diagnóstico.";
                    }
                )

                /*
                 * CREAR
                 */
                .addCase(
                    addDiagnostico.pending,
                    (state) => {
                        state.loading =
                            true;

                        state.error =
                            null;
                    }
                )

                .addCase(
                    addDiagnostico.fulfilled,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.diagnosticos.push(
                            action.payload
                        );

                        state.diagnosticoSeleccionado =
                            action.payload;
                    }
                )

                .addCase(
                    addDiagnostico.rejected,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.error =
                            action.payload ??
                            "Error al crear el diagnóstico.";
                    }
                )

                /*
                 * ACTUALIZAR
                 */
                .addCase(
                    updateDiagnostico.pending,
                    (state) => {
                        state.loading =
                            true;

                        state.error =
                            null;
                    }
                )

                .addCase(
                    updateDiagnostico.fulfilled,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        const index =
                            state.diagnosticos.findIndex(
                                (
                                    diagnostico
                                ) =>
                                    diagnostico.id ===
                                    action.payload.id
                            );

                        if (
                            index !== -1
                        ) {
                            state.diagnosticos[
                                index
                            ] =
                                action.payload;
                        }

                        state.diagnosticoSeleccionado =
                            action.payload;
                    }
                )

                .addCase(
                    updateDiagnostico.rejected,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.error =
                            action.payload ??
                            "Error al actualizar el diagnóstico.";
                    }
                )

                /*
                 * ELIMINAR
                 */
                .addCase(
                    removeDiagnostico.pending,
                    (state) => {
                        state.loading =
                            true;

                        state.error =
                            null;
                    }
                )

                .addCase(
                    removeDiagnostico.fulfilled,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.diagnosticos =
                            state.diagnosticos.filter(
                                (
                                    diagnostico
                                ) =>
                                    diagnostico.id !==
                                    action.payload
                            );

                        if (
                            state
                                .diagnosticoSeleccionado
                                ?.id ===
                            action.payload
                        ) {
                            state.diagnosticoSeleccionado =
                                null;
                        }
                    }
                )

                .addCase(
                    removeDiagnostico.rejected,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.error =
                            action.payload ??
                            "Error al eliminar el diagnóstico.";
                    }
                );
        },
    });

export const {
    setDiagnosticoSeleccionado,
    limpiarDiagnosticoSeleccionado,
    limpiarError,
    limpiarDiagnosticos,
} = diagnosticoSlice.actions;

export default diagnosticoSlice.reducer;