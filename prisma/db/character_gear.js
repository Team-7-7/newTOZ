const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()

const Character_Gear =[
    {
        id:1,
        character_id:1,
        gear_id:1,
    }
]

const createCharacter_Gear = async () => {
    console.log('createCharacter_Gear');

    await prisma.Character_Gear.createMany({
        data:Character_Gear
    })

};

createCharacter_Gear()
.then(async () => {
    await prisma.$disconnect()
    console.log("done");
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })