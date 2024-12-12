import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { FormControlName, Validators } from '@angular/forms';

@Directive({
	selector: '[formControlName][requiredLabel]',
})
export class RequiredLabelDirective implements AfterViewInit {
	@Input('requiredLabel') requiredLabel?: string;

	constructor(
		private el: ElementRef,
		private renderer: Renderer2,
		private formControlName: FormControlName,
	) {}

	ngAfterViewInit(): void {
		const control = this.formControlName.control;
		const formControlName = this.formControlName.name; // Obtenha o nome do formControl
		// Busca o rótulo associado usando o formControlName
		let label = document.querySelector(`label[for="${formControlName}"]`);

		// Se o rótulo não for encontrado, procure como o primeiro <label> irmão do elemento
		if (!label) {
			label = this.el.nativeElement.closest('div')?.querySelector('label');
		}

		// Adiciona o "*" no rótulo se o controle for obrigatório
		if (control && label && control.hasValidator(Validators.required)) {
			const originalText = label.textContent?.trim() || '';
			if (!originalText.endsWith('*')) {
				this.renderer.setProperty(label, 'textContent', `${originalText} *`);
			}
		}
	}
}
