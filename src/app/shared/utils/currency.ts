import { isEmpty } from './common';

function formatToCurrency(value: any): string {
  if (isEmpty(value) || Number.isNaN(value)) return '';
  if (!Number.isInteger(value)) value = Math.round(value);

  const formattedValue = (value / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });

  return formattedValue;
}

function unformatCurrency(value: string): number {
  const str = value.replace(/\./g, '').replace(',', '.').replace(/[^\d.-]/g, '');
  const number = Number.parseFloat(str);

  if (Number.isNaN(number) || Math.abs(number) > Number.MAX_SAFE_INTEGER) {
    return 0;
  }

  // Convert to integer representation in cents
  return Math.round(number * 100);
}

function convertNumberToCurrency(value: number): string {
  if (isEmpty(value)) return '';
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
}

export { formatToCurrency, unformatCurrency, convertNumberToCurrency };
