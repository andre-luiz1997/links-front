import { Component, Input } from '@angular/core';
import type { SidebarItem } from '../sidebar.component';
import { SidebarService } from '@shared/services/sidebar.service';

@Component({
  selector: 'app-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.scss'],
})
export class SidebarItemComponent {
  @Input() item!: SidebarItem;

  isToggled = false;

  constructor(
    private sidebarService: SidebarService
  ) {
    this.sidebarService.$toggled.subscribe(toggled => {
      this.isToggled = toggled;
    });
  }
}
