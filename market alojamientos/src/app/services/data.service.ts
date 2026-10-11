import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { Alojamiento, Resena } from '../models';

interface MarketplaceData {
  alojamientos: Alojamiento[];
  resenas: Resena[];
}
@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly dataUrl = 'assets/data/marketplace-data.json';
  private data$: Observable<MarketplaceData> | null = null;

  constructor(private http: HttpClient) {}

  private cargarDatos(): Observable<MarketplaceData> {
    if (!this.data$) {
      this.data$ = this.http
        .get<MarketplaceData>(this.dataUrl)
        .pipe(shareReplay({ bufferSize: 1, refCount: false }));
    }
    return this.data$;
  }

  obtenerAlojamientos(): Observable<Alojamiento[]> {
    return this.cargarDatos().pipe(
      map((data) => data.alojamientos.filter((a) => a.activo))
    );
  }

  obtenerAlojamientoPorId(id: number): Observable<Alojamiento | undefined> {
    return this.obtenerAlojamientos().pipe(
      map((lista) => lista.find((a) => a.id === id))
    );
  }

  obtenerDestacados(cantidad = 3): Observable<Alojamiento[]> {
    return this.obtenerAlojamientos().pipe(
      map((lista) =>
        [...lista].sort((a, b) => b.calificacion - a.calificacion).slice(0, cantidad)
      )
    );
  }

  obtenerResenasPorAlojamiento(alojamientoId: number): Observable<Resena[]> {
    return this.cargarDatos().pipe(
      map((data) => data.resenas.filter((r) => r.alojamientoId === alojamientoId))
    );
  }

  obtenerCiudadesDisponibles(): Observable<string[]> {
    return this.obtenerAlojamientos().pipe(
      map((lista) => Array.from(new Set(lista.map((a) => a.ciudad))).sort())
    );
  }

  obtenerTiposDisponibles(): Observable<string[]> {
    return this.obtenerAlojamientos().pipe(
      map((lista) => Array.from(new Set(lista.map((a) => a.tipo))).sort())
    );
  }
}
