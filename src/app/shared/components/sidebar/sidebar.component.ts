import { Component, EventEmitter, HostBinding, Output } from '@angular/core';
import { SidebarService } from '@shared/services/sidebar.service';

export interface SidebarItem {
  icon?: string;
  route: string;
  title: string;
  children?: SidebarItem[];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  items: SidebarItem[] = [
    {
      title: 'home',
      icon: 'phosphorHouseSimple',
      route: '/'
    },
    {
      title: 'account',
      icon: 'phosphorUser',
      route: '/user'
    },
    {
      title: 'exams',
      icon: 'phosphorFile',
      route: '/exams'
    },
    {
      title: 'reports',
      icon: 'phosphorChartLine',
      route: '/reports'
    }
  ]

  togglerIcon = 'phosphorArrowLeft';
  isToggled = false;

  constructor(
    private sidebarService: SidebarService
  ) {
    this.sidebarService.$toggled.subscribe(toggled => {
      this.isToggled = toggled;
      this.togglerIcon = this.isToggled ? 'phosphorArrowRight' : 'phosphorArrowLeft';
    });
  }

  toggle() {
    this.sidebarService.$toggled.next(!this.isToggled);
  }
}
