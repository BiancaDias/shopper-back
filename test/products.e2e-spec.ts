import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { HttpAdapterHost } from '@nestjs/core';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { E2EUtils } from './utils/e2e-utils';
import { ProductFactory } from './factories/products.factory';

describe('Products (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService = new PrismaService();
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe())
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
    await app.init();

    await E2EUtils.cleanDb(prisma);
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  })

  it('POST /products => It should return with 200 and the product when it does not violate the rules. ', async () =>{
    const productFactory = new ProductFactory(prisma);

    await productFactory.createProducts()

    const products =  E2EUtils.createFileValid()
    return request(app.getHttpServer())
      .post('/products')
      .send(products)
      .expect(HttpStatus.OK)
      .expect({
        ok: [
          {
            product_code: 18,
            product_name: 'BEBIDA ENERGÉTICA VIBE 2L',
            actual_price: '8.99',
            new_price: '9.10'
          }
        ]
      })
  });

  it('POST /products => It should return with 200 and the error for non-existent product. ', async () =>{
    const productFactory = new ProductFactory(prisma);

    await productFactory.createProducts()

    const products =  E2EUtils.createFileProductInvalid()
    return request(app.getHttpServer())
      .post('/products')
      .send(products)
      .expect(HttpStatus.OK)
      .expect({ error: [ { product_code: 1, error: 'Produto não encontrado' } ] })
  });

  it('POST /products => It should return with 200 and the error for value above or below 10% of the current product value. ', async () =>{
    const productFactory = new ProductFactory(prisma);

    await productFactory.createProducts()

    const products =  E2EUtils.createFileProductValueInvalid()
    return request(app.getHttpServer())
      .post('/products')
      .send(products)
      .expect(HttpStatus.OK)
      .expect({ error: [ { product_code: 18, error: 'O novo preço não pode ser maior ou menor que 10% do preço atual' } ] })
  });
  it("POST /products => It should return with 200 and the error for a value below the product's cost and outside the 10% margin.", async () =>{
    const productFactory = new ProductFactory(prisma);

    await productFactory.createProducts()

    const products =  E2EUtils.createFileProductValueBellow()
    return request(app.getHttpServer())
      .post('/products')
      .send(products)
      .expect(HttpStatus.OK)
      .expect({
        error: [
          {
            product_code: 18,
            error: 'O novo preço não pode ser menor que o preço de custo do produto'
          },
          {
            product_code: 18,
            error: 'O novo preço não pode ser maior ou menor que 10% do preço atual'
          }
        ]
      })
  });
});