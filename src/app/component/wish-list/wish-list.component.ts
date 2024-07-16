import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
  wishList: Product[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadWishList();
  }

  loadWishList() {
    this.wishList = this.cartService.getWishList();
  }

  removeFromWishList(productId: string) {
    this.cartService.removeFromWishList(productId);
    this.loadWishList();
  }
}