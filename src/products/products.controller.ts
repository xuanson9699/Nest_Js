import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { get } from 'https';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  addProducts(
    @Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('price') prodPrice: number,
  ) {
    const genereteId = this.productsService.insertProduct(
      prodTitle,
      prodDescription,
      prodPrice,
    );
    return { id: genereteId };
  }

  @Get()
  getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  getProductById(@Param('id') prodId: string) {
    return this.productsService.getProductById(prodId);
  }

  @Delete(':id')
  deleteProductById(@Param('id') prodId: string) {
    this.productsService.deleteProductById(prodId);
    return null;
  }

  @Patch(':id')
  updateProductById(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('descriptions') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    this.productsService.updateProductById(
      prodId,
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return null;
  }
}
