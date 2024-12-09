import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from './components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    SharedComponentsModule,
  ],
  exports: [
    SharedComponentsModule
  ]
})
export class SharedModule { }
