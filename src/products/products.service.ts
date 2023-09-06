import { Injectable } from '@nestjs/common';
import { ProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  check(productDto: ProductDto) {
    return 'This action adds a new product';
  }

  update(id: number, productDto: ProductDto) {
    return `This action updates a #${id} product`;
  }

}
