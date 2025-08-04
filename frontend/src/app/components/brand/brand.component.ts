import { Component, OnInit } from '@angular/core';
import { BrandService, Brand } from '../../services/brand.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})

export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  newBrandName: string = '';
  editMode: boolean = false;
  editBrandId: number | null = null;
  errorMessage: string = '';

  constructor(private brandService: BrandService) { }

  ngOnInit(): void {
    this.loadBrands();
  }

  onInputChange() {
    this.errorMessage = '';
  }

  loadBrands(): void {
    this.brandService.getBrands().subscribe({
      next: (data) => this.brands = data,
      error: (err) => console.error(err)
    });
  }

  addBrand(): void {
    const name = this.newBrandName.trim();

    if (!name) {
      this.errorMessage = 'Brand name is required.';
      return;
    }

    const exists = this.brands.some(b => b.brandName.toLowerCase() === name.toLowerCase());

    if (exists) {
      this.errorMessage = 'Brand already exists.';
      return;
    }

    this.brandService.addBrand({ brandName: name }).subscribe({
      next: () => {
        this.newBrandName = '';
        this.errorMessage = '';
        this.loadBrands();
        alert('Brand added successfully!');
      },
      error: (err) => console.error(err)
    });
  }

  editBrand(brand: Brand): void {
    this.editMode = true;
    this.editBrandId = brand.brandID || null;
    this.newBrandName = brand.brandName;
    this.errorMessage = '';
  }

  updateBrand(): void {
    const name = this.newBrandName.trim();

    if (!name) {
      this.errorMessage = 'Brand name is required.';
      return;
    }

    const exists = this.brands.some(b =>
      b.brandName.toLowerCase() === name.toLowerCase() && b.brandID !== this.editBrandId
    );

    if (exists) {
      this.errorMessage = 'Brand already exists.';
      return;
    }

    if (this.editBrandId === null) return;

    this.brandService.updateBrand(this.editBrandId, { brandName: name }).subscribe({
      next: () => {
        this.editMode = false;
        this.newBrandName = '';
        this.editBrandId = null;
        this.errorMessage = '';
        this.loadBrands();
        alert('Brand updated successfully!');
      },
      error: (err) => console.error(err)
    });
  }

  deleteBrand(id: number | undefined): void {
    if (!id) return;
    if (confirm('Are you sure you want to delete this brand?')) {
      this.brandService.deleteBrand(id).subscribe({
        next: () => this.loadBrands(),
        error: (err) => console.error(err)
      });
    }
  }

  cancelEdit(): void {
    this.editMode = false;
    this.editBrandId = null;
    this.newBrandName = '';
    this.errorMessage = '';
  }
}
