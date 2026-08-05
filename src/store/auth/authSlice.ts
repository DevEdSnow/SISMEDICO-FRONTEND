import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface User {

    id: number;
    uuid: string;

    nombre: string;
    apellido: string;

    correo: string;

    rol: string;

    token: string;

}

interface AuthState {

    user: User | null;

    token: string | null;

    authenticated: boolean;

    loading: boolean;

}

const initialState: AuthState = {

    user: null,

    token: localStorage.getItem("token"),

    authenticated: !!localStorage.getItem("token"),

    loading: false

};

const authSlice = createSlice({

    name: "auth",

    initialState,

    reducers: {

        loginStart: (state) => {

            state.loading = true;

        },

        loginSuccess: (

            state,

            action: PayloadAction<User>

        ) => {

            state.loading = false;

            state.user = action.payload;

            state.token = action.payload.token;

            state.authenticated = true;

            localStorage.setItem(
                "token",
                action.payload.token
            );

        },

        loginFailure: (state) => {

            state.loading = false;

            state.user = null;

            state.token = null;

            state.authenticated = false;

            localStorage.removeItem("token");

        },

        logout: (state) => {

            state.user = null;

            state.token = null;

            state.authenticated = false;

            state.loading = false;

            localStorage.removeItem("token");

        },

        setUser: (

            state,

            action: PayloadAction<User>

        ) => {

            state.user = action.payload;

        }

    }

});

export const {

    loginStart,

    loginSuccess,

    loginFailure,

    logout,

    setUser

} = authSlice.actions;

export default authSlice.reducer;