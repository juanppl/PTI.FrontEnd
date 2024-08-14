import { CreateUser } from './Auth';
import { OrderItems } from './OrderItems';

export interface Order {
    id: number | null;
    user: CreateUser | number | any;
    price: number;
    creationDate: Date | null;
    paidDate: Date | null;
    status: string | null;
    wasCancelled: boolean | null;
    cancelledDate: Date | null;
    items: OrderItems[];
}

