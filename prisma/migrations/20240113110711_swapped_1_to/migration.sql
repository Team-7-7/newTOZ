/*
  Warnings:

  - You are about to drop the column `user_id` on the `Character` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[character_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_user_id_fkey";

-- DropIndex
DROP INDEX "Character_user_id_key";

-- AlterTable
ALTER TABLE "Character" DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "character_id" INTEGER,
ADD COLUMN     "email" TEXT;

-- CreateTable
CREATE TABLE "Spells" (
    "id" SERIAL NOT NULL,
    "spell_name" VARCHAR(40) NOT NULL,
    "description" TEXT NOT NULL,
    "health_bonus" INTEGER NOT NULL,
    "armor_bonus" INTEGER NOT NULL,
    "attack_bonus" INTEGER NOT NULL,
    "speed_bonus" INTEGER NOT NULL,
    "graphicUrl" TEXT NOT NULL,
    "level" INTEGER NOT NULL,

    CONSTRAINT "Spells_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_character_id_key" ON "User"("character_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "Character"("id") ON DELETE SET NULL ON UPDATE CASCADE;
