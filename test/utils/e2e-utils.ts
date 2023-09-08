import { PrismaService } from "../../src/prisma/prisma.service";

export class E2EUtils {
  static async cleanDb(prisma: PrismaService){
    await prisma.packs.deleteMany();
    await prisma.products.deleteMany();
  }

  static createFileValid(){
    return{
      "products": [
        {"product_code": 18, "new_price": 9.10}
      ]
    }
  }

  static createFileProductInvalid(){
    return{
      "products": [
        {"product_code": 1, "new_price": 9.10}
      ]
    }
  }

  static createFileProductValueInvalid(){
    return{
      "products": [
        {"product_code": 18, "new_price": 20.10}
      ]
    }
  }

  static createFileProductValueBellow(){
    return{
      "products": [
        {"product_code": 18, "new_price": 7.10}
      ]
    }
  }
}