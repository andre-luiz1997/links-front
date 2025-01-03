import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LangService } from '@shared/services/lang.service';

@Component({
  selector: 'app-health-indicators',
  templateUrl: './health-indicators.component.html',
  styleUrl: './health-indicators.component.scss'
})
export class HealthIndicatorsComponent {
  title?: string;
  showAddButton = false;
  addButtonLink?: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private langService: LangService
  ) {
    this.title = this.activatedRoute.snapshot.data['title'];
    this.router.events.subscribe((event) => {
			let currentRoute = this.router.routerState.snapshot.root;
			while (currentRoute.firstChild) {
        currentRoute = currentRoute.firstChild;
				if (currentRoute.data?.['title']) {
          this.title = this.langService.getMessage(currentRoute.data['title']);
				}
        if(!currentRoute.firstChild) {
          this.showAddButton = currentRoute.data['showAddButton'];
          this.addButtonLink = `${this.router.url}/${currentRoute.data['addButtonLink']}`;
        }
			}
		});
  }
}
