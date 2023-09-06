import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  check(@Body() productDto: ProductDto) {
    return this.productsService.check(productDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() productDto: ProductDto) {
    return this.productsService.update(+id, productDto);
  }
}
