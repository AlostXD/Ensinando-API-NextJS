-- CreateTable
CREATE TABLE "teste" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "curso" TEXT NOT NULL,

    CONSTRAINT "teste_pkey" PRIMARY KEY ("id")
);
