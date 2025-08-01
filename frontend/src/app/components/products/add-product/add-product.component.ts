import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  selectedImage: File | null = null;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('brand', this.product.brand);
    formData.append('model', this.product.model);
    formData.append('storage', this.product.storage);
    formData.append('color', this.product.color);
    formData.append('price', this.product.price.toString());
    formData.append('stock_qty', this.product.stock_qty.toString());

    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    this.productService.addProduct(formData).subscribe({
      next: () => {
        alert('Product added successfully!');
        this.router.navigate(['/product']);
        this.product = {
          name: '',
          brand: '',
          model: '',
          storage: '',
          color: '',
          price: 0,
          stock_qty: 0
        };
        this.selectedImage = null;
      },
      error: () => alert('Failed to add product')
    });
  }
}
