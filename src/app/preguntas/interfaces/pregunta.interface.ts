export interface Pregunta {
  id: number;
  detalle: string;
  activo: number;
  rol: {
    id: number;
    detalle: string;
  };
}
