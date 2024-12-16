import type { IReferenceValues } from "@shared/types";
import { isEmpty } from "./common";
import type { LangService } from "@shared/services/lang.service";

export function getReferenceValuesString(referenceValue: IReferenceValues, langService: LangService, situation: 'fasting' | 'nonFasting' = 'fasting') {
    const values = situation == 'fasting' ? referenceValue.fastingValues : referenceValue.nonFastingValues;
    if (!values) return null;
    if (!isEmpty(values?.minValue) && !isEmpty(values?.maxValue)) {
        return `${values.minValue} ${langService.getMessage('to')} ${values.maxValue} ${referenceValue.examType.unit}`;
    }
    if (!isEmpty(values?.minValue)) {
        return `${langService.getMessage('superiorThan')} ${values.minValue} ${referenceValue.examType.unit}`;
    }
    if (!isEmpty(values?.maxValue)) {
        return `${langService.getMessage('inferiorThan')} ${values.maxValue} ${referenceValue.examType.unit}`;
    }
    return null;
}

export function getReferenceValuesAgeRange(referenceValue: IReferenceValues, langService: LangService) {
    if (!referenceValue.ageRange || isEmpty(referenceValue.ageRange) || referenceValue.ageRange == ',') return "-";
    const [minAge, maxAge] = referenceValue.ageRange.split(',');
    if (!isEmpty(minAge) && !isEmpty(maxAge)) {
        return `${minAge} ${langService.getMessage('to')} ${maxAge} ${langService.getMessage('years')}`;
    }
    if (!isEmpty(minAge)) {
        return `${langService.getMessage('greaterThan')} ${minAge} ${langService.getMessage('years')}`;
    }
    return `${langService.getMessage('lessThan')} ${maxAge} ${langService.getMessage('years')}`;
}