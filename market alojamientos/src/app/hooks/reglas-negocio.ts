import { Alojamiento } from '../models';

export function hoySinHora(): Date {
  const ahora = new Date();
  return new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());
}

function parsearFechaLocal(fechaIso: string): Date | null {
  if (!fechaIso) return null;
  const [anio, mes, dia] = fechaIso.split('-').map(Number);
  if (!anio || !mes || !dia) return null;
  return new Date(anio, mes - 1, dia);
}

export function validarFechas(fechaLlegadaIso: string, fechaSalidaIso: string): string[] {
  const errores: string[] = [];
  const llegada = parsearFechaLocal(fechaLlegadaIso);
  const salida = parsearFechaLocal(fechaSalidaIso);

  if (!llegada || !salida) {
    errores.push('Selecciona la fecha de llegada y la fecha de salida.');
    return errores;
  }

  if (llegada < hoySinHora()) {
    errores.push('La fecha de llegada no puede ser anterior a hoy.');
  }

  if (salida <= llegada) {
    errores.push('La fecha de salida debe ser posterior a la fecha de llegada.');
  }

  return errores;
}

export function validarHuespedes(numHuespedes: number, capacidad: number): string[] {
  const errores: string[] = [];

  if (!numHuespedes || numHuespedes <= 0) {
    errores.push('El numero de huespedes debe ser mayor que cero.');
  } else if (numHuespedes > capacidad) {
    errores.push(`Este alojamiento admite maximo ${capacidad} huesped(es).`);
  }

  return errores;
}


export function validarPrecioAlojamiento(alojamiento: Alojamiento): string[] {
  const errores: string[] = [];
  if (!alojamiento.precioNoche || alojamiento.precioNoche <= 0) {
    errores.push('Este alojamiento no tiene un precio por noche valido.');
  }
  return errores;
}


export function validarParaCotizar(
  alojamiento: Alojamiento,
  fechaLlegadaIso: string,
  fechaSalidaIso: string,
  numHuespedes: number
): string[] {
  return [
    ...validarFechas(fechaLlegadaIso, fechaSalidaIso),
    ...validarHuespedes(numHuespedes, alojamiento.capacidad),
    ...validarPrecioAlojamiento(alojamiento)
  ];
}


export function validarNombreHuesped(nombre: string): string[] {
  const errores: string[] = [];
  if (!nombre || nombre.trim().length < 3) {
    errores.push('Ingresa tu nombre completo (minimo 3 caracteres).');
  }
  return errores;
}


export function validarCorreoHuesped(correo: string): string[] {
  const errores: string[] = [];
  const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!correo || !patron.test(correo)) {
    errores.push('Ingresa un correo electronico valido.');
  }
  return errores;
}
