import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-product-admin-table',
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './product-admin-table.component.html',
  styleUrl: './product-admin-table.component.scss'
})
export class ProductAdminTableComponent {
  @Input({required: true}) products: Product[] = [];
}
