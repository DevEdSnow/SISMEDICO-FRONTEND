import {
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";

import type {
    PayloadAction,
} from "@reduxjs/toolkit";

import {
    listarPacientes,
    obtenerPaciente,
    crearPaciente,
    actualizarPaciente,
    eliminarPaciente,
} from "../../api/paciente";

import type {
    PacienteRequest,
    PacienteResponse,
} from "../../api/paciente";

interface PacienteState {
    pacientes: PacienteResponse[];

    pacienteSeleccionado:
        | PacienteResponse
        | null;

    loading: boolean;

    error: string | null;
}

const initialState: PacienteState = {
    pacientes: [],

    pacienteSeleccionado: null,

    loading: false,

    error: null,
};

/**
 * Obtener todos los pacientes
 */
export const fetchPacientes =
    createAsyncThunk<
        PacienteResponse[],
        void,
        {
            rejectValue: string;
        }
    >(
        "paciente/fetchPacientes",
        async (
            _,
            { rejectWithValue }
        ) => {
            try {
                return await listarPacientes();
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudieron obtener los pacientes."
                );
            }
        }
    );

/**
 * Obtener paciente por ID
 */
export const fetchPaciente =
    createAsyncThunk<
        PacienteResponse,
        number,
        {
            rejectValue: string;
        }
    >(
        "paciente/fetchPaciente",
        async (
            id,
            { rejectWithValue }
        ) => {
            try {
                return await obtenerPaciente(
                    id
                );
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudo obtener el paciente."
                );
            }
        }
    );

/**
 * Crear paciente
 */
export const addPaciente =
    createAsyncThunk<
        PacienteResponse,
        PacienteRequest,
        {
            rejectValue: string;
        }
    >(
        "paciente/addPaciente",
        async (
            request,
            { rejectWithValue }
        ) => {
            try {
                return await crearPaciente(
                    request
                );
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudo crear el paciente."
                );
            }
        }
    );

/**
 * Actualizar paciente
 */
export const updatePaciente =
    createAsyncThunk<
        PacienteResponse,
        {
            id: number;
            request: PacienteRequest;
        },
        {
            rejectValue: string;
        }
    >(
        "paciente/updatePaciente",
        async (
            { id, request },
            { rejectWithValue }
        ) => {
            try {
                return await actualizarPaciente(
                    id,
                    request
                );
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudo actualizar el paciente."
                );
            }
        }
    );

/**
 * Eliminar paciente
 */
export const removePaciente =
    createAsyncThunk<
        number,
        number,
        {
            rejectValue: string;
        }
    >(
        "paciente/removePaciente",
        async (
            id,
            { rejectWithValue }
        ) => {
            try {
                await eliminarPaciente(id);

                return id;
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudo eliminar el paciente."
                );
            }
        }
    );

const pacienteSlice = createSlice({
    name: "paciente",

    initialState,

    reducers: {
        setPacienteSeleccionado: (
            state,
            action: PayloadAction<
                PacienteResponse | null
            >
        ) => {
            state.pacienteSeleccionado =
                action.payload;
        },

        limpiarPacienteSeleccionado: (
            state
        ) => {
            state.pacienteSeleccionado =
                null;
        },

        limpiarError: (
            state
        ) => {
            state.error = null;
        },

        limpiarPacientes: (
            state
        ) => {
            state.pacientes = [];

            state.pacienteSeleccionado =
                null;
        },
    },

    extraReducers: (builder) => {
        builder

            // LISTAR
            .addCase(
                fetchPacientes.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                fetchPacientes.fulfilled,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.pacientes =
                        action.payload;
                }
            )

            .addCase(
                fetchPacientes.rejected,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.error =
                        action.payload ??
                        "Error al cargar los pacientes.";
                }
            )

            // OBTENER
            .addCase(
                fetchPaciente.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                fetchPaciente.fulfilled,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.pacienteSeleccionado =
                        action.payload;
                }
            )

            .addCase(
                fetchPaciente.rejected,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.error =
                        action.payload ??
                        "Error al obtener el paciente.";
                }
            )

            // CREAR
            .addCase(
                addPaciente.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                addPaciente.fulfilled,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.pacientes.push(
                        action.payload
                    );

                    state.pacienteSeleccionado =
                        action.payload;
                }
            )

            .addCase(
                addPaciente.rejected,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.error =
                        action.payload ??
                        "Error al crear el paciente.";
                }
            )

            // ACTUALIZAR
            .addCase(
                updatePaciente.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                updatePaciente.fulfilled,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    const index =
                        state.pacientes.findIndex(
                            (paciente) =>
                                paciente.id ===
                                action.payload.id
                        );

                    if (index !== -1) {
                        state.pacientes[index] =
                            action.payload;
                    }

                    state.pacienteSeleccionado =
                        action.payload;
                }
            )

            .addCase(
                updatePaciente.rejected,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.error =
                        action.payload ??
                        "Error al actualizar el paciente.";
                }
            )

            // ELIMINAR
            .addCase(
                removePaciente.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                removePaciente.fulfilled,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.pacientes =
                        state.pacientes.filter(
                            (paciente) =>
                                paciente.id !==
                                action.payload
                        );

                    if (
                        state
                            .pacienteSeleccionado
                            ?.id ===
                        action.payload
                    ) {
                        state.pacienteSeleccionado =
                            null;
                    }
                }
            )

            .addCase(
                removePaciente.rejected,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.error =
                        action.payload ??
                        "Error al eliminar el paciente.";
                }
            );
    },
});

export const {
    setPacienteSeleccionado,
    limpiarPacienteSeleccionado,
    limpiarError,
    limpiarPacientes,
} = pacienteSlice.actions;

export default pacienteSlice.reducer;