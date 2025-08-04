import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { BrandService, Brand } from '../../../services/brand.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productForm!: FormGroup;
  productId!: number;
  selectedImage: File | null = null;
  currentImage: string | null = null;
  brands: Brand[] = [];
  storageOptions: string[] = ['32GB', '64GB', '128GB', '256GB', '512GB', '1TB'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private brandService: BrandService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      storage: ['', Validators.required],
      color: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock_qty: [0, [Validators.required, Validators.min(0)]]
    });

    this.loadBrands();
    this.loadProduct();
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

  loadProduct() {
    this.productService.getProductById(this.productId).subscribe({
      next: (product: any) => {
        this.productForm.patchValue(product);
        if (product && product.image) {
          this.currentImage = `http://localhost:3000/uploads/products/${product.image}`;
        } else {
          this.currentImage = null;
        }
      },
      error: () => alert('Error loading product data')
    });
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('name', this.productForm.value.name);
      formData.append('brand', this.productForm.value.brand);
      formData.append('model', this.productForm.value.model);
      formData.append('storage', this.productForm.value.storage);
      formData.append('color', this.productForm.value.color);
      formData.append('price', this.productForm.value.price.toString());
      formData.append('stock_qty', this.productForm.value.stock_qty.toString());

      if (this.selectedImage) {
        formData.append('image', this.selectedImage);
      }

      this.productService.updateProduct(this.productId, formData).subscribe({
        next: () => {
          alert('✅ Product updated successfully!');
          this.router.navigate(['/product-list']);
        },
        error: () => alert('❌ Failed to update product')
      });
    }
  }
}
