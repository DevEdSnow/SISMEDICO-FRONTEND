/**
 * Datos para crear o actualizar una receta
 */
export interface RecetaRequest {
    citaId: number;

    medicamento: string;

    dosis: string;

    frecuencia: string;

    duracion?: string;

    indicaciones?: string;
}

/**
 * Respuesta de una receta
 */
export interface RecetaResponse {
    id: number;

    citaId: number;

    medicamento: string;

    dosis: string;

    frecuencia: string;

    duracion?: string;

    indicaciones?: string;

    fechaRegistro?: string;

    fechaActualizacion?: string;
}

/**
 * Filtros para recetas
 */
export interface RecetaFiltros {
    citaId?: number;

    medicamento?: string;
}