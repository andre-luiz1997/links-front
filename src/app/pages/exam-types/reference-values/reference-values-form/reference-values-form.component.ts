import { AfterViewInit, Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
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
    ageRange: new FormGroup({
      ageRangeMin: new FormControl<number | undefined>(undefined),
      ageRangeMax: new FormControl<number | undefined>(undefined),
    }),
    fastingState: new FormControl<string | undefined>(undefined),
    category: new FormControl<string | undefined>(undefined),
    fastingValues: new FormGroup({
      minValue: new FormControl<number | undefined>(undefined),
      maxValue: new FormControl<number | undefined>(undefined),
    }),
    nonFastingValues: new FormGroup({
      minValue: new FormControl<number | undefined>(undefined),
      maxValue: new FormControl<number | undefined>(undefined),
    }),
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
    const id = this.activatedRoute.snapshot.params?.['referenceValueId'];
    console.log("🚀 ~ ReferenceValuesFormComponent ~ ngAfterViewInit ~ id:", id)
    
    const promises = [this.fetchExamType(examTypeId)];
    if (id) promises.push(this.fetchReferenceValue(id));
    else this.form.patchValue({ examType: examTypeId });
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
            console.log("🚀 ~ ReferenceValuesFormComponent ~ this.referenceValuesService.getOne ~ res.data:", res.data)
            const ageRanges = res.data.ageRange?.split(',')?.map(value => value ? Number.parseInt(value) : undefined) ?? [];
            this.form.patchValue({
              _id: res.data._id,
              examType: res.data.examType._id,
              ageRange: {
                ageRangeMin: ageRanges[0],
                ageRangeMax: ageRanges[1]
              },
              category: res.data.category,
              fastingValues: res.data.fastingValues,
              nonFastingValues: res.data.nonFastingValues,
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
    const values = this.form.value;
    let ageRange: string | null = `${values.ageRange?.ageRangeMin ?? ''},${values.ageRange?.ageRangeMax ?? ''}`
    if (ageRange == ',') ageRange = null;
    this.referenceValuesService.save({ ...values, ageRange }).subscribe({
      next: (res) => {
        this.loaderService.hide();
        this.toastService.show({
          severity: 'success',
          description: this.langService.getMessage('success_messages.record_saved_successfully')
        });
        this.router.navigate(['/', 'exam-types', 'reference-values', this.form.value.examType]);
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
