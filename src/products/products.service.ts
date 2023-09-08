import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ProductArrayDto } from './dto/create-product.dto';
import { ProductsRepository } from './products.repository';
import { Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class ProductsService {

  constructor(private readonly respository: ProductsRepository) {}

  async check(productDto: ProductArrayDto) {
    const ruleErrors = [];
    const ruleOk = [];
    for( const product of productDto.products ){
      const productDb = await this.respository.check(product.product_code);
      console.log(productDb)
      if(!productDb){
        ruleErrors.push({product_code: product.product_code, error: "Produto não encontrado"})
      }else{
        const percentageDifference = (product.new_price - Number(productDb.sales_price)) / Number(productDb.sales_price) * 100;
        if(product.new_price < Number(productDb.cost_price)){
          ruleErrors.push({product_code: product.product_code, error: "O novo preço não pode ser menor que o preço de custo do produto"})
        }
        if (percentageDifference < -10 || percentageDifference > 10){
          ruleErrors.push({product_code: product.product_code, error: "O novo preço não pode ser maior ou menor que 10% do preço atual"})
        }
        if(!(percentageDifference < -10 || percentageDifference > 10) && !(product.new_price < Number(productDb.cost_price))){
          ruleOk.push({
            product_code: product.product_code,
            product_name: productDb.name,
            actual_price: productDb.sales_price,
            new_price: (product.new_price.toFixed(2)).toString()
          })
        }

      }
    }
    if(ruleErrors.length > 0){
      return {error: ruleErrors};
    }
    return {ok: ruleOk};   
  }

  async update(productDto: ProductArrayDto) {

    for(const produtcs of productDto.products){

      const decimalValue = new Decimal(produtcs.new_price)
      const productUpdate = await this.respository.updateProduct(produtcs.product_code, decimalValue)
      console.log(productUpdate.packs_packs_product_idToproducts)

      if(productUpdate.packs_packs_product_idToproducts.length > 0){

        console.log("aqui se trata de um produto associado a pacotes")
        
        if(productUpdate.packs_packs_product_idToproducts.length === 1){
          const code = Number(productUpdate.packs_packs_product_idToproducts[0].pack_id);
          const newPackPrice = new Decimal(Number(productUpdate.packs_packs_product_idToproducts[0].qty) * produtcs.new_price)
          console.log(code)
          console.log(newPackPrice)
          await this.respository.updateProduct(code, newPackPrice);
        }else{
          console.log("metodo não implementado")
        }
      }
      console.log(productUpdate.packs_packs_pack_idToproducts)
      if((productUpdate.packs_packs_pack_idToproducts.length>0)){
        console.log("aqui se trata de um pacote associado a produtos")
        if((productUpdate.packs_packs_pack_idToproducts.length===1)){

          const individualPrice = new Decimal(produtcs.new_price / Number(productUpdate.packs_packs_pack_idToproducts[0].qty))

          await this.respository.updateProduct(Number(productUpdate.packs_packs_pack_idToproducts[0].product_id), individualPrice)
        }else{
          console.log("Método não implementado")
        }

          
      }
    }
  }

}
