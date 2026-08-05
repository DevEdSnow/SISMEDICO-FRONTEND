import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Medico {

    id: number;

    usuarioId: number;

    nombre: string;

    apellido: string;

    correo: string;

    cedulaProfesional: string;

    especialidad: string;

    telefono: string;

    consultorio: string;

    activo: boolean;

}

interface MedicoState {

    medicos: Medico[];

    medico: Medico | null;

    loading: boolean;

    error: string | null;

}

const initialState: MedicoState = {

    medicos: [],

    medico: null,

    loading: false,

    error: null

};

const medicoSlice = createSlice({

    name: "medico",

    initialState,

    reducers: {

        getMedicosStart(state) {

            state.loading = true;
            state.error = null;

        },

        getMedicosSuccess(

            state,
            action: PayloadAction<Medico[]>

        ) {

            state.loading = false;
            state.medicos = action.payload;

        },

        getMedicosFailure(

            state,
            action: PayloadAction<string>

        ) {

            state.loading = false;
            state.error = action.payload;

        },

        getMedicoSuccess(

            state,
            action: PayloadAction<Medico>

        ) {

            state.loading = false;
            state.medico = action.payload;

        },

        addMedico(

            state,
            action: PayloadAction<Medico>

        ) {

            state.medicos.push(action.payload);

        },

        updateMedico(

            state,
            action: PayloadAction<Medico>

        ) {

            const index = state.medicos.findIndex(
                medico => medico.id === action.payload.id
            );

            if (index !== -1) {

                state.medicos[index] = action.payload;

            }

            if (
                state.medico &&
                state.medico.id === action.payload.id
            ) {

                state.medico = action.payload;

            }

        },

        deleteMedico(

            state,
            action: PayloadAction<number>

        ) {

            state.medicos = state.medicos.filter(
                medico => medico.id !== action.payload
            );

            if (
                state.medico &&
                state.medico.id === action.payload
            ) {

                state.medico = null;

            }

        },

        clearMedico(state) {

            state.medico = null;

        }

    }

});

export const {

    getMedicosStart,

    getMedicosSuccess,

    getMedicosFailure,

    getMedicoSuccess,

    addMedico,

    updateMedico,

    deleteMedico,

    clearMedico

} = medicoSlice.actions;

export default medicoSlice.reducer;