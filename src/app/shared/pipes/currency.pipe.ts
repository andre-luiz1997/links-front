import { Pipe, type PipeTransform } from '@angular/core';
import { CURRENCIES } from '@shared/utils/constants';
import { formatToCurrency } from '@shared/utils/currency';

@Pipe({
  name: 'customCurrency',
  standalone: true,
})
export class CurrencyPipe implements PipeTransform {

  transform(
    value: number | undefined,
    currencyCode: keyof typeof CURRENCIES,
    prefix: boolean = true,
  ): any {
    if (value === undefined || isNaN(value)) value = 0;

    if (typeof value !== 'number' && value !== undefined) value = +value;

    const currencyConfig = CURRENCIES[currencyCode];
    if (!currencyConfig) {
      throw new Error(`Currency code '${currencyCode}' is not supported.`);
    }

    return `${prefix ? currencyConfig.symbol : ''} ${formatToCurrency(value*100, currencyCode)}`;
  }

}
