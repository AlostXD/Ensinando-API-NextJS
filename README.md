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

- Delete o código da função "main" após semear o banco.

## 8 - Configurando o Front

- Acesse o page.tsx e escreva este código

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
          ))
        }
      </div>
    </>
  );
}
```

- Este código importa a variável "prisma" que criamos na Lib
- Cria uma função assíncrona Home() que irá ser a nossa página do site
- Cria uma variável chamada info que vai fazer a busca no banco de dados com o findMany e retornar todas as informações que colocamos
- Retorna uma div (Somente para centralizar eles)
- Dentro desta div é gerado um info.map que irá criar nosso código com as informações colocadas no banco de dados.

## 9 - Salvando as alterações com um Commit (OBS: Leia o final do arquivo quando chegar aqui, IMPORTANTE)

- Para salvar nosso arquivo no Github para que a Vercel consiga fazer o deploy, devemos commitar no Github para salvar as informações novas.

```bash
git add . // Adiciona todos os arquivos modificados

git commit -m "texto para commit" // Faz o commit com o nome colocado

git push origin main // Envia as alterações feitas para o arquivo no Github
```

- Com isso, seu site já vai estar funcionado com um Link disponibilizado pela Vercel. (Somente clique na foto do site no teu Dashboard)

## 10 (Extra e Final) - Teste local do site com localhost

- Para testar localmente as modificações feitas sem subir um commit errado, utilize o seguinte comando:

```bash
npm run dev
```

- Após isso, escreva "https://localhost/3000" no seu navegador ou clique no link do terminal com CTRL + Clique esquerdo.



## IMPORTANTE / AVISO

- Como isso foi um teste com o foco pra ensinar como uma API pode ser criada com o Prisma, PostgreSQL e Typescript, não terá um foco tão grande com o Next.

- Next foi somente um Framework escolhido para facilitar e mostrar também como seria a estrutura de pastas... O Deploy no final vai falhar por várias questões (Alteração em regras do eslint, package.json, etc...).

- Leve em consideração que, em partes futuras, não será necessário fazer essa "semeação" de informações, tendo em vista que o banco de dados terá as informações colocadas de diversas formas (Colocados pelo Manager da Database, inserido manualmente pelo service que utiliza, dentre outros...).