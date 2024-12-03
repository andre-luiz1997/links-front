import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarItemComponent } from './sidebar/sidebar-item/sidebar-item.component';
import { NgIconsModule } from '@ng-icons/core';
import { phosphorHouseSimple, phosphorNewspaperClipping, phosphorUser } from '@ng-icons/phosphor-icons/regular';



@NgModule({
  declarations: [
    SidebarComponent,
    SidebarItemComponent
  ],
  imports: [
    CommonModule,
    NgIconsModule.withIcons({
      phosphorHouseSimple,
      phosphorUser,
      phosphorNewspaperClipping
    })
  ],
  exports: [
    SidebarComponent
  ]
})
export class SharedComponentsModule { }
