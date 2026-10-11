import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Alojamiento, Cotizacion, Reserva } from '../../../models';
import { ReservasService } from '../../../services/reservas.service';
import { FormatoPesosPipe } from '../../../data-transformers/formato-pesos.pipe';
import { ButtonComponent } from '../../../components/atoms/button/button';
import { CampoFormularioAtomDirective } from '../../../components/atoms/campo-formulario/campo-formulario.atom';

@Component({
  selector: 'app-formulario-reserva',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormatoPesosPipe, ButtonComponent, CampoFormularioAtomDirective],
  templateUrl: './formulario-reserva.component.html',
  styleUrl: './formulario-reserva.component.css'
})
export class FormularioReservaComponent {
  @Input({ required: true }) alojamiento!: Alojamiento;
  @Input({ required: true }) cotizacion!: Cotizacion;
  @Output() reservaCreada = new EventEmitter<Reserva>();

  formulario!: FormGroup;

  errores: string[] = [];
  intentoReservar = false;

  constructor(private fb: FormBuilder, private reservasService: ReservasService) {
    this.formulario = this.fb.group({
      nombreHuesped: [''],
      correoHuesped: ['']
    });
  }

  reservar(): void {
    this.intentoReservar = true;
    const { nombreHuesped, correoHuesped } = this.formulario.value;

    const resultado = this.reservasService.crearReserva(
      this.alojamiento,
      this.cotizacion,
      nombreHuesped ?? '',
      correoHuesped ?? ''
    );

    this.errores = resultado.errores;

    if (resultado.reserva) {
      this.reservaCreada.emit(resultado.reserva);
    }
  }
}
