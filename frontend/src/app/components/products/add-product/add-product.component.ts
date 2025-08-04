import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { BrandService, Brand } from '../../../services/brand.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-add-product',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
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
  brands: Brand[] = [];
  storageOptions: string[] = ['32GB', '64GB', '128GB', '256GB', '512GB', '1TB'];


  constructor(
    private productService: ProductService,
    private router: Router,
    private brandService: BrandService
  ) {}

  ngOnInit() {
    this.loadBrands();
  }

  loadBrands() {
    this.brandService.getBrands().subscribe({
      next: (data) => {
        this.brands = data;
      },
      error: (err) => {
        console.error('Failed to load brands', err);
      }
    });
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
    }
  }

  onSubmit() {
    if (!this.product.brand) {
      alert('Please select a brand');
      return;
    }

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
