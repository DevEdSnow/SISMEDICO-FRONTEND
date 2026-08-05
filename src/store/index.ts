import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth/authSlice";
import medicoReducer from "./medico/medicoSlice";

export const store = configureStore({

    reducer: {

        auth: authReducer,
        medico: medicoReducer

    }

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;