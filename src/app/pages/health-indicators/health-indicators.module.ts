import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HealthIndicatorsRoutingModule } from './health-indicators-routing.module';
import { HealthIndicatorsComponent } from './health-indicators.component';
import { phosphorFadersHorizontal } from '@ng-icons/phosphor-icons/regular';
import { phosporDefaultIcons, SharedModule } from '@shared/index';
import { NgIconsModule } from '@ng-icons/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ReferenceValuesModule } from '../exam-types/reference-values/reference-values.module';
import { HealthIndicatorsFormComponent } from './health-indicators-form/health-indicators-form.component';
import { HealthIndicatorsListComponent } from './health-indicators-list/health-indicators-list.component';


@NgModule({
  declarations: [
    HealthIndicatorsComponent,
    HealthIndicatorsFormComponent,
    HealthIndicatorsListComponent
  ],
  imports: [
    CommonModule,
    HealthIndicatorsRoutingModule,
    SharedModule,
		TableModule,
		TranslatePipe,
		TooltipModule,
		ReactiveFormsModule,
		ReferenceValuesModule,
		NgIconsModule.withIcons({
			...phosporDefaultIcons,
			phosphorFadersHorizontal
		}),
  ]
})
export class HealthIndicatorsModule { }
