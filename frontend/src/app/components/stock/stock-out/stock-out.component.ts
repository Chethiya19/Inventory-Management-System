import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockService, Product } from '../../../services/stock.service';

@Component({
  selector: 'app-stock-out',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stock-out.component.html',
  styleUrl: './stock-out.component.css'
})

export class StockOutComponent implements OnInit {
  products: Product[] = [];
  selectedProductId?: number;
  quantity: number = 0;
  message = '';
  error = '';

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.stockService.getAllProducts().subscribe({
      next: products => this.products = products,
      error: () => this.error = 'Failed to load products.'
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
        this.quantity = 0;
      },
      error: err => this.error = err.error?.error || 'Failed to remove stock.'
    });
  }
}