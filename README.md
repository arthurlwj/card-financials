# Card Financials API

API para gerenciamento de gastos com cartões de crédito, desenvolvida com **NestJS**, **TypeScript** e **PostgreSQL**.

---

## Tecnologias utilizadas

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Swagger](https://swagger.io/) – documentação automática
- [Class-validator](https://github.com/typestack/class-validator)
- [Jest](https://jestjs.io/) – testes automatizados

---

## Funcionalidades principais

- CRUD de gastos (`/expenses`)
- CRUD de cartões (`/cards`)
- Filtros de busca por descrição, tipo e mês de referência
- Relacionamento entre cartões e gastos
- Validação de dados via DTOs e decorators
- Documentação automática no Swagger

---

## Documentação da API

Acesse em: [http://localhost:3001/api](http://localhost:3001/api)

No Swagger você encontra:

- Rotas disponíveis
- Tipos de dados esperados (DTOs)
- Schemas detalhados
- Métodos suportados: `GET`, `POST`, `PATCH`, `DELETE`

---

## Como rodar o projeto localmente

### Pré-requisitos

- Node.js (versão 18+)
- Docker e Docker Compose
- Git

### Passo a passo

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/card-financials.git
cd card-financials

# Copie as variáveis de ambiente
cp .env.example .env

# Inicie os containers com Docker Compose
docker-compose up -d

# Instale as dependências
npm install

# Rode a aplicação
npm run start:dev
```

### Banco de dados

O PostgreSQL será iniciado com Docker na porta `5433`. verifique se a porta está livre.

---

## Rodando os testes

```bash
npm run test
```

---

## Estrutura do projeto

```
src/
├── cards/
│   ├── cards.controller.ts
│   ├── cards.service.ts
│   ├── cards.repository.ts
│   └── dtos/
├── expenses/
│   ├── expenses.controller.ts
│   ├── expenses.service.ts
│   ├── expenses.repository.ts
│   └── dtos/
├── common/
│   └── filters, utils, enums, etc
├── main.ts
└── app.module.ts
```

---

## Desenvolvedor

Feito por [Arthur Brito](https://github.com/arthurlwj)