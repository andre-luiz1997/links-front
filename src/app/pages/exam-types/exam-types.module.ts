import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamTypesComponent } from './exam-types.component';
import { ExamTypesListComponent } from './exam-types-list/exam-types-list.component';
import { ExamTypesRoutingModule } from './exam-types.routing.module';
import { TableModule } from 'primeng/table';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { NgIconsModule } from '@ng-icons/core';
import { phosphorGear } from '@ng-icons/phosphor-icons/regular';
import { SharedModule } from '@shared/shared.module';

@NgModule({
	declarations: [ExamTypesComponent, ExamTypesListComponent],
	imports: [
		CommonModule,
		ExamTypesRoutingModule,
		SharedModule,
		TableModule,
		TranslatePipe,
		NgIconsModule.withIcons({
			phosphorGear
		}),
	],
})
export class ExamTypesModule {}
