const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()

const characters =[
    {
        name:'sal',
        gender:'male',
        character_class:'warrior',
        currentHP:100,
        maxHP:100,
        xp:0,
        level:1,
        graphicURL:'https://i.imgur.com/0LX0K0o.png',
        gold:0,
        head_gear1:1,
        leaft_hand_gear2:2,
        right_hand_gear3:3,
        foot_gear4:4,
        chest_gear5:5,
        base_attack:10,
        base_armor:10,
        base_speed:10,
        isNPC:false,
        location_coordinates:null,
        inventory_id:1,
        stagescompleted:0
    }
]

const createCharacter = async () => {
    console.log('createCharacter');

    await prisma.character.createMany({
        data:characters
    })

};

main()
.then(async () => {
    await prisma.$disconnect()
    console.log("done");
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })