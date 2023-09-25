/*
  Warnings:

  - Added the required column `independency` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Independency" AS ENUM ('BAIXO', 'MEDIO', 'ALTO');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "independency" "Independency" NOT NULL;
