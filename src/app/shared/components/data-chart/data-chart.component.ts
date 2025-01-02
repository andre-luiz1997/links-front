import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LangService } from '@shared/services/lang.service';


export type DataChartProps = {
  labels: any[];
  datasets: {
    label: string,
    data: any[],
    borderColor?: any,
    fill?: boolean,
    spanGaps: true // Habilita a interpolação (preenchendo os gaps com uma linha contínua);
    tension?: number
  }[]
}

// export type DataChartProps = {
//   name: any;
//   series: {
//     name: any,
//     value: number | null | undefined
//   }[]
// } | {
//   name: any;
//   value: string;
// }

@Component({
  selector: 'app-data-chart',
  templateUrl: './data-chart.component.html',
  styleUrls: ['./data-chart.component.scss']
})
export class DataChartComponent {
  @Input('data') data!: DataChartProps;
  @Input('xAxisLabel') xAxisLabel: string = '';
  @Input('yAxisLabel') yAxisLabel: string = '';
  @Input('xAxisTickFormatting') xAxisTickFormatting: any = [];

  legendTitle: string = 'Legend';

  options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        labels: {
          color: '#ffffff', // Cor da legenda no tema dark
        }
      }
    },
    elements: {
      line: {
        borderWidth: 2 // Espessura da linha
      },
      point: {
        radius: 4 // Tamanho dos pontos
      }
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: this.xAxisLabel,
          color: '#ffffff'
        },
        ticks: {
          autoSkip: true, // Exibe todos os dias, se necessário
          maxRotation: 45,
          minRotation: 30,
          maxTicksLimit: 10,
          font: {
            family: 'Poppins',
            size: 12, // Tamanho da fonte dos rótulos,
            color: '#ffffff'
          }
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: this.yAxisLabel,
          color: '#ffffff'
        },
        ticks: {
          font: {
            family: 'Poppins',
            size: 12, // Tamanho da fonte dos rótulos,
            color: '#ffffff',
            opacity: 1
          }
        },
        suggestedMin: 0,
        beginAtZero: false,
      },
    }
  }

  constructor(
    private langService: LangService
  ) {
    this.legendTitle = this.langService.getMessage('legend');
  }

}
