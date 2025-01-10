import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LangService } from '@shared/services/lang.service';
import { getCssVariableValue } from '@shared/utils/common';
import { UIChart } from 'primeng/chart';


export type DataChartProps = {
  labels: any[];
  datasets: {
    label: string,
    data: any[],
    borderColor?: any,
    backgroundColor?: any,
    fill?: boolean,
    spanGaps: true // Habilita a interpolação (preenchendo os gaps com uma linha contínua);
    tension?: number
  }[]
}

@Component({
  selector: 'app-data-chart',
  templateUrl: './data-chart.component.html',
  styleUrls: ['./data-chart.component.scss']
})
export class DataChartComponent implements OnChanges {
  @Input('data') data!: DataChartProps;
  @Input('xAxisLabel') xAxisLabel: string = '';
  @Input('yAxisLabel') yAxisLabel: string = '';
  @Input('type') type: UIChart['type'] = 'line';
  @Input('xAxisTickFormatting') xAxisTickFormatting: any = [];
  @Input('yAxisFormatter') yAxisFormatter?: (...props: any) => any;
 
  legendTitle: string = 'Legend';

  options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        labels: {
          color: '#ffffff', // Cor da legenda no tema dark
        }
      },
      tooltip: {
        callbacks: {
          // Customização do texto do tooltip
          label: (context: any) => {
            const value = context.raw; // Valor do ponto do gráfico
            const name = context.dataset.label || ''; // Unidade, utilizando o label do dataset
            const unit = this.yAxisLabel || ''; // Unidade, utilizando o label do dataset
            if(this.yAxisFormatter) {
              return `${name}: ${this.yAxisFormatter(value)} ${unit}`
            }
            return `${name}: ${value} ${unit}`; // Formatação no formato [valor] [unit]
          }
        },
        bodyFont: {
          family: 'Poppins',
          size: 14
        },
        titleFont: {
          family: 'Poppins',
          size: 16
        }
      }
    },
    elements: {
      line: {
        borderWidth: 2 // Espessura da linha
      },
      point: {
        radius: 10 // Tamanho dos pontos
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
          color: getCssVariableValue('--font-color'),
          font: {
            family: 'Poppins',
            size: 12, // Tamanho da fonte dos rótulos,
            color: getCssVariableValue('--font-color'),
            weight: 'bold'
          }
        },
        ticks: {
          autoSkip: true, // Exibe todos os dias, se necessário
          maxRotation: 0,
          minRotation: 0,
          maxTicksLimit: 10,
          color: getCssVariableValue('--font-color'),
          font: {
            family: 'Poppins',
            size: 12, // Tamanho da fonte dos rótulos,
            color: getCssVariableValue('--font-color')
          }
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: this.yAxisLabel,
          color: getCssVariableValue('--font-color'),
          font: {
            family: 'Poppins',
            size: 12, // Tamanho da fonte dos rótulos,
            color: getCssVariableValue('--font-color'),
            weight: 'bold'
          }
        },
        ticks: {
          callback: (value: any) => {
            if(this.yAxisFormatter) {
              return this.yAxisFormatter(value);
            }
            return value;
          },
          color: getCssVariableValue('--font-color'),
          font: {
            family: 'Poppins',
            size: 12, // Tamanho da fonte dos rótulos,
            color: getCssVariableValue('--font-color'),
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

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['xAxisLabel']?.currentValue) {
      this.options.scales.x.title.text = this.xAxisLabel;
    }
    if(changes['yAxisLabel']?.currentValue) {
      this.options.scales.y.title.text = this.yAxisLabel;
    }
  }

}
