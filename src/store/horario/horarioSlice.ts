import {
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";

import type {
    PayloadAction,
} from "@reduxjs/toolkit";

import {
    listarHorarios,
    obtenerHorario,
    crearHorario,
    actualizarHorario,
    eliminarHorario,
} from "../../api/horario";

import type {
    HorarioRequest,
    HorarioResponse,
} from "../../api/horario";

interface HorarioState {
    horarios: HorarioResponse[];

    horarioSeleccionado:
        | HorarioResponse
        | null;

    loading: boolean;

    error: string | null;
}

const initialState: HorarioState = {
    horarios: [],

    horarioSeleccionado: null,

    loading: false,

    error: null,
};

/**
 * Obtener todos los horarios
 */
export const fetchHorarios =
    createAsyncThunk<
        HorarioResponse[],
        void,
        {
            rejectValue: string;
        }
    >(
        "horario/fetchHorarios",
        async (
            _,
            { rejectWithValue }
        ) => {
            try {
                return await listarHorarios();
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudieron obtener los horarios."
                );
            }
        }
    );

/**
 * Obtener horario por ID
 */
export const fetchHorario =
    createAsyncThunk<
        HorarioResponse,
        number,
        {
            rejectValue: string;
        }
    >(
        "horario/fetchHorario",
        async (
            id,
            { rejectWithValue }
        ) => {
            try {
                return await obtenerHorario(
                    id
                );
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudo obtener el horario."
                );
            }
        }
    );

/**
 * Crear horario
 */
export const addHorario =
    createAsyncThunk<
        HorarioResponse,
        HorarioRequest,
        {
            rejectValue: string;
        }
    >(
        "horario/addHorario",
        async (
            request,
            { rejectWithValue }
        ) => {
            try {
                return await crearHorario(
                    request
                );
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudo crear el horario."
                );
            }
        }
    );

/**
 * Actualizar horario
 */
export const updateHorario =
    createAsyncThunk<
        HorarioResponse,
        {
            id: number;
            request: HorarioRequest;
        },
        {
            rejectValue: string;
        }
    >(
        "horario/updateHorario",
        async (
            { id, request },
            { rejectWithValue }
        ) => {
            try {
                return await actualizarHorario(
                    id,
                    request
                );
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudo actualizar el horario."
                );
            }
        }
    );

/**
 * Eliminar horario
 */
export const removeHorario =
    createAsyncThunk<
        number,
        number,
        {
            rejectValue: string;
        }
    >(
        "horario/removeHorario",
        async (
            id,
            { rejectWithValue }
        ) => {
            try {
                await eliminarHorario(id);

                return id;
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudo eliminar el horario."
                );
            }
        }
    );

const horarioSlice = createSlice({
    name: "horario",

    initialState,

    reducers: {
        setHorarioSeleccionado: (
            state,
            action: PayloadAction<
                HorarioResponse | null
            >
        ) => {
            state.horarioSeleccionado =
                action.payload;
        },

        limpiarHorarioSeleccionado: (
            state
        ) => {
            state.horarioSeleccionado =
                null;
        },

        limpiarError: (
            state
        ) => {
            state.error = null;
        },

        limpiarHorarios: (
            state
        ) => {
            state.horarios = [];

            state.horarioSeleccionado =
                null;
        },
    },

    extraReducers: (builder) => {
        builder

            /*
             * LISTAR
             */
            .addCase(
                fetchHorarios.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                fetchHorarios.fulfilled,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.horarios =
                        action.payload;
                }
            )

            .addCase(
                fetchHorarios.rejected,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.error =
                        action.payload ??
                        "Error al cargar los horarios.";
                }
            )

            /*
             * OBTENER
             */
            .addCase(
                fetchHorario.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                fetchHorario.fulfilled,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.horarioSeleccionado =
                        action.payload;
                }
            )

            .addCase(
                fetchHorario.rejected,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.error =
                        action.payload ??
                        "Error al obtener el horario.";
                }
            )

            /*
             * CREAR
             */
            .addCase(
                addHorario.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                addHorario.fulfilled,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.horarios.push(
                        action.payload
                    );

                    state.horarioSeleccionado =
                        action.payload;
                }
            )

            .addCase(
                addHorario.rejected,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.error =
                        action.payload ??
                        "Error al crear el horario.";
                }
            )

            /*
             * ACTUALIZAR
             */
            .addCase(
                updateHorario.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                updateHorario.fulfilled,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    const index =
                        state.horarios.findIndex(
                            (horario) =>
                                horario.id ===
                                action.payload.id
                        );

                    if (index !== -1) {
                        state.horarios[
                            index
                        ] =
                            action.payload;
                    }

                    state.horarioSeleccionado =
                        action.payload;
                }
            )

            .addCase(
                updateHorario.rejected,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.error =
                        action.payload ??
                        "Error al actualizar el horario.";
                }
            )

            /*
             * ELIMINAR
             */
            .addCase(
                removeHorario.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                removeHorario.fulfilled,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.horarios =
                        state.horarios.filter(
                            (horario) =>
                                horario.id !==
                                action.payload
                        );

                    if (
                        state
                            .horarioSeleccionado
                            ?.id ===
                        action.payload
                    ) {
                        state.horarioSeleccionado =
                            null;
                    }
                }
            )

            .addCase(
                removeHorario.rejected,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.error =
                        action.payload ??
                        "Error al eliminar el horario.";
                }
            );
    },
});

export const {
    setHorarioSeleccionado,
    limpiarHorarioSeleccionado,
    limpiarError,
    limpiarHorarios,
} = horarioSlice.actions;

export default horarioSlice.reducer;