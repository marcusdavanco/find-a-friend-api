-- CreateEnum
CREATE TYPE "Species" AS ENUM ('DOG', 'CAT');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('SMALL', 'MEDIUM', 'BIG');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "size" "Size" NOT NULL DEFAULT 'SMALL',
ADD COLUMN     "species" "Species" NOT NULL DEFAULT 'DOG',
ADD COLUMN     "weight" DECIMAL(65,30) NOT NULL DEFAULT 0;
