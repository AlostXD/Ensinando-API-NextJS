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