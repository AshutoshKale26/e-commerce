import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { HeaderComponent } from './component/header/header.component';
import { SellerComponent } from './component/seller/seller.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SellerHomeComponent } from './component/seller-home/seller-home.component';
import { SellerAddProductComponent } from './component/seller-add-product/seller-add-product.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { SearchComponent } from './component/search/search.component';
import { CartComponent } from './component/cart/cart.component';
import { WishListComponent } from './component/wish-list/wish-list.component';
import { OrderComponent } from './component/order/order.component';
import { ShippingComponent } from './component/shipping/shipping.component';
import { FooterComponent } from './component/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SellerComponent,
    SellerHomeComponent,
    SellerAddProductComponent,
    ProfileComponent,
    ProductDetailsComponent,
    SearchComponent,
    CartComponent,
    WishListComponent,
    OrderComponent,
    ShippingComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
