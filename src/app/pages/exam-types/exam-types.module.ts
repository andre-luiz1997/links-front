import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamTypesComponent } from './exam-types.component';
import { ExamTypesListComponent } from './exam-types-list/exam-types-list.component';
import { ExamTypesRoutingModule } from './exam-types.routing.module';
import { TableModule } from 'primeng/table';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { NgIconsModule } from '@ng-icons/core';
import { phosphorFadersHorizontal, phosphorGear, phosphorPencilSimple, phosphorPlus, phosphorTrashSimple } from '@ng-icons/phosphor-icons/regular';
import { SharedModule } from '@shared/shared.module';
import { TooltipModule } from 'primeng/tooltip';
import { phosporDefaultIcons } from '@shared/index';
import { ReactiveFormsModule } from '@angular/forms';
import { ExamTypesFormComponent } from './exam-types-form/exam-types-form.component';
import { ReferenceValuesModule } from './reference-values/reference-values.module';

@NgModule({
	declarations: [ExamTypesComponent, ExamTypesListComponent, ExamTypesFormComponent],
	imports: [
		CommonModule,
		ExamTypesRoutingModule,
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
	],
})
export class ExamTypesModule {}
