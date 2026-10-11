import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';

type ButtonVariant = 'primario' | 'secundario' | 'texto' | 'personalizado';
type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.css'
})
export class ButtonComponent {
  @Input() tipo: ButtonType = 'button';
  @Input() variante: ButtonVariant = 'primario';
  @Input() anchoCompleto = false;
  @Input() deshabilitado = false;
  @Input() clases = '';
  @Input() ariaLabel: string | null = null;
  @Input() ariaExpanded: boolean | null = null;

  @HostBinding('class.button-host--ancho-completo')
  get hostAnchoCompleto(): boolean {
    return this.anchoCompleto;
  }

  get clasesBoton(): string[] {
    const clases = this.clases.trim().split(/\s+/).filter(Boolean);

    if (this.variante !== 'personalizado') {
      clases.unshift(`boton--${this.variante}`);
      clases.unshift('boton');
    }

    if (this.anchoCompleto) {
      clases.push('boton--ancho-completo');
    }

    return clases;
  }
}