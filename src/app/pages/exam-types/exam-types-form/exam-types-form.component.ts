import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamTypesService } from '@shared/services/exam-types.service';
import { LangService } from '@shared/services/lang.service';
import { LoaderService } from '@shared/services/loader.service';
import { ToastService } from '@shared/services/toast.service';
import { IExamTypes } from '@shared/types';

@Component({
  selector: 'app-exam-types-form',
  templateUrl: './exam-types-form.component.html',
  styleUrls: ['./exam-types-form.component.scss']
})
export class ExamTypesFormComponent implements AfterViewInit {
  form = new FormGroup({
    _id: new FormControl(''),
    name: new FormControl<string | undefined>(undefined, [Validators.required, Validators.minLength(3)]),
    description: new FormControl<string | undefined>(undefined),
    unit: new FormControl<string | undefined>(undefined, [Validators.required])
  })
  examType?: IExamTypes;
  isSubmitted = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private langService: LangService,
    private loaderService: LoaderService,
    private router: Router,
    private examTypesService: ExamTypesService
  ) { }

  ngAfterViewInit(): void {
    const id = this.activatedRoute.snapshot.params?.['examTypeId'];
    if (id) this.fetchExamType(id);
  }

  fetchExamType(id: string) {
    this.loaderService.show();
    this.examTypesService.getOne(id).subscribe({
      next: (res) => {
        this.loaderService.hide();
        if (res.data) {
          this.form.patchValue({
            _id: res.data._id,
            name: res.data.name,
            description: res.data.description,
            unit: res.data.unit
          })
        }
      },
      error: (res) => {
        this.loaderService.hide();
        this.toastService.show({
          severity: 'error',
          description: this.langService.getMessage('error_messages.error_occurred')
        });
      }
    })
  }

  submitForm() {
    this.isSubmitted = true
    this.form.updateValueAndValidity();
    if (!this.form.valid) return;
    this.loaderService.show();
    this.examTypesService.save(this.form.value).subscribe({
      next: (res) => {
        this.loaderService.hide();
        this.toastService.show({
          severity: 'success',
          description: this.langService.getMessage('success_messages.record_saved_successfully')
        });
        this.router.navigate(['/exam-types']);
      },
      error: (err) => {
        const description = this.langService.getMessage(err?.error?.message) ?? this.langService.getMessage('error_messages.error_occurred');
        this.loaderService.hide();
        this.toastService.show({
          severity: 'error',
          description
        });
      }
    })
  }
}
