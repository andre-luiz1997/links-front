import { Component } from '@angular/core';
import { ActivatedRoute, Event as NavigationEvent, NavigationEnd, Router, Scroll } from '@angular/router';
import { LangService, Translated } from '@shared/services/lang.service';
import { isEmpty } from '@shared/utils/common';

@Component({
	selector: 'app-breadcrumbs',
	templateUrl: './breadcrumbs.component.html',
	styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent {
	breadcrumbs: any[] = [];
	lang: Translated;
	route: any;
  lastCrumb?: string;
  lastItem?: any;

	constructor(
		private langService: LangService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
	) {
		this.lang = this.langService.getTranslation();
		this.route = this.router.url.split('?')[0];
		this.breadcrumbs = [];
		this.router.events.subscribe((event: NavigationEvent) => {
			if (event instanceof NavigationEnd || event instanceof Scroll) {
				this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
			}
		});
	}

  ngOnInit(): void {
		this.lastCrumb = undefined;
	}

	private createBreadcrumbs(route: ActivatedRoute, url = '#', breadcrumbs: any[] = []): any[] | any {
		const children: ActivatedRoute[] = route.children;

		if (children.length === 0) {
			return breadcrumbs;
		}

		for (const child of children) {
			const routeURL: string = child.snapshot.url.map((segment) => segment.path).join('/');
			if (routeURL !== '') {
				url += `/${routeURL}`;
			}
			const crumb = child.snapshot.data['breadcrumb'];
			const label = this.langService.getMessage(child.snapshot.data['breadcrumb']);

			if (crumb != undefined && label != null && label != undefined && this.lastCrumb != crumb) {
				this.lastCrumb = crumb;
				const item = { label, url };
				breadcrumbs.push(item);
				if (label && label != '') {
					this.lastItem = item; // Usado para desativar ultimo link
				}
			}

			return this.createBreadcrumbs(child, url, breadcrumbs);
		}
	}
}
