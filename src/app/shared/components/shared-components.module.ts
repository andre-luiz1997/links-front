import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarItemComponent } from './sidebar/sidebar-item/sidebar-item.component';
import { NgIconsModule } from '@ng-icons/core';
import { phosphorHouseSimple, phosphorFile, phosphorUser, phosphorChartLine, phosphorArrowLeft, phosphorArrowRight, phosphorSignOut, phosphorExam, phosphorCaretRight } from '@ng-icons/phosphor-icons/regular';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { LogoComponent } from './logo/logo.component';
import { TooltipModule } from 'primeng/tooltip';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

@NgModule({
  declarations: [
    SidebarComponent,
    SidebarItemComponent,
    LogoComponent,
    BreadcrumbsComponent
  ],
  imports: [
    CommonModule,
    TooltipModule,
    RouterModule,
    NgIconsModule.withIcons({
      phosphorHouseSimple,
      phosphorUser,
      phosphorFile,
      phosphorChartLine,
      phosphorArrowLeft,
      phosphorArrowRight,
      phosphorSignOut,
      phosphorExam,
      phosphorCaretRight
    }),
    TranslatePipe
  ],
  exports: [
    SidebarComponent,
    BreadcrumbsComponent
  ]
})
export class SharedComponentsModule { }
