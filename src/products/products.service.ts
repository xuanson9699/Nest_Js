import { Products } from './products.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  products: Products[] = [];

  insertProduct(title: string, desc: string, price: number) {
    const prodId = new Date().toString();
    const newProduct = new Products(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }
}
