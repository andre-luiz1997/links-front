import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { SharedModule } from 'primeng/api';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';
import { NgIconsModule } from '@ng-icons/core';
import { phosphorArrowsOut, phosphorDna } from '@ng-icons/phosphor-icons/regular';
import { TooltipModule } from 'primeng/tooltip';
import { phosporDefaultIcons } from '@shared/index';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkDrag, CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    DashboardComponent,
    DashboardCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslatePipe,
    DashboardRoutingModule,
    TooltipModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    CdkDropList, CdkDrag,
    DropdownModule,
    NgIconsModule.withIcons({
      ...phosporDefaultIcons,
      phosphorDna,
      phosphorArrowsOut
    })
  ]
})
export class DashboardModule { }
