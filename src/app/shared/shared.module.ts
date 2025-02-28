import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { TranslatePipe } from './pipes/translate.pipe';
import { PermissionsDirective } from './directives/permissions.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import { phosphorHouseSimple, phosphorUser, phosphorFile, phosphorChartLine, phosphorArrowLeft, phosphorArrowRight, phosphorSignOut, phosphorExam, phosphorCaretRight, phosphorEyeSlash, phosphorEye, phosphorFingerprint, phosphorFlask, phosphorDna, phosphorArrowCircleRight, phosphorHeartbeat, phosphorInvoice, phosphorCaretDown, phosphorCaretUp, phosphorDotOutline, phosphorDot, phosphorLink } from '@ng-icons/phosphor-icons/regular';
import { phosphorBarbellFill, phosphorDotFill, phosphorDropFill, phosphorFireFill, phosphorMoonStarsFill } from '@ng-icons/phosphor-icons/fill';
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
import { CurrencyDirective, RequiredLabelDirective } from './directives';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { DropdownModule } from 'primeng/dropdown';
import { ChartModule } from 'primeng/chart';
import { SkeletonModule } from 'primeng/skeleton';
import { TimelineModule } from 'primeng/timeline';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { DataChartComponent } from './components/data-chart/data-chart.component';
import { PlaceholderChartComponent } from './components/placeholder-chart/placeholder-chart.component';
import { phosporDefaultIcons } from '.';
import { DatePickerModule } from 'primeng/datepicker';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';
import { StandaloneChipsRadioComponent } from './components/standalone-chips-radio/standalone-chips-radio.component';
import { MoedaInputComponent } from './components/moeda-input/moeda-input.component';

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
    CustomDatePipe,
    DataChartComponent,
    PlaceholderChartComponent,
    StandaloneChipsRadioComponent,
    MoedaInputComponent,
    CurrencyDirective,
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
    ChartModule,
    SkeletonModule,
    TimelineModule,
    DatePickerModule,
    TableModule,
    AccordionModule,
    NgIconsModule.withIcons({
      ...phosporDefaultIcons,
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
      phosphorFlask,
      phosphorArrowCircleRight,
      phosphorHeartbeat,
      phosphorDropFill,
      phosphorBarbellFill,
      phosphorFireFill,
      phosphorMoonStarsFill,
      phosphorInvoice,
      phosphorCaretDown,
      phosphorCaretUp,
      phosphorDotFill,
      phosphorLink
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
    CustomDatePipe,
    DataChartComponent,
    PlaceholderChartComponent,
    StandaloneChipsRadioComponent,
    MoedaInputComponent,
    CurrencyDirective,
  ],
  providers: [
    provideNgxMask()
  ]
})
export class SharedModule { }
