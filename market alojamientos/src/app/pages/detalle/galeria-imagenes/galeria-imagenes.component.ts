import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { ButtonComponent } from '../../../components/atoms/button/button';

@Component({
  selector: 'app-galeria-imagenes',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './galeria-imagenes.component.html',
  styleUrl: './galeria-imagenes.component.css'
})
export class GaleriaImagenesComponent implements OnChanges {
  @Input({ required: true }) imagenes: string[] = [];
  @Input() nombreAlojamiento = '';

  imagenActiva = '';

  ngOnChanges(): void {
    this.imagenActiva = this.imagenes[0] ?? '';
  }

  seleccionar(imagen: string): void {
    this.imagenActiva = imagen;
  }
}
