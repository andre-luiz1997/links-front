import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from './pipes/translate.pipe';
import { PermissionsDirective } from './directives/permissions.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import { phosphorHouseSimple, phosphorUser, phosphorFile, phosphorChartLine, phosphorArrowLeft, phosphorArrowRight, phosphorSignOut, phosphorExam, phosphorCaretRight, phosphorEyeSlash, phosphorEye, phosphorFingerprint } from '@ng-icons/phosphor-icons/regular';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { EmptyTableMessageComponent } from './components/empty-table-message/empty-table-message.component';
import { ErrorBlockComponent } from './components/error-block/error-block.component';
import { InputPasswordComponent } from './components/input-password/input-password.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LogoComponent } from './components/logo/logo.component';
import { SidebarItemComponent } from './components/sidebar/sidebar-item/sidebar-item.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { StandaloneCheckboxComponent } from './components/standalone-checkbox/standalone-checkbox.component';
import { StandaloneSwitchComponent } from './components/standalone-switch/standalone-switch.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    PermissionsDirective,
    SidebarComponent,
    SidebarItemComponent,
    LogoComponent,
    BreadcrumbsComponent,
    EmptyTableMessageComponent,
    ErrorBlockComponent,
    InputPasswordComponent,
    LoaderComponent,
    StandaloneSwitchComponent,
    StandaloneCheckboxComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    TooltipModule,
    RouterModule,
    ReactiveFormsModule,
    TranslatePipe,
    InputSwitchModule,
    CheckboxModule,
    DialogModule,
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
      phosphorEye,
      phosphorFingerprint
    }),
  ],
  exports: [
    SidebarComponent,
    BreadcrumbsComponent,
    LogoComponent,
    EmptyTableMessageComponent,
    ErrorBlockComponent,
    InputPasswordComponent,
    LoaderComponent,
    StandaloneSwitchComponent,
    StandaloneCheckboxComponent,
    PermissionsDirective,
    ConfirmationDialogComponent
  ]
})
export class SharedModule { }
