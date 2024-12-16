export const PHONE_MASK = '(00) 00000-0000'
export const DATE_MASK_US = 'YYYY-MM-DD';
export const TIME_MASK = 'HH:mm';
export const DATE_MASK_BR = 'DD/MM/YYYY';
export const CALENDAR_DATE_FORMAT_BR = 'dd/mm/yy';
export const MONTH_MASK = 'YYYY-MM';
export const MONTH_MASK_BR = 'MM/YYYY';
export const DATE_TIME_MASK_BR = 'DD/MM/YYYY HH:mm';
export const DATE_TIME_MASK_FULL_BR = 'dddd, DD [de] MMMM [de] YYYY';

export type CURRENCY_SYMBOLS = 'R$' | '$' | '€';
export const CURRENCIES: {
  value: string,
  symbol: CURRENCY_SYMBOLS,
  label: string
}[] = [
  { value: 'BRL',symbol: 'R$', label: 'Real brasileiro - R$' },
  { value: 'USD',symbol: '$', label: 'Dollar - US$' },
  { value: 'EUR',symbol: '€', label: 'Euro - €' },
]
export const DEFAULT_CURRENCY_SYMBOL: CURRENCY_SYMBOLS = 'R$'
export const DEFAULT_CURRENCY = 'BRL'
export const CURRENCY_MASK = '9.000,00';

export const ZIPCODE_MASK = '00000-000';