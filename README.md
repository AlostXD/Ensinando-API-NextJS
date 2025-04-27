## Ensinando uma API básica para um projeto em Next.js (Focado em estudos)

- O Projeto foi feito com uma base do Next.js (npx create-next-app@latest)
- Não será com foco no Front-End, mas terá um pouco de estilização para demonstração com Tailwind CSS.

## 1 - Comandos para a criação do Prisma (Explicado resumidamente só para achar)

1° APP - Essa é a pasta principal do nosso projeto, é a pasta aonde criamos os componentes para ser utilizado na renderização do site.
- Dentro da pasta app, crie uma pasta lib e dentro dessa pasta lib crie um arquivo chamado prisma.ts

```
npm i - Instala as dependências (Não precisa seguir os próximos passos se tiver feito isso)


npm i prisma
# instala o Prisma no sistema

npx prisma init
# Inicia o arquivo principal para utilizar o Prisma (Vai criar uma pasta Prisma e dentro dela terá o screma.prisma e o .env que terá nossa URL de conexão com o banco de dados em PostgreSQL.)
```

## 2 - Criando o schema (Para conectar no banco de dados)

- Todo o código aqui abaixo está comentado no próprio arquivo caso precise ver.

```
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL") // Aqui está puxando a variável do nosso .env com o link de connect do nosso banco de dados
}


model teste {
  id      Int    @id @default(autoincrement()) // Campo ID com incremento automático
  nome    String // Campo nome
  idade   Int // Campo idade
  curso   String // Campo de cursos
}
```

model [nome]{
    //informações....
}

- Está é a forma básica de criar uma tabela no banco de dados. Antes de fazermos a conexão, precisamos primeiro criar o banco de dados.

## 3 - Criando um banco de dados (Local ou Hosteado)

- Tem duas formas para fazer este projeto:
1) Baixando o PostgreSQL Server localmente no seu PC e fazer ele de Host com o PGAdmin
2) Utilizar alguma host que fornece as informações necessárias (Método que vamos utilizar)

- Uma host gratuíta que fornece um banco de dados limitado para testes é a Vercel (Criadora do Next.JS)


ETAPAS DA CRIAÇÃO

1- Crie um repositório no Github com o arquivo do Next;
2- Faça o push dos arquivos para estar semeando o repositório com o Next.js;
3- Abra o site da [Vercel](https://vercel.com) e crie sua conta;
4- Na Dashboard, adicione um novo repositório conectando pelo seu Github; (Vercel importa seus repositórios diretamente de lá)
5- Na parte de selecionar, escola o repositório criado e, caso não apareça, selecione o Framework de Deployment como Next.js; (Normalmente, em projetos criados pelo npx create em Next, ele já é identificado de forma automática pela Vercel.)
6- Após o Deploy for concluído, acesse a página do seu arquivo na Vercel e na barra de navegação superior, escolha a opção "Storage";
7- Clique em "Create Database" e selecione a Database Neon. Coloque também a localização de São Paulo; (Selecione o Plano Gratuíto)
8- Caso a Database tenha sido criada de forma correta, você será encaminhado pra página aonde terá as configurações para o Connect do Banco de dados. No canto direito, clique em "Copy Snippet" para copiar as configurações;
9- Acesse o arquivo .env e cole as configurações copiadas da Vercel;
10(Final)- Escreva no Terminal ```npx prisma migrate dev``` para fazer a migração do banco de dados e criar nossa tabela.

- Caso tenha funcionado, uma pasta com a data e o nome da sua migração (Colocado no Terminal) será criada.

- Parabéns, você criou uma Database.

## 4 - Criando o prisma.ts (Lugar onde vamos conectar com o banco) e semeando o banco de dados

- Na pasta `app/lib`, abra ou crie o arquivo `prisma.ts` e escreva o seguinte código:

```typescript
import { PrismaClient } from '@app/generated/prisma/client';

const prisma = new PrismaClient();

export default prisma;

async function main() {
    await prisma.teste.createMany({
      data: [
        { nome: 'João', idade: 25, curso: 'Engenharia' },
        { nome: 'Maria', idade: 22, curso: 'Medicina' },
        { nome: 'Pedro', idade: 30, curso: 'Direito' },
      ],
    });
    console.log('Database seeded successfully!');
}

main()
```

- Esse código cria uma conexão com o banco de dados e insere dados iniciais na tabela `teste`.

## 5 - Configurando o script de seed no package.json

- No arquivo `package.json`, adicione ou atualize o script `seed` para o seguinte:

```json
"scripts": {
    "seed": "npx ts-node -r tsconfig-paths/register app/lib/prisma.ts"
}
```

- Esse script usa o `ts-node` para executar o arquivo `prisma.ts` e semear o banco de dados.

## 6 - Instalando dependências necessárias

- Instale o `ts-node` e o `tsconfig-paths` para garantir que o script funcione corretamente:

```bash
npm install ts-node tsconfig-paths --save-dev
```

## 7 - Rodando o script de seed

- Após configurar tudo, execute o seguinte comando para semear o banco de dados:

```bash
npm run seed
```

- Se tudo estiver configurado corretamente, você verá a mensagem `Database seeded successfully!` no terminal.

## 8 - Configurando o Front































This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
