import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarItemComponent } from './sidebar/sidebar-item/sidebar-item.component';
import { NgIconsModule } from '@ng-icons/core';
import { phosphorHouseSimple, phosphorFile, phosphorUser, phosphorChartLine, phosphorArrowLeft, phosphorArrowRight, phosphorSignOut, phosphorExam, phosphorCaretRight, phosphorEye, phosphorEyeSlash } from '@ng-icons/phosphor-icons/regular';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { LogoComponent } from './logo/logo.component';
import { TooltipModule } from 'primeng/tooltip';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { EmptyTableMessageComponent } from './empty-table-message/empty-table-message.component';
import { ErrorBlockComponent } from './error-block/error-block.component';
import { InputPasswordComponent } from './input-password/input-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    SidebarComponent,
    SidebarItemComponent,
    LogoComponent,
    BreadcrumbsComponent,
    EmptyTableMessageComponent,
    ErrorBlockComponent,
    InputPasswordComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    TooltipModule,
    RouterModule,
    TranslatePipe,
    ReactiveFormsModule,
    NgIconsModule.withIcons({
      phosphorHouseSimple,
      phosphorUser,
      phosphorFile,
      phosphorChartLine,
      phosphorArrowLeft,
      phosphorArrowRight,
      phosphorSignOut,
      phosphorExam,
      phosphorCaretRight,
      phosphorEyeSlash,
      phosphorEye
    }),
    TranslatePipe
  ],
  exports: [
    SidebarComponent,
    BreadcrumbsComponent,
    LogoComponent,
    EmptyTableMessageComponent,
    ErrorBlockComponent,
    InputPasswordComponent,
    LoaderComponent
  ]
})
export class SharedComponentsModule { }
