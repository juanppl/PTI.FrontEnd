import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-admin-table',
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './product-admin-table.component.html',
  styleUrl: './product-admin-table.component.scss'
})
export class ProductAdminTableComponent {
  @Input({required: true}) products: Product[] = [];

  constructor(private productsService: ProductsService) {}

  public editProduct(product: Product) {
    this.productsService.displayTable$.next(false);
    this.productsService.selectedProduct$.next(product);
  }

  public deleteProduct(productId: number | null) {
    Swal.fire({
      title: "Borrar producto",
      text: "El producto va a ser borrado, desea continuar ?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "No, Volver",
      confirmButtonColor: "#6ca100",
      confirmButtonText: "Si, Continuar",
    }).then((result) => {
      if (result.value) {
        this.productsService.deleteProduct(productId!)
          .subscribe({
            next: _ => {
              this.productsService.refreshTable$.next();
              Swal.fire({
                title: "Borrado Exitoso!",
                text: "Se ha borrado el producto exitosamente!",
                icon: "success"
              });
            }
          });
      }
    });

  }

}
