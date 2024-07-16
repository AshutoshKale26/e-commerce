import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/product';
  cartItemCount$: any;
  private wishList: Product[] = [];

  constructor(private http: HttpClient) {}

  addProduct(product: Product): Observable<Product> {
    console.log("Add Product Successfully", product);
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(product: Product): Observable<Product> {
    const url = `${this.apiUrl}/${product.id}`;
    return this.http.put<Product>(url, product);
  }

  getProductsBySeller(sellerId: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?sellerId=${sellerId}`);
  }

  getProductById(id: string | null): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }  
  
  deleteProduct(productId: string): Observable<void> {
    console.log("Delete Product Successfully", productId);
    return this.http.delete<void>(`${this.apiUrl}/${productId}`);
  }

  getPopularProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?_limit=4`);
  }

  getSpecialOffers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?type=special`);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/categories`);
  }

  // searchProducts(query: string): Observable<Product[]> {
  //   return this.http.get<Product[]>(`${this.apiUrl}?q=${query}`);
  // }

  searchProduct(query: string) {
    console.warn(query);
    
    return this.http.get<Product[]>(
      `http://localhost:3000/product?q=${query}&_limit=5`
    );
  }


  localAddToCart(data: Product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
  }





  

  

}
