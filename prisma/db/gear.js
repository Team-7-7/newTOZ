const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()

const gears =[
    {
        name:'sword',
        description:'A sword',
        attack:10,
        armor:0,
        isTwoHanded:false,
        equip_location:'right_hand',
        preferred_class:'warrior',
        health_bonus:0,
        armor_bonus:0,
        attack_bonus:0,
        speed_bonus:0,
        graphicURL:'https://i.imgur.com/0LX0K0o.png',
        price:10
    },
    {
        name:'shield',
        description:'A shield',
        attack:0,
        armor:10,
        isTwoHanded:false,
        equip_location:'left_hand',
        preferred_class:'warrior',
        health_bonus:0,
        armor_bonus:0,
        attack_bonus:0,
        speed_bonus:0,
        graphicURL:'https://i.imgur.com/0LX0K0o.png',
        price:10
    },
    {
        name:'helmet',
        description:'A helmet',
        attack:0,
        armor:10,
        isTwoHanded:false,
        equip_location:'head',
        preferred_class:'warrior',
        health_bonus:0,
        armor_bonus:0,
        attack_bonus:0,
        speed_bonus:0,
        graphicURL:'https://i.imgur.com/0LX0K0o.png',
        price:10
    },
    {
        name:'boots',
        description:'A boots',
        attack:0,
        armor:10,
        isTwoHanded:false,
        equip_location:'feet',
        preferred_class:'warrior',
        health_bonus:0,
        armor_bonus:0,
        attack_bonus:0,
        speed_bonus:0,
        graphicURL:'https://i.imgur.com/0LX0K0o.png',
        price:10
    },
    {
        name:'chestplate',
        description:'A chestplate',
        attack:0,
        armor:10,
        isTwoHanded:false,
        equip_location:'chest',
        preferred_class:'warrior',
        health_bonus:0,
        armor_bonus:0,
        attack_bonus:0,
        speed_bonus:0,
        graphicURL:'https://i.imgur.com/0LX0K0o.png',
        price:10
    }
]

const createGear = async function() {
    console.log('createGear');

    await prisma.gear.createMany({
        data:gears
    })

}


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
