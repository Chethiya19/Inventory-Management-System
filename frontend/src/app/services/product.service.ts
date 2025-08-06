import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'http://localhost:5000/api/products';

  constructor(private http: HttpClient) {}

  addProduct(product: FormData) {
    // No need to set content-type header; browser sets multipart/form-data automatically
    return this.http.post(`${this.apiUrl}/add`, product);
  }

  getProducts() {
    return this.http.get(this.apiUrl);
  }

  getProductById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateProduct(id: number, product: FormData) {
    // Same as addProduct, send FormData for update to support file upload
    return this.http.put(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
