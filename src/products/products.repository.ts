import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class ProductsRepository {

  constructor(private readonly prisma: PrismaService) {}
  
  async check(code: number) {
    return await this.prisma.products.findUnique({
      where: {code},
      include: {
        packs_packs_product_idToproducts: true,
        packs_packs_pack_idToproducts: true
      }
    }
    )
  }

  async updateProduct(code: number, new_price: Decimal) {
    return await this.prisma.products.update({
      where: {code},
      data: {sales_price: new_price},
      include: {
        packs_packs_pack_idToproducts: true,
        packs_packs_product_idToproducts: true
      }
    })
  }
}
