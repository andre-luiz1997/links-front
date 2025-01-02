import { NgModule } from '@angular/core';
import { RouterModule, type Routes } from '@angular/router';
import { AuthGuardService } from './pages/auth/guards/auth-guard.service';
import { TemplateComponent } from './template/template.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

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
        path: 'exam-types',
        loadChildren: () => import('./pages/exam-types/exam-types.module').then(m => m.ExamTypesModule),
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
        path: 'labs',
        loadChildren: () => import('./pages/labs/labs.module').then(m => m.LabsModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'exams',
        loadChildren: () => import('./pages/exams/exams.module').then(m => m.ExamsModule),
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
