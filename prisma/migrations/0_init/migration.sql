-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(40) NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "isBanned" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "phone" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "name" VARCHAR(40) NOT NULL,
    "gender" VARCHAR(20) NOT NULL,
    "character_class" VARCHAR(30) NOT NULL,
    "currentHP" INTEGER NOT NULL,
    "maxHP" INTEGER NOT NULL,
    "xp" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "graphicUrl" TEXT NOT NULL,
    "gold" INTEGER NOT NULL,
    "head_gear1" INTEGER,
    "left_hand_gear2" INTEGER,
    "right_hand_gear3" INTEGER,
    "foot_gear4" INTEGER,
    "chest_gear5" INTEGER,
    "base_attack" INTEGER NOT NULL,
    "base_armor" INTEGER NOT NULL,
    "base_speed" INTEGER NOT NULL,
    "magic_points" INTEGER,
    "current_mp" INTEGER,
    "isNPC" BOOLEAN NOT NULL DEFAULT false,
    "location_coordinates" TEXT,
    "stagescompleted" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character_Gear" (
    "id" SERIAL NOT NULL,
    "character_id" INTEGER NOT NULL,
    "gear_id" INTEGER NOT NULL,

    CONSTRAINT "Character_Gear_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gear" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "description" TEXT NOT NULL,
    "attack" INTEGER NOT NULL,
    "armor" INTEGER NOT NULL,
    "isTwoHanded" INTEGER NOT NULL,
    "equip_location" INTEGER NOT NULL,
    "preferred_class" TEXT NOT NULL,
    "health_bonus" INTEGER NOT NULL,
    "armor_bonus" INTEGER NOT NULL,
    "attack_bonus" INTEGER NOT NULL,
    "speed_bonus" INTEGER NOT NULL,
    "graphicUrl" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Gear_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character_Class" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "description" TEXT NOT NULL,
    "beginning_attack" INTEGER NOT NULL,
    "beginning_armor" INTEGER NOT NULL,
    "beginning_speed" INTEGER NOT NULL,
    "beginning_hp" INTEGER NOT NULL,
    "graphicURL" INTEGER NOT NULL,

    CONSTRAINT "Character_Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Monster" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "description" TEXT NOT NULL,
    "base_attack" INTEGER NOT NULL,
    "base_armor" INTEGER NOT NULL,
    "base_speed" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "attack_name" TEXT NOT NULL,
    "graphicUrl" TEXT NOT NULL,
    "xp_base_value" INTEGER NOT NULL,
    "maxHP" INTEGER NOT NULL,
    "currentHP" INTEGER NOT NULL,
    "isBoss" BOOLEAN NOT NULL DEFAULT false,
    "loot_value" INTEGER NOT NULL,

    CONSTRAINT "Monster_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Character_user_id_key" ON "Character"("user_id");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Character_Gear" ADD CONSTRAINT "Character_Gear_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character_Gear" ADD CONSTRAINT "Character_Gear_gear_id_fkey" FOREIGN KEY ("gear_id") REFERENCES "Gear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

