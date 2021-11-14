import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
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

  // @ApiOkResponse({ type: Product })
  // @Get()
  // getAllProducts(): Product[] {
  //   return this.productsService.getAllProducts();
  // }

  @ApiOkResponse({ type: Product, description: 'the product' })
  @Get(':id')
  getProductById(@Param('id') prodId: string): Product {
    return this.productsService.getProductById(prodId);
  }

  @ApiOkResponse({ type: Product, description: 'the product' })
  // @ApiQuery({ name: 'title', required: false })
  @Get()
  getUsersTitle(@Query('title') title?: string): Product[] {
    return this.productsService.getProductsByTitle(title);
  }

  @Delete(':id')
  deleteProductById(@Param('id') prodId: string): Product {
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
