import { Component } from '@angular/core';
import { HealthIndicatorEnum } from '@shared/types';

@Component({
  selector: 'app-health-indicator-modal',
  templateUrl: './health-indicator-modal.component.html',
  styleUrl: './health-indicator-modal.component.scss'
})
export class HealthIndicatorModalComponent {

  isIndicatorModalOpen = false;
  indicator?: HealthIndicatorEnum;

  open(indicator: HealthIndicatorEnum) {
    this.indicator = indicator;
    this.isIndicatorModalOpen = true;
  }

  close() {
    this.isIndicatorModalOpen = false
  }

  save() {}
}
