import {
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";

import type {
    PayloadAction,
} from "@reduxjs/toolkit";

import {
    listarMedicos,
    obtenerMedico,
    crearMedico,
    actualizarMedico,
    eliminarMedico,
} from "../../api/medico";

import type {
    MedicoRequest,
    MedicoResponse,
} from "../../api/medico";

interface MedicoState {
    medicos: MedicoResponse[];

    medicoSeleccionado:
        | MedicoResponse
        | null;

    loading: boolean;

    error: string | null;
}

const initialState: MedicoState = {
    medicos: [],

    medicoSeleccionado: null,

    loading: false,

    error: null,
};

/**
 * Obtener todos los médicos
 */
export const fetchMedicos =
    createAsyncThunk<
        MedicoResponse[],
        void,
        {
            rejectValue: string;
        }
    >(
        "medico/fetchMedicos",
        async (
            _,
            { rejectWithValue }
        ) => {
            try {
                return await listarMedicos();
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudieron obtener los médicos."
                );
            }
        }
    );

/**
 * Obtener médico por ID
 */
export const fetchMedico =
    createAsyncThunk<
        MedicoResponse,
        number,
        {
            rejectValue: string;
        }
    >(
        "medico/fetchMedico",
        async (
            id,
            { rejectWithValue }
        ) => {
            try {
                return await obtenerMedico(
                    id
                );
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudo obtener el médico."
                );
            }
        }
    );

/**
 * Crear médico
 */
export const addMedico =
    createAsyncThunk<
        MedicoResponse,
        MedicoRequest,
        {
            rejectValue: string;
        }
    >(
        "medico/addMedico",
        async (
            request,
            { rejectWithValue }
        ) => {
            try {
                return await crearMedico(
                    request
                );
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudo crear el médico."
                );
            }
        }
    );

/**
 * Actualizar médico
 */
export const updateMedico =
    createAsyncThunk<
        MedicoResponse,
        {
            id: number;
            request: MedicoRequest;
        },
        {
            rejectValue: string;
        }
    >(
        "medico/updateMedico",
        async (
            { id, request },
            { rejectWithValue }
        ) => {
            try {
                return await actualizarMedico(
                    id,
                    request
                );
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudo actualizar el médico."
                );
            }
        }
    );

/**
 * Eliminar médico
 */
export const removeMedico =
    createAsyncThunk<
        number,
        number,
        {
            rejectValue: string;
        }
    >(
        "medico/removeMedico",
        async (
            id,
            { rejectWithValue }
        ) => {
            try {
                await eliminarMedico(id);

                return id;
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudo eliminar el médico."
                );
            }
        }
    );

const medicoSlice = createSlice({
    name: "medico",

    initialState,

    reducers: {
        setMedicoSeleccionado: (
            state,
            action: PayloadAction<
                MedicoResponse | null
            >
        ) => {
            state.medicoSeleccionado =
                action.payload;
        },

        limpiarMedicoSeleccionado: (
            state
        ) => {
            state.medicoSeleccionado =
                null;
        },

        limpiarError: (
            state
        ) => {
            state.error = null;
        },

        limpiarMedicos: (
            state
        ) => {
            state.medicos = [];

            state.medicoSeleccionado =
                null;
        },
    },

    extraReducers: (builder) => {
        builder

            // LISTAR
            .addCase(
                fetchMedicos.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                fetchMedicos.fulfilled,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.medicos =
                        action.payload;
                }
            )

            .addCase(
                fetchMedicos.rejected,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.error =
                        action.payload ??
                        "Error al cargar los médicos.";
                }
            )

            // OBTENER
            .addCase(
                fetchMedico.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                fetchMedico.fulfilled,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.medicoSeleccionado =
                        action.payload;
                }
            )

            .addCase(
                fetchMedico.rejected,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.error =
                        action.payload ??
                        "Error al obtener el médico.";
                }
            )

            // CREAR
            .addCase(
                addMedico.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                addMedico.fulfilled,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.medicos.push(
                        action.payload
                    );

                    state.medicoSeleccionado =
                        action.payload;
                }
            )

            .addCase(
                addMedico.rejected,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.error =
                        action.payload ??
                        "Error al crear el médico.";
                }
            )

            // ACTUALIZAR
            .addCase(
                updateMedico.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                updateMedico.fulfilled,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    const index =
                        state.medicos.findIndex(
                            (medico) =>
                                medico.id ===
                                action.payload.id
                        );

                    if (index !== -1) {
                        state.medicos[index] =
                            action.payload;
                    }

                    state.medicoSeleccionado =
                        action.payload;
                }
            )

            .addCase(
                updateMedico.rejected,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.error =
                        action.payload ??
                        "Error al actualizar el médico.";
                }
            )

            // ELIMINAR
            .addCase(
                removeMedico.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                removeMedico.fulfilled,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.medicos =
                        state.medicos.filter(
                            (medico) =>
                                medico.id !==
                                action.payload
                        );

                    if (
                        state
                            .medicoSeleccionado
                            ?.id ===
                        action.payload
                    ) {
                        state.medicoSeleccionado =
                            null;
                    }
                }
            )

            .addCase(
                removeMedico.rejected,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.error =
                        action.payload ??
                        "Error al eliminar el médico.";
                }
            );
    },
});

export const {
    setMedicoSeleccionado,
    limpiarMedicoSeleccionado,
    limpiarError,
    limpiarMedicos,
} = medicoSlice.actions;

export default medicoSlice.reducer;