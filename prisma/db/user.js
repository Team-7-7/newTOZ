const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()

const users =[
    {
        id:1,
        username:'sal',
        password:'password',
        isAdmin:false,
        isBanned:false,
        createdAt: Date, Time,
        characterid:1,
        phone:'555-555-5555'
    }
]

const createUser = async () => {
    console.log('createUser');

    await prisma.user.createMany({
        data:users
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
