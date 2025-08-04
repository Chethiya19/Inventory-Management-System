import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockService, Product, StockHistory } from '../../../services/stock.service';

@Component({
  selector: 'app-stock-out',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stock-out.component.html',
  styleUrl: './stock-out.component.css'
})
export class StockOutComponent implements OnInit {
  products: Product[] = [];
  stockOutHistory: StockHistory[] = [];
  selectedProductId?: number;
  quantity: number = 0;
  message = '';
  error = '';

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadStockOutHistory();
  }

  loadProducts() {
    this.stockService.getAllProducts().subscribe({
      next: products => this.products = products,
      error: () => this.error = 'Failed to load products.'
    });
  }

  loadStockOutHistory() {
    this.stockService.getStockOutHistory().subscribe({
      next: history => this.stockOutHistory = history,
      error: () => this.error = 'Failed to load stock out history.'
    });
  }

  onRemoveStock() {
    this.message = '';
    this.error = '';

    if (!this.selectedProductId || this.quantity <= 0) {
      this.error = 'Please select a product and enter a valid quantity.';
      return;
    }

    this.stockService.stockOut(this.selectedProductId, this.quantity).subscribe({
      next: res => {
        this.message = res.message;
        this.loadProducts();
        this.loadStockOutHistory();
        this.quantity = 0;
      },
      error: err => this.error = err.error?.error || 'Failed to remove stock.'
    });
  }
}
