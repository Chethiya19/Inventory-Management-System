import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockService, Product, StockHistory } from '../../../services/stock.service';

@Component({
  selector: 'app-stock-in',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stock-in.component.html',
  styleUrl: './stock-in.component.css'
})
export class StockInComponent implements OnInit {
  products: Product[] = [];
  stockInHistory: StockHistory[] = [];
  selectedProductId?: number;
  quantity: number = 0;
  message = '';
  error = '';

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadStockInHistory();
  }

  loadProducts() {
    this.stockService.getAllProducts().subscribe({
      next: products => this.products = products,
      error: () => this.error = 'Failed to load products.'
    });
  }

  loadStockInHistory() {
    this.stockService.getStockInHistory().subscribe({
      next: history => this.stockInHistory = history,
      error: () => this.error = 'Failed to load stock in history.'
    });
  }

  onAddStock() {
    this.message = '';
    this.error = '';

    if (!this.selectedProductId || this.quantity <= 0) {
      this.error = 'Please select a product and enter a valid quantity.';
      return;
    }

    this.stockService.stockIn(this.selectedProductId, this.quantity).subscribe({
      next: res => {
        this.message = res.message;
        this.loadProducts();
        this.loadStockInHistory();
        this.quantity = 0;
      },
      error: err => this.error = err.error?.error || 'Failed to add stock.'
    });
  }
}
