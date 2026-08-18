import {
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";

import type {
    PayloadAction,
} from "@reduxjs/toolkit";

import {
    listarRecetas,
    obtenerReceta,
    crearReceta,
    actualizarReceta,
    eliminarReceta,
} from "../../api/receta";

import type {
    RecetaRequest,
    RecetaResponse,
} from "../../api/receta";

interface RecetaState {
    recetas: RecetaResponse[];

    recetaSeleccionada:
        | RecetaResponse
        | null;

    loading: boolean;

    error: string | null;
}

const initialState: RecetaState = {
    recetas: [],

    recetaSeleccionada: null,

    loading: false,

    error: null,
};

/**
 * Obtener todas las recetas
 */
export const fetchRecetas =
    createAsyncThunk<
        RecetaResponse[],
        void,
        {
            rejectValue: string;
        }
    >(
        "receta/fetchRecetas",
        async (
            _,
            { rejectWithValue }
        ) => {
            try {
                return await listarRecetas();
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudieron obtener las recetas."
                );
            }
        }
    );

/**
 * Obtener receta por ID
 */
export const fetchReceta =
    createAsyncThunk<
        RecetaResponse,
        number,
        {
            rejectValue: string;
        }
    >(
        "receta/fetchReceta",
        async (
            id,
            { rejectWithValue }
        ) => {
            try {
                return await obtenerReceta(
                    id
                );
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudo obtener la receta."
                );
            }
        }
    );

/**
 * Crear receta
 */
export const addReceta =
    createAsyncThunk<
        RecetaResponse,
        RecetaRequest,
        {
            rejectValue: string;
        }
    >(
        "receta/addReceta",
        async (
            request,
            { rejectWithValue }
        ) => {
            try {
                return await crearReceta(
                    request
                );
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudo crear la receta."
                );
            }
        }
    );

/**
 * Actualizar receta
 */
export const updateReceta =
    createAsyncThunk<
        RecetaResponse,
        {
            id: number;
            request: RecetaRequest;
        },
        {
            rejectValue: string;
        }
    >(
        "receta/updateReceta",
        async (
            { id, request },
            { rejectWithValue }
        ) => {
            try {
                return await actualizarReceta(
                    id,
                    request
                );
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudo actualizar la receta."
                );
            }
        }
    );

/**
 * Eliminar receta
 */
export const removeReceta =
    createAsyncThunk<
        number,
        number,
        {
            rejectValue: string;
        }
    >(
        "receta/removeReceta",
        async (
            id,
            { rejectWithValue }
        ) => {
            try {
                await eliminarReceta(id);

                return id;
            } catch (error: any) {
                return rejectWithValue(
                    error?.response?.data
                        ?.message ??
                        "No se pudo eliminar la receta."
                );
            }
        }
    );

const recetaSlice = createSlice({
    name: "receta",

    initialState,

    reducers: {
        setRecetaSeleccionada: (
            state,
            action: PayloadAction<
                RecetaResponse | null
            >
        ) => {
            state.recetaSeleccionada =
                action.payload;
        },

        limpiarRecetaSeleccionada: (
            state
        ) => {
            state.recetaSeleccionada =
                null;
        },

        limpiarError: (
            state
        ) => {
            state.error = null;
        },

        limpiarRecetas: (
            state
        ) => {
            state.recetas = [];

            state.recetaSeleccionada =
                null;
        },
    },

    extraReducers: (builder) => {
        builder

            /*
             * LISTAR
             */
            .addCase(
                fetchRecetas.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                fetchRecetas.fulfilled,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.recetas =
                        action.payload;
                }
            )

            .addCase(
                fetchRecetas.rejected,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.error =
                        action.payload ??
                        "Error al cargar las recetas.";
                }
            )

            /*
             * OBTENER
             */
            .addCase(
                fetchReceta.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                fetchReceta.fulfilled,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.recetaSeleccionada =
                        action.payload;
                }
            )

            .addCase(
                fetchReceta.rejected,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.error =
                        action.payload ??
                        "Error al obtener la receta.";
                }
            )

            /*
             * CREAR
             */
            .addCase(
                addReceta.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                addReceta.fulfilled,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.recetas.push(
                        action.payload
                    );

                    state.recetaSeleccionada =
                        action.payload;
                }
            )

            .addCase(
                addReceta.rejected,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.error =
                        action.payload ??
                        "Error al crear la receta.";
                }
            )

            /*
             * ACTUALIZAR
             */
            .addCase(
                updateReceta.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                updateReceta.fulfilled,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    const index =
                        state.recetas.findIndex(
                            (receta) =>
                                receta.id ===
                                action.payload.id
                        );

                    if (index !== -1) {
                        state.recetas[index] =
                            action.payload;
                    }

                    state.recetaSeleccionada =
                        action.payload;
                }
            )

            .addCase(
                updateReceta.rejected,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.error =
                        action.payload ??
                        "Error al actualizar la receta.";
                }
            )

            /*
             * ELIMINAR
             */
            .addCase(
                removeReceta.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                removeReceta.fulfilled,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.recetas =
                        state.recetas.filter(
                            (receta) =>
                                receta.id !==
                                action.payload
                        );

                    if (
                        state
                            .recetaSeleccionada
                            ?.id ===
                        action.payload
                    ) {
                        state.recetaSeleccionada =
                            null;
                    }
                }
            )

            .addCase(
                removeReceta.rejected,
                (
                    state,
                    action
                ) => {
                    state.loading = false;

                    state.error =
                        action.payload ??
                        "Error al eliminar la receta.";
                }
            );
    },
});

export const {
    setRecetaSeleccionada,
    limpiarRecetaSeleccionada,
    limpiarError,
    limpiarRecetas,
} = recetaSlice.actions;

export default recetaSlice.reducer;