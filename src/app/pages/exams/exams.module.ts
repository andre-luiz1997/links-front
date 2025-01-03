import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamsComponent } from './exams.component';
import { ExamsRoutingModule } from './exams.routing.module';
import { SharedModule } from '@shared/shared.module';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { NgIconsModule } from '@ng-icons/core';
import { phosporDefaultIcons } from '@shared/index';
import { TooltipModule } from 'primeng/tooltip';
import { ExamsListComponent } from './exams-list/exams-list.component';
import { TableModule } from 'primeng/table';
import { ExamsFormComponent } from './exams-form/exams-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { MessagesModule } from 'primeng/messages';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';



@NgModule({
  declarations: [
    ExamsComponent,
    ExamsListComponent,
    ExamsFormComponent
  ],
  imports: [
    CommonModule,
    ExamsRoutingModule,
    SharedModule,
    TranslatePipe,
    TooltipModule,
    TableModule,
    ReactiveFormsModule,
    DropdownModule,
    CalendarModule,
    NgxMaskDirective, NgxMaskPipe,
    DialogModule,
    InputNumberModule,
    MessagesModule,
    DatePickerModule,
    NgIconsModule.withIcons({
      ...phosporDefaultIcons
    })
  ],
  providers: [
    provideNgxMask({
      thousandSeparator: '.',
      decimalMarker: ','
    })
  ]
})
export class ExamsModule { }
