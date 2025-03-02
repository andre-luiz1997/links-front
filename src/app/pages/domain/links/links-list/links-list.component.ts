import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { ConfirmationService } from '@shared/services/confirmation.service';
import { LangService } from '@shared/services/lang.service';
import { LinksService } from '@shared/services/links.service';
import { LoaderService } from '@shared/services/loader.service';
import { ToastService } from '@shared/services/toast.service';
import { DefaultPaginatedRequest } from '@shared/types';
import { ILinks } from '@shared/types/entities/domain/links';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';

@Component({
  selector: 'app-links-list',
  templateUrl: './links-list.component.html',
  styleUrl: './links-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinksListComponent implements OnInit {
  links = signal<ILinks[]>([]);
  isLoading = signal<boolean>(false);
  totalRecords = 0;

  buttons: MenuItem[] = [
    {
      tooltip: 'pages.links.permissions.edit',
      tooltipPosition: 'bottom',
      icon: 'phosphorPencilSimple',
      replaceUrl: true
    },
    {
      tooltip: 'pages.links.permissions.delete',
      tooltipPosition: 'bottom',
      icon: 'phosphorTrashSimple',
      command: (event: MenuItemCommandEvent) => {
        if(this.selectedItem !== undefined) this.deleteLink(this.selectedItem);


      }
    },
  ]
  selectedItem?: number = undefined;

  constructor(
    private linksService: LinksService,
    private toastService: ToastService,
    private langService: LangService,
    private confirmationService: ConfirmationService,
    private loaderService: LoaderService,
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(event?: any) {
    this.isLoading.set(true);
    const props: DefaultPaginatedRequest = {
      skip: event?.skip,
      limit: event?.rows,
      sortBy: event?.multiSortMeta?.at(0)?.field,
      sortOrder: event?.multiSortMeta?.at(0)?.order ?? -1,
      globalFilter: event?.filters?.global?.value
    }
    this.linksService.getAll(props).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        if (response.data) {
          this.links.set(response.data.records);
          this.totalRecords = response.data.totalRecords ?? 0;
        }
      },
      error: (error) => {
        this.isLoading.set(false);
      }
    });
  }

  deleteLink(index: number) {
    const link = this.links().at(index);
    if (!link?._id) return;
    this.confirmationService.show({
      title: 'delete_confirmation.title',
      description: 'delete_confirmation.description',
      confirmButton: {
        label: 'continue',
        severity: 'danger',
        action: () => {
          this.loaderService.show();
          this.linksService.delete(link._id).subscribe({
            next: (response) => {
              this.confirmationService.hide();
              this.links.set(this.links().filter(role => role._id !== link._id));
              this.totalRecords--;
              this.loaderService.hide();
              this.toastService.show({
                description: this.langService.getMessage('success_messages.record_deleted_successfully'),
                severity: 'success'
              });
            },
            error: () => {
              this.loaderService.hide();
              this.toastService.show({
                description: this.langService.getMessage('error_messages.error_occurred'),
                severity: 'error'
              });
            }
          });
        }
      },
      cancelButton: {
        label: 'cancel',
        action: () => {
          this.confirmationService.hide();
        }
      }
    });
  }
}
