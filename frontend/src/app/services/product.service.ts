import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'http://localhost:5000/api/products';

  constructor(private http: HttpClient) {}

  addProduct(product: FormData) {
    return this.http.post(`${this.apiUrl}/add`, product, { withCredentials: true });
  }

  getProducts() {
    return this.http.get(this.apiUrl, { withCredentials: true });
  }

  getProductById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  updateProduct(id: number, product: FormData) {
    return this.http.put(`${this.apiUrl}/${id}`, product, { withCredentials: true });
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
