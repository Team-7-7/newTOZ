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
        graphicUrl:'',
        gold:0,
        head_gear1:1,
        left_hand_gear2:2,
        right_hand_gear3:3,
        foot_gear4:4,
        chest_gear5:5,
        base_attack:10,
        base_armor:10,
        base_speed:15,
        magic_points:null,
        isNPC:false,
        location_coordinates:null,
        stagescompleted:0
    },

    {
        name:'nick',
        gender:'male',
        character_class:'rogue',
        currentHP:100,
        maxHP:100,
        xp:1200,
        level:3,
        graphicUrl:'',
        gold:300,
        head_gear1:1,
        left_hand_gear2:2,
        right_hand_gear3:3,
        foot_gear4:4,
        chest_gear5:5,
        base_attack:12,
        base_armor:5,
        base_speed:15,
        magic_points:null,
        isNPC:false,
        location_coordinates:null,
        stagescompleted:0
    },
    {
        name:'Zymok',
        gender:'male',
        character_class:'rogue',
        currentHP:100,
        maxHP:100,
        xp:1200,
        level:3,
        graphicUrl:'',
        gold:300,
        head_gear1:7,
        left_hand_gear2:7,
        right_hand_gear3:7,
        foot_gear4:4,
        chest_gear5:7,
        backpack1: 7,
        backpack2: 1,
        backpack3: 7,
        backpack4: 5,
        backpack5: 3,
        backpack6: 4,
        backpack7: 6,
        backpack8: 2,
        base_attack:12,
        base_armor:5,
        base_speed:15,
        magic_points:null,
        isNPC:false,
        location_coordinates:null,
        stagescompleted:0
    }
]

const createCharacter = async () => {
    console.log('createCharacter');

    await prisma.character.createMany({
        data:characters
    })

};
createCharacter()
.then(async () => {
    await prisma.$disconnect()
    console.log("done");
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })