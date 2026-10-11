import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Alojamiento } from '../../../models';
import { FormatoPesosPipe } from '../../../data-transformers/formato-pesos.pipe';

@Component({
  selector: 'app-tarjeta-alojamiento',
  standalone: true,
  imports: [CommonModule, RouterLink, FormatoPesosPipe],
  templateUrl: './tarjeta-alojamiento.component.html',
  styleUrl: './tarjeta-alojamiento.component.css'
})
export class TarjetaAlojamientoComponent {
  @Input({ required: true }) alojamiento!: Alojamiento;

  readonly maxServiciosVisibles = 3;

  get serviciosVisibles(): string[] {
    return this.alojamiento.servicios.slice(0, this.maxServiciosVisibles);
  }

  get serviciosRestantes(): number {
    return Math.max(0, this.alojamiento.servicios.length - this.maxServiciosVisibles);
  }
}
