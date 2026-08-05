import api from "./axios";

export interface DiagnosticoRequest {

    citaId: number;

    diagnostico: string;

    tratamiento?: string;

    observaciones?: string;

    temperatura?: number;

    frecuenciaCardiaca?: number;

    frecuenciaRespiratoria?: number;

    presionArterial?: string;

    peso?: number;

    altura?: number;

    recomendaciones?: string;

    proximaConsulta?: string;

    altaMedica?: boolean;

}

export interface DiagnosticoResponse {

    id: number;

    citaId: number;

    paciente: string;

    medico: string;

    diagnostico: string;

    tratamiento: string;

    observaciones: string;

    temperatura: number;

    frecuenciaCardiaca: number;

    frecuenciaRespiratoria: number;

    presionArterial: string;

    peso: number;

    altura: number;

    recomendaciones: string;

    proximaConsulta: string;

    altaMedica: boolean;

    fechaRegistro: string;

}

const URL = "/diagnosticos";

export const listarDiagnosticos = async (): Promise<DiagnosticoResponse[]> => {

    const response = await api.get<DiagnosticoResponse[]>(URL);

    return response.data;

};

export const obtenerDiagnostico = async (

    id: number

): Promise<DiagnosticoResponse> => {

    const response = await api.get<DiagnosticoResponse>(
        `${URL}/${id}`
    );

    return response.data;

};

export const crearDiagnostico = async (

    request: DiagnosticoRequest

): Promise<DiagnosticoResponse> => {

    const response = await api.post<DiagnosticoResponse>(
        URL,
        request
    );

    return response.data;

};

export const actualizarDiagnostico = async (

    id: number,
    request: DiagnosticoRequest

): Promise<DiagnosticoResponse> => {

    const response = await api.put<DiagnosticoResponse>(
        `${URL}/${id}`,
        request
    );

    return response.data;

};

export const eliminarDiagnostico = async (

    id: number

): Promise<void> => {

    await api.delete(
        `${URL}/${id}`
    );

};

export const obtenerPorCita = async (

    citaId: number

): Promise<DiagnosticoResponse> => {

    const response = await api.get<DiagnosticoResponse>(
        `${URL}/cita/${citaId}`
    );

    return response.data;

};

export const darAltaMedica = async (

    id: number

): Promise<DiagnosticoResponse> => {

    const response = await api.put<DiagnosticoResponse>(
        `${URL}/${id}/alta-medica`
    );

    return response.data;

};

export const retirarAltaMedica = async (

    id: number

): Promise<DiagnosticoResponse> => {

    const response = await api.put<DiagnosticoResponse>(
        `${URL}/${id}/retirar-alta`
    );

    return response.data;

};