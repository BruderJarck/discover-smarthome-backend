import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductModel } from '../product';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: ProductModel[] = [];

  constructor(private http: HttpClient, private accService: AccountService) {}

  private productsURL = 'http://127.0.0.1:5000/products/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access'),
    }),
  };

  getProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.productsURL);
  }

  getProduct(id: number): Observable<ProductModel> {
    const url = this.productsURL + id;
    return this.http.get<ProductModel>(url);
  }

  updateProduct(product: ProductModel): Observable<any> {
    return this.http.put(this.productsURL, product);
  }

  newProduct(data: FormData) {
    console.log(data.get('name'), data.get('img'));
    return this.http.post(this.productsURL, data);
  }

  deleteProduct(product_id: number) {
    const url = this.productsURL + product_id;
    return this.http.delete<ProductModel>(url);
  }

  searchProducts(term: string): Observable<ProductModel[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<ProductModel[]>(`${this.productsURL}?search=${term}`);
  }
}
