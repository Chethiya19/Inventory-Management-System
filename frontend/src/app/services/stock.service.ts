import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  stock_qty: number;
  // Add other fields if needed
}

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = 'http://localhost:3000/api/stock';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/`);
  }

  stockIn(productId: number, quantity: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/in`, { productId, quantity });
  }

  stockOut(productId: number, quantity: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/out`, { productId, quantity });
  }

  getLowStockAlerts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/alerts`);
  }
}
