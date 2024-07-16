import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../../product.model';

export interface CartItem {
  product: Product;
  quantity: number;
  sellerId:string;
}




@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartItem[] = [];
  private wishList: Product[] = [];
  private cartItemCount = new BehaviorSubject<number>(0);
  private totalPrice = new BehaviorSubject<number>(0);

  cartItemCount$ = this.cartItemCount.asObservable();
  totalPrice$ = this.totalPrice.asObservable();
  private cartItem: { product: Product, quantity: number }[] = [];

  constructor() {
    this.loadCartFromLocalStorage();
    this.loadWishListFromLocalStorage();
    this.updateCartItemCount();
    this.updateTotalPrice();
  }

  private loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    }
  }

  private saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  private updateCartItemCount() {
    const count = this.cart.reduce((total, item) => total + item.quantity, 0);
    this.cartItemCount.next(count);
  }

  private updateTotalPrice() {
    const price = this.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    this.totalPrice.next(price);
  }

  getCart(): CartItem[] {
    return this.cart;
  }

  addToCart(product: Product, p0: number,sellerId:string) {
    const existingItem = this.cart.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ product, quantity: p0,sellerId });
    }
    this.updateCartItemCount();
    this.updateTotalPrice();
    this.saveCartToLocalStorage();
  }

  removeFromCart(product: Product) {
    const existingItem = this.cart.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity--;
      if (existingItem.quantity === 0) {
        this.cart = this.cart.filter(item => item.product.id !== product.id);
      }
      this.updateCartItemCount();
      this.updateTotalPrice();
      this.saveCartToLocalStorage();
    }
  }

  clearCart() {
    this.cart = [];
    this.updateCartItemCount();
    this.updateTotalPrice();
    this.saveCartToLocalStorage();
  }

  isInCart(productId: string): boolean {
    return this.cartItem.some(item => item.product.id === productId);
  }
  

  

 

  private loadWishListFromLocalStorage() {
    const storedWishList = localStorage.getItem('wishList');
    if (storedWishList) {
      this.wishList = JSON.parse(storedWishList);
    }
  }

  private saveWishListToLocalStorage() {
    localStorage.setItem('wishList', JSON.stringify(this.wishList));
  }

  getWishList(): Product[] {
    return this.wishList;
  }

  addToWishList(product: Product) {
    if (!this.wishList.find(item => item.id === product.id)) {
      this.wishList.push(product);
      this.saveWishListToLocalStorage();
    }
  }

  removeFromWishList(productId: string) {
    this.wishList = this.wishList.filter(product => product.id !== productId);
    this.saveWishListToLocalStorage();
  }

  








  // buyProduct(product: Product, quantity: number) {
  //   const order: Order = {
  //     id: 'order-' + Math.random().toString(36).substr(2, 5),
  //     product,
  //     quantity,
  //     userId: '',
  //     addressLane: '',
  //     road: '',
  //     city: '',
  //     pincode: '',
  //     contact: '',
  //     altContact: '',
  //   };
  //   this.orders.push(order);
  //   this.saveOrderToLocalStorage()
  // }

  // private saveOrderToLocalStorage() {
  //   localStorage.setItem('order', JSON.stringify(this.orders));
  // }

  // getOrders(): Order[] {
  //   return this.orders;
  // }

}
