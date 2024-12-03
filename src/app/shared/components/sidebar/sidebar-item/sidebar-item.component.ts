import { Component, Input } from '@angular/core';
import type { SidebarItem } from '../sidebar.component';

@Component({
  selector: 'app-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.scss']
})
export class SidebarItemComponent {
  @Input() item!: SidebarItem;
}
