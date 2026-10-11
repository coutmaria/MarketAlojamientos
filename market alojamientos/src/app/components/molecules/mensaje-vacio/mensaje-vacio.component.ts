import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mensaje-vacio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mensaje-vacio.component.html',
  styleUrl: './mensaje-vacio.component.css'
})
export class MensajeVacioComponent {
  @Input() icono = '🔍';
  @Input({ required: true }) titulo!: string;
  @Input() descripcion = '';
}