import { Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: 'input[appCampo], select[appCampo]',
  standalone: true
})
export class CampoFormularioAtomDirective {
  constructor(
    private readonly elementRef: ElementRef<HTMLInputElement | HTMLSelectElement>
  ) {}

  @HostBinding('class.campo__input') get esInput(): boolean {
    return this.elementRef.nativeElement.tagName === 'INPUT';
  }

  @HostBinding('class.campo__select') get esSelect(): boolean {
    return this.elementRef.nativeElement.tagName === 'SELECT';
  }
}