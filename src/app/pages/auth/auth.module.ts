import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { NgIconsModule } from '@ng-icons/core';
import { phosphorSignIn } from '@ng-icons/phosphor-icons/regular';
import { SharedModule } from '@shared/shared.module';
import { AuthOverlayContainerComponent } from './auth-overlay-container/auth-overlay-container.component';



@NgModule({
  declarations: [
    AuthComponent,
    SigninComponent,
    SignupComponent,
    AuthOverlayContainerComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    TranslatePipe,
    SharedModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons({
      phosphorSignIn
    })
  ]
})
export class AuthModule { }
