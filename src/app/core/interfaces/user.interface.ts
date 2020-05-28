import { Product } from './product.interface';
import { Address } from './address.interface';
import { Purchase } from './purchase.interface';

export class User {
  id: string;
  createdAt: Date;
  firstName: string;
  lastName: string;
  address: Address;
  phone: string;
  email: string;
  password: string;
  shopCart: Product[];
  purchases: Purchase[];
}