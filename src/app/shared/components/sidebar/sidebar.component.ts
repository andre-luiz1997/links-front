import { Component } from '@angular/core';
import { SidebarService } from '@shared/services/sidebar.service';
import { STORAGE } from '@shared/utils/storage';

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
      route: '/account'
    },
    {
      title: 'exams',
      icon: 'phosphorFile',
      route: '/exams'
    },
    {
      title: 'exam-types',
      icon: 'phosphorExam',
      route: '/exam-types'
    },
    {
      title: 'reports',
      icon: 'phosphorChartLine',
      route: '/reports'
    },
    {
      title: 'signout',
      icon: 'phosphorSignOut',
      route: '/auth/signout'
    }
  ]

  togglerIcon = STORAGE.get(STORAGE.keys.TOGGLE_SIDEBAR) ? 'phosphorArrowRight' :'phosphorArrowLeft';
  isToggled = STORAGE.get(STORAGE.keys.TOGGLE_SIDEBAR);
  
  constructor(
    private sidebarService: SidebarService
  ) {
    this.sidebarService.$toggled.subscribe(toggled => {
      this.isToggled = toggled;
      this.togglerIcon = this.isToggled ? 'phosphorArrowRight' : 'phosphorArrowLeft';
    });
  }

  toggle() {
    const toggled = !this.isToggled;
    this.sidebarService.$toggled.next(toggled);
    STORAGE.set(STORAGE.keys.TOGGLE_SIDEBAR, toggled);
  }
}
