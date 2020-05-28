export class Product {
  id: string;
  category: string;
  name: string;
  stock: number;
  description: string;
  price: number;
  descount: boolean;
  descountPrice?: number;
  image: {
    front: string;
    back?: string;
  };
}
