import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataChartProps } from '@shared/components/data-chart/data-chart.component';
import { IndicatorReportComponent } from '@shared/components/indicator-report/indicator-report.component';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { ExamTypesService } from '@shared/services/exam-types.service';
import { LangService } from '@shared/services/lang.service';
import { LoaderService } from '@shared/services/loader.service';
import { ReportService } from '@shared/services/report.service';
import { ToastService } from '@shared/services/toast.service';
import { UserService } from '@shared/services/user.service';
import { SharedModule } from '@shared/shared.module';
import { HealthIndicatorEnum, IExamTypes, IResultEntry } from '@shared/types';
import { getDateRange, isEmpty } from '@shared/utils/common';
import { DATE_MASK_BR, SettingsEnum } from '@shared/utils/constants';
import dayjs from 'dayjs';

export type DashboardItem = IResultEntry & { date: Date }

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  health_indicators: HealthIndicatorEnum[] = [HealthIndicatorEnum.WEIGHT, HealthIndicatorEnum.BLOOD_PRESSURE, HealthIndicatorEnum.CALORIES]
  examTypes: IExamTypes[] = []
  filteredExamTypes: IExamTypes[] = []

  items: DashboardItem[] = []

  isIndicatorModalShown = false

  @ViewChild('indicatorReport') indicatorReport!: IndicatorReportComponent;

  isSubmittedIndicatorForm = false
  indicatorForm = new FormGroup({
    examType: new FormControl<string | null>(null, [Validators.required])
  })

  constructor(
    private examTypesService: ExamTypesService,
    private reportService: ReportService,
    private userService: UserService,
    private toastService: ToastService,
    private loaderService: LoaderService,
    private langService: LangService
  ) { }

  async saveConfiguration(key: SettingsEnum, value: any) {
    return new Promise((resolve, reject) => {
      this.userService.updateSetting({
        key,
        value
      }).then((res) => {
        resolve(res);
      }).catch((err) => {
        reject(err);
      })
    })
  }

  // Método para reordenar itens na seção
  onItemDrop(event: CdkDragDrop<DashboardItem[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.saveConfiguration(SettingsEnum.DASHBOARD_INDICATORS, this.items.map((item) => item.examType._id))
  }

  removeItem(index: number) {
    this.items.splice(index, 1)
    this.saveConfiguration(SettingsEnum.DASHBOARD_INDICATORS, this.items.map((item) => item.examType._id))
    this.setFilteredExamTypes()
  }


  formatDate(value: Date): string {
    return dayjs(value).format(DATE_MASK_BR)
  }

  closeIndicatorModal() {
    this.isIndicatorModalShown = false
    this.indicatorForm.reset()
  }

  addIndicator() {
    this.isSubmittedIndicatorForm = true
    this.indicatorForm.updateValueAndValidity()
    if (!this.indicatorForm.valid) return;
    this.loaderService.show()
    const items = this.items.map((item) => item.examType._id);
    items.push(this.indicatorForm.value.examType!)
    this.saveConfiguration(SettingsEnum.DASHBOARD_INDICATORS, items)
      .then(() => {
        this.fetchIndicators()
        this.isIndicatorModalShown = false
        this.isSubmittedIndicatorForm = false
        this.loaderService.hide()
      })
      .catch(() => {
        this.loaderService.hide()
        this.toastService.show({
          severity: 'error',
          title: this.langService.getMessage('error_messages.error_occurred')
        })
      })
  }

  setFilteredExamTypes() {
    this.filteredExamTypes = this.examTypes.filter(examType => {
      return this.items.find(item => item.examType._id === examType._id) === undefined
    })
  }

  fetchIndicators() {
    this.reportService.getDashboardIndicators().subscribe({
      next: (res) => {
        this.items = res.data
        this.setFilteredExamTypes()
      }

    });
  }

  onDashboardCardClick(item: DashboardItem) {
    this.indicatorReport.show(item.examType);
    
  }

  ngAfterViewInit(): void {
    this.examTypesService.getAll({
      filters: [{
        field: 'parentGroups',
        operator: 'IS NULL OR NOT EXISTS',
      }]
    }).subscribe({
      next: (res) => {
        this.examTypes = res.data.records.orderBy('name', 1)
        this.setFilteredExamTypes()
      },
      error: (err) => { }
    })
    this.fetchIndicators();
  }
}
