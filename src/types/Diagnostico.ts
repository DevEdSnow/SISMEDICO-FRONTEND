/**
 * Datos para crear o actualizar un diagnóstico
 */
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
}

/**
 * Respuesta del diagnóstico
 */
export interface DiagnosticoResponse {
    id: number;

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

    fechaRegistro?: string;

    fechaActualizacion?: string;
}

/**
 * Filtros para diagnósticos
 */
export interface DiagnosticoFiltros {
    citaId?: number;
}