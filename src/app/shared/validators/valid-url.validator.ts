import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function IsValidUrlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    // Expressão regular para validar URLs
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

    // Verifica se o valor é uma URL válida
    if (value && !urlPattern.test(value)) {
      return { invalidUrl: true }; // Retorna um erro se a URL for inválida
    }

    return null; // Retorna null se a URL for válida
  };
}