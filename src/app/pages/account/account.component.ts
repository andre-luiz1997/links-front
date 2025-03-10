import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LangService } from '@shared/services/lang.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  title?: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private langService: LangService
  ) {
    this.title = this.activatedRoute.snapshot.data['title'];
    this.router.events.subscribe((url) => {
      let currentRoute = this.router.routerState.snapshot.root;
      while (currentRoute.firstChild) {
        currentRoute = currentRoute.firstChild;
        if (currentRoute.data?.['title']) {
          this.title = this.langService.getMessage(currentRoute.data['title']);
        }
      }
    });
  }
}
