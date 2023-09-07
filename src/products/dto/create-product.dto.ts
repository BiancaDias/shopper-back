import { IsArray, IsDecimal, IsNotEmpty, IsNumber, IsObject, ValidateNested } from "class-validator"
import { Type } from 'class-transformer';

class ProductDto {

  @IsNumber()
  @IsNotEmpty()
  product_code: number

  @IsNotEmpty()
  new_price: number;

}

export class ProductArrayDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];
}