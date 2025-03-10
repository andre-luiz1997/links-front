import { Component } from '@angular/core';
import { SidebarService } from '@shared/services/sidebar.service';
import { STORAGE } from '@shared/utils/storage';

export interface SidebarItem {
  icon?: string;
  route?: string;
  title: string;
  children?: SidebarItem[];
  permissions?: string[];
  isOpen?: boolean;
  depth?: number;
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
      title: 'links',
      icon: 'phosphorLink',
      route: '/links',
      permissions: ['links']
    },
    {
      title: 'account',
      icon: 'phosphorUser',
      route: '/account',
      permissions: ['users']
    },
    {
      title: 'roles',
      icon: 'phosphorFingerprint',
      route: '/roles'
    },
    {
      title: 'saas',
      icon: 'phosphorInvoice',
      children: [
        {
          title: 'plans',
          icon: 'phosphorDotFill',
          route: '/plans',
          depth: 1
        },
        {
          title: 'subscriptions',
          icon: 'phosphorDotFill',
          route: '/subscriptions',
          depth: 1
        }
      ]
    },
    {
      title: 'signout',
      icon: 'phosphorSignOut',
      route: '/auth/signout'
    }
  ]

  togglerIcon = STORAGE.get(STORAGE.keys.TOGGLE_SIDEBAR) ? 'phosphorArrowRight' : 'phosphorArrowLeft';
  isToggled = STORAGE.get(STORAGE.keys.TOGGLE_SIDEBAR);

  constructor(
    private sidebarService: SidebarService
  ) {
    this.sidebarService.$toggled.subscribe(toggled => {
      this.isToggled = toggled;
      this.togglerIcon = this.isToggled ? 'phosphorArrowRight' : 'phosphorArrowLeft';
    })
  }

  toggle() {
    const toggled = !this.isToggled;
    this.sidebarService.$toggled.next(toggled);
    STORAGE.set(STORAGE.keys.TOGGLE_SIDEBAR, toggled);
  }

  handleItemOpened(item: SidebarItem) {
    this.items.forEach(i => {
      if (i != item) i.isOpen = false;
    });
    this.sidebarService.$checkIsOpen.next();
  }
}
