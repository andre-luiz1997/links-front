import { Component, HostBinding } from '@angular/core';
import { SidebarService } from '@shared/services/sidebar.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent {
  isSidebarToggled = false;

  @HostBinding('class.toggled') get sidebarToggled() {
    return this.isSidebarToggled;
  }

  constructor(
    private sidebarService: SidebarService
  ) {
    this.sidebarService.$toggled.subscribe(toggled => {
      this.isSidebarToggled = toggled;
    });
  }
}
