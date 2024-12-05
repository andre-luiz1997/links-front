import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarItemComponent } from './sidebar/sidebar-item/sidebar-item.component';
import { NgIconsModule } from '@ng-icons/core';
import { phosphorHouseSimple, phosphorFile, phosphorUser, phosphorChartLine, phosphorArrowLeft, phosphorArrowRight } from '@ng-icons/phosphor-icons/regular';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { LogoComponent } from './logo/logo.component';



@NgModule({
  declarations: [
    SidebarComponent,
    SidebarItemComponent,
    LogoComponent
  ],
  imports: [
    CommonModule,
    NgIconsModule.withIcons({
      phosphorHouseSimple,
      phosphorUser,
      phosphorFile,
      phosphorChartLine,
      phosphorArrowLeft,
      phosphorArrowRight
    }),
    TranslatePipe
  ],
  exports: [
    SidebarComponent
  ]
})
export class SharedComponentsModule { }
