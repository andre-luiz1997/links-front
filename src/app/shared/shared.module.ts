import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from './components/shared-components.module';
import { TranslatePipe } from './pipes/translate.pipe';

@NgModule({
  imports: [
    CommonModule,
    SharedComponentsModule,
    TranslatePipe
  ],
  exports: [
    SharedComponentsModule,
  ]
})
export class SharedModule { }
