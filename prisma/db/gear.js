const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()

const gears =[
    {
        id:1,
        name:'sword',
        description:'A sword',
        attack:10,
        armor:0,
        isTwoHanded:false,
        equip_location:3,
        preferred_class:'warrior',
        health_bonus:0,
        armor_bonus:0,
        attack_bonus:0,
        speed_bonus:0,
        graphicURL:'',
        price:10,
        Character_Gear: []
    },
    {
        id:2,
        name:'shield',
        description:'A shield',
        attack:0,
        armor:10,
        isTwoHanded:false,
        equip_location:2,
        preferred_class:'warrior',
        health_bonus:0,
        armor_bonus:0,
        attack_bonus:0,
        speed_bonus:0,
        graphicURL:'',
        price:10,
        Character_Gear: []
    },
    {
        id:3,
        name:'helmet',
        description:'A helmet',
        attack:0,
        armor:10,
        isTwoHanded:false,
        equip_location:1,
        preferred_class:'warrior',
        health_bonus:0,
        armor_bonus:0,
        attack_bonus:0,
        speed_bonus:0,
        graphicURL:'',
        price:10,
        Character_Gear: []
    },
    {
        id:4,
        name:'boots',
        description:'A boots',
        attack:0,
        armor:10,
        isTwoHanded:false,
        equip_location:4,
        preferred_class:'warrior',
        health_bonus:0,
        armor_bonus:0,
        attack_bonus:0,
        speed_bonus:0,
        graphicURL:'',
        price:10,
        Character_Gear: []
    },
    {
        id:5,
        name:'chestplate',
        description:'A chestplate',
        attack:0,
        armor:10,
        isTwoHanded:false,
        equip_location:5,
        preferred_class:'warrior',
        health_bonus:0,
        armor_bonus:0,
        attack_bonus:0,
        speed_bonus:0,
        graphicURL:'',
        price:10,
        Character_Gear: []
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
