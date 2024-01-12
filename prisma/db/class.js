const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()


const classes =[
    {
        id:1,               
        name: 'warrior',              
        description: 'A warrior',       
        begininning_attack: 15, 
        beginning_armor: 15,    
        beginning_speed: 5,  
        beginning_hp: 100,       
        graphicURL: 'https://i.imgur.com/0LX0K0o.png',    
    },
        {
        id:2,
        name:'mage',
        description:'A mage',
        begininning_attack: 5,
        beginning_armor: 5,
        beginning_speed: 15,
        beginning_hp: 100,
        graphicURL:'https://i.imgur.com/0LX0K0o.png',
       
    },
    {
       id:3,
        name:'Kung Fu Master',
        description:'A Kung Fu Master',
        begininning_attack: 15,
        beginning_armor: 5,
        beginning_speed: 15,
        beginning_hp: 100,
        graphicURL:'https://i.imgur.com/0LX0K0o.png',
    }
]


const createClass = async () => {
    console.log('createClass');

    await prisma.class.createMany({
        data:classes
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
