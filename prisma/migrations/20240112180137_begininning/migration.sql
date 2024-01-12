/*
  Warnings:

  - You are about to drop the column `beginning_attack` on the `Character_Class` table. All the data in the column will be lost.
  - Added the required column `begininning_attack` to the `Character_Class` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character_Class" DROP COLUMN "beginning_attack",
ADD COLUMN     "begininning_attack" INTEGER NOT NULL;
