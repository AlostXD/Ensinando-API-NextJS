## Ensinando um Connect de banco de dados básico para um projeto em Next.js (Focado em estudos)

- O projeto foi feito com base no Next.js (npx create-next-app@latest).
- Não será focado no Front-End, mas terá um pouco de estilização para demonstração com Tailwind CSS.

## 1 - Comandos para a criação do Prisma (Explicado resumidamente)

1° APP - Essa é a pasta principal do nosso projeto, onde criamos os componentes para serem utilizados na renderização do site.
- Dentro da pasta `app`, crie uma pasta `lib` e, dentro dessa pasta, crie um arquivo chamado `prisma.ts`.

```bash
npm i
# Instala as dependências (Não precisa seguir os próximos passos se já tiver feito isso)

npm i prisma
# Instala o Prisma no sistema

npx prisma init
# Inicia o arquivo principal para utilizar o Prisma (Vai criar uma pasta `prisma` e, dentro dela, o `schema.prisma` e o `.env` que terá nossa URL de conexão com o banco de dados em PostgreSQL.)
```

## 2 - Criando o schema (Para conectar ao banco de dados)

- Todo o código abaixo está comentado no próprio arquivo, caso precise consultar.

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL") // Puxa a variável do nosso .env com o link de conexão do banco de dados
}

model teste {
  id      Int    @id @default(autoincrement()) // Campo ID com incremento automático
  nome    String // Campo nome
  idade   Int    // Campo idade
  curso   String // Campo de cursos
}
```

- Esta é a forma básica de criar uma tabela no banco de dados. Antes de fazermos a conexão, precisamos primeiro criar o banco de dados.

## 3 - Criando um banco de dados (Local ou Hospedado)

- Existem duas formas de fazer este projeto:
1) Baixando o PostgreSQL Server localmente no seu PC e configurando-o como Host com o PGAdmin.
2) Utilizando algum host que forneça as informações necessárias (Método que vamos utilizar).

- Um host gratuito que fornece um banco de dados limitado para testes é a Vercel (criadora do Next.js).

### Etapas da criação

1. Crie um repositório no GitHub com o arquivo do Next.js.
2. Faça o push dos arquivos para semear o repositório com o Next.js.
3. Abra o site da [Vercel](https://vercel.com) e crie sua conta.
4. Na Dashboard, adicione um novo repositório conectando pelo seu GitHub (a Vercel importa seus repositórios diretamente de lá).
5. Na parte de seleção, escolha o repositório criado e, caso não apareça, selecione o framework de deployment como Next.js (normalmente, em projetos criados pelo `npx create-next-app`, ele já é identificado automaticamente pela Vercel).
6. Após o deploy ser concluído, acesse a página do seu arquivo na Vercel e, na barra de navegação superior, escolha a opção "Storage".
7. Clique em "Create Database" e selecione a Database Neon. Coloque também a localização de São Paulo (selecione o plano gratuito).
8. Caso a Database tenha sido criada corretamente, você será encaminhado para a página onde estarão as configurações para o Connect do banco de dados. No canto direito, clique em "Copy Snippet" para copiar as configurações.
9. Acesse o arquivo `.env` e cole as configurações copiadas da Vercel.
10. Escreva no terminal:

```bash
npx prisma migrate dev
```

- Isso fará a migração do banco de dados e criará nossa tabela.

- Caso tenha funcionado, uma pasta com a data e o nome da sua migração (colocado no terminal) será criada.

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

main();
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

- Delete o código da função `main` após semear o banco.

## 8 - Configurando o Front-End

- Acesse o `page.tsx` e escreva este código:

```jsx
import prisma from "./lib/prisma";

export default async function Home() {
  const info = await prisma.teste.findMany();

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-2">
        {info.map((info) => (
          <div key={info.id} className="p-4 m-2 bg-gray-200 rounded shadow text-black">
            <h2 className="text-lg font-bold">{info.nome}</h2>
            <p>Idade: {info.idade}</p>
            <p>Curso: {info.curso}</p>
          </div>
        ))}
      </div>
    </>
  );
}
```

- Este código importa a variável `prisma` que criamos na lib.
- Cria uma função assíncrona `Home()` que será a nossa página do site.
- Cria uma variável chamada `info` que faz a busca no banco de dados com o `findMany` e retorna todas as informações que colocamos.
- Retorna uma `div` (somente para centralizar os elementos).
- Dentro desta `div`, é gerado um `info.map` que cria nosso código com as informações colocadas no banco de dados.

## 9 - Salvando as alterações com um Commit

- Para salvar nosso arquivo no GitHub para que a Vercel consiga fazer o deploy, devemos commitar no GitHub para salvar as informações novas.

```bash
git add . # Adiciona todos os arquivos modificados

git commit -m "texto para commit" # Faz o commit com o nome colocado

git push origin main # Envia as alterações feitas para o arquivo no GitHub
```

- Com isso, seu site já estará funcionando com um link disponibilizado pela Vercel (basta clicar na foto do site no seu Dashboard).

## 10 (Extra e Final) - Teste local do site com localhost

- Para testar localmente as modificações feitas sem subir um commit errado, utilize o seguinte comando:

```bash
npm run dev
```

- Após isso, escreva `http://localhost:3000` no seu navegador ou clique no link do terminal com `CTRL + Clique esquerdo`.

## IMPORTANTE / AVISO

- Como isso foi um teste com o foco em ensinar como uma API pode ser criada com o Prisma, PostgreSQL e TypeScript, não terá um foco tão grande no Next.js.
- O Next.js foi escolhido apenas para facilitar e mostrar também como seria a estrutura de pastas. O deploy no final pode falhar por várias questões (alterações nas regras do eslint, package.json, etc.).
- Leve em consideração que, em partes futuras, não será necessário fazer essa "semeação" de informações, tendo em vista que o banco de dados terá as informações colocadas de diversas formas (pelo manager da database, inserido manualmente pelo serviço que utiliza, dentre outros).
