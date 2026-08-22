export interface EspecialidadRequest {
    nombre: string;
    descripcion?: string;
    duracionConsulta?: number;
    costoConsulta?: number;
    color?: string;
    ubicacion?: string;
}

export interface EspecialidadResponse {
    id: number;
    nombre: string;
    descripcion?: string;
    duracionConsulta?: number;
    costoConsulta?: number;
    color?: string;
    ubicacion?: string;
    activo?: boolean;
    fechaRegistro?: string;
    fechaActualizacion?: string;
}

export interface EspecialidadFiltros {
    nombre?: string;
    activo?: boolean;
}