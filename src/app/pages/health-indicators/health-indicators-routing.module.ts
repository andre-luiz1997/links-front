import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthIndicatorsComponent } from './health-indicators.component';
import { HealthIndicatorsListComponent } from './health-indicators-list/health-indicators-list.component';
import { HealthIndicatorsFormComponent } from './health-indicators-form/health-indicators-form.component';

const routes: Routes = [
  {
    path: '',
    component: HealthIndicatorsComponent,
    data: {
        title: 'pages.health_indicators.title',
        breadcrumb: 'pages.health_indicators.title'
    },
    children: [
        {
            path: '',
            component: HealthIndicatorsListComponent,
            data: {
                title: 'pages.health_indicators.title',
                showAddButton: true,
                addButtonLink: 'add'
            }
        },
        {
            path: 'add',
            component: HealthIndicatorsFormComponent,
            data: {
                title: 'pages.health_indicators.permissions.add',
                breadcrumb: 'pages.health_indicators.permissions.add'
            }
        },
        {
            path: 'edit/:examTypeId',
            component: HealthIndicatorsFormComponent,
            data: {
                title: 'pages.health_indicators.permissions.edit',
                breadcrumb: 'pages.health_indicators.permissions.edit'
            }
        }
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HealthIndicatorsRoutingModule { }
