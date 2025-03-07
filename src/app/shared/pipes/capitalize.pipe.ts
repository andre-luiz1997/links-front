import { Pipe, type PipeTransform } from '@angular/core';
import { isEmpty } from '@shared/utils/common';

@Pipe({
  name: 'capitalize',
  standalone: true,
})
export class CapitalizePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if(isEmpty(value) || typeof value !== 'string') return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

}
