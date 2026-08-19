import {
    listarMedicos,
    obtenerMedico,
    crearMedico,
    actualizarMedico,
    eliminarMedico,
} from "../api/medico";

import type {
    MedicoRequest,
    MedicoResponse,
} from "../api/medico";

/**
 * Obtener todos los médicos
 */
export const obtenerMedicos =
    async (): Promise<MedicoResponse[]> => {
        return await listarMedicos();
    };

/**
 * Obtener médico por ID
 */
export const obtenerMedicoPorId =
    async (
        id: number
    ): Promise<MedicoResponse> => {
        return await obtenerMedico(id);
    };

/**
 * Crear médico
 */
export const crearNuevoMedico =
    async (
        request: MedicoRequest
    ): Promise<MedicoResponse> => {
        return await crearMedico(request);
    };

/**
 * Actualizar médico
 */
export const actualizarMedicoExistente =
    async (
        id: number,
        request: MedicoRequest
    ): Promise<MedicoResponse> => {
        return await actualizarMedico(
            id,
            request
        );
    };

/**
 * Eliminar médico
 */
export const eliminarMedicoPorId =
    async (
        id: number
    ): Promise<void> => {
        await eliminarMedico(id);
    };

/**
 * Obtener médicos activos
 */
export const obtenerMedicosActivos =
    async (): Promise<MedicoResponse[]> => {
        return await listarMedicos();
    };

const medicoService = {
    obtenerMedicos,
    obtenerMedicoPorId,
    crearNuevoMedico,
    actualizarMedicoExistente,
    eliminarMedicoPorId,
    obtenerMedicosActivos,
};

export default medicoService;