import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth.routing.module';
import { provideHttpClient } from '@angular/common/http';
import { SharedComponentsModule } from '@shared/components/shared-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { NgIconsModule } from '@ng-icons/core';
import { phosphorSignIn } from '@ng-icons/phosphor-icons/regular';



@NgModule({
  declarations: [
    AuthComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    TranslatePipe,
    SharedComponentsModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons({
      phosphorSignIn
    })
  ],
  providers: [
    provideHttpClient()
  ]
})
export class AuthModule { }
