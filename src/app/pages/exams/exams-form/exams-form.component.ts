import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from '@shared/services/confirmation.service';
import { ExamTypesService } from '@shared/services/exam-types.service';
import { ExamsService } from '@shared/services/exams.service';
import { LabsService } from '@shared/services/labs.service';
import { LangService } from '@shared/services/lang.service';
import { LoaderService } from '@shared/services/loader.service';
import { ToastService } from '@shared/services/toast.service';
import { IExams, IExamTypes, ILabs, IResultEntry } from '@shared/types';
import { isEmpty } from '@shared/utils/common';
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
  edittingResult?: number;
  isEmpty = isEmpty

  resultForm = new FormGroup({
    _id: new FormControl<string | undefined>(undefined),
    examType: new FormControl<string | undefined>(undefined, [Validators.required]),
    value: new FormControl<number | undefined>(undefined, [Validators.required]),
    entryGroups: new FormArray([]),
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
    private changeDetector: ChangeDetectorRef,
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

  get entryGroups() {
    return this.resultForm.get('entryGroups') as FormArray
  }

  getExamTypes(index: number) {
    return this.entryGroups.at(index).get('examTypes') as FormArray;
  }

  private createEntryGroup() {
    if (!this.examType) return;

    // Verifica se há grupos de exame
    if (this.examType?.examTypesGroups?.length) {
      this.resultForm.get("value")?.clearValidators();

      const resultExamType = !isEmpty(this.edittingResult)
      ? this.results?.at(this.edittingResult)
      : undefined;

      // Certifique-se de que o `entryGroups` existe no `resultForm`
      if (!this.resultForm.get('entryGroups')) {
        this.resultForm.addControl('entryGroups', new FormArray([]));
      }

      const entryGroups = this.resultForm.get('entryGroups') as FormArray;

      // Processa os grupos de exames
      this.examType.examTypesGroups.forEach(group => {
        const resultEntryGroup = resultExamType?.entryGroups?.find(e => (e.examType._id ?? e.examType) === group._id);

        const groupControl = new FormGroup({
          _id: new FormControl(resultEntryGroup?._id),
          examType: new FormControl(group._id),
          name: new FormControl({ value: group?.name, disabled: true }),
          examTypes: new FormArray([]),
        });
        const groupControlExamTypes = groupControl.get('examTypes') as FormArray;
        group.examTypes?.orderBy('name', 1)?.forEach(examType => {
          const value = resultEntryGroup?.entryGroups?.find(e => (e.examType._id ?? e.examType) === (examType._id ?? examType));

          const control = new FormGroup({
            _id: new FormControl(value?._id),
            examType: new FormControl(examType._id),
            name: new FormControl(examType.name),
            unit: new FormControl(examType.unit),
            value: new FormControl<number | undefined>(value?.value),
          });

          groupControlExamTypes.push(control);
        });
        entryGroups.push(groupControl);
      });

    } else {
      this.resultForm.get("value")?.addValidators(Validators.required);
    }
    this.changeDetector.detectChanges();
  }

  ngAfterViewInit(): void {
    this.resultForm.get("examType")?.valueChanges.subscribe(value => {
      this.examType = this.examTypes.find(e => e._id === value);
      const array = this.entryGroups;
      array?.clear();
      array?.reset([]);
      if (this.isResultModalShown && this.examType) {
        const resultIndex = this.results?.findIndex(r => r.examType._id === this.examType?._id);
        if (resultIndex > -1 && this.edittingResult != resultIndex) {
          this.messages = [{
            severity: 'warn',
            summary: this.langService.getMessage('pages.exams.form.results.warning.title'),
          }]
        } else {
          this.messages = [];
        }
        this.changeDetector.detectChanges();
        setTimeout(() => {
          this.createEntryGroup();
        }, 10);
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
          this.results = res.data.results?.orderBy('examType.name', 1) ?? [];
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
    const saveData = {
      ...this.form.value,
      results: this.results?.map(result => ({
        examType: result.examType._id,
        value: result.value,
        entryGroups: result.entryGroups?.map(group => ({
          ...group,
          examType: typeof group.examType === 'string' ? group.examType : group.examType._id,
          entryGroups: group.entryGroups?.map(subGroup => ({
            ...subGroup,
            examType: typeof subGroup.examType === 'string' ? subGroup.examType : subGroup.examType._id
          }))
        }))
      }))
    }
    this.loaderService.show();
    this.examsService.save(saveData).subscribe({
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
    this.resultForm.get("examType")?.setValue(undefined);
  }

  private updateResults(): void {
    if (isEmpty(this.edittingResult) || !this.results) return;

    // Obtém o resultado a ser editado
    const resultToUpdate = this.results.at(this.edittingResult);
    if (!resultToUpdate) return;
    // Atualiza os valores principais do resultado
    const examType = this.examTypes.find(e => e._id === this.resultForm.value.examType);

    const formValue = this.resultForm.value;
    resultToUpdate.examType = examType!;
    resultToUpdate.value = formValue.value!;

    // Atualiza os grupos de entradas, se existirem
    const entryGroups = this.resultForm.get('entryGroups') as FormArray;
    if (entryGroups && entryGroups.length) {
      resultToUpdate.entryGroups = [];

      // @ts-ignore
      entryGroups.controls.forEach((groupControl: FormGroup) => {
        const groupValue = groupControl.value;
        const entryGroup: IResultEntry = {
          _id: groupValue._id,
          examType: { _id: groupValue.examType } as IExamTypes,
          value: groupValue.value, // Valor default caso não seja usado neste nível
          entryGroups: [],
        };

        // Processa os subgrupos de tipos de exame
        const examTypesArray = groupControl.get('examTypes') as FormArray;
        if (examTypesArray && examTypesArray.length) {
          // @ts-ignore
          examTypesArray.controls.forEach((examTypeControl: FormGroup) => {
            const examTypeValue = examTypeControl.value;
            const subEntry: IResultEntry = {
              _id: examTypeValue._id,
              examType: { _id: examTypeValue.examType } as IExamTypes,
              value: examTypeValue.value,
            };

            entryGroup.entryGroups?.push(subEntry);
          });
        }

        resultToUpdate.entryGroups?.push(entryGroup);
      });
    }

    // Atualiza a lista de resultados com o resultado editado
    this.results[this.edittingResult] = resultToUpdate;
    this.results = this.results.orderBy('examType.name', 1);
  }

  saveResult() {
    this.isSubmittedResult = true;
    this.resultForm.updateValueAndValidity();
    if (!this.resultForm.valid) return;
    const examType = this.examTypes.find(e => e._id === this.resultForm.value.examType);
    if (!examType) return;
    if (this.edittingResult !== undefined) {
      this.updateResults();
      this.edittingResult = undefined;
    } else {
      const result: IResultEntry = {
        _id: this.resultForm.value._id!,
        examType,
        value: this.resultForm.value.value!,
        entryGroups: this.resultForm.get("entryGroups")?.value?.map((group: any) => {
          return {
            _id: group._id,
            examType: group.examType,
            value: group.value,
            entryGroups: group.examTypes?.map((examType: any) => ({
              examType: examType.examType,
              value: examType.value
            }))
          }
        })
      }
      this.results.push(result);
      this.results = this.results.orderBy('examType.name', 1);
    }
    this.isResultModalShown = false;
  }

  editResult(index: number) {
    this.resultModalTitle = 'pages.exams.form.results.edit';
    this.isSubmittedResult = false;
    this.edittingResult = index;
    const result = this.results[index];
    this.isResultModalShown = true;
    this.resultForm.reset({
      examType: result.examType._id,
      value: result.value
    })
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
