import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Paciente {

    id: number;

    usuarioId: number;

    nombre: string;

    apellido: string;

    correo: string;

    telefono: string;

    curp: string;

    numeroSeguroSocial: string;

    fechaNacimiento: string;

    tipoSangre: string;

    alergias: string;

    enfermedadesCronicas: string;

    medicamentosActuales: string;

    contactoEmergencia: string;

    telefonoEmergencia: string;

    peso: number;

    altura: number;

    activo: boolean;

}

interface PacienteState {

    pacientes: Paciente[];

    paciente: Paciente | null;

    loading: boolean;

    error: string | null;

}

const initialState: PacienteState = {

    pacientes: [],

    paciente: null,

    loading: false,

    error: null

};

const pacienteSlice = createSlice({

    name: "paciente",

    initialState,

    reducers: {

        getPacientesStart(state) {

            state.loading = true;
            state.error = null;

        },

        getPacientesSuccess(

            state,
            action: PayloadAction<Paciente[]>

        ) {

            state.loading = false;
            state.pacientes = action.payload;

        },

        getPacientesFailure(

            state,
            action: PayloadAction<string>

        ) {

            state.loading = false;
            state.error = action.payload;

        },

        getPacienteSuccess(

            state,
            action: PayloadAction<Paciente>

        ) {

            state.loading = false;
            state.paciente = action.payload;

        },

        addPaciente(

            state,
            action: PayloadAction<Paciente>

        ) {

            state.pacientes.push(action.payload);

        },

        updatePaciente(

            state,
            action: PayloadAction<Paciente>

        ) {

            const index = state.pacientes.findIndex(
                paciente => paciente.id === action.payload.id
            );

            if (index !== -1) {

                state.pacientes[index] = action.payload;

            }

            if (

                state.paciente &&
                state.paciente.id === action.payload.id

            ) {

                state.paciente = action.payload;

            }

        },

        deletePaciente(

            state,
            action: PayloadAction<number>

        ) {

            state.pacientes = state.pacientes.filter(

                paciente => paciente.id !== action.payload

            );

            if (

                state.paciente &&
                state.paciente.id === action.payload

            ) {

                state.paciente = null;

            }

        },

        clearPaciente(state) {

            state.paciente = null;

        }

    }

});

export const {

    getPacientesStart,

    getPacientesSuccess,

    getPacientesFailure,

    getPacienteSuccess,

    addPaciente,

    updatePaciente,

    deletePaciente,

    clearPaciente

} = pacienteSlice.actions;

export default pacienteSlice.reducer;