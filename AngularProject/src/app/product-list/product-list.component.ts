import { Component, inject } from '@angular/core';
import { CartService } from '../services/cart.service';

import { Product, products } from '../models/products';
import { NgFor, NgIf, TitleCasePipe, CurrencyPipe } from '@angular/common';

import { ToastrService } from 'ngx-toastr';
  
import { FileUploadModule } from "primeng/fileupload"; 
import { HttpClientModule } from "@angular/common/http";

import * as XLSX from 'xlsx';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
    standalone: true,
    imports: [NgFor, NgIf, TitleCasePipe, CurrencyPipe, FileUploadModule, HttpClientModule]
})

export class ProductListComponent {
  private cartService = inject(CartService);
  private toastr = inject(ToastrService);
  public failedCount: any;
  public uploadedMsg: string ='';
  public uploadedData: any[] = [];
  public fileUploading: boolean= false;
  private msgs: Array<any> = [];
  private uploadedFiles: any[] = [];
  uploadUrl = 'http://localhost:4200/upload';

  
  products = products;


  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.toastr.success(product.name + ' was added to the cart.'); 
  }
  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
    this.toastr.warning(product.name + ' was removed from the cart.'); 
  }
  getQuantity(product: Product): number {
    return this.cartService.getProductQuantity(product);
  }
  
}
