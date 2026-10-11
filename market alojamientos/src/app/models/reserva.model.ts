export type EstadoReserva = 'CONFIRMADA' | 'CANCELADA';


export interface AlojamientoReservado {
  id: number;
  nombre: string;
  ciudad: string;
  imagenPrincipal: string;
}

export interface Reserva {
  id: string;
  alojamiento: AlojamientoReservado;
  fechaLlegada: string; 
  fechaSalida: string; 
  numHuespedes: number;
  numNoches: number;
  valorTotal: number;
  nombreHuesped: string;
  correoHuesped: string;
  estado: EstadoReserva;
  creadaEn: string; 
}
