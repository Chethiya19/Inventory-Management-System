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
import { ChartService, ProductStock } from '../../../services/chart.service';

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
  selector: 'app-product-stock-chart',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './product-stock-chart.component.html',
  styleUrls: ['./product-stock-chart.component.css']
})
export class ProductStockChartComponent implements OnInit {
  public chartOptions: ChartOptions = {
    series: [{
      name: 'Stock Quantity',
      data: []
    }],
    chart: {
      type: 'bar',
      height: 400
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
      text: 'Product Stock Quantity',
      align: 'center'
    },
    tooltip: {
      enabled: true
    }
  };

  constructor(private chartService: ChartService) {}

  ngOnInit(): void {
    this.chartService.getProductStock().subscribe({
      next: (data: ProductStock[]) => {
        const productNames = data.map(item => item.name);
        const stockQty = data.map(item => item.stock_qty);

        this.chartOptions.series[0].data = stockQty;
        this.chartOptions.xaxis.categories = productNames;
      },
      error: (error) => {
        console.error('Error fetching product stock data:', error);
      }
    });
  }
}
