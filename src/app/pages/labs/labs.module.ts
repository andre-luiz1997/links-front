import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabsComponent } from './labs.component';
import { LabsRoutingModule } from './labs.routing.module';
import { SharedModule } from '@shared/shared.module';
import { LabsListComponent } from './labs-list/labs-list.component';
import { LabsFormComponent } from './labs-form/labs-form.component';
import { NgIconsModule } from '@ng-icons/core';
import { phosporDefaultIcons } from '@shared/index';
import { TooltipModule } from 'primeng/tooltip';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [
    LabsComponent,
    LabsListComponent,
    LabsFormComponent
  ],
  imports: [
    CommonModule,
    LabsRoutingModule,
    SharedModule,
    TooltipModule,
    TranslatePipe,
    ReactiveFormsModule,
    InputSwitchModule,
    TableModule,
    NgIconsModule.withIcons({
      ...phosporDefaultIcons
    })
  ]
})
export class LabsModule { }
