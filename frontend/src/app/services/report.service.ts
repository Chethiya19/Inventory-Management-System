import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReportService {
  private apiUrl = 'http://localhost:5000/api/reports';

  constructor(private http: HttpClient) {}

  getStockHistory(type: string, start: string, end: string): Observable<any[]> {
    const params = new HttpParams()
      .set('type', type)
      .set('start', start)
      .set('end', end);

    return this.http.get<any[]>(`${this.apiUrl}/stock-history`, { params, withCredentials: true });
  }

  downloadPDF(type: string, start: string, end: string): void {
    // For window.open, cookies are sent automatically by the browser, so no extra config needed here
    const url = `${this.apiUrl}/stock-history/pdf?type=${type}&start=${start}&end=${end}`;
    window.open(url, '_blank');
  }
}
