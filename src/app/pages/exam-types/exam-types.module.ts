import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamTypesComponent } from './exam-types.component';
import { ExamTypesListComponent } from './exam-types-list/exam-types-list.component';
import { ExamTypesRoutingModule } from './exam-types.routing.module';
import { TableModule } from 'primeng/table';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { NgIconsModule } from '@ng-icons/core';
import { phosphorGear, phosphorPencilSimple, phosphorPlus, phosphorTrashSimple } from '@ng-icons/phosphor-icons/regular';
import { SharedModule } from '@shared/shared.module';
import { TooltipModule } from 'primeng/tooltip';
import { phosporDefaultIcons } from '@shared/index';

@NgModule({
	declarations: [ExamTypesComponent, ExamTypesListComponent],
	imports: [
		CommonModule,
		ExamTypesRoutingModule,
		SharedModule,
		TableModule,
		TranslatePipe,
		TooltipModule,
		NgIconsModule.withIcons({
			...phosporDefaultIcons
		}),
	],
})
export class ExamTypesModule {}
