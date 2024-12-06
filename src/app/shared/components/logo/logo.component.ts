import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LangService } from '@shared/services/lang.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {
  @Input('short') short = true;
  appNames: string[][] = [];

  constructor(
    private langService: LangService,
    private changeDetector: ChangeDetectorRef
  ) {
    const names = this.langService.getMessage('app_names').split(' ');
    this.appNames = names.map((name: string) => {
      return [name[0].toUpperCase(), name.slice(1)];
    });

    setTimeout(() => {
      this.short = false;
      this.changeDetector.detectChanges();
    }, 250);
  }
}
