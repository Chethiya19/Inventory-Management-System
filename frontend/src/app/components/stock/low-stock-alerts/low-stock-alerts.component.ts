import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockService, Product } from '../../../services/stock.service';

@Component({
  selector: 'app-low-stock-alerts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './low-stock-alerts.component.html',
  styleUrl: './low-stock-alerts.component.css'
})

export class LowStockAlertsComponent implements OnInit {
  lowStockProducts: Product[] = [];
  error = '';

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.loadLowStockProducts();
  }

  loadLowStockProducts() {
    this.stockService.getLowStockAlerts().subscribe({
      next: products => this.lowStockProducts = products,
      error: () => this.error = 'Failed to load low stock alerts.'
    });
  }
}