import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Alojamiento, Cotizacion } from '../../../models';
import { CotizacionService } from '../../../services/cotizacion.service';
import { FormatoPesosPipe } from '../../../data-transformers/formato-pesos.pipe';
import { ButtonComponent } from '../../../components/atoms/button/button';
import { CampoFormularioAtomDirective } from '../../../components/atoms/campo-formulario/campo-formulario.atom';

@Component({
  selector: 'app-cotizador',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormatoPesosPipe, ButtonComponent, CampoFormularioAtomDirective],
  templateUrl: './cotizador.component.html',
  styleUrl: './cotizador.component.css'
})
export class CotizadorComponent implements OnChanges {
  @Input({ required: true }) alojamiento!: Alojamiento;
  @Output() cotizacionGenerada = new EventEmitter<Cotizacion | null>();

  formulario!: FormGroup;

  cotizacion: Cotizacion | null = null;
  errores: string[] = [];
  intentoCotizar = false;
  readonly fechaMinima = this.hoyComoInputDate();

  constructor(private fb: FormBuilder, private cotizacionService: CotizacionService) {
    this.formulario = this.fb.group({
      fechaLlegada: [''],
      fechaSalida: [''],
      numHuespedes: [1]
    });
  }

  ngOnChanges(): void {
    this.cotizacion = null;
    this.errores = [];
    this.intentoCotizar = false;
    this.cotizacionGenerada.emit(null);
  }

  cotizar(): void {
    this.intentoCotizar = true;
    const { fechaLlegada, fechaSalida, numHuespedes } = this.formulario.value;

    const resultado = this.cotizacionService.cotizar(
      this.alojamiento,
      fechaLlegada ?? '',
      fechaSalida ?? '',
      Number(numHuespedes) || 0
    );

    this.cotizacion = resultado.cotizacion;
    this.errores = resultado.errores;
    this.cotizacionGenerada.emit(resultado.cotizacion);
  }

  private hoyComoInputDate(): string {
    const hoy = new Date();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    return `${hoy.getFullYear()}-${mes}-${dia}`;
  }
}
