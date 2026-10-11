import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoPesos',
  standalone: true
})
export class FormatoPesosPipe implements PipeTransform {
  transform(valor: number | null | undefined): string {
    if (valor === null || valor === undefined || isNaN(valor)) {
      return '$0';
    }
    const entero = Math.round(valor);
    const conSeparadores = entero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `$${conSeparadores}`;
  }
}