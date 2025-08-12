import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
} from 'ng-apexcharts';
import { ChartService, BrandStock } from '../../services/chart.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  public chartOptions: ChartOptions = {
    series: [{
      name: 'Total Stock',
      data: []
    }],
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        // endingShape: 'rounded'
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: []
    }
  };

  constructor(private chartService: ChartService) {}

  ngOnInit(): void {
    this.chartService.getBrandStock().subscribe({
      next: (data: BrandStock[]) => {
        const brands = data.map(item => item.brand);
        const stockData = data.map(item => Number(item.total_stock));
        this.chartOptions = {
          ...this.chartOptions,
          series: [{
            name: 'Total Stock',
            data: stockData
          }],
          xaxis: {
            categories: brands
          }
        };
      },
      error: (error) => {
        console.error('Error fetching brand stock data:', error);
      }
    });
  }
}
