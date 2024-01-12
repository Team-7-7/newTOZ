const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()

const monsters =[
    {
        id:1,
        name:'slime',
        description:'A slime',
        base_attack:10,
        base_speed:10,
        base_armor:10,
        level:1,
        attack_name:'slime attack',
        graphicURL:'https://i.imgur.com/0LX0K0o.png',
        xp_base_value:10,
        maxHP:10,
        currentHP:10,
        isBoss:false,
        loot_value:10,

    },
    {
        id:2,
        name:'goblin',
        description:'A goblin',
        base_attack:10,
        base_speed:10,
        base_armor:10,
        level:1,
        attack_name:'goblin attack',
        graphicURL:'https://i.imgur.com/0LX0K0o.png',
        xp_base_value:10,
        maxHP:10,
        currentHP:10,
        isBoss:false,
        loot_value:10,

    },
    {
        id:3,
        name:'orc',
        description:'A orc',
        base_attack:10,
        base_speed:10,
        base_armor:10,
        level:1,
        attack_name:'orc attack',
        graphicURL:'https://i.imgur.com/0LX0K0o.png',
        xp_base_value:10,
        maxHP:10,
        currentHP:10,
        isBoss:false,
        loot_value:10,

    },
    {
        id:4,
        name:'troll',
        description:'A troll',
        base_attack:10,
        base_speed:10,
        base_armor:10,
        level:1,
        attack_name:'troll attack',
        graphicURL:'https://i.imgur.com/0LX0K0o.png',
        xp_base_value:10,
        maxHP:10,
        currentHP:10,
        isBoss:false,
        loot_value:10,

    },
    {
        id:5,
        name:'dragon',
        description:'A dragon',
        base_attack:10,
        base_speed:10,
        base_armor:10,
        level:1,
        attack_name:'dragon attack',
        graphicURL:'https://i.imgur.com/0LX0K0o.png',
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