import { Component } from '@angular/core';
import { LangService } from '@shared/services/lang.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {

  appNames: string;

  constructor(
    private langService: LangService
  ) {
    this.appNames = this.langService.getMessage('app_names').split(' ');
  }

}
