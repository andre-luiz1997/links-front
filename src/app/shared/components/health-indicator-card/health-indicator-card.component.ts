import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { HealthIndicatorEnum } from '@shared/types';
import { HealthIndicatorModalComponent } from '../health-indicator-modal/health-indicator-modal.component';

@Component({
  selector: 'app-health-indicator-card',
  templateUrl: './health-indicator-card.component.html',
  styleUrl: './health-indicator-card.component.scss'
})
export class HealthIndicatorCardComponent implements OnChanges {
  @Input() indicator!: HealthIndicatorEnum;

  icon?: {
    name: string;
    color: string;
    background?: string;
  };

  @ViewChild('healthIndicatorModal') healthIndicatorModal!: HealthIndicatorModalComponent;


  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['indicator']?.currentValue) {
      this.getIndicatorParams();
    }
  }

  getIndicatorParams() {
    switch (this.indicator) {
      case HealthIndicatorEnum.WEIGHT:
        this.icon = {
          name: 'phosphorBarbellFill',
          color: '#0096c7',
        };
        break;
      case HealthIndicatorEnum.BLOOD_PRESSURE:
        this.icon = {
          name: 'phosphorDropFill',
          color: '#c1121f',
        };
        break;
      case HealthIndicatorEnum.CALORIES:
        this.icon = {
          name: 'phosphorFireFill',
          color: '#f77f00',
          background: '#fcbf49',
        };
        break;
    }
  }

  openIndicatorModal() {
    this.healthIndicatorModal.open(this.indicator);
  }

}
