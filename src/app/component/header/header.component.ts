import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { filter } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../../product.model';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../../services/cart.service';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = true;
  userName: string | null = null;
  userType: string | null = null;
  currentRoute: string = '';
  searchResult:undefined|Product[];
  searchTerm: string = '';
cart: number|undefined;
cartItemCount: number = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private productService: ProductService,
    private cartService : CartService
  ) {}

  ngOnInit() {
    this.authService.loggedIn$.subscribe(loggedIn => this.isLoggedIn = loggedIn);
    this.authService.userName$.subscribe(name => this.userName = name);
    this.authService.userType$.subscribe(type => this.userType = type);

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.urlAfterRedirects;
      });

      this.cartService.cartItemCount$.subscribe(count => {
        this.cartItemCount = count;
      });
  }

  loadCartItemCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartItemCount = cart.reduce((total: number, item: any) => total + item.quantity, 0);
  }

  onSearch(searchTerm: string) {
    // console.warn(searchTerm)
  this.router.navigate([`/search/${searchTerm}`]);
  this.clearSuggestions()
  }

  onInputChange(searchTerm: string) {
    if (searchTerm.length > 0) {
      this.productService.searchProduct(searchTerm).subscribe(
        (results: any[]) => {
          this.searchResult = results;
        },
        error => {
          console.error('Error fetching search results', error);
        }
      );
    } else {
      this.searchResult = [];
    }
  }

  clearSuggestions() {
    setTimeout(() => this.searchResult = [], 300); // Clear suggestions after a delay to allow clicking
  }

  hideSearch(){
    this.searchResult=undefined
  }

  selectProduct(product: Product) {
    this.searchTerm = product.name;
    this.searchResult = [];
    this.router.navigate(['/product-details', product.id]);
  }

  
}
