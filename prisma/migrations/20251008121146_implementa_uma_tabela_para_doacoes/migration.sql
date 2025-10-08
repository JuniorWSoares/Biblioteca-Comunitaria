/*
  Warnings:

  - You are about to drop the column `data_doacao` on the `Livro` table. All the data in the column will be lost.
  - You are about to drop the column `data_recepcao` on the `Livro` table. All the data in the column will be lost.
  - You are about to drop the column `id_doador` on the `Livro` table. All the data in the column will be lost.
  - You are about to drop the column `id_receptor` on the `Livro` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Livro" DROP CONSTRAINT "Livro_id_doador_fkey";

-- DropForeignKey
ALTER TABLE "public"."Livro" DROP CONSTRAINT "Livro_id_receptor_fkey";

-- AlterTable
ALTER TABLE "public"."Livro" DROP COLUMN "data_doacao",
DROP COLUMN "data_recepcao",
DROP COLUMN "id_doador",
DROP COLUMN "id_receptor";

-- CreateTable
CREATE TABLE "public"."Doacao" (
    "id" SERIAL NOT NULL,
    "data_doacao" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_resgate" DATE,
    "id_livro" INTEGER NOT NULL,
    "id_doador" INTEGER NOT NULL,
    "id_receptor" INTEGER,

    CONSTRAINT "Doacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Doacao_id_livro_key" ON "public"."Doacao"("id_livro");

-- AddForeignKey
ALTER TABLE "public"."Doacao" ADD CONSTRAINT "Doacao_id_livro_fkey" FOREIGN KEY ("id_livro") REFERENCES "public"."Livro"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Doacao" ADD CONSTRAINT "Doacao_id_doador_fkey" FOREIGN KEY ("id_doador") REFERENCES "public"."Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Doacao" ADD CONSTRAINT "Doacao_id_receptor_fkey" FOREIGN KEY ("id_receptor") REFERENCES "public"."Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
