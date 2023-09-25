/*
  Warnings:

  - The values [SMALL,MEDIUM,BIG] on the enum `Size` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `breed` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `pets` table. All the data in the column will be lost.
  - Changed the type of `age` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Age" AS ENUM ('FILHOTE', 'JOVEM', 'ADULTO', 'IDOSO');

-- AlterEnum
BEGIN;
CREATE TYPE "Size_new" AS ENUM ('PEQUENINO', 'PEQUENO', 'MEDIO', 'GRANDE', 'GIGANTE');
ALTER TABLE "pets" ALTER COLUMN "size" TYPE "Size_new" USING ("size"::text::"Size_new");
ALTER TYPE "Size" RENAME TO "Size_old";
ALTER TYPE "Size_new" RENAME TO "Size";
DROP TYPE "Size_old";
COMMIT;

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "breed",
DROP COLUMN "weight",
DROP COLUMN "age",
ADD COLUMN     "age" "Age" NOT NULL;
