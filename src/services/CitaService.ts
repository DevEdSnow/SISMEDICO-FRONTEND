import {
    listarCitas,
    obtenerCita,
    crearCita,
    actualizarCita,
    eliminarCita,
} from "../api/cita";

import type {
    CitaRequest,
    CitaResponse,
} from "../api/cita";

/**
 * Obtener todas las citas
 */
export const obtenerCitas =
    async (): Promise<CitaResponse[]> => {
        return await listarCitas();
    };

/**
 * Obtener una cita por ID
 */
export const obtenerCitaPorId =
    async (
        id: number
    ): Promise<CitaResponse> => {
        return await obtenerCita(id);
    };

/**
 * Crear una cita
 */
export const crearNuevaCita =
    async (
        request: CitaRequest
    ): Promise<CitaResponse> => {
        return await crearCita(request);
    };

/**
 * Actualizar una cita
 */
export const actualizarCitaExistente =
    async (
        id: number,
        request: CitaRequest
    ): Promise<CitaResponse> => {
        return await actualizarCita(
            id,
            request
        );
    };

/**
 * Eliminar una cita
 */
export const eliminarCitaPorId =
    async (
        id: number
    ): Promise<void> => {
        await eliminarCita(id);
    };

const citaService = {
    obtenerCitas,
    obtenerCitaPorId,
    crearNuevaCita,
    actualizarCitaExistente,
    eliminarCitaPorId,
};

export default citaService;