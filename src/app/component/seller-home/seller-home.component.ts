import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../../product.model';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    const sellerData = localStorage.getItem('sellerData');
    if (sellerData) {
      const parsedData = JSON.parse(sellerData);
      this.productService.getProductsBySeller(parsedData.id).subscribe(
        (products: Product[]) => {
          this.products = products;
        },
        (error: any) => {
          console.error('Error loading products', error);
        }
      );
    }
  }

  editProduct(product: Product): void {
    this.router.navigate(['/seller-add-product'], { state: { product } });
  }

  deleteProduct(productId: string): void {
    this.productService.deleteProduct(productId).subscribe(
      () => {
        console.log('Product deleted successfully');
        this.loadProducts(); // Reload the products after deletion
      },
      (error: any) => {
        console.error('Error deleting product', error);
      }
    );
  }
}
