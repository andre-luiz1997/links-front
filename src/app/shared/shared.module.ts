import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from './pipes/translate.pipe';
import { PermissionsDirective } from './directives/permissions.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import { phosphorHouseSimple, phosphorUser, phosphorFile, phosphorChartLine, phosphorArrowLeft, phosphorArrowRight, phosphorSignOut, phosphorExam, phosphorCaretRight, phosphorEyeSlash, phosphorEye, phosphorFingerprint, phosphorFlask } from '@ng-icons/phosphor-icons/regular';
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
import { RequiredLabelDirective } from './directives';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { DropdownModule } from 'primeng/dropdown';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { CustomDatePipe } from './pipes/custom-date.pipe';

@NgModule({
  declarations: [
    PermissionsDirective,
    RequiredLabelDirective,
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
    ConfirmationDialogComponent,
    AddressFormComponent,
    CustomDatePipe
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
    DropdownModule,
    NgxMaskDirective, NgxMaskPipe,
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
      phosphorFingerprint,
      phosphorFlask
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
    RequiredLabelDirective,
    ConfirmationDialogComponent,
    AddressFormComponent,
    CustomDatePipe
  ],
  providers: [
    provideNgxMask()
  ]
})
export class SharedModule { }
