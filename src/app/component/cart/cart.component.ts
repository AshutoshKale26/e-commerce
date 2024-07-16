import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../../../product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

userId: string='';
cartItems: { product: Product, quantity: number,sellerId:string }[] = [];
totalQuantity: number = 0;
totalPrice: number = 0;

constructor(private cartService: CartService, private router: Router) {}

ngOnInit(): void {
  this.loadCartItems();
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
     if (userData && userData.id) {
       this.userId = userData.id;
     }
}

loadCartItems() {
  this.cartItems = this.cartService.getCart();
  this.totalQuantity = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  this.totalPrice = this.cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

increaseQuantity(item: { product: Product, quantity: number,sellerId:string }) {
  this.cartService.addToCart(item.product, 1,item.product.sellerId);
  this.loadCartItems();
}

// decreaseQuantity(item: { product: Product, quantity: number,sellerID:string }) {
//   if (item.quantity > 1) {
//     this.cartService.addToCart(item.product, -1,item.product.sellerId);
//   } else {
//     this.removeItem(this.cartItems.indexOf(item));
//   }
//   this.loadCartItems();
// }

removeItem(index: number) {
  this.cartService.removeFromCart(this.cartItems[index].product);
  this.loadCartItems();
}

proceedToShipping() {
  this.router.navigate(['/shipping']);
}
}
