// File: src/app/services/brand.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Brand {
  brandID?: number;
  brandName: string;
}

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private baseUrl = 'http://localhost:3000/api/brands';

  constructor(private http: HttpClient) {}

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.baseUrl);
  }

  addBrand(brand: Brand): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, brand);
  }

  updateBrand(id: number, brand: Brand): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, brand);
  }

  deleteBrand(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
