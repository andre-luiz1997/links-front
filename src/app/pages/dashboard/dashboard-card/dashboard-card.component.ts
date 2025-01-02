import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { isEmpty } from '@shared/utils/common';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent implements OnChanges {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() value: number | undefined = undefined;
  @Input() unit?: string = '';

  sanitizedUnit?: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['unit']?.currentValue) {
      this.sanitizedUnit = this.unit?.trim();
      if (isEmpty(this.sanitizedUnit) || (this.sanitizedUnit.length === 1 && /^[^a-zA-Z0-9]$/.test(this.sanitizedUnit))) {
        this.sanitizedUnit = undefined;
      }
    }
  }
}
