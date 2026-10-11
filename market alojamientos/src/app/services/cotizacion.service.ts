import { Injectable } from '@angular/core';
import { Alojamiento, Cotizacion } from '../models';
import { validarParaCotizar } from '../hooks/reglas-negocio';

const TARIFA_SERVICIO_PORCENTAJE = 0.1; 
const MS_POR_DIA = 1000 * 60 * 60 * 24;

export interface ResultadoCotizacion {
  cotizacion: Cotizacion | null;
  errores: string[];
}

@Injectable({ providedIn: 'root' })
export class CotizacionService {
  cotizar(
    alojamiento: Alojamiento,
    fechaLlegadaIso: string,
    fechaSalidaIso: string,
    numHuespedes: number
  ): ResultadoCotizacion {
    const errores = validarParaCotizar(alojamiento, fechaLlegadaIso, fechaSalidaIso, numHuespedes);

    if (errores.length > 0) {
      return { cotizacion: null, errores };
    }

    const numNoches = this.calcularNoches(fechaLlegadaIso, fechaSalidaIso);
    const subtotal = numNoches * alojamiento.precioNoche;
    const tarifaServicio = Math.round(subtotal * TARIFA_SERVICIO_PORCENTAJE);
    const total = subtotal + alojamiento.tarifaLimpieza + tarifaServicio;

    const cotizacion: Cotizacion = {
      alojamientoId: alojamiento.id,
      fechaLlegada: fechaLlegadaIso,
      fechaSalida: fechaSalidaIso,
      numHuespedes,
      numNoches,
      precioNoche: alojamiento.precioNoche,
      subtotal,
      tarifaLimpieza: alojamiento.tarifaLimpieza,
      tarifaServicio,
      total
    };

    return { cotizacion, errores: [] };
  }

  private calcularNoches(fechaLlegadaIso: string, fechaSalidaIso: string): number {
    const [a1, m1, d1] = fechaLlegadaIso.split('-').map(Number);
    const [a2, m2, d2] = fechaSalidaIso.split('-').map(Number);
    const llegada = Date.UTC(a1, m1 - 1, d1);
    const salida = Date.UTC(a2, m2 - 1, d2);
    return Math.round((salida - llegada) / MS_POR_DIA);
  }
}
