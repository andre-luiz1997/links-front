import { NgModule } from '@angular/core';
import { RouterModule, type Routes } from '@angular/router';
import { AuthGuardService } from './pages/auth/guards/auth-guard.service';
import { TemplateComponent } from './template/template.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    component: TemplateComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'roles',
        loadChildren: () => import('./pages/roles/roles.module').then(m => m.RolesModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'account',
        loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'plans',
        loadChildren: () => import('./pages/saas/plans/plans.module').then(m => m.PlansModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'links',
        loadChildren: () => import('./pages/domain/links/links.module').then(m => m.LinksModule),
        canActivate: [AuthGuardService]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    paramsInheritanceStrategy: 'always'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
