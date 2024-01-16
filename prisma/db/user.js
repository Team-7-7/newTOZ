const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()

const users =[
    {
        id:1,
        username:'sal',
        password:'password',
        isAdmin:false,
        isBanned:false,
        character_id:1,
        phone:555555555,
        email:'sal@sal.com'
    }
]

const createUser = async () => {
    console.log('createUser');

    await prisma.user.createMany({
        data:users
    })

};



createUser()
.then(async () => {
    await prisma.$disconnect()
    console.log("done");
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
