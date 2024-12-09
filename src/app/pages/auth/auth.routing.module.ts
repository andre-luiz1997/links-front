import { NgModule } from '@angular/core';
import { RouterModule, type Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SignoutComponent } from './signout/signout.component';

const authRoutes: Routes = [
	{
		path: '',
		component: AuthComponent,
		children: [
            {
                path: 'signin',
                component: SigninComponent
            },
            {
                path: 'signout',
                component: SignoutComponent
            },
            {
                path: 'signup',
                component: SignupComponent
            }
        ],
	},
];
@NgModule({
	imports: [RouterModule.forChild(authRoutes)],
	exports: [RouterModule],
})
export class AuthRoutingModule {}
