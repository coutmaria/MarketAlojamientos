import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { Alojamiento, FiltrosAlojamiento, FILTROS_VACIOS } from '../../models';
import { DataService } from '../../services/data.service';
import { filtrarAlojamientos } from '../../hooks/filtro-alojamientos';
import { TarjetaAlojamientoComponent } from '../../components/molecules/tarjeta-alojamiento/tarjeta-alojamiento.component';
import { MensajeVacioComponent } from '../../components/molecules/mensaje-vacio/mensaje-vacio.component';
import { FiltrosAlojamientosComponent } from './filtros-alojamientos/filtros-alojamientos.component';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [
    CommonModule,
    TarjetaAlojamientoComponent,
    MensajeVacioComponent,
    FiltrosAlojamientosComponent
  ],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent implements OnInit {
  alojamientos$!: Observable<Alojamiento[]>;
  ciudades$!: Observable<string[]>;
  tipos$!: Observable<string[]>;
  alojamientosFiltrados$!: Observable<Alojamiento[]>;

  private filtrosSubject = new BehaviorSubject<FiltrosAlojamiento>(FILTROS_VACIOS);

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.alojamientos$ = this.dataService.obtenerAlojamientos();
    this.ciudades$ = this.dataService.obtenerCiudadesDisponibles();
    this.tipos$ = this.dataService.obtenerTiposDisponibles();

    this.alojamientosFiltrados$ = combineLatest([this.alojamientos$, this.filtrosSubject]).pipe(
      map(([alojamientos, filtros]) => filtrarAlojamientos(alojamientos, filtros))
    );
  }

  onFiltrosCambiaron(filtros: FiltrosAlojamiento): void {
    this.filtrosSubject.next(filtros);
  }
}
