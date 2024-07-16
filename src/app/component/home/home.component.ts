import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import {  Router } from '@angular/router';
import { Product } from '../../../../product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {



  

  popularProducts: any[] = [];
  specialOffers: any[] = [];
  categories: any[] = [];

  constructor(private productService: ProductService ,private router:Router , private cartService : CartService ) { }


  ngOnInit(): void {

    this.productService.getPopularProducts().subscribe((data: any[]) => {
      this.popularProducts = data;
    });

    this.productService.getSpecialOffers().subscribe((data: any[]) => {
      this.specialOffers = data;
    });

    this.productService.getCategories().subscribe((data: any[]) => {
      this.categories = data;
    });
    
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product,1,product.sellerId);
  }

  addToWish(product: Product){
    this.cartService.addToWishList(product);
  }

  viewDetails(product: Product) {
    this.router.navigate(['/product-details', product.id]);
  }

  onSearch(searchTerm: string) {
    this.router.navigate([`search/${searchTerm}`]);
  }



}
