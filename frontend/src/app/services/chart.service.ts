import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BrandStock {
  brand: string;
  total_stock: string; // backend returns string, we convert later
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
}
