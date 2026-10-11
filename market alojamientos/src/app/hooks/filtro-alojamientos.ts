import { Alojamiento } from '../models/alojamiento.model';
import { FiltrosAlojamiento } from '../models/filtros.model';


export function filtrarAlojamientos(
  alojamientos: Alojamiento[],
  filtros: FiltrosAlojamiento
): Alojamiento[] {
  return alojamientos.filter((alojamiento) => {
    if (filtros.ciudad && alojamiento.ciudad !== filtros.ciudad) {
      return false;
    }

    if (filtros.tipo && alojamiento.tipo !== filtros.tipo) {
      return false;
    }

    if (filtros.numHuespedes && alojamiento.capacidad < filtros.numHuespedes) {
      return false;
    }

    if (
      filtros.precioMaximo !== null &&
      filtros.precioMaximo !== undefined &&
      alojamiento.precioNoche > filtros.precioMaximo
    ) {
      return false;
    }

    return true;
  });
}
