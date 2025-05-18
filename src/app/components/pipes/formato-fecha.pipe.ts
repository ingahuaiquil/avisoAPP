import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatoFecha' })
export class FormatoFechaPipe implements PipeTransform {
  transform(value: string): string {
    return new Date(value).toLocaleDateString('es-CL');
  }
}

