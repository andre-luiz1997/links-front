import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from '@shared/services/confirmation.service';
import { ExamTypesService } from '@shared/services/exam-types.service';
import { ExamsService } from '@shared/services/exams.service';
import { LabsService } from '@shared/services/labs.service';
import { LangService } from '@shared/services/lang.service';
import { LoaderService } from '@shared/services/loader.service';
import { ToastService } from '@shared/services/toast.service';
import { IExams, IExamTypes, ILabs, IResultEntry } from '@shared/types';
import { CALENDAR_DATE_FORMAT_BR, CURRENCY_MASK, DATE_MASK_BR } from '@shared/utils/constants';
import { Message, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-exams-form',
  templateUrl: './exams-form.component.html',
  styleUrls: ['./exams-form.component.scss']
})
export class ExamsFormComponent implements AfterViewInit {
  form = new FormGroup({
    _id: new FormControl<string | undefined>(undefined),
    date: new FormControl<Date | undefined>(undefined, [Validators.required]),
    lab: new FormControl<string | undefined>(undefined, [Validators.required]),
  })
  results: IResultEntry[] = []

  resultForm = new FormGroup({
    examType: new FormControl<string | undefined>(undefined, [Validators.required]),
    value: new FormControl<number | undefined>(undefined, [Validators.required]),
    material: new FormControl<string | undefined>(undefined),
    method: new FormControl<string | undefined>(undefined),
  })
  exam?: IExams;
  labs: ILabs[] = [];
  examTypes: IExamTypes[] = [];
  examType?: IExamTypes;
  dateFormat = CALENDAR_DATE_FORMAT_BR;
  DATE_MASK_BR = DATE_MASK_BR;
  CURRENCY_MASK = CURRENCY_MASK;
  isSubmitted = false;
  isSubmittedResult = false;
  isResultModalShown = false;
  messages: Message[] = [];

  resultModalTitle: 'pages.exams.form.results.add' | 'pages.exams.form.results.edit' = 'pages.exams.form.results.add';

  constructor(
    private langService: LangService,
    private labsService: LabsService,
    private primeNGConfig: PrimeNGConfig,
    private examTypesService: ExamTypesService,
    private examsService: ExamsService,
    private confirmationService: ConfirmationService,
    private toastService: ToastService,
    private loaderService: LoaderService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private changeDetector: ChangeDetectorRef
  ) {
    const lang = this.langService.getTranslation();
    const id = this.activatedRoute.snapshot.params['examId'];
    this.primeNGConfig.setTranslation(lang.calendar_inputs);
    this.fetchLabs();
    this.fetchExamTypes();
    if (id) {
      this.fetchExam(id)
    }
  }

  ngAfterViewInit(): void {
    this.resultForm.get("examType")?.valueChanges.subscribe(value => {
      this.examType = this.examTypes.find(e => e._id === value);
      if (this.isResultModalShown && this.examType) {
        if (this.results.find(r => r.examType._id === this.examType?._id)) {
          this.messages = [{
            severity: 'warn',
            summary: this.langService.getMessage('pages.exams.form.results.warning.title'),
          }]
        } else {
          this.messages = [];
        }
        this.changeDetector.detectChanges();
        this.resultForm.patchValue({
          material: this.examType.material,
          method: this.examType.method,
        })
      }
    })
  }

  fetchLabs() {
    this.labsService.getAll().subscribe(res => {
      this.labs = res.data.records.orderBy('name');
    });
  }

  fetchExam(id: string) {
    this.loaderService.show();
    this.examsService.getOne(id).subscribe({
      next: (res) => {
        this.loaderService.hide();
        if (res.data) {
          this.exam = res.data;
          this.results = res.data.results;
          this.form.patchValue({
            _id: res.data._id,
            date: new Date(res.data.date),
            lab: res.data.lab?._id,
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

  fetchExamTypes() {
    this.examTypesService.getAll().subscribe(res => {
      this.examTypes = res.data.records.orderBy('name');
    });
  }

  submitForm() {
    this.isSubmitted = true;
    this.form.updateValueAndValidity();
    if (!this.form.valid) return;
    this.loaderService.show();
    this.examsService.save({
      ...this.form.value, results: this.results?.map(result => ({
        examType: result.examType._id,
        value: result.value,
        material: result.material,
        method: result.method,
      }))
    }).subscribe({
      next: (res) => {
        this.loaderService.hide();
        this.toastService.show({
          severity: 'success',
          description: this.langService.getMessage('success_messages.record_saved_successfully')
        });
        this.router.navigate(['/exams']);
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

  openResultModal() {
    this.isResultModalShown = true;
  }

  saveResult() {
    this.isSubmittedResult = true;
    this.resultForm.updateValueAndValidity();
    if (!this.resultForm.valid) return;
    const examType = this.examTypes.find(e => e._id === this.resultForm.value.examType);
    if (!examType) return;
    const result: IResultEntry = {
      examType,
      value: this.resultForm.value.value!,
    };
    this.results.push(result);
    this.isResultModalShown = false;
  }

  editResult(index: number) {
    this.resultModalTitle = 'pages.exams.form.results.edit';
    this.isSubmittedResult = false;
    const result = this.results[index];
    this.resultForm.reset({
      examType: result.examType._id,
      value: result.value,
      material: result.material,
      method: result.method,
    })
    this.isResultModalShown = true;
  }

  deleteResult(index: number) {
    this.confirmationService.show({
      title: 'pages.exams.form.results.delete_confirmation.title',
      description: 'pages.exams.form.results.delete_confirmation.description',
      confirmButton: {
        label: 'continue',
        severity: 'danger',
        action: () => {
          this.results.splice(index, 1);
          this.confirmationService.hide();
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

  closeResultModal() {
    this.resultForm.reset();
    this.examType = undefined;
    this.isSubmittedResult = false;
    this.resultModalTitle = 'pages.exams.form.results.add';
  }
}
