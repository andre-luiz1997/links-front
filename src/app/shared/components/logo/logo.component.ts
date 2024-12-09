import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LangService } from '@shared/services/lang.service';

@Component({
	selector: 'app-logo',
	templateUrl: './logo.component.html',
	styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements AfterViewInit, OnChanges {
	@Input('short') short = false;
	isShort = !this.short;
	appNames: string[][] = [];

	constructor(
		private langService: LangService,
		private changeDetector: ChangeDetectorRef,
	) {
		const names = this.langService.getMessage('app_names').split(' ');
		this.appNames = names.map((name: string) => {
			return [name[0].toUpperCase(), name.slice(1)];
		});
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.isShort = this.short;
		this.changeDetector.detectChanges();
	}

	ngAfterViewInit(): void {
		setTimeout(() => {
			this.isShort = this.short;
			this.changeDetector.detectChanges();
		}, 250);
	}

}
