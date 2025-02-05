import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import type { SidebarItem } from '../sidebar.component';
import { SidebarService } from '@shared/services/sidebar.service';
import { ActivatedRoute, NavigationEnd, Router, Scroll } from '@angular/router';

@Component({
  selector: 'app-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.scss'],
})
export class SidebarItemComponent implements OnChanges {
  @Input() item!: SidebarItem;

  @Output() onOpened = new EventEmitter<SidebarItem>();

  isToggled = false;
  toggleIconName: 'phosphorCaretDown' | 'phosphorCaretUp' = 'phosphorCaretDown';
  accordionValue: number = 0;
  scale = 1
  isActive = false;

  constructor(
    private sidebarService: SidebarService,
    private router: Router
  ) {
    this.sidebarService.$toggled.subscribe(toggled => {
      this.isToggled = toggled;
    });
    this.sidebarService.$checkIsOpen.subscribe(() => {
      this.setIconName()
    })

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd || event instanceof Scroll) {
        if (this.item && this.item.route != '/') {
          if(!this.item.children && this.item.route) {
            this.isActive = this.router.url?.startsWith(this.item.route) ?? false;
          } else if(this.item.children) {
            const isOpen = this.item.children.some(child => this.router.url?.startsWith(child.route ?? ''));
            if(isOpen) {
              this.item.isOpen = true
              this.onOpened.emit(this.item);
            }
          }
        }
      }
    });
  }

  setIconName() {
    if (!this.item.isOpen) this.toggleIconName = 'phosphorCaretDown';
    else this.toggleIconName = 'phosphorCaretUp';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item']) {
      this.scale = 1 - (this.item.depth || 0) * 0.1;
    }
  }

  toggleChildren() {
    if (!this.item.children) {
      this.onOpened.emit(this.item);
      return;
    }
    this.item.isOpen = !this.item.isOpen;
    if (this.item.isOpen) {
      this.onOpened.emit(this.item);
    }
    this.setIconName()
  }
}
