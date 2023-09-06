import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() productDto: ProductDto) {
    return this.productsService.create(productDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() productDto: ProductDto) {
    return this.productsService.update(+id, productDto);
  }
}
