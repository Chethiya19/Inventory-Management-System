import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexTitleSubtitle,
  ApexTooltip
} from 'ng-apexcharts';
import { ChartService, BrandStock } from '../../../services/chart.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-brand-stock-chart',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './brand-stock-chart.component.html',
  styleUrls: ['./brand-stock-chart.component.css']
})
export class BrandStockChartComponent implements OnInit {
  public chartOptions: ChartOptions = {
    series: [{
      name: 'Total Stock',
      data: []
    }],
    chart: {
      type: 'bar',
      height: 380
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
    },
    title: {
      text: 'Stock by Brand',
      align: 'center'
    },
    tooltip: {
      enabled: true
    }
  };

  constructor(private chartService: ChartService) {}

  ngOnInit(): void {
    this.chartService.getBrandStock().subscribe({
      next: (data: BrandStock[]) => {
        const brands = data.map(item => item.brand);
        const stockData = data.map(item => Number(item.total_stock));

        this.chartOptions.series[0].data = stockData;
        this.chartOptions.xaxis.categories = brands;
      },
      error: (error) => {
        console.error('Error fetching brand stock data:', error);
      }
    });
  }
}
