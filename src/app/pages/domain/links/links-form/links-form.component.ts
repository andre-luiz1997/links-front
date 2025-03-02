import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LangService } from '@shared/services/lang.service';
import { LinksService } from '@shared/services/links.service';
import { LoaderService } from '@shared/services/loader.service';
import { ToastService } from '@shared/services/toast.service';
import { ILinkItem } from '@shared/types/entities/domain/links';
import { CustomValidators } from '@shared/validators';

@Component({
  selector: 'app-links-form',
  templateUrl: './links-form.component.html',
  styleUrl: './links-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinksFormComponent {
  isSubmitted = false
  isEdittingProfile = signal<boolean>(false)
  isItemFormVisible = false

  profileImage: string | undefined;
  profileImageTitle: string = '';

  form = this.formBuilder.group({
    _id: new FormControl<string|undefined>(undefined),
    profile: new FormGroup({
      show: new FormControl<boolean>(true),
      title: new FormControl<string | undefined>('John Doe'),
      subtitle: new FormControl<string | undefined>('Marketing Director'),
      phone: new FormControl<string | undefined>('+55 31971675658'),
      phone2: new FormControl<string | undefined>('+55 3138486504'),
      email: new FormControl<string | undefined>('johndoe@email.com', [CustomValidators.IsValidEmailValidator]),
    }),
    configuration: new FormGroup({}),
    items: this.formBuilder.array<Array<ILinkItem>>([
      // this.formBuilder.group({
      //   title: 'Link1',
      //   url: 'https://app.pdvpix.com.br',
      //   status: true
      // }),
      // this.formBuilder.group({
      //   title: 'Link2',
      //   url: 'https://teste.pdvpix.com.br',
      //   status: false
      // })
    ])
  })

  itemForm = new FormGroup({
    title: new FormControl<string|null>(null, [Validators.required, Validators.minLength(3)]),
    url: new FormControl<string|null>(null, [Validators.required, CustomValidators.IsValidUrlValidator()]),
    status: new FormControl<boolean>(true),
  })
  itemFormSubmitted = false
  itemIdx: null | number = null
  _id: string | null = null

  constructor(
    private formBuilder: FormBuilder,
    private linksService: LinksService,
    private loaderService: LoaderService,
    private langService: LangService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef
  ) {
    this.profileImageTitle = this.form.get("profile.title")?.value?.at(0) ?? '';
    this._id = this.route.snapshot.params['linkId'];
    if(this._id) {
      this.fetchLink();
    }
  }

  fetchLink() {
    if(!this._id) return;
    this.loaderService.show()
    this.linksService.getOne(this._id).subscribe({
      next: (res) => {
        const link = res.data;
        this.loaderService.hide()
        this.form.patchValue({
          _id: link._id,
          profile: {
            show: link.profile.show,
            title: link.profile.title,
            subtitle: link.profile.subtitle,
            phone: link.profile.phone,
            phone2: link.profile.phone2,
            email: link.profile.email,
          },
          configuration: link.configuration
        })
        this.items.clear();
        link.items?.forEach(item => {
          this.items.push(this.formBuilder.group({
            title: item.title,
            url: item.url,
            status: item.status
          }))
        })
        this.changeDetector.detectChanges();
      },
      error: (error) => {
        this.loaderService.hide()

      },
    })
  }

  editProfile(isCancelling = false) {
    if(isCancelling) {
      this.isEdittingProfile.set(false);
      return;
    }
    this.isEdittingProfile.set(true);
  }

  saveProfile() {
    this.isSubmitted = true;
    if(!this.form.valid) return;
    this.loaderService.show();
    this.linksService.save(this.form.value).subscribe({
      next: (res) => {
        this.loaderService.hide();
        if(!this._id) {
          this.router.navigate(['..','edit',res.data._id],{relativeTo: this.route})
        }
        this.isEdittingProfile.set(false);
        this.changeDetector.detectChanges();
        this.toastService.show({
          severity: 'success',
          description: this.langService.getMessage('success_messages.record_saved_successfully'),
        });
      },
      error: (error) => {
        this.loaderService.hide();
        this.toastService.show({
          severity: 'error',
          description: this.langService.getMessage(`error_messages.${error?.error?.message}`) || this.langService.getMessage('error_messages.error_occurred'),
        });
      }
    })
  }

  showItemForm(itemIdx: number | null = null) {
    this.isItemFormVisible = true;
    this.itemIdx = itemIdx;
    if(itemIdx !== null) {
      const item = this.items?.controls?.at(itemIdx)?.value;
      this.itemForm.patchValue({
        title: item?.title,
        url: item?.url,
        status: item?.status
      })
    }
  }

  removeItem(itemIdx: number) {
    this.items.removeAt(itemIdx);
    setTimeout(() => {
      this.linksService.save(this.form.value).subscribe();
    }, 10);
  }

  get items() {
    return this.form.get("items") as FormArray
  }

  onItemCardDrop(event: CdkDragDrop<any[]>) {
    if (event.previousIndex !== event.currentIndex) {
    const item = this.items.at(event.previousIndex);
    this.items.removeAt(event.previousIndex);
    this.items.insert(event.currentIndex, item);
  }

    setTimeout(() => {
      this.linksService.save(this.form.value).subscribe();
    }, 10);
  }

  saveItem() {
    this.itemFormSubmitted = true;
    if(!this.itemForm.valid) return;
    if(this.itemIdx !== null) {
      const values = this.itemForm.value;
      this.items.at(this.itemIdx).patchValue({
        title: values?.title,
        url: values?.url,
        status: values?.status
      })
    } else {
      this.items?.push(this.formBuilder.group(this.itemForm.value));
    }
    this.linksService.save(this.form.value).subscribe();
    this.isItemFormVisible = false;
  }
}
