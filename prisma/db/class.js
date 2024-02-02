const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()


const classes =[
    {
        // id:1,               
        name: 'warrior',              
        description: 'The strongest defense of all, but slow',       
        beginning_attack: 12, 
        beginning_armor: 6,    
        beginning_speed: 14,  
        beginning_hp: 100,       
        graphicUrl: '',    
    },
        {
        // id:2,
        name:'mage',
        description:'The best attack, aided by magic.',
        beginning_attack: 13,
        beginning_armor: 4,
        beginning_speed: 15,
        beginning_hp: 100,
        graphicUrl:'',
    },
    {
        // id:3,
        name:'rogue',
        description:'The quickest of the quick.',
        beginning_attack: 14,
        beginning_armor: 5,
        beginning_speed: 16,
        beginning_hp: 100,
        graphicUrl:'',
    }
]


const createCharacter_Class = async () => {
    console.log('createClass');

    await prisma.Character_Class.createMany({
        data:classes
    })

};

createCharacter_Class()
.then(async () => {
    await prisma.$disconnect()
    console.log("done");
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
