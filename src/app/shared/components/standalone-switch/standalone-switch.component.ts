import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { isEmpty } from '@shared/utils/common';

@Component({
  selector: 'app-standalone-switch',
  templateUrl: './standalone-switch.component.html',
  styleUrls: ['./standalone-switch.component.scss']
})
export class StandaloneSwitchComponent implements OnChanges, AfterViewInit {
  @Input('isActive') isActive = false;
  @Output('onChange') onChange = new EventEmitter<boolean>();
  
  form = new FormGroup({
    isActive: new FormControl(this.isActive)
  });
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['isActive']) {
      this.form.get('isActive')?.setValue(changes['isActive'].currentValue, {emitEvent: false});
    }
  }

  ngAfterViewInit(): void {
    this.form.get('isActive')?.valueChanges.subscribe((value) => {
      if(!isEmpty(value)) this.onChange.emit(value);
    });
  }
}
