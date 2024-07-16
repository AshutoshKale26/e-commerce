import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { Product } from '../../../../product.model';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {
  id: string = '';
  name: string = '';
  price: number | null = null;
  color: string = '';
  category: string = '';
  description: string = '';
  image: string = '';
  quntity: number | any ;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    // Initialize component if needed
  }

  generateRandomId(): string {
    return 'id-' + Math.random().toString(36).substr(2, 5);
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const product: Product = {
        id: this.id ? this.id : this.generateRandomId(),
        name: this.name,
        price: this.price!, // Ensure price is a number
        color: this.color,
        category: this.category,
        description: this.description,
        image: this.image,
        quntity: this.quntity,
        sellerId: 'yourSellerId' // Replace with actual seller ID
      };

      if (this.id) {
        this.productService.updateProduct(product).subscribe(() => {
          console.log('Product updated successfully');
          this.router.navigate(['/seller-home']);
        });
      } else {
        this.productService.addProduct(product).subscribe(() => {
          console.log('Product added successfully');
          this.router.navigate(['/seller-home']);
        });
      }
    }
  }
}
