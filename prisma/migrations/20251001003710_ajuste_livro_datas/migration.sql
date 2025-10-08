/*
  Warnings:

  - You are about to drop the column `quantidade` on the `Livro` table. All the data in the column will be lost.
  - You are about to drop the `Exemplar` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Exemplar" DROP CONSTRAINT "Exemplar_id_doador_fkey";

-- DropForeignKey
ALTER TABLE "public"."Exemplar" DROP CONSTRAINT "Exemplar_id_livro_fkey";

-- DropForeignKey
ALTER TABLE "public"."Exemplar" DROP CONSTRAINT "Exemplar_id_receptor_fkey";

-- AlterTable
ALTER TABLE "public"."Livro" DROP COLUMN "quantidade",
ADD COLUMN     "data_doacao" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "data_recepcao" DATE,
ADD COLUMN     "id_doador" INTEGER,
ADD COLUMN     "id_receptor" INTEGER;

-- DropTable
DROP TABLE "public"."Exemplar";

-- AddForeignKey
ALTER TABLE "public"."Livro" ADD CONSTRAINT "Livro_id_doador_fkey" FOREIGN KEY ("id_doador") REFERENCES "public"."Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Livro" ADD CONSTRAINT "Livro_id_receptor_fkey" FOREIGN KEY ("id_receptor") REFERENCES "public"."Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
