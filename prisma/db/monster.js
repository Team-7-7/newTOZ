const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()

const monsters =[
    {
        name:'slime',
        description:'A slime',
        base_attack:10,
        base_speed:10,
        base_armor:10,
        level:1,
        attack_name:'slime attack',
        graphicUrl:'',
        xp_base_value:10,
        maxHP:10,
        currentHP:10,
        isBoss:false,
        loot_value:10,

    },
    {
        name:'goblin',
        description:'A goblin',
        base_attack:10,
        base_speed:10,
        base_armor:10,
        level:1,
        attack_name:'goblin attack',
        graphicUrl:'',
        xp_base_value:10,
        maxHP:10,
        currentHP:10,
        isBoss:false,
        loot_value:10,

    },
    {
        name:'orc',
        description:'A orc',
        base_attack:10,
        base_speed:10,
        base_armor:10,
        level:1,
        attack_name:'orc attack',
        graphicUrl:'',
        xp_base_value:10,
        maxHP:10,
        currentHP:10,
        isBoss:false,
        loot_value:10,

    },
    {
        name:'troll',
        description:'A troll',
        base_attack:10,
        base_speed:10,
        base_armor:10,
        level:1,
        attack_name:'troll attack',
        graphicUrl:'',
        xp_base_value:10,
        maxHP:10,
        currentHP:10,
        isBoss:false,
        loot_value:10,

    },
    {
        name:'dragon',
        description:'A dragon',
        base_attack:10,
        base_speed:10,
        base_armor:10,
        level:1,
        attack_name:'dragon attack',
        graphicUrl:'',
        xp_base_value:10,
        maxHP:10,
        currentHP:10,
        isBoss:false,
        loot_value:10,
    }
]

const createMonster = async () => {
    console.log('createMonster');

    await prisma.monster.createMany({
        data:monsters
    })

};

createMonster()
.then(async () => {
    await prisma.$disconnect()
    console.log("done");
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })