import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './roles.component';
import { SharedModule } from '@shared/shared.module';
import { RolesRoutingModule } from './roles.routing.module';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { RolesListComponent } from './roles-list/roles-list.component';
import { TableModule } from 'primeng/table';
import { NgIconsModule } from '@ng-icons/core';
import { phosphorGear, phosphorPencilSimple, phosphorTrashSimple } from '@ng-icons/phosphor-icons/regular';
import { TooltipModule } from 'primeng/tooltip';
import { RoleFormComponent } from './role-form/role-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';



@NgModule({
  declarations: [
    RolesComponent,
    RolesListComponent,
    RoleFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RolesRoutingModule,
    TranslatePipe,
    TableModule,
    TooltipModule,
    ReactiveFormsModule,
    InputSwitchModule,
    NgIconsModule.withIcons({
      phosphorGear,
      phosphorPencilSimple,
      phosphorTrashSimple
    })
  ]
})
export class RolesModule { }
