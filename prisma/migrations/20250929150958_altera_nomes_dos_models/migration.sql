/*
  Warnings:

  - You are about to drop the `Exemplares` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Livros` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuarios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Exemplares" DROP CONSTRAINT "Exemplares_id_doador_fkey";

-- DropForeignKey
ALTER TABLE "public"."Exemplares" DROP CONSTRAINT "Exemplares_id_livro_fkey";

-- DropForeignKey
ALTER TABLE "public"."Exemplares" DROP CONSTRAINT "Exemplares_id_receptor_fkey";

-- DropTable
DROP TABLE "public"."Exemplares";

-- DropTable
DROP TABLE "public"."Livros";

-- DropTable
DROP TABLE "public"."Usuarios";

-- CreateTable
CREATE TABLE "public"."Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" VARCHAR(20),
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "papel" "public"."Papel" NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Livro" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "autor" TEXT,
    "categoria" TEXT,
    "foto_capa" TEXT,
    "sinopse" TEXT,
    "quantidade" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Livro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Exemplar" (
    "id" SERIAL NOT NULL,
    "data_doacao" DATE,
    "data_recepcao" DATE,
    "id_doador" INTEGER,
    "id_receptor" INTEGER,
    "id_livro" INTEGER NOT NULL,

    CONSTRAINT "Exemplar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "public"."Usuario"("email");

-- AddForeignKey
ALTER TABLE "public"."Exemplar" ADD CONSTRAINT "Exemplar_id_doador_fkey" FOREIGN KEY ("id_doador") REFERENCES "public"."Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Exemplar" ADD CONSTRAINT "Exemplar_id_receptor_fkey" FOREIGN KEY ("id_receptor") REFERENCES "public"."Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Exemplar" ADD CONSTRAINT "Exemplar_id_livro_fkey" FOREIGN KEY ("id_livro") REFERENCES "public"."Livro"("id") ON DELETE CASCADE ON UPDATE CASCADE;
