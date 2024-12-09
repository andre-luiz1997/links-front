import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '@shared/shared.module';
import { AccountFormComponent } from './account-form/account-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { provideHttpClient } from '@angular/common/http';



@NgModule({
  declarations: [
    AccountComponent,
    AccountFormComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    TranslatePipe
  ]
})
export class AccountModule { }
