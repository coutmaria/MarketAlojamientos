import { Alojamiento, FILTROS_VACIOS } from '../models';
import { filtrarAlojamientos } from './filtro-alojamientos';

describe('filtrarAlojamientos', () => {
  const alojamientos: Alojamiento[] = [
    {
      id: 1,
      nombre: 'Loft en Bogotá',
      descripcion: 'Loft de prueba',
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
    },
    {
      id: 2,
      nombre: 'Casa en Cartagena',
      descripcion: 'Casa de prueba',
      ciudad: 'Cartagena',
      ubicacion: 'Bocagrande',
      tipo: 'Casa',
      capacidad: 5,
      habitaciones: 2,
      camas: 3,
      banos: 2,
      precioNoche: 420000,
      tarifaLimpieza: 70000,
      calificacion: 4.9,
      activo: true,
      imagenPrincipal: 'casa.jpg',
      imagenes: ['casa.jpg'],
      servicios: ['Piscina'],
      reglas: ['No fumar']
    }
  ];

  it('treats a maximum price of zero as an active filter', () => {
    const resultados = filtrarAlojamientos(alojamientos, {
      ...FILTROS_VACIOS,
      precioMaximo: 0
    });

    expect(resultados).toEqual([]);
  });

  it('combines city, minimum guest count, type, and maximum price', () => {
    const resultados = filtrarAlojamientos(alojamientos, {
      ciudad: 'Bogotá',
      numHuespedes: 2,
      tipo: 'Apartamento',
      precioMaximo: 200000
    });

    expect(resultados.map((alojamiento) => alojamiento.id)).toEqual([1]);
  });
});