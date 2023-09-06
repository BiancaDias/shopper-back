import { Injectable } from '@nestjs/common';
import { ProductDto } from './dto/create-product.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsRepository {

  constructor(private readonly prisma: PrismaService) {}
  
  check(productDto: ProductDto) {
    return 'This action adds a new product';
  }

  update(id: number, productDto: ProductDto) {
    return `This action updates a #${id} product`;
  }

}
