import { isEmpty } from './common';
import dinero, { Currency } from 'dinero.js';
import { CURRENCIES } from './constants';

function formatToCurrency(value: any, currency: keyof typeof CURRENCIES = 'BRL'): string {
	if (isEmpty(value) || isNaN(value)) return '';
	if (!Number.isInteger(value)) value = Math.round(value);
	const price = dinero({ amount: value, currency: currency as Currency });
	return price.toRoundedUnit(2, 'HALF_DOWN').toLocaleString(CURRENCIES[currency].locale, { currency: currency as Currency, minimumFractionDigits: 2 });
}

function unformatCurrency(value: string): number {
	let str = value.replace(/[,.]/g, '');
	const _int = parseInt(str);
	if (_int > Number.MAX_SAFE_INTEGER) {
		return 0;
	}
	return _int;
}

function convertNumberToCurrency(value: number) {
	if (isEmpty(value)) return '';
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
		minimumFractionDigits: 2,
	}).format(value);
}

function float2moeda(val: any): string {
  let negativo = false;
  if (val < 0) {
    val = Math.abs(val);
    negativo = true;
  }
  val = parseFloat(val);
  let int = parseInt(`${val}`).toString();
  var numbers = int.split('').reverse();
  var x = 0;
  var numbersFinal: any = [];
  numbers.map((n, i) => {
    numbersFinal.push(n);
    x++;
    if (x % 3 == 0 && i != numbers.length - 1) {
      numbersFinal.push('.');
    }
  });
  if (negativo) numbersFinal.push('-');
  int = numbersFinal.reverse().join('');

  let decimal = Math.round((val - parseInt(`${val}`)) * 100).toString();
  if (decimal.length == 1) {
    decimal = `0${decimal}`;
  }

  return `${int},${decimal}`;
}

function moeda2float(str: string): number {
  if (str.length > 0) {
    str = str.replace(/[.]/g, '');
    str = str.replace(/[,]/g, '.');
    return parseFloat(str);
  } else {
    return 0;
  }
}

export { formatToCurrency, unformatCurrency, convertNumberToCurrency, float2moeda, moeda2float };
