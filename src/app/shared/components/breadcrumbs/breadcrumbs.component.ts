import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Event as NavigationEvent, NavigationEnd, Router, Scroll } from '@angular/router';
import { ExamTypesService } from '@shared/services/exam-types.service';
import { LangService, Translated } from '@shared/services/lang.service';
import { isEmpty } from '@shared/utils/common';
import { filter, lastValueFrom } from 'rxjs';

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
	// lastItem?: any;

	constructor(
		private langService: LangService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private examTypesService: ExamTypesService,
		private changeDetectorRef: ChangeDetectorRef
	) {
		this.lang = this.langService.getTranslation();
		this.route = this.router.url.split('?')[0];
		this.breadcrumbs = [];
		this.router.events
			.pipe(filter(event => event instanceof NavigationEnd || event instanceof Scroll))
			.subscribe(async (event: NavigationEvent) => {
				await this.createBreadcrumbs(this.activatedRoute.root);
				this.changeDetectorRef.markForCheck()
			});
	}

	ngOnInit(): void {
		this.lastCrumb = undefined;
	}

	private async fetchExamType(id: string) {
		return lastValueFrom(this.examTypesService.getOne(id)).then((response) => response.data);
	}

	private async mapLabel(label: string, child: ActivatedRoute) {
		switch (label) {
			case ':examTypeId': {
				const examTypeId = child.snapshot.params['examTypeId'];
				if (isEmpty(examTypeId)) return '';
				const examType = await this.fetchExamType(examTypeId);
				if (examType?.name) return examType.name;
				return '';
			}
			default:
				return this.langService.getMessage(label);
		}
	}

	private async createBreadcrumbs(route: ActivatedRoute): Promise<any[] | any> {
		let children: ActivatedRoute[] = route.children
		const breadcrumbs: any[] = []
		let url = ''
		if (!children || children.length === 0) {
			return
		}

		do {
			const child = children[0]
			const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/')
			let label = child.snapshot.data['breadcrumb']

			if (!isEmpty(label)) {
				label = await this.mapLabel(label, child)
				if(label != breadcrumbs[breadcrumbs.length - 1]?.label) {
					breadcrumbs.push({ label, url, styleClass: 'active' })
				}
			}
			if (routeURL !== '') {
				url += `/${routeURL}`
			}
			children = child.children
		} while (children && children.length > 0)
		this.breadcrumbs = breadcrumbs
	}
}
