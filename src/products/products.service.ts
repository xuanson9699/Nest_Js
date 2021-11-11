import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/user.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(createProductDto: CreateProductDto): Product {
    const prodId = Math.random().toString();
    const newProduct = { id: prodId, ...createProductDto };
    this.products.push(newProduct);
    return newProduct;
  }

  getAllProducts(): Product[] {
    return [...this.products];
  }

  getProductById(productId: string): Product {
    const product = this.products.find((item) => item?.id === productId);
    if (!product) {
      throw new NotFoundException('Could found find product.');
    }
    return { ...product };
  }

  deleteProductById(productId: string) {
    const productFilter = this.products.filter(
      (item) => item?.id !== productId,
    );
    return [...productFilter];
  }

  updateProductById(
    id: string,
    title: string,
    description: string,
    price: number,
  ) {
    this.products.forEach((item) => {
      if (item?.id === id) {
        (item.title = title || item.title),
          (item.description = description || item.description),
          (item.price = price || item.price);
      }
      return [...this.products];
    });
  }
}
