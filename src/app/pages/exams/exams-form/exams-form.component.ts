import { AfterViewInit, Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ExamTypesService } from '@shared/services/exam-types.service';
import { LabsService } from '@shared/services/labs.service';
import { LangService } from '@shared/services/lang.service';
import { IExamTypes, ILabs, IResultEntry } from '@shared/types';
import { CALENDAR_DATE_FORMAT_BR, CURRENCY_MASK, DATE_MASK_BR } from '@shared/utils/constants';
import { PrimeNGConfig } from 'primeng/api';

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

  labs: ILabs[] = [];
  examTypes: IExamTypes[] = [];
  examType?: IExamTypes;
  dateFormat = CALENDAR_DATE_FORMAT_BR;
  DATE_MASK_BR = DATE_MASK_BR;
  CURRENCY_MASK = CURRENCY_MASK;
  isSubmitted = false;
  isSubmittedResult = false;
  isResultModalShown = false;

  resultModalTitle: 'pages.exams.form.add_result' | 'pages.exams.form.edit_result' = 'pages.exams.form.add_result';

  constructor(
    private langService: LangService,
    private labsService: LabsService,
    private primeNGConfig: PrimeNGConfig,
    private examTypesService: ExamTypesService
  ) {
    const lang = this.langService.getTranslation();
    this.primeNGConfig.setTranslation(lang.calendar_inputs);
    this.fetchLabs();
    this.fetchExamTypes();
  }

  ngAfterViewInit(): void {
    this.resultForm.get("examType")?.valueChanges.subscribe(value => {
      this.examType = this.examTypes.find(e => e._id === value);
    })
  }

  fetchLabs() {
    this.labsService.getAll().subscribe(res => {
      this.labs = res.data.records.orderBy('name');
    });
  }

  fetchExamTypes() {
    this.examTypesService.getAll().subscribe(res => {
      this.examTypes = res.data.records.orderBy('name');
      this.results = [
        {
          examType: this.examTypes[0],
          value: 10,
          material: 'Sangue',
          method: 'Contagem Automatizada por Citometria de Fluxo',
        },
        {
          examType: this.examTypes[1],
          value: 20,
          material: 'Sangue',
          method: 'Contagem Automatizada por Citometria de Fluxo',
        },
        {
          examType: this.examTypes[2],
          value: 30,
          material: 'Sangue',
          method: 'Contagem Automatizada por Citometria de Fluxo',
        }
      ]
    });
  }

  openResultModal() {
    this.isResultModalShown = true;
  }

  saveResult() {
    this.isSubmittedResult = true;
    this.resultForm.updateValueAndValidity();
    if(!this.resultForm.valid) return;
    const examType = this.examTypes.find(e => e._id === this.resultForm.value.examType);
    if(!examType) return;
    const result: IResultEntry = {
      examType,
      value: this.resultForm.value.value!,
    };
    this.results.push(result);
    this.isResultModalShown = false;
  }

  closeResultModal() {
    this.resultForm.reset();
    this.examType = undefined;
  }
}
