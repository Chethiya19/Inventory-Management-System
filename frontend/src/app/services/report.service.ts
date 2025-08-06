import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ReportService {
  private apiUrl = 'http://localhost:5000/api/reports';

  constructor(private http: HttpClient) {}

  getStockHistory(type: string, start: string, end: string) {
    return this.http.get<any[]>(`${this.apiUrl}/stock-history?type=${type}&start=${start}&end=${end}`);
  }
}
