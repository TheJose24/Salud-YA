import { Pipe, PipeTransform } from '@angular/core';

/** Formatea una fecha ISO al formato local peruano (Intl nativo). */
@Pipe({ name: 'saludDateTime', standalone: true })
export class SaludDateTimePipe implements PipeTransform {
  private readonly formatter = new Intl.DateTimeFormat('es-PE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  transform(value: string | Date): string {
    const date = typeof value === 'string' ? new Date(value) : value;
    return this.formatter.format(date);
  }
}
