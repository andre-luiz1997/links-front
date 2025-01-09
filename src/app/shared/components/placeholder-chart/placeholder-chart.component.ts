import { Component } from '@angular/core';

@Component({
  selector: 'app-placeholder-chart',
  templateUrl: './placeholder-chart.component.html',
  styleUrl: './placeholder-chart.component.scss'
})
export class PlaceholderChartComponent {
  items = Array.from({ length: 10 }, (_, i) => ({i, height: Math.floor(Math.random() * 100) + 50}));
}
