import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../../product.model';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query: string = '';
  result:string='';
  searchResult: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit():void {

    this.route.paramMap.subscribe(paramMap => {
      const query = paramMap.get('query');
      if (query) {
        this.query = query;
        this.searchProducts(query);
      }
    });
  }

  searchProducts(query: string): void {
    this.productService.searchProduct(query).subscribe(
      (result: Product[]) => {
        this.searchResult = result;
      },
      (error) => {
        console.error('Error fetching search results:', error);
      }
    );
  }

  selectProduct(product: Product) {
    this.query = product.name;
    this.searchResult = [];
    this.router.navigate(['/product-details', product.id]);
  }


}
