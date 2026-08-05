import api from "./axios";

export interface LoginRequest {

    correo: string;

    password: string;

}

export interface RegisterRequest {

    nombre: string;

    apellido: string;

    correo: string;

    password: string;

    confirmarPassword: string;

    telefono: string;

    direccion: string;

    foto?: string;

    genero: string;

    fechaNacimiento: string;

    rolId: number;

}

export interface AuthResponse {

    success: boolean;

    message: string;

    token: string;

    usuario: any;

}

export const login = async (

    request: LoginRequest

): Promise<AuthResponse> => {

    const response = await api.post<AuthResponse>(

        "/auth/login",

        request

    );

    return response.data;

};

export const register = async (

    request: RegisterRequest

): Promise<AuthResponse> => {

    const response = await api.post<AuthResponse>(

        "/auth/register",

        request

    );

    return response.data;

};

export const profile = async () => {

    const response = await api.get("/auth/profile");

    return response.data;

};

export const refreshToken = async () => {

    const response = await api.post("/auth/refresh");

    return response.data;

};

export const logout = async () => {

    const response = await api.post("/auth/logout");

    return response.data;

};