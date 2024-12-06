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
        path: 'exam-types',
        loadChildren: () => import('./pages/exam-types/exam-types.module').then(m => m.ExamTypesModule),
        canActivate: [AuthGuardService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
