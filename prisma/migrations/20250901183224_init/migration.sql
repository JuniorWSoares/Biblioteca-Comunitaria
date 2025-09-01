-- CreateEnum
CREATE TYPE "public"."Papel" AS ENUM ('admin', 'voluntario');

-- CreateTable
CREATE TABLE "public"."Usuarios" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" VARCHAR(20),
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "papel" "public"."Papel" NOT NULL,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Livros" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "autor" TEXT,
    "categoria" TEXT,
    "foto_capa" TEXT,
    "sinopse" TEXT,
    "quantidade" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Livros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Exemplares" (
    "id" SERIAL NOT NULL,
    "data_doacao" DATE,
    "data_recepcao" DATE,
    "id_doador" INTEGER,
    "id_receptor" INTEGER,
    "id_livro" INTEGER NOT NULL,

    CONSTRAINT "Exemplares_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_email_key" ON "public"."Usuarios"("email");

-- AddForeignKey
ALTER TABLE "public"."Exemplares" ADD CONSTRAINT "Exemplares_id_doador_fkey" FOREIGN KEY ("id_doador") REFERENCES "public"."Usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Exemplares" ADD CONSTRAINT "Exemplares_id_receptor_fkey" FOREIGN KEY ("id_receptor") REFERENCES "public"."Usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Exemplares" ADD CONSTRAINT "Exemplares_id_livro_fkey" FOREIGN KEY ("id_livro") REFERENCES "public"."Livros"("id") ON DELETE CASCADE ON UPDATE CASCADE;
