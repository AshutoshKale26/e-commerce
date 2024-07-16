import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { SellerComponent } from './component/seller/seller.component';
import { SellerHomeComponent } from './component/seller-home/seller-home.component';
import { authGuard } from './guards/auth.guard';
import { SellerAddProductComponent } from './component/seller-add-product/seller-add-product.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { SearchComponent } from './component/search/search.component';
import { CartComponent } from './component/cart/cart.component';
import { WishListComponent } from './component/wish-list/wish-list.component';
import { OrderComponent } from './component/order/order.component';
import { ShippingComponent } from './component/shipping/shipping.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'seller', component: SellerComponent },
  { path: 'seller-home', component: SellerHomeComponent,canActivate:[authGuard] },
  { path: 'profile', component: ProfileComponent,canActivate:[authGuard] },
  { path: 'seller-add-product', component: SellerAddProductComponent,canActivate:[authGuard] },
  { path: 'search/:query', component: SearchComponent },
  { path: 'cart', component: CartComponent },
  { path: 'wish-list', component: WishListComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'orders', component: OrderComponent },
  { path: 'shipping', component: ShippingComponent },
  { path: '', redirectTo: '/cart', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
