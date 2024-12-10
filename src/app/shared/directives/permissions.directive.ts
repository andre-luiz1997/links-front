import { AfterViewInit, ChangeDetectorRef, Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { SharedService } from '@shared/services/shared.service';

@Directive({
  selector: '[permissions]'
})
export class PermissionsDirective implements AfterViewInit {

  private _permissions: string[] = [];

  @Input()
  set permissions(value: string[]) {
    this._permissions = value;
  }
  private isViewCreated = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private sharedService: SharedService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    this.subscribePermissions();
  }

  private createView() {
    this.viewContainer.createEmbeddedView(this.templateRef);
    this.isViewCreated = true;
  }

  private clearView() {
    this.viewContainer.clear();
    this.isViewCreated = false;
  }

  private subscribePermissions() {
    const permissions = this._permissions;
    this.sharedService.$role.subscribe((role) => {
      if (!role) {
        this.viewContainer.clear();
        return;
      }
      if (!role.permissions) {
        if (!permissions.length && !this.isViewCreated) this.createView();
        return;
      }
      const hasPermission = !permissions?.length || permissions.some(_permission => {
        const [context, permission] = _permission.split('.');
        if(!permission) return this.sharedService.hasPermissionInContext(context);
        return this.sharedService.hasPermission(context, permission)
      });
      if(hasPermission && !this.isViewCreated) this.createView();
      else if(!hasPermission && this.isViewCreated) this.clearView();
      this.changeDetectorRef.detectChanges();
    });
  }

}
