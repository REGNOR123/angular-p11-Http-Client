import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
name: 'customDate'
})
export class DateFormatePipe implements PipeTransform {

  transform(value: string | Date | null): string | null {
    if (!value) return null;
    const date = new Date(value);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}