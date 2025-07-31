import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  searchText: string = '';

  constructor(
    private productService: ProductService,
    private router: Router                              // ✅ Inject Router
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data: any) => this.products = data,
      error: () => alert('Failed to load products')
    });
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        alert('Product deleted');
        this.loadProducts();
      });
    }
  }

  filteredProducts() {
    if (!this.searchText) {
      return this.products;
    }

    const lowerSearch = this.searchText.toLowerCase();
    return this.products.filter(p =>
      p.name.toLowerCase().includes(lowerSearch) ||
      p.brand.toLowerCase().includes(lowerSearch) ||
      p.model.toLowerCase().includes(lowerSearch)
    );
  }

  // ✅ Navigates to the Add Product page
  goToAddProduct() {
    this.router.navigate(['/add-product']);
  }

  editProduct(id: number) {
    this.router.navigate(['/edit-product', id]);
  }
}
