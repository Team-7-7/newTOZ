/*
  Warnings:

  - Changed the type of `isTwoHanded` on the `Gear` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Gear" DROP COLUMN "isTwoHanded",
ADD COLUMN     "isTwoHanded" BOOLEAN NOT NULL;
