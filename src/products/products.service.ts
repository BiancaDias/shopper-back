import { Injectable } from '@nestjs/common';
import { ProductDto } from './dto/create-product.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {

  constructor(private readonly respository: ProductsRepository) {}
  
  check(productDto: ProductDto) {
    return 'This action adds a new product';
  }

  update(id: number, productDto: ProductDto) {
    return `This action updates a #${id} product`;
  }

}
