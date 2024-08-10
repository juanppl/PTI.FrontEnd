import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/Product';
import { ProductsService } from '../../../services/products.service';
import { CategoriesService } from '../../../services/categories.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.scss'
})
export class ProductsFormComponent {

  public product: Product | null = this.initializeProduct();
  public categories: Category[] = [];
  private subscription$: Subscription;
  public isSaving = false;

  constructor(
    private categoryService: CategoriesService,
    private productService: ProductsService
  ) {
    this.subscription$ = this.productService.selectedProduct$
      .subscribe((product: Product | null) => {
        this.product = product;
        if (!this.product) this.product = this.initializeProduct();
      });
  }

  private initializeProduct(): Product {
    return {
      id: null,
      fullName: '',
      displayName: '',
      description: '',
      price: 0,
      isActive: true,
      creationDate: new Date(),
      expireDate: null,
      expireDateAsString: '',
      categoryId: null,
      availableQty: 0,
      lastModificationDate: new Date(),
      isDeleted: false,
      deletedDate: null,
      category: null,
    }
  }

  ngOnInit(): void {
    this.getListOfCategories();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  private getListOfCategories(): void {
    this.categoryService.getListOfCategories()
      .subscribe({
        next: (categories: Category[]) => {
          this.categories = categories;
        }
      });
  }

  public save(): void {
    this.isSaving = true;
    if (this.product?.id && this.product.id != -1) {
      this.editProduct(this.product);
    } else {
      this.addNewProduct(this.product!);
    }
  }

  private addNewProduct(product: Product): void {
    this.productService.createProduct(product)
      .subscribe({
        next: () => {
          this.isSaving = false;
          this.productService.displayTable$.next(true);
          this.productService.refreshTable$.next();
          Swal.fire({
            title: "Creado Exitoso!",
            text: "Se ha creado el producto exitosamente!",
            icon: "success"
          });
        }
      });
  }

  private editProduct(product: Product): void {
    this.productService.editProduct(product)
      .subscribe({
        next: () => {
          this.isSaving = false;
          this.productService.displayTable$.next(true);
          this.productService.refreshTable$.next();
          Swal.fire({
            title: "Editado Exitoso!",
            text: "Se ha editado el producto exitosamente!",
            icon: "success"
          });
        }
      });
  }

  public cancel(): void {
    this.productService.displayTable$.next(true);
  }

  public assignExpireDate(event: any): void {
    this.product!.expireDate = event.target.value;
  }
}
