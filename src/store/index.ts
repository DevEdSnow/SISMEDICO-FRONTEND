import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth/authSlice";
import medicoReducer from "./medico/medicoSlice";
import pacienteReducer from "./paciente/pacienteSlice";

export const store = configureStore({

    reducer: {

        auth: authReducer,

        medico: medicoReducer,

        paciente: pacienteReducer

    }

});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;