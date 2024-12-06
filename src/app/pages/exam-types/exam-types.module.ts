import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamTypesComponent } from './exam-types.component';
import { ExampTypesListComponent } from './examp-types-list/examp-types-list.component';
import { RouterModule } from '@angular/router';
import { ExamTypesRoutingModule } from './exam-types.routing.module';
import { SharedComponentsModule } from '@shared/components/shared-components.module';



@NgModule({
  declarations: [
    ExamTypesComponent,
    ExampTypesListComponent
  ],
  imports: [
    CommonModule,
    ExamTypesRoutingModule,
    SharedComponentsModule
  ]
})
export class ExamTypesModule { }
