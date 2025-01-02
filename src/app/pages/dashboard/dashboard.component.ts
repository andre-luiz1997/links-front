import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DataChartProps } from '@shared/components/data-chart/data-chart.component';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { ExamTypesService } from '@shared/services/exam-types.service';
import { ReportService } from '@shared/services/report.service';
import { SharedModule } from '@shared/shared.module';
import { IExamTypes, IResultEntry } from '@shared/types';
import { getDateRange, isEmpty } from '@shared/utils/common';
import { DATE_MASK_BR } from '@shared/utils/constants';
import dayjs from 'dayjs';

type DashboardItem = IResultEntry & { date: Date }

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  data: DataChartProps = { labels: [], datasets: [] }
  start = new Date('2020-01-01')
  end = new Date()
  selectedExamType: IExamTypes | null = null
  examTypes: IExamTypes[] = []
  selectedItems: IExamTypes[] = []

  items: DashboardItem[] = []

  isDashboardConfigurationPanelVisible = false
  configurationForm = new FormGroup({})

  constructor(
    private reportService: ReportService,
    private examTypesService: ExamTypesService
  ) { }

  saveConfiguration() {

  }

  // Método para reordenar itens na seção
  onItemDrop(event: CdkDragDrop<DashboardItem[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }


  formatDate(value: Date): string {
    return dayjs(value).format(DATE_MASK_BR)
  }

  selectExamType($event: any) {
    if(this.selectedExamType) this.items.push({
      examType: this.selectedExamType,
      date: new Date(),
      value: 0
    })
      this.selectedExamType = null
  }

  ngAfterViewInit(): void {
    this.examTypesService.getAll().subscribe({
      next: (res) => {
        this.examTypes = res.data.records.orderBy('name', 1)
        this.items = [
          {
            examType: this.examTypes[0],
            value: 10,
            date: new Date('2021-01-01')
          },
          {
            examType: this.examTypes[1],
            value: 19.9,
            date: new Date('2022-10-21')
          },
          {
            examType: this.examTypes[2],
            value: 19.9,
            date: new Date('2022-10-21')
          },
          {
            examType: this.examTypes[3],
            value: 19.9,
            date: new Date('2022-10-21')
          },
          {
            examType: this.examTypes[4],
            value: 19.9,
            date: new Date('2022-10-21')
          },
          {
            examType: this.examTypes[5],
            value: 19.9,
            date: new Date('2022-10-21')
          }
        ]
      }
    })

    this.reportService.getExamTypesReport(['6765bc1f6dfbc5d0f48390f0'], { start: this.start, end: this.end }).subscribe({
      next: (res) => {
        this.data = {
          labels: getDateRange(this.start, this.end, 'days').map((date) => (dayjs(date).format(DATE_MASK_BR))),
          datasets: res.data.map((item) => {
            return {
              label: item.examTypeId,
              tension: .4,
              data: item.values?.map((value) => value.values?.value ?? null),
              spanGaps: true, // Habilita a interpolação (preenchendo os gaps com uma linha contínua)
            }
          })
        }
        console.log(this.data)
      },
      error: (error) => {

      }
    })
  }
}
