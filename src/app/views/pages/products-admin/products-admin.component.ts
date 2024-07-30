import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { Subscription } from 'rxjs';
import { Product } from '../../../models/Product';
import { ProductAdminTableComponent } from '../../../components/products-admin/product-admin-table/product-admin-table.component';
import { ProductsFormComponent } from '../../../components/products-admin/products-form/products-form.component';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-products-admin',
  standalone: true,
  imports: [SpinnerComponent, ProductAdminTableComponent, ProductsFormComponent],
  templateUrl: './products-admin.component.html',
  styleUrl: './products-admin.component.scss'
})
export class ProductsAdminComponent implements OnInit, OnDestroy {

  public isLoading = false;
  public products: Product[] = [];
  public isTableShown: boolean = true;

  private subscription$: Subscription;
  private subscriptionTable$: Subscription;

  constructor(private productService: ProductsService) {
    this.subscription$ = this.productService.refreshTable$.subscribe(_ => this.getAllProducts());
    this.subscriptionTable$ = this.productService.displayTable$.subscribe(isShown => this.isTableShown = isShown);
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.subscriptionTable$.unsubscribe();
  }

  private getAllProducts(): void {
    this.isLoading = true;
    this.productService.getListOfProducts()
      .subscribe({
        next: (products: Product[]) => {
          this.products = products;
          this.isLoading = false;
        }
      });
  }

  public addNewProduct(): void {
    this.isTableShown = false;
    this.productService.selectedProduct$.next(null);
  }

}
