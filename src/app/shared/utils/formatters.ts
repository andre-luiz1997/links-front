import { HealthIndicatorEnum } from "@shared/types";

// Função para formatar o número como 00/00
function formatAsBloodPressure(value: number): string {
    const stringValue = value.toString().padStart(4, '0'); // Garante 4 dígitos
    return `${stringValue.slice(0, 2)}/${stringValue.slice(2)}`;
}

function formatAsWeight(value: number): string {
    return value.toFixed(1);
}

function formatAsTime(totalMinutes: number): string {
    if (totalMinutes < 0) {
      return "00:00"; // Retorna um valor padrão para entradas negativas
    }
  
    const hours = Math.floor(totalMinutes / 60); // Calcula as horas
    const minutes = totalMinutes % 60;          // Calcula os minutos restantes
  
    // Formata as horas e minutos com dois dígitos
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

export const FORMATTERS = {
    [HealthIndicatorEnum.BLOOD_PRESSURE]: formatAsBloodPressure,
    [HealthIndicatorEnum.WEIGHT]: formatAsWeight,
    [HealthIndicatorEnum.CALORIES]: Math.floor,
    [HealthIndicatorEnum.SLEEPING_HOURS]: formatAsTime
}

function unformatBloodPressure(value: string): number {
    // Verifica o formato e preenche com zeros se necessário
    const parts = value.split('/');
    const systolic = parts[0]?.padStart(2, '0') || '00';
    const diastolic = parts[1]?.padStart(2, '0') || '00';

    // Combina as partes e retorna como número
    return parseInt(`${systolic}${diastolic}`, 10);
}

function unformatWeight(value: string, decimals = 1): number {
    // Substitui a vírgula por ponto e converte para número
    let formattedValue = value.replace(',', '.');
    if (!formattedValue.includes('.')) {
        formattedValue = `${formattedValue.slice(0, -decimals)}.${formattedValue.slice(-decimals)}`;
    }
    return parseFloat(formattedValue) || 0.0;
}

function unformatCalories(value: string): number {
    // Substitui a vírgula por ponto e converte para inteiro
    const formattedValue = value.replace(',', '.');
    return Math.floor(parseFloat(formattedValue)) || 0;
}

function unformatTime(value: string): number {
    if (!value || !/^\d{0,2}:\d{0,2}$/.test(value)) {
        return 0; // Retorna 0 se o formato for inválido
    }

    const parts = value.split(':');
    const hours = parseInt(parts[0] || '0', 10); // Converte as horas em número
    const minutes = parseInt(parts[1] || '0', 10); // Converte os minutos em número

    // Calcula o total de minutos
    return hours * 60 + minutes;
}

export const UNFORMATTERS = {
    [HealthIndicatorEnum.BLOOD_PRESSURE]: unformatBloodPressure,
    [HealthIndicatorEnum.WEIGHT]: unformatWeight,
    [HealthIndicatorEnum.CALORIES]: unformatCalories,
    [HealthIndicatorEnum.SLEEPING_HOURS]: unformatTime
}