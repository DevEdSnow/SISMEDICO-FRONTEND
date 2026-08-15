import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth/authSlice";
import usuarioReducer from "./usuario/usuarioSlice";
import pacienteReducer from "./paciente/pacienteSlice";
import medicoReducer from "./medico/medicoSlice";
import citaReducer from "./cita/citaSlice";
import diagnosticoReducer from "./diagnostico/diagnosticoSlice";
import especialidadReducer from "./especialidad/especialidadSlice";
import horarioReducer from "./horario/horarioSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        usuario: usuarioReducer,
        paciente: pacienteReducer,
        medico: medicoReducer,
        cita: citaReducer,
        diagnostico: diagnosticoReducer,
        especialidad: especialidadReducer,
        horario: horarioReducer,
    },
});

export type RootState =
    ReturnType<typeof store.getState>;

export type AppDispatch =
    typeof store.dispatch;