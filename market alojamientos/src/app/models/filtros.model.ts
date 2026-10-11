export interface FiltrosAlojamiento {
  ciudad: string | null;
  numHuespedes: number | null;
  tipo: string | null;
  precioMaximo: number | null;
}

export const FILTROS_VACIOS: FiltrosAlojamiento = {
  ciudad: null,
  numHuespedes: null,
  tipo: null,
  precioMaximo: null
};
