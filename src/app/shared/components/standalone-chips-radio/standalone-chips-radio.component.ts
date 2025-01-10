import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { isEmpty } from '@shared/utils/common';

export interface ChipsRadioValue {
  label: string;
  value: any;
}

@Component({
  selector: 'app-standalone-chips-radio',
  templateUrl: './standalone-chips-radio.component.html',
  styleUrl: './standalone-chips-radio.component.scss'
})
export class StandaloneChipsRadioComponent {

  @Input() values?: ChipsRadioValue[] = [];
  @Input() selectedIndex?: number;

  @Output() selectedIndexChange = new EventEmitter<any>();

  setSelectedChip(index: number) {
    this.selectedIndex = index
    if (this.values) {
      this.selectedIndexChange.emit(index);
    }
  }
}
