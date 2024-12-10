import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { isEmpty } from '@shared/utils/common';

@Component({
  selector: 'app-standalone-checkbox',
  templateUrl: './standalone-checkbox.component.html',
  styleUrls: ['./standalone-checkbox.component.scss']
})
export class StandaloneCheckboxComponent {
  @Input('isChecked') isChecked = false;
  @Input('label') label?: string;
  @Output('onChange') onChange = new EventEmitter<boolean>();
  
  form = new FormGroup({
    isChecked: new FormControl<boolean>(this.isChecked)
  });
  protected viewId = Math.random().toString(36).substring(7);
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['isChecked']) {
      this.form.get('isChecked')?.setValue(this.isChecked, {emitEvent: false});
    }
  }

  ngAfterViewInit(): void {
    this.form.get('isChecked')?.valueChanges.subscribe((value) => {
      if(!isEmpty(value)) this.onChange.emit(value);
    });
  }
}
