import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamTypesService } from '@shared/services/exam-types.service';
import { LangService } from '@shared/services/lang.service';
import { LoaderService } from '@shared/services/loader.service';
import { ReferenceValuesService } from '@shared/services/reference-values.service';
import { ToastService } from '@shared/services/toast.service';
import { IExamTypes, IReferenceValues } from '@shared/types';

@Component({
  selector: 'app-reference-values-form',
  templateUrl: './reference-values-form.component.html',
  styleUrls: ['./reference-values-form.component.scss']
})
export class ReferenceValuesFormComponent implements AfterViewInit {
  form = new FormGroup({
    _id: new FormControl<string | undefined>(undefined),
    examType: new FormControl<string | undefined>(undefined),
    ageRange: new FormControl<string | undefined>(undefined),
    fastingState: new FormControl<string | undefined>(undefined),
    category: new FormControl<string | undefined>(undefined),
    minValue: new FormControl<number | undefined>(undefined),
    maxValue: new FormControl<number | undefined>(undefined),
    description: new FormControl<string | undefined>(undefined)
  })
  examType?: IExamTypes;
  referenceValue?: IReferenceValues;
  isSubmitted = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private langService: LangService,
    private loaderService: LoaderService,
    private router: Router,
    private referenceValuesService: ReferenceValuesService,
    private examTypesService: ExamTypesService
  ) { }

  ngAfterViewInit(): void {
    const examTypeId = this.activatedRoute.snapshot.params?.['examTypeId'];
    console.log("🚀 ~ ReferenceValuesFormComponent ~ ngAfterViewInit ~ examTypeId:", this.activatedRoute.snapshot.params)
    const id = this.activatedRoute.snapshot.params?.['referenceValueId'];
    this.form.patchValue({ examType: examTypeId });
    const promises = [this.fetchExamType(examTypeId)];
    if (id) promises.push(this.fetchReferenceValue(id));
    this.loaderService.show();
    Promise.all(promises).then(() => {
      this.loaderService.hide();
    });
  }

  fetchExamType(id: string) {
    return new Promise<void>((resolve, reject) => {
      this.examTypesService.getOne(id).subscribe({
        next: (res) => {
          this.examType = res.data;
          resolve();
        },
        error: (res) => {
          reject(res)
        }
      });
    })
  }

  fetchReferenceValue(id: string) {
    return new Promise<void>((resolve, reject) => {
      this.referenceValuesService.getOne(id).subscribe({
        next: (res) => {
          if (res.data) {
            this.form.patchValue({
              _id: res.data._id,
              examType: res.data.examType._id,
              ageRange: res.data.ageRange,
              fastingState: res.data.fastingState,
              category: res.data.category,
              minValue: res.data.minValue,
              maxValue: res.data.maxValue,
              description: res.data.description
            })
          }
          resolve();
        },
        error: (res) => {
          this.toastService.show({
            severity: 'error',
            description: this.langService.getMessage('error_messages.error_occurred')
          });
          reject(res)
        }
      });

    })
  }

  submitForm() {
    this.isSubmitted = true
    this.form.updateValueAndValidity();
    if (!this.form.valid) return;
    this.loaderService.show();
    this.referenceValuesService.save(this.form.value).subscribe({
      next: (res) => {
        this.loaderService.hide();
        this.toastService.show({
          severity: 'success',
          description: this.langService.getMessage('success_messages.record_saved_successfully')
        });
        this.router.navigate(['/', 'exam-types', this.form.value.examType, 'reference-values']);
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
