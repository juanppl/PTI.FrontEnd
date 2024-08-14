import { Product } from './Product';

export interface OrderItems {
    id: number | null,
    product: Product | number | null,
    price: number,
    quantity: number
}