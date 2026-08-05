import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Usuario {

    id: number;

    uuid: string;

    nombre: string;

    apellido: string;

    correo: string;

    telefono: string;

    direccion: string;

    foto: string;

    genero: string;

    fechaNacimiento: string;

    rol: string;

    activo: boolean;

    emailVerificado: boolean;

    tokenFirebase: string;

    ultimoAcceso: string;

    fechaRegistro: string;

    ultimaActualizacion: string;

}

interface UsuarioState {

    usuarios: Usuario[];

    usuario: Usuario | null;

    loading: boolean;

    error: string | null;

}

const initialState: UsuarioState = {

    usuarios: [],

    usuario: null,

    loading: false,

    error: null

};

const usuarioSlice = createSlice({

    name: "usuario",

    initialState,

    reducers: {

        getUsuariosStart(state) {

            state.loading = true;
            state.error = null;

        },

        getUsuariosSuccess(

            state,
            action: PayloadAction<Usuario[]>

        ) {

            state.loading = false;
            state.usuarios = action.payload;

        },

        getUsuariosFailure(

            state,
            action: PayloadAction<string>

        ) {

            state.loading = false;
            state.error = action.payload;

        },

        getUsuarioSuccess(

            state,
            action: PayloadAction<Usuario>

        ) {

            state.loading = false;
            state.usuario = action.payload;

        },

        addUsuario(

            state,
            action: PayloadAction<Usuario>

        ) {

            state.usuarios.push(action.payload);

        },

        updateUsuario(

            state,
            action: PayloadAction<Usuario>

        ) {

            const index = state.usuarios.findIndex(

                usuario => usuario.id === action.payload.id

            );

            if (index !== -1) {

                state.usuarios[index] = action.payload;

            }

            if (

                state.usuario &&
                state.usuario.id === action.payload.id

            ) {

                state.usuario = action.payload;

            }

        },

        deleteUsuario(

            state,
            action: PayloadAction<number>

        ) {

            state.usuarios = state.usuarios.filter(

                usuario => usuario.id !== action.payload

            );

            if (

                state.usuario &&
                state.usuario.id === action.payload

            ) {

                state.usuario = null;

            }

        },

        activarUsuario(

            state,
            action: PayloadAction<number>

        ) {

            const usuario = state.usuarios.find(

                u => u.id === action.payload

            );

            if (usuario) {

                usuario.activo = true;

            }

        },

        desactivarUsuario(

            state,
            action: PayloadAction<number>

        ) {

            const usuario = state.usuarios.find(

                u => u.id === action.payload

            );

            if (usuario) {

                usuario.activo = false;

            }

        },

        verificarEmail(

            state,
            action: PayloadAction<number>

        ) {

            const usuario = state.usuarios.find(

                u => u.id === action.payload

            );

            if (usuario) {

                usuario.emailVerificado = true;

            }

        },

        actualizarTokenFirebase(

            state,
            action: PayloadAction<{

                id: number;

                token: string;

            }>

        ) {

            const usuario = state.usuarios.find(

                u => u.id === action.payload.id

            );

            if (usuario) {

                usuario.tokenFirebase = action.payload.token;

            }

        },

        clearUsuario(state) {

            state.usuario = null;

        }

    }

});

export const {

    getUsuariosStart,

    getUsuariosSuccess,

    getUsuariosFailure,

    getUsuarioSuccess,

    addUsuario,

    updateUsuario,

    deleteUsuario,

    activarUsuario,

    desactivarUsuario,

    verificarEmail,

    actualizarTokenFirebase,

    clearUsuario

} = usuarioSlice.actions;

export default usuarioSlice.reducer;