import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, Scroll } from '@angular/router';
import { LangService } from '@shared/services/lang.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlansComponent {
  title?: string;
  showAddButton = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private langService: LangService
  ) {
    this.title = this.activatedRoute.snapshot.data['title'];
    this.router.events.subscribe((event) => {
			let currentRoute = this.router.routerState.snapshot.root;
      if (event instanceof NavigationEnd || event instanceof Scroll) {
        this.showAddButton = this.router.url == '/plans';
      }
			while (currentRoute.firstChild) {
				currentRoute = currentRoute.firstChild;
				if (currentRoute.data?.['title']) {
					this.title = this.langService.getMessage(currentRoute.data['title']);
				}
			}
		});
  }
}
