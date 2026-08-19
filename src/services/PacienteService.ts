import {
    listarPacientes,
    obtenerPaciente,
    crearPaciente,
    actualizarPaciente,
    eliminarPaciente,
    listarActivos,
    buscarPorCurp,
    activarPaciente,
    desactivarPaciente,
} from "../api/paciente";

import type {
    PacienteRequest,
    PacienteResponse,
} from "../api/paciente";

/**
 * Obtener todos los pacientes
 */
export const obtenerPacientes =
    async (): Promise<PacienteResponse[]> => {
        return await listarPacientes();
    };

/**
 * Obtener paciente por ID
 */
export const obtenerPacientePorId =
    async (
        id: number
    ): Promise<PacienteResponse> => {
        return await obtenerPaciente(id);
    };

/**
 * Crear paciente
 */
export const crearNuevoPaciente =
    async (
        request: PacienteRequest
    ): Promise<PacienteResponse> => {
        return await crearPaciente(
            request
        );
    };

/**
 * Actualizar paciente
 */
export const actualizarPacienteExistente =
    async (
        id: number,
        request: PacienteRequest
    ): Promise<PacienteResponse> => {
        return await actualizarPaciente(
            id,
            request
        );
    };

/**
 * Eliminar paciente
 */
export const eliminarPacientePorId =
    async (
        id: number
    ): Promise<void> => {
        await eliminarPaciente(id);
    };

/**
 * Obtener pacientes activos
 */
export const obtenerPacientesActivos =
    async (): Promise<PacienteResponse[]> => {
        return await listarActivos();
    };

/**
 * Buscar paciente por CURP
 */
export const obtenerPacientePorCurp =
    async (
        curp: string
    ): Promise<PacienteResponse> => {
        return await buscarPorCurp(curp);
    };

/**
 * Activar paciente
 */
export const activarPacientePorId =
    async (
        id: number
    ): Promise<PacienteResponse> => {
        return await activarPaciente(id);
    };

/**
 * Desactivar paciente
 */
export const desactivarPacientePorId =
    async (
        id: number
    ): Promise<PacienteResponse> => {
        return await desactivarPaciente(id);
    };

const pacienteService = {
    obtenerPacientes,
    obtenerPacientePorId,
    crearNuevoPaciente,
    actualizarPacienteExistente,
    eliminarPacientePorId,
    obtenerPacientesActivos,
    obtenerPacientePorCurp,
    activarPacientePorId,
    desactivarPacientePorId,
};

export default pacienteService;