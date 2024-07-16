import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../../product.model';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
//   product: any;
//   productData:undefined | Product;
//   productQuantity:number=1;
//   removeCart=false;
//   cartData:Product|undefined;
//   isInCart: boolean = false;
//   userId: string = '';
//   id: string ='';
//   showDetails:boolean= false;
//   cartItems: { product: Product, quantity: number }[] = [];

//   constructor(private route: ActivatedRoute,private router : Router, private productService: ProductService,private cartService:CartService,
//     private orderService: OrderService
//   ) {}

//   ngOnInit(): void {
//     const productId = this.route.snapshot.paramMap.get('id');
//     if (productId) {
//       this.productService.getProductById(productId).subscribe(
//         (data) => {
//           this.product = data;
//         },
//         (error) => {
//           console.error('Error fetching product details:', error);
//         }
//       );
//     }

//     const userData = JSON.parse(localStorage.getItem('userData') || '{}');
//     if (userData && userData.id) {
//       this.userId = userData.id;
//     }
//   }

//   addToCart(product: any) {
//     console.log('Add to cart:', product);
//     this.cartService.addToCart(product);
//     this.isInCart = true;    
// }

// addToWishList(product: Product) {
//   this.cartService.addToWishList(product);
// }

// removeFromCart(product: Product) {
//   this.cartService.removeFromCart(product);
//   this.isInCart = false;
// }

// proceedToShipping(){
//   this.router.navigate(['/shipping'], { state: { cartItems: this.cartItems, userId: this.userId } });
// }

//   handleQuantity(val:string){
//     if(this.productQuantity<20 && val==='plus'){
//       this.productQuantity+=1;
//     }else if(this.productQuantity>1 && val==='min'){
//       this.productQuantity-=1;
//     }
//   }


// }

product: Product | undefined;
productQuantity: number = 1;
isInCart: boolean = false;

constructor(
  private route: ActivatedRoute,
  private productService: ProductService,
  private cartService: CartService,
  private router: Router
) {}

ngOnInit(): void {
  this.route.paramMap.subscribe(paramMap => {
    const productId = paramMap.get('id');
    if (productId) {
      this.fetchProductDetails(productId);
    }
  });
}

fetchProductDetails(productId: string) {
  this.productService.getProductById(productId).subscribe(
    (data: Product) => {
      this.product = data;
      this.isInCart = this.cartService.isInCart(productId);
    },
    (error) => {
      console.error('Error fetching product details:', error);
    }
  );
}

addToCart(product: any) {
  this.cartService.addToCart(product, this.productQuantity,product.sellerId);
  this.isInCart = true;
}

addToWishList(product: any) {
  this.cartService.addToWishList(product);
}

handleQuantity(val: string) {
  if (this.productQuantity < 20 && val === 'plus') {
    this.productQuantity += 1;
  } else if (this.productQuantity > 1 && val === 'min') {
    this.productQuantity -= 1;
  }
}

buyProduct(product: any) {
  this.addToCart(product);
  this.router.navigate(['/shipping']);
}
}
