import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReferenceValuesComponent } from './reference-values.component';
import { ReferenceValuesRoutingModule } from './reference-values.routing.module';
import { ReferenceValuesListComponent } from './reference-values-list/reference-values-list.component';
import { TableModule } from 'primeng/table';
import { NgIconsModule } from '@ng-icons/core';
import { phosporDefaultIcons, SharedModule } from '@shared/index';
import { TooltipModule } from 'primeng/tooltip';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { ReferenceValuesFormComponent } from './reference-values-form/reference-values-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { phosphorMinus, phosphorPlus } from '@ng-icons/phosphor-icons/regular';



@NgModule({
  declarations: [
    ReferenceValuesComponent,
    ReferenceValuesListComponent,
    ReferenceValuesFormComponent
  ],
  imports: [
    CommonModule,
    ReferenceValuesRoutingModule,
    TableModule,
    SharedModule,
    TooltipModule,
    TranslatePipe,
    InputNumberModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons({
      ...phosporDefaultIcons,
      phosphorMinus,
      phosphorPlus
    })
  ]
})
export class ReferenceValuesModule { }
