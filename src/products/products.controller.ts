import { Controller, Post, Body, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductArrayDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  check(@Body() productDto: ProductArrayDto) {
    return this.productsService.check(productDto);
  }

  @Put()
  update(@Body() productDto: ProductArrayDto) {
    return this.productsService.update(productDto);
  }
}
