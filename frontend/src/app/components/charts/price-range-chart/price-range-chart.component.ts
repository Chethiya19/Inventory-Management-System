import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartService, PriceRangeData, Product } from '../../../services/chart.service';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexTitleSubtitle } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-price-range-chart',
  standalone: true,
  imports: [CommonModule, FormsModule, NgApexchartsModule],
  templateUrl: './price-range-chart.component.html',
  styleUrls: ['./price-range-chart.component.css']
})
export class PriceRangeChartComponent implements OnInit {

  // ✅ Fully initialized with correct types
  chartOptions: ChartOptions = {
    series: [{ name: 'Products', data: [] }],
    chart: { type: 'bar', height: 390 },
    xaxis: { categories: [] },
    dataLabels: { enabled: true },
    title: { text: '' }
  };

  selectedMin = 0;
  selectedMax = 500000;
  products: Product[] = [];

  constructor(private chartService: ChartService) {}

  ngOnInit(): void {
    this.loadPriceRanges();
  }

  loadPriceRanges(): void {
  this.chartService.getPriceRanges().subscribe((data: PriceRangeData[]) => {
    this.chartOptions.series = [{ name: 'Products', data: data.map(d => d.count) }];
    this.chartOptions.xaxis = {
      categories: data.map(d => d.range),
      title: {
        text: 'LKR Price',
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#333'
        }
      }
    };
  });
}

  filterByRange(): void {
    this.chartService.getProductsInPriceRange(this.selectedMin, this.selectedMax)
      .subscribe((products: Product[]) => {
        this.products = products;
      });
  }
}
