import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  HttpCode,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/user.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  addProducts(@Body() body: CreateProductDto): Product {
    const genereteProduct = this.productsService.insertProduct(body);
    return genereteProduct;
  }

  // @ApiOkResponse({ type: Product })
  @Get()
  @HttpCode(204)
  getAllProducts(): Product[] {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  getProductById(@Param('id') prodId: string): Product {
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
