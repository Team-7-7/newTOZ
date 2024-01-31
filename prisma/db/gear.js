const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const gears = [
  {
    // id:1,
    name: "sword",
    description: "A sword, sharpened of steel",
    attack: 10,
    armor: 0,
    isTwoHanded: false,
    equip_location: 3,
    preferred_class: "warrior",
    health_bonus: 0,
    armor_bonus: 0,
    attack_bonus: 3,
    speed_bonus: 0,
    graphicUrl: "sword",
    price: 100,
  },
  {
    // id:2,
    name: "shield",
    description: "A shield of wood and iron.",
    attack: 0,
    armor: 2,
    isTwoHanded: false,
    equip_location: 2,
    preferred_class: "warrior",
    health_bonus: 0,
    armor_bonus: 2,
    attack_bonus: 0,
    speed_bonus: 0,
    graphicUrl: "swordSlot",
    price: 30,
  },
  {
    // id:3,
    name: "helmet",
    description: "A helmet of metal",
    attack: 0,
    armor: 4,
    isTwoHanded: false,
    equip_location: 1,
    preferred_class: "warrior",
    health_bonus: 0,
    armor_bonus: 4,
    attack_bonus: 0,
    speed_bonus: 0,
    graphicUrl: "",
    price: 20,
  },
  {
    // id:4,
    name: "boots",
    description: "Shiny, shiny boots of leather",
    //credit: Lou Reed
    attack: 0,
    armor: 3,
    isTwoHanded: false,
    equip_location: 4,
    preferred_class: "warrior",
    health_bonus: 0,
    armor_bonus: 3,
    attack_bonus: 0,
    speed_bonus: 5,
    graphicUrl: "",
    price: 10,
  },
  {
    // id:5,
    name: "chestplate",
    description: "A steel chestplate, gleams in the sunlight, protects with metal",
    attack: 0,
    armor: 10,
    isTwoHanded: false,
    equip_location: 5,
    preferred_class: "warrior",
    health_bonus: 0,
    armor_bonus: 10,
    attack_bonus: 0,
    speed_bonus: -5,
    graphicUrl: "",
    price: 100,
  },
  {
    // id:6,
    name: "health potion",
    description: "Drink this potion to restore your health",
    attack: 0,
    armor: 0,
    isTwoHanded: false,
    equip_location: 2,
    preferred_class: "warrior",
    health_bonus: 10,
    armor_bonus: 0,
    attack_bonus: 0,
    speed_bonus: 0,
    graphicUrl: "",
    price: 50,
  },
  {
    // id:7,
    name: "empty",
    description: "a dark void of nothingness",
    attack: 0,
    armor: 0,
    isTwoHanded: false,
    equip_location: 0,
    preferred_class: "",
    health_bonus: 0,
    armor_bonus: 0,
    attack_bonus: 0,
    speed_bonus: 0,
    graphicUrl: "empty",
    price: 0,
  },
];

const createGear = async function () {
  console.log("createGear");

  await prisma.gear.createMany({
    data: gears,
  });
};

createGear()
  .then(async () => {
    await prisma.$disconnect();
    console.log("done");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
