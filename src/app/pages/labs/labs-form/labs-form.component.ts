import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LabsService } from '@shared/services/labs.service';
import { LangService } from '@shared/services/lang.service';
import { LoaderService } from '@shared/services/loader.service';
import { ToastService } from '@shared/services/toast.service';
import { ILabs } from '@shared/types';

@Component({
  selector: 'app-labs-form',
  templateUrl: './labs-form.component.html',
  styleUrls: ['./labs-form.component.scss']
})
export class LabsFormComponent implements AfterViewInit {

  form = this.formBuilder.group({
    _id: new FormControl<string | undefined>(undefined),
    name: new FormControl<string | undefined>(undefined, [Validators.required, Validators.minLength(3)]),
    status: new FormControl<boolean>(true),
    address: {}
  })
  lab?: ILabs;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private langService: LangService,
    private loaderService: LoaderService,
    private router: Router,
    private labsService: LabsService
  ) { }

  ngAfterViewInit(): void {
    const id = this.activatedRoute.snapshot.params?.['labId'];
    if (id) this.fetchLab(id);
  }

  fetchLab(id: string) {
    this.loaderService.show();
    this.labsService.getOne(id).subscribe({
      next: (res) => {
        this.loaderService.hide();
        if (res.data) {
          this.form.patchValue({
            _id: res.data._id,
            name: res.data.name,
            status: res.data.status,
            address: res.data.address
          })
        }
      },
      error: (err) => {
        this.loaderService.hide();
        this.toastService.show({
          severity: 'error',
          description: this.langService.getMessage('error_messages.error_occurred')
        });
      }
    })
  }

  submitForm() {
    this.isSubmitted = true;
    this.form.updateValueAndValidity();
    if (!this.form.valid) return;
    this.loaderService.show();
    this.labsService.save(this.form.value).subscribe({
      next: (res) => {
        this.loaderService.hide();
        this.toastService.show({
          severity: 'success',
          description: this.langService.getMessage('success_messages.record_saved_successfully')
        });
        this.router.navigate(['/labs']);
      },
      error: (err) => {
        const description = this.langService.getMessage(err?.error?.message) ?? this.langService.getMessage('error_messages.error_occurred');
        this.loaderService.hide();
        this.toastService.show({
          severity: 'error',
          description
        });
      }
    });
  }
}
