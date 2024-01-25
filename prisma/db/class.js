const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()


const classes =[
    {
        // id:1,               
        name: 'warrior',              
        description: 'The strongest of all, but slow',       
        beginning_attack: 5, 
        beginning_armor: 6,    
        beginning_speed: 4,  
        beginning_hp: 100,       
        graphicUrl: '',    
    },
        {
        // id:2,
        name:'mage',
        description:'The wizard can cast spells and attack from a distance',
        beginning_attack: 6,
        beginning_armor: 4,
        beginning_speed: 5,
        beginning_hp: 100,
        graphicUrl:'',
       
    },
    {
        // id:3,
        name:'rogue',
        description:'The rogue is the quickest of all classes',
        beginning_attack: 4,
        beginning_armor: 5,
        beginning_speed: 6,
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
