export interface Cotizacion {
  alojamientoId: number;
  fechaLlegada: string;
  fechaSalida: string;
  numHuespedes: number;
  numNoches: number;
  precioNoche: number;
  subtotal: number;
  tarifaLimpieza: number;
  tarifaServicio: number;
  total: number;
}
