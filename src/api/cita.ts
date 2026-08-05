import api from "./axios";

export interface CitaRequest {

    pacienteId: number;

    medicoId: number;

    especialidadId: number;

    fecha: string;

    hora: string;

    motivo: string;

    observaciones?: string;

}

export interface CitaResponse {

    id: number;

    uuid: string;

    pacienteId: number;

    nombrePaciente: string;

    medicoId: number;

    nombreMedico: string;

    especialidadId: number;

    especialidad: string;

    fecha: string;

    hora: string;

    motivo: string;

    observaciones: string;

    estado: string;

    tieneDiagnostico: boolean;

    fechaRegistro: string;

    fechaActualizacion: string;

}

const URL = "/citas";

export const listarCitas = async (): Promise<CitaResponse[]> => {

    const response = await api.get<CitaResponse[]>(URL);

    return response.data;

};

export const obtenerCita = async (

    id: number

): Promise<CitaResponse> => {

    const response = await api.get<CitaResponse>(
        `${URL}/${id}`
    );

    return response.data;

};

export const crearCita = async (

    request: CitaRequest

): Promise<CitaResponse> => {

    const response = await api.post<CitaResponse>(
        URL,
        request
    );

    return response.data;

};

export const actualizarCita = async (

    id: number,
    request: CitaRequest

): Promise<CitaResponse> => {

    const response = await api.put<CitaResponse>(
        `${URL}/${id}`,
        request
    );

    return response.data;

};

export const eliminarCita = async (

    id: number

): Promise<void> => {

    await api.delete(
        `${URL}/${id}`
    );

};

export const cancelarCita = async (

    id: number

): Promise<CitaResponse> => {

    const response = await api.put<CitaResponse>(
        `${URL}/${id}/cancelar`
    );

    return response.data;

};

export const confirmarCita = async (

    id: number

): Promise<CitaResponse> => {

    const response = await api.put<CitaResponse>(
        `${URL}/${id}/confirmar`
    );

    return response.data;

};

export const finalizarCita = async (

    id: number

): Promise<CitaResponse> => {

    const response = await api.put<CitaResponse>(
        `${URL}/${id}/finalizar`
    );

    return response.data;

};

export const listarPorPaciente = async (

    pacienteId: number

): Promise<CitaResponse[]> => {

    const response = await api.get<CitaResponse[]>(
        `${URL}/paciente/${pacienteId}`
    );

    return response.data;

};

export const listarPorMedico = async (

    medicoId: number

): Promise<CitaResponse[]> => {

    const response = await api.get<CitaResponse[]>(
        `${URL}/medico/${medicoId}`
    );

    return response.data;

};

export const listarPorFecha = async (

    fecha: string

): Promise<CitaResponse[]> => {

    const response = await api.get<CitaResponse[]>(
        `${URL}/fecha/${fecha}`
    );

    return response.data;

};

export const listarPorEstado = async (

    estado: string

): Promise<CitaResponse[]> => {

    const response = await api.get<CitaResponse[]>(
        `${URL}/estado/${estado}`
    );

    return response.data;

};