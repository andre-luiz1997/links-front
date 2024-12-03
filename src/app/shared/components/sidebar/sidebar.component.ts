import { Component } from '@angular/core';

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
      icon: 'phosphorNewspaperClipping',
      route: '/exams'
    }
  ]
}
