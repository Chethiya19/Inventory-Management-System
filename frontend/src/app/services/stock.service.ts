import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  stock_qty: number;
  color: string;
  // Add other fields if needed
}

export interface StockHistory {
  id: number;
  productId: number;
  type: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  Product: {
    id: number;
    name: string;
    color: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = 'http://localhost:5000/api/stock';

  constructor(private http: HttpClient) {}

  // Get all products with stock quantity
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/`);
  }

  // Add stock
  stockIn(productId: number, quantity: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/in`, { productId, quantity });
  }

  // Remove stock
  stockOut(productId: number, quantity: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/out`, { productId, quantity });
  }

  // Get products with low stock
  getLowStockAlerts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/alerts`);
  }

  // Get stock in history
  getStockInHistory(): Observable<StockHistory[]> {
    return this.http.get<StockHistory[]>(`${this.apiUrl}/history/in`);
  }

  // (Optional) Add if needed later: Get stock out history
  getStockOutHistory(): Observable<StockHistory[]> {
    return this.http.get<StockHistory[]>(`${this.apiUrl}/history/out`);
  }
}
