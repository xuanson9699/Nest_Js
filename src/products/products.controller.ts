import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entities';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  addProducts(@Body() body: CreateProductDto): Product {
    const newProduct = this.productsService.insertProduct(body);
    return newProduct;
  }

  @Get()
  getAllProducts(): Product[] {
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
