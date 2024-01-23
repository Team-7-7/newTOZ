const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const spells = [
  {
    spell_name: "Magic Missle",
    description: "Creates glowing, magical darts that hits your opponents at a distance",
    // Credit: Dungeons & Dragons
    health_bonus: 0,
    armor_bonus: 0,
    attack_bonus: 5,
    speed_bonus: 0,
    graphicUrl: "",
    level: 1,
  },
  {
    spell_name: "Magic Shield",
    description: "Creates a luminous shield that increases your ability to defend attacks for a short duration of time",
    health_bonus: 0,
    armor_bonus: 0,
    attack_bonus: 5,
    speed_bonus: 0,
    graphicUrl: "",
    level: 1,
  },
  {
    spell_name: "Magic Shield",
    description: "Creates a luminous shield that increases your ability to defend attacks for a short duration of time",
    health_bonus: 0,
    armor_bonus: 3,
    attack_bonus: 0,
    speed_bonus: 0,
    graphicUrl: "",
    level: 1,
  },
  {
    spell_name: "Spirit Heal",
    description: "Restores lost health, boosting the recipients hit points.",
    health_bonus: 10,
    armor_bonus: 0,
    attack_bonus: 0,
    speed_bonus: 0,
    graphicUrl: "",
    level: 1,
  },
  {
    spell_name: "Swiftness of Hermes",
    description: "When swiftness is at need, to outrace lava or flee an enemy, this is the answer that fades upon use.",
    health_bonus: 0,
    armor_bonus: 0,
    attack_bonus: 0,
    speed_bonus: 10,
    graphicUrl: "",
    level: 2,
  },
  {
    spell_name: "Light of Leyenda",
    description: "A flame appears in the mage's hand, this illuminates a dark area, even darkened by sorcery.",
    health_bonus: 0,
    armor_bonus: 0,
    attack_bonus: 0,
    speed_bonus: 0,
    graphicUrl: "",
    level: 3,
  },

];

const createSpells = async function () {
  console.log("createSpells");

  await prisma.spells.createMany({
    data: spells,
  });
};

createSpells()
  .then(async () => {
    await prisma.$disconnect();
    console.log("done");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
