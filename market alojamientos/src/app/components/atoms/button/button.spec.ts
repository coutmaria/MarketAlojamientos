import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button';

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
  });

  it('applies the selected BEM variant and full-width modifier', () => {
    fixture.componentRef.setInput('variante', 'secundario');
    fixture.componentRef.setInput('anchoCompleto', true);
    fixture.detectChanges();

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');

    expect(button.classList.contains('boton')).toBeTrue();
    expect(button.classList.contains('boton--secundario')).toBeTrue();
    expect(button.classList.contains('boton--ancho-completo')).toBeTrue();
  });

  it('preserves native button type, disabled state, and accessible label', () => {
    fixture.componentRef.setInput('tipo', 'submit');
    fixture.componentRef.setInput('deshabilitado', true);
    fixture.componentRef.setInput('ariaLabel', 'Enviar reserva');
    fixture.detectChanges();

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');

    expect(button.type).toBe('submit');
    expect(button.disabled).toBeTrue();
    expect(button.getAttribute('aria-label')).toBe('Enviar reserva');
  });
});