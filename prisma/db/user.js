const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()

const users =[
    {
        username:'sal',
        password:'password',
        characterid:1,
        isAdmin:false,
        isBanned:false,
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
