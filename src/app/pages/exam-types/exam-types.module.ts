import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamTypesComponent } from './exam-types.component';
import { ExampTypesListComponent } from './examp-types-list/examp-types-list.component';
import { ExamTypesRoutingModule } from './exam-types.routing.module';
import { SharedComponentsModule } from '@shared/components/shared-components.module';
import { TableModule } from 'primeng/table';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { NgIconsModule } from '@ng-icons/core';
import { phosphorGear } from '@ng-icons/phosphor-icons/regular';

@NgModule({
	declarations: [ExamTypesComponent, ExampTypesListComponent],
	imports: [
		CommonModule,
		ExamTypesRoutingModule,
		SharedComponentsModule,
		TableModule,
		TranslatePipe,
		NgIconsModule.withIcons({
			phosphorGear
		}),
	],
})
export class ExamTypesModule {}
