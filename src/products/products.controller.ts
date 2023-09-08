import { Controller, Post, Body, Put, Res, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductArrayDto } from './dto/create-product.dto';
import { Response } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async check(@Body() productDto: ProductArrayDto, @Res() res: Response) {
    const products = await this.productsService.check(productDto);
    res.status(HttpStatus.OK).json(products);
  }
  

  @Put()
  async update(@Body() productDto: ProductArrayDto) {
    return await this.productsService.update(productDto);
  }
}
