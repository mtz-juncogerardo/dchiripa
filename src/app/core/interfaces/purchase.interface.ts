import { Product } from './product.interface';
import { Address } from './address.interface';

export class Purchase {
  userId: string;
  product: Product[];
  buyDate: Date;
  address: Address;
}
