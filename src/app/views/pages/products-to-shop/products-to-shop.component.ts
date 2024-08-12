import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule, CardBodyComponent, CardComponent } from '@coreui/angular';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';
import { ShoppingService } from 'src/app/services/shopping.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products-to-shop',
  standalone: true,
  imports: [CardComponent, CardBodyComponent, CurrencyPipe, ButtonModule],
  templateUrl: './products-to-shop.component.html',
  styleUrl: './products-to-shop.component.scss'
})
export class ProductsToShopComponent implements OnInit {
  
  public isLoading = false;
  public products: Product[] = [];

  public productsService = inject(ProductsService);
  public shoppingService = inject(ShoppingService);
  
  ngOnInit(): void {
    this.getAllProducts();
  }

  private getAllProducts(): void {
    this.isLoading = true;
    this.productsService.getListOfProducts()
      .subscribe({
        next: (products: Product[]) => {
          this.products = products;
          this.isLoading = false;
        }
      });
  }

  public addProductToCart(product: Product) {
    this.shoppingService.addProductToCart(product);
    Swal.fire({
      icon: 'success',
      title: 'Producto Agregado',
      text: 'Se ha agregado el producto al carrito de compra!'
    });
  }

  public productExistsOnCart(product: Product): boolean {
    return this.shoppingService.doesProductExistsOnCart(product.id!);
  }

}
