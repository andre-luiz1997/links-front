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



@NgModule({
  declarations: [
    ReferenceValuesComponent,
    ReferenceValuesListComponent
  ],
  imports: [
    CommonModule,
    ReferenceValuesRoutingModule,
    TableModule,
    SharedModule,
    TooltipModule,
    TranslatePipe,
    NgIconsModule.withIcons({
      ...phosporDefaultIcons,
    })
  ]
})
export class ReferenceValuesModule { }
