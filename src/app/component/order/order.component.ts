import { Component, OnInit } from '@angular/core';
import { Order, OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {

orders: Order[] = [];
editingOrder: Order | null = null;
userId: string = '';
userType: string | null = null;

constructor(
  private authService: AuthService,
  private orderService: OrderService,
  private router: Router
) {}

ngOnInit(): void {
  this.authService.userType$.subscribe(type => this.userType = type);
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  if (userData && userData.id) {
    this.userId = userData.id;
  }
  if (this.userType === 'seller') {
    this.loadOrderOfSeller();
  }else if(this.userType=== 'user'){
  this.loadOrders();}
}

loadOrderOfSeller():void{
  this.orderService.getOrdersBySellerId().subscribe(
    (orders: Order[]) => {
      this.orders = orders;
    },
    (error) => {
      console.error('Error loading orders:', error);
    }
  );
}

loadOrders() {
  this.orderService.getUserOrders(this.userId).subscribe((data: Order[]) => {
    this.orders = data;
    this.orders.forEach(order => order['showDetails'] = false);
  });
}

toggleDetails(order: Order) {
  order.showDetails = !order.showDetails;
}

deleteOrder(orderId: string) {
  this.orderService.deleteOrder(orderId).subscribe(() => {
    this.orders = this.orders.filter(order => order.id !== orderId);
  });
}

editOrder(order: Order) {
  this.editingOrder = { ...order };
}

saveOrder() {
  if (this.editingOrder) {
    this.orderService.updateOrder(this.editingOrder).subscribe(updatedOrder => {
      const index = this.orders.findIndex(order => order.id === updatedOrder.id);
      this.orders[index] = updatedOrder;
      this.editingOrder = null;
    });
  }
}

cancelEdit() {
  this.editingOrder = null;
}
}