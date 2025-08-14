import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BrandStock {
  brand: string;
  total_stock: string;
  logoUrl?: string; // Added logo URL for chart display
}

export interface ProductStock {
  name: string;
  stock_qty: number;
}

export interface PriceRangeData {
  range: string;
  count: number;
}

export interface Product {
  name: string;
  brand: string;
  model: string;
  storage: string;
  color: string;
  price: number;
  stock_qty: number;
}

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private baseUrl = 'http://localhost:5000/api/charts';

  constructor(private http: HttpClient) {}

  /**
   * Fetch brand stock data.
   * The backend should now return logoUrl for each brand.
   */
  getBrandStock(): Observable<BrandStock[]> {
    return this.http.get<BrandStock[]>(
      `${this.baseUrl}/brand-stock`, 
      { withCredentials: true }
    );
  }

  getProductStock(): Observable<ProductStock[]> {
    return this.http.get<ProductStock[]>(
      `${this.baseUrl}/product-stock`, 
      { withCredentials: true }
    );
  }

  getPriceRanges(): Observable<PriceRangeData[]> {
    return this.http.get<PriceRangeData[]>(
      `${this.baseUrl}/price-ranges`, 
      { withCredentials: true }
    );
  }

  getProductsInPriceRange(min: number, max: number): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.baseUrl}/price-range?min=${min}&max=${max}`, 
      { withCredentials: true }
    );
  }
}
