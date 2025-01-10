import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { DefaultPaginatedRequest, HealthIndicatorEnum, IHealthIndicators } from '@shared/types';
import { HealthIndicatorModalComponent } from '../health-indicator-modal/health-indicator-modal.component';
import { DataChartProps } from '../data-chart/data-chart.component';
import { HealthIndicatorsService } from '@shared/services/health-indicators.service';
import dayjs from 'dayjs';
import { getDateRange } from '@shared/utils/common';
import { DATE_TIME_MASK_BR, TIME_MASK } from '@shared/utils/constants';
import { LangService } from '@shared/services/lang.service';
import { FORMATTERS } from '@shared/utils/formatters';

@Component({
  selector: 'app-health-indicator-card',
  templateUrl: './health-indicator-card.component.html',
  styleUrl: './health-indicator-card.component.scss'
})
export class HealthIndicatorCardComponent implements OnChanges {
  @Input() indicator!: HealthIndicatorEnum;
  @Input() period!: [number, dayjs.ManipulateType];

  data: DataChartProps = { labels: [], datasets: [] }

  icon?: {
    name: string;
    color: string;
    background?: string;
  };

  formatter?: (...props: any) => any;

  @ViewChild('healthIndicatorModal') healthIndicatorModal!: HealthIndicatorModalComponent;


  constructor(
    private healthIndicatorsService: HealthIndicatorsService,
    private langService: LangService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['indicator']?.currentValue) {
      this.getIndicatorParams();
    }
    if (changes['period']?.currentValue) {
      this.fetchIndicator();
    }
  }

  fetchIndicator() {
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
    props.filters ??= []
    if (props.globalFilter) {
      props.filters.push({
        field: 'name',
        operator: '%%',
        value: props.globalFilter
      })
    }
    const startDate = dayjs().subtract(this.period[0], this.period[1]).startOf('day').toDate();
    const endDate = dayjs().endOf('day').toDate();
    props.filters.push({
      field: 'date',
      operator: 'BETWEEN',
      value: [startDate, endDate]
    })

    const dateRange = getDateRange(startDate, endDate, this.period[1]);
    this.healthIndicatorsService.getAll(props).subscribe({
      next: (res) => {
        if (res.data?.records?.length) {
          this.data = {
            labels: dateRange.map((date) => { return ['minutes', 'hours'].includes(this.period[1]) ? dayjs(date).format(TIME_MASK) : [dayjs(date).locale('pt-br').format('DD MMM'), dayjs(date).locale('pt-br').format('YYYY')] }),
            datasets: [
              {
                label: this.langService.getMessage('pages.health_indicators.enum.' + this.indicator + '.title'),
                tension: .4,
                data: dateRange.map(date => {
                  const record = res.data.records.find((record) => dayjs(record.date).isSame(date, ['minutes', 'hours'].includes(this.period[1]) ? this.period[1] : 'day'));
                  return record?.value ?? null;
                }),
                spanGaps: true,
                borderColor: this.icon?.color,
                backgroundColor: this.icon?.color,
              }
            ]
          }
        }
      }
    })
  }

  getIndicatorParams() {
    switch (this.indicator) {
      case HealthIndicatorEnum.WEIGHT:
        this.icon = {
          name: 'phosphorBarbellFill',
          color: '#0096c7',
        };
        this.formatter = FORMATTERS[HealthIndicatorEnum.WEIGHT];
        break;
      case HealthIndicatorEnum.BLOOD_PRESSURE:
        this.icon = {
          name: 'phosphorDropFill',
          color: '#c1121f',
        };
        this.formatter = FORMATTERS[HealthIndicatorEnum.BLOOD_PRESSURE];
        break;
      case HealthIndicatorEnum.CALORIES:
        this.icon = {
          name: 'phosphorFireFill',
          color: '#f77f00',
          background: '#fcbf49',
        };
        break;
      case HealthIndicatorEnum.SLEEPING_HOURS:
        this.icon = {
          name: 'phosphorMoonStarsFill',
          color: '#8338ec',
          background: '#8338ec',
        };
        this.formatter = FORMATTERS[HealthIndicatorEnum.SLEEPING_HOURS];
        break;
    }
  }

  openIndicatorModal() {
    this.healthIndicatorModal.open(this.indicator);
  }

  

}
