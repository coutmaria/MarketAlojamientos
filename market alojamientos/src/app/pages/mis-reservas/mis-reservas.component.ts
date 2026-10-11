import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Reserva } from '../../models';
import { ReservasService } from '../../services/reservas.service';
import { FormatoPesosPipe } from '../../data-transformers/formato-pesos.pipe';
import { MensajeVacioComponent } from '../../components/molecules/mensaje-vacio/mensaje-vacio.component';

@Component({
  selector: 'app-mis-reservas',
  standalone: true,
  imports: [CommonModule, RouterLink, FormatoPesosPipe, MensajeVacioComponent],
  templateUrl: './mis-reservas.component.html',
  styleUrl: './mis-reservas.component.css'
})
export class MisReservasComponent implements OnInit {
  reservas$!: Observable<Reserva[]>;

  constructor(private reservasService: ReservasService) {}

  ngOnInit(): void {
    this.reservas$ = this.reservasService.obtenerReservas();
  }
}
