import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from "class-validator"
import { Type } from 'class-transformer';

export class ProductDto {

  @IsNumber()
  @IsNotEmpty()
  product_code: number

  @IsNumber()
  @IsNotEmpty()
  new_price: number

}

export class ProductArrayDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];
}