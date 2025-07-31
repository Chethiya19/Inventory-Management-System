import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@Component({
  selector: 'app-edit-product',
  standalone: true,                  // <-- standalone component flag
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productForm!: FormGroup;
  productId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    // Initialize the form
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      storage: ['', Validators.required],
      color: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      stock_qty: ['', [Validators.required, Validators.min(0)]]
    });

    // Fetch product data and patch the form
    this.productService.getProductById(this.productId).subscribe({
      next: (product) => this.productForm.patchValue(product),
      error: () => alert('Error loading product data')
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.productService.updateProduct(this.productId, this.productForm.value).subscribe({
        next: () => {
          alert('✅ Product updated successfully!');
          this.router.navigate(['/product-list']);
        },
        error: () => alert('❌ Failed to update product')
      });
    }
  }
}
