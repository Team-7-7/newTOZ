/*
  Warnings:

  - You are about to drop the column `begininning_attack` on the `Character_Class` table. All the data in the column will be lost.
  - You are about to drop the column `graphicURL` on the `Character_Class` table. All the data in the column will be lost.
  - Added the required column `beginning_attack` to the `Character_Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `graphicUrl` to the `Character_Class` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character_Class" DROP COLUMN "begininning_attack",
DROP COLUMN "graphicURL",
ADD COLUMN     "beginning_attack" INTEGER NOT NULL,
ADD COLUMN     "graphicUrl" TEXT NOT NULL;
