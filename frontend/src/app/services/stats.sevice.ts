import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Counts {
  products: number;
  brands: number;
}

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private apiUrl = 'http://localhost:3000/api/stats/counts';

  constructor(private http: HttpClient) {}

  getCounts(): Observable<Counts> {
    return this.http.get<Counts>(this.apiUrl);
  }
}
