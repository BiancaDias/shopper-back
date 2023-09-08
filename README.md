# Teste técnico | Shopper - Back

Este é um projeto em Nest.js. Segue abaixo as instruções de configuração:

Certifiquse-se de ter as seguintes ferramentas instaladas e atualizadas no seu sistema: 

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Instalação

Siga estas etapas para configurar e executar o projeto localmente:

```bash
   git clone https://github.com/BiancaDias/shopper-back
   cd shopper-back
```

### 1 - Instalar as dependencias
```bash
  npm install
```
### 2 - Configurar a variavel de ambiente

Crie um arquivo .env na raiz do projeto com a variavel de ambiente necessária. Você pode usar o arquivo .env.example como um modelo.

### 3 - Configurar o banco de dados com o Prisma

Execute as seguintes etapas
```bash
  npx prisma generate
  npx prisma migrate dev
```

### 4 - Execute o projeto

```bash
  npm run start:dev
```

## Uso

Para enviar um arquivo para validação faça um post em products com um body no seguinte formato:

```bash
  {
  "products": [
    {"product_code": 18, "new_price": 9.10},
    {"product_code": 19, "new_price": 10.50},
    {"product_code": 20, "new_price": 5.99},
  ]
}
```

Após a validação, faça um put em products com o mesmo body para efetivar as mudanças.

## Testes

Para execução de testes, certifique-se que você tenha na raiz do projeto um arquivo .env.test que contenha o seu banco de testes.

Para executá-los, use o comando 
```bash
  npm run test:e2e
```