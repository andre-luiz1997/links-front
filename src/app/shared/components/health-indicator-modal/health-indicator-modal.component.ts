import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HealthIndicatorsService } from '@shared/services/health-indicators.service';
import { LangService } from '@shared/services/lang.service';
import { LoaderService } from '@shared/services/loader.service';
import { ToastService } from '@shared/services/toast.service';
import { DefaultPaginatedRequest, HealthIndicatorEnum, IHealthIndicators } from '@shared/types';
import { isEmpty } from '@shared/utils/common';
import { CALENDAR_DATE_FORMAT_BR, DATE_MASK_BR } from '@shared/utils/constants';
import { FORMATTERS, UNFORMATTERS } from '@shared/utils/formatters';

@Component({
  selector: 'app-health-indicator-modal',
  templateUrl: './health-indicator-modal.component.html',
  styleUrl: './health-indicator-modal.component.scss'
})
export class HealthIndicatorModalComponent {

  isIndicatorModalOpen = false;
  indicator?: HealthIndicatorEnum;
  isSubmitted = false

  DATE_MASK_BR = DATE_MASK_BR
  CALENDAR_DATE_FORMAT_BR = CALENDAR_DATE_FORMAT_BR

  isLoading = false;
  totalRecords = 0;
  indicators: IHealthIndicators[] = [];

  @ViewChild('valueInput') valueInput!: ElementRef;

  constructor(
    private loaderService: LoaderService,
    private toastService: ToastService,
    private langService: LangService,
    private healthIndicatorsService: HealthIndicatorsService,
  ) { }

  form = new FormGroup({
    slug: new FormControl<HealthIndicatorEnum | undefined>(undefined, [Validators.required]),
    value: new FormControl<any>(undefined, [Validators.required]),
    date: new FormControl<Date>(new Date(), [Validators.required]),
  })

  fetchIndicators() {
    if (!this.indicator) return;
    this.isLoading = true;
    const props: DefaultPaginatedRequest = {
      skip: 0,
      sortBy: 'date',
      sortOrder: -1,
      filters: [{
        field: 'slug',
        operator: 'LIKE',
        value: this.indicator
      }]
    }
    this.healthIndicatorsService.getAll(props).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.indicators = res.data?.records ?? [];
      },
      error: (err) => { },
    })
  }

  open(indicator: HealthIndicatorEnum) {
    this.indicator = indicator;
    this.form.reset({
      slug: indicator,
      value: undefined,
      date: new Date()
    })
    this.fetchIndicators();
    this.isIndicatorModalOpen = true;
  }

  focus() {
    setTimeout(() => {
      this.valueInput.nativeElement.focus();
    }, 100);
  }

  close() {
    this.isIndicatorModalOpen = false
    this.isSubmitted = false
  }

  getFormattedValue(item: IHealthIndicators) {
    return !isEmpty(item.value) ? FORMATTERS[item.slug](item.value) : item.value;
  }

  save() {
    this.isSubmitted = true
    this.form.updateValueAndValidity()
    if (!this.form.valid || !this.indicator) return;
    this.loaderService.show();
    const values = this.form.value;
    this.healthIndicatorsService.save({ ...values, value: UNFORMATTERS[this.indicator](values.value) }).subscribe({
      next: (res) => {
        this.form.reset({
          slug: values.slug,
          value: undefined,
          date: new Date()
        });
        if (res.data) {
          this.indicators.unshift(res.data)
          this.indicators = [...this.indicators];
        }
        this.loaderService.hide();
        this.toastService.show({
          severity: 'success',
          description: this.langService.getMessage('success_messages.record_saved_successfully')
        });
        this.isSubmitted = false;
      },
      error: (err) => {
        const description = this.langService.getMessage(err?.error?.message) ?? this.langService.getMessage('error_messages.error_occurred');
        this.loaderService.hide();
        this.toastService.show({
          severity: 'error',
          description
        });
      },
    })
  }

  getAll(event?: any) {
    this.isLoading = true;
    const props: DefaultPaginatedRequest = {
      skip: event?.first,
      limit: event?.rows,
      sortBy: event?.sortField,
      sortOrder: event?.sortOrder ?? -1,
      globalFilter: event?.filters?.global?.value
    }
    props.filters ??= []
    if (props.globalFilter) {
      props.filters.push({
        field: 'name',
        operator: '%%',
        value: props.globalFilter
      })
    }
    this.healthIndicatorsService.getAll(props).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.data) {
          this.indicators = response.data.records;
          this.totalRecords = response.data.totalRecords ?? 0;
        }
      },
      error: (error) => {
        this.isLoading = false;
      }
    });
  }
}
