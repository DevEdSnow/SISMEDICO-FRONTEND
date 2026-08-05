import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth/authSlice";
import usuarioReducer from "./usuario/usuarioSlice";
import pacienteReducer from "./paciente/pacienteSlice";
import medicoReducer from "./medico/medicoSlice";

export const store = configureStore({

    reducer: {

        auth: authReducer,

        usuario: usuarioReducer,

        paciente: pacienteReducer,

        medico: medicoReducer

    }

});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;