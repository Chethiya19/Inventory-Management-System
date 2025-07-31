import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Import Router
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-add-product',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  product = {
    name: '',
    brand: '',
    model: '',
    storage: '',
    color: '',
    price: 0,
    stock_qty: 0
  };

  constructor(
    private productService: ProductService,
    private router: Router  // Inject Router
  ) {}

  onSubmit() {
    this.productService.addProduct(this.product).subscribe({
      next: () => {
        alert('Product added successfully!');
        this.router.navigate(['/product']); // Navigate to /product
        // Reset form if you want
        this.product = { name: '', brand: '', model: '', storage: '', color: '', price: 0, stock_qty: 0 };
      },
      error: () => alert('Failed to add product')
    });
  }
}
