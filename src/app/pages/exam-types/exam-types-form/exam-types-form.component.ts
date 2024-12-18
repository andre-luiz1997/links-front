import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
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
    _id: new FormControl<string | undefined>(undefined),
    name: new FormControl<string | undefined>(undefined, [Validators.required, Validators.minLength(3)]),
    description: new FormControl<string | undefined>(undefined),
    unit: new FormControl<string | undefined>(undefined, [Validators.required]),
    method: new FormControl<string | undefined>(undefined),
    material: new FormControl<string | undefined>(undefined),
    examTypesGroups: new FormArray([])
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

  get examTypesGroups() {
    return this.form.get("examTypesGroups") as FormArray;
  }

  getExamTypes(index: number) {
    return this.examTypesGroups.at(index)?.get('examTypes') as FormArray;
  }

  ngAfterViewInit(): void {
    const id = this.activatedRoute.snapshot.params?.['examTypeId'];
    if (id) this.fetchExamType(id);
  }

  addGroup() {
    this.examTypesGroups.push(new FormGroup({
      name: new FormControl<string | undefined>(undefined, [Validators.required, Validators.minLength(3)]),
      examTypes: new FormArray([]),
    }));
    this.addGroupItem(this.examTypesGroups.length - 1);
  }

  deleteGroup(index: number) {
    this.examTypesGroups.removeAt(index);
  }

  addGroupItem(index: number) {
    this.getExamTypes(index).push(new FormGroup({
      name: new FormControl<string | undefined>(undefined, [Validators.required, Validators.minLength(3)]),
      unit: new FormControl<string | undefined>(undefined, [Validators.required]),
    }))
  }

  deleteGroupItem(groupIndex: number, itemIndex: number) {
    this.getExamTypes(groupIndex).removeAt(itemIndex);
    if(this.getExamTypes(groupIndex).length === 0) {
      this.deleteGroup(groupIndex);
    }
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
            unit: res.data.unit,
            material: res.data.material,
            method: res.data.method,
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
    console.log("🚀 ~ ExamTypesFormComponent ~ this.examTypesService.save ~ this.form.value:", this.form.value)
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
