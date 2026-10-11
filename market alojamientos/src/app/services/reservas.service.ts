import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alojamiento, Cotizacion, Reserva } from '../models';
import { validarCorreoHuesped, validarNombreHuesped } from '../hooks/reglas-negocio';

const LOCAL_STORAGE_KEY = 'marketplace.reservas';

export interface ResultadoReserva {
  reserva: Reserva | null;
  errores: string[];
}

@Injectable({ providedIn: 'root' })
export class ReservasService {
  private reservasSubject = new BehaviorSubject<Reserva[]>(this.leerDeLocalStorage());
  readonly reservas$: Observable<Reserva[]> = this.reservasSubject.asObservable();

  crearReserva(
    alojamiento: Alojamiento,
    cotizacion: Cotizacion,
    nombreHuesped: string,
    correoHuesped: string
  ): ResultadoReserva {
    const errores = [
      ...validarNombreHuesped(nombreHuesped),
      ...validarCorreoHuesped(correoHuesped)
    ];

    if (errores.length > 0) {
      return { reserva: null, errores };
    }

    const reserva: Reserva = {
      id: this.generarId(),
      alojamiento: {
        id: alojamiento.id,
        nombre: alojamiento.nombre,
        ciudad: alojamiento.ciudad,
        imagenPrincipal: alojamiento.imagenPrincipal
      },
      fechaLlegada: cotizacion.fechaLlegada,
      fechaSalida: cotizacion.fechaSalida,
      numHuespedes: cotizacion.numHuespedes,
      numNoches: cotizacion.numNoches,
      valorTotal: cotizacion.total,
      nombreHuesped: nombreHuesped.trim(),
      correoHuesped: correoHuesped.trim(),
      estado: 'CONFIRMADA',
      creadaEn: new Date().toISOString()
    };

    const listaActual = this.reservasSubject.value;
    const listaNueva = [reserva, ...listaActual];
    this.reservasSubject.next(listaNueva);
    this.guardarEnLocalStorage(listaNueva);

    return { reserva, errores: [] };
  }

  obtenerReservas(): Observable<Reserva[]> {
    return this.reservas$;
  }

  private generarId(): string {
    return `res-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
  }

  private leerDeLocalStorage(): Reserva[] {
    if (typeof localStorage === 'undefined') return [];
    try {
      const crudo = localStorage.getItem(LOCAL_STORAGE_KEY);
      return crudo ? (JSON.parse(crudo) as Reserva[]) : [];
    } catch {
      
      return [];
    }
  }

  private guardarEnLocalStorage(reservas: Reserva[]): void {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reservas));
    } catch {

    }
  }
}
