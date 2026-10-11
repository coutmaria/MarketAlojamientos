import { Alojamiento } from '../models';
import { CotizacionService } from './cotizacion.service';

describe('CotizacionService', () => {
  const alojamiento: Alojamiento = {
    id: 1,
    nombre: 'Loft de prueba',
    descripcion: 'Descripción de prueba',
    ciudad: 'Bogotá',
    ubicacion: 'Chapinero',
    tipo: 'Apartamento',
    capacidad: 2,
    habitaciones: 1,
    camas: 1,
    banos: 1,
    precioNoche: 180000,
    tarifaLimpieza: 45000,
    calificacion: 4.8,
    activo: true,
    imagenPrincipal: 'loft.jpg',
    imagenes: ['loft.jpg'],
    servicios: ['Wi-Fi'],
    reglas: ['No fumar']
  };

  function fechaRelativa(dias: number): string {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + dias);
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    return `${anio}-${mes}-${dia}`;
  }

  it('calculates nights, subtotal, cleaning, service, and total', () => {
    const servicio = new CotizacionService();
    const resultado = servicio.cotizar(alojamiento, fechaRelativa(1), fechaRelativa(4), 2);

    expect(resultado.errores).toEqual([]);
    expect(resultado.cotizacion).toEqual(jasmine.objectContaining({
      numNoches: 3,
      subtotal: 540000,
      tarifaLimpieza: 45000,
      tarifaServicio: 54000,
      total: 639000
    }));
  });

  it('does not produce a quote when guests exceed accommodation capacity', () => {
    const servicio = new CotizacionService();
    const resultado = servicio.cotizar(alojamiento, fechaRelativa(1), fechaRelativa(2), 3);

    expect(resultado.cotizacion).toBeNull();
    expect(resultado.errores).toContain('Este alojamiento admite maximo 2 huesped(es).');
  });
});