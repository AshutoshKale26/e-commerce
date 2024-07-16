import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Order, OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { Product } from '../../../../product.model';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrl: './shipping.component.css'
})
export class ShippingComponent implements OnInit {


//  addressLane: string = '';
//   road: string = '';
//   city: string = '';
//   pincode: string = '';
//   contact: string = '';
//   altContact: string = '';
//   cartItems: any[] = [];
//   userId: string = '';

//   constructor(private router: Router, private orderService: OrderService) {
//     const navigation = this.router.getCurrentNavigation();
//     const state = navigation?.extras?.state as { cartItems: any[], userId: string };
//     if (state) {
//       this.cartItems = state.cartItems;
//       this.userId = state.userId;
//     }
//   }

//   ngOnInit(): void {
//     const shippingInfo = JSON.parse(localStorage.getItem('shippingInfo') || '{}');
//     if (shippingInfo) {
//       this.addressLane = shippingInfo.addressLane || '';
//       this.road = shippingInfo.road || '';
//       this.city = shippingInfo.city || '';
//       this.pincode = shippingInfo.pincode || '';
//       this.contact = shippingInfo.contact || '';
//       this.altContact = shippingInfo.altContact || '';
//     }
//   }

//   placeOrder() {
//     if (this.addressLane && this.road && this.city && this.pincode && this.contact) {
//       const shippingInfo = {
//         addressLane: this.addressLane,
//         road: this.road,
//         city: this.city,
//         pincode: this.pincode,
//         contact: this.contact,
//         altContact: this.altContact
//       };
//       localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));

//       this.orderService.placeOrder({
//         userId: this.userId,
//         cartItems: this.cartItems,
//         shippingInfo: shippingInfo,
//         id: '',
//         quantity: 0
//       }).subscribe(() => {
//         alert('Order placed successfully');
//         this.router.navigate(['/orders']);
//       }, error => {
//         console.error('Error placing order:', error);
//       });
//     } else {
//       alert('Please fill all required fields.');
//     }
//   }
// }

shippingInfo = {
  addressLane: '',
  road: '',
  city: '',
  pincode: '',
  contact: '',
  altContact: ''
};
userId: string = '';
sellerID:string ='';
cartItems: { product: Product, quantity: number }[] = [];

constructor(
  private router: Router,
  private orderService: OrderService,
  private cartService: CartService,
) {}

ngOnInit(): void {
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  if (userData && userData.id) {
    this.userId = userData.id;
  }
  this.cartItems = this.cartService.getCart();
  const storedShippingInfo = JSON.parse(localStorage.getItem('shippingInfo') || '{}');
  if (storedShippingInfo) {
    this.shippingInfo = storedShippingInfo;
  }
}

placeOrder() {
  if (this.shippingInfo.addressLane && this.shippingInfo.road && this.shippingInfo.city && this.shippingInfo.pincode && this.shippingInfo.contact) {
    localStorage.setItem('shippingInfo', JSON.stringify(this.shippingInfo));

    this.cartItems.forEach(item => {
      const order: Order = {
        id: '', // Let the server generate the ID
        sellerId:item.product.sellerId,
        userId: this.userId,
        product: item.product,
        quantity: item.quantity,
        shippingInfo: this.shippingInfo,
        createdAt: new Date()
      };

      this.orderService.placeOrder(order).subscribe(
        response => {
          console.log('Order placed successfully:', response);
        },
        error => {
          console.error('Error placing order:', error);
          alert('There was an error placing your order. Please try again.');
        }
      );
    });

    this.cartService.clearCart();
    this.router.navigate(['/orders']);
  } else {
    alert('Please fill in all required fields.');
  }
}
}