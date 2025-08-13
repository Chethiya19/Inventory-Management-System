import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BrandStock {
  brand: string;
  total_stock: string;
}

export interface ProductStock {
  name: string;
  stock_qty: number;
}

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private baseUrl = 'http://localhost:5000/api/charts';

  constructor(private http: HttpClient) {}

  getBrandStock(): Observable<BrandStock[]> {
    return this.http.get<BrandStock[]>(`${this.baseUrl}/brand-stock`, { withCredentials: true });
  }

  getProductStock(): Observable<ProductStock[]> {
    return this.http.get<ProductStock[]>(`${this.baseUrl}/product-stock`, { withCredentials: true });
  }
}
