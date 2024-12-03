import { Pipe, PipeTransform } from "@angular/core";
import { LangService } from "@shared/services/lang.service";
import { convertToCamelCase } from "@shared/utils/common";

@Pipe({
	name: 'translate',
	standalone: true,
})
export class TranslatePipe implements PipeTransform {
	constructor(private langService: LangService) {}

	transform(query?: string, ...args: any[]): any {
		if (!query) return query;
		const camelCaseKey = convertToCamelCase(query);
		return this.langService.getMessage(query) ?? query;
	}
}