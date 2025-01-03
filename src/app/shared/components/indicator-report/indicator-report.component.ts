import { Component } from '@angular/core';
import { ReportService } from '@shared/services/report.service';
import { IExamTypes } from '@shared/types';
import { DataChartProps } from '../data-chart/data-chart.component';
import { getCssVariableValue, getDateRange } from '@shared/utils/common';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { DashboardItem } from 'src/app/pages/dashboard/dashboard.component';
dayjs.extend(relativeTime);
dayjs.extend(timezone);
dayjs.extend(utc);

@Component({
  selector: 'app-indicator-report',
  templateUrl: './indicator-report.component.html',
  styleUrl: './indicator-report.component.scss'
})
export class IndicatorReportComponent {
  isIndicatorModalShown = false
  isLoadingIndicators = false

  data: DataChartProps = { labels: [], datasets: [] }
  items: any[] = []
  start = new Date('2020-01-01')
  end = new Date()

  indicator?: IExamTypes;

  constructor(
    private reportService: ReportService
  ) { }


  show(examType: IExamTypes) {
    if (!examType._id) return;
    this.indicator = examType
    this.isIndicatorModalShown = true
    this.isLoadingIndicators = true
    this.reportService.getExamTypesReport([examType._id], { start: this.start, end: this.end }).subscribe({
      next: (res) => {
        console.log("🚀 ~ IndicatorReportComponent ~ this.reportService.getExamTypesReport ~ res:", res)
        this.isLoadingIndicators = false
        this.items = []
        this.data = {
          labels: getDateRange(this.start, this.end, 'days').map((date) => { return [dayjs(date).locale('pt-br').format('DD MMM'), dayjs(date).locale('pt-br').format('YYYY')] }),
          datasets: res.data.map((item) => {
            return {
              label: examType.name,
              tension: .4,
              data: item.values?.map((value) => {
                if(value.values?.value) {
                  this.items.push({
                    date: dayjs(value.date).toDate(),
                    value: value.values?.value
                  })
                }
                return value.values?.value ?? null
              }),
              spanGaps: true, // Habilita a interpolação (preenchendo os gaps com uma linha contínua)
              borderColor: getCssVariableValue('--main-color'),
              backgroundColor: getCssVariableValue('--main-color'),
            }
          })
        }
        this.items = this.items.orderBy('date', -1)
      },
      error: (error) => {
        this.isLoadingIndicators = false

      }
    })
  }

  close() {
    this.isIndicatorModalShown = false
    this.isLoadingIndicators = false
  }
}
