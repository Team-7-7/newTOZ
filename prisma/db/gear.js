const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()

const createGear = async (
    name, 
    description, 
    attack, 
    armor, 
    isTwoHanded, 
    equip_location, 
    preferred_class, 
    health_bonus,
    armor_bonus,
    attack_bonus,
    speed_bonus,
    graphicURL,
    price) => { try{
        await prisma.client.query(
            `INSERT INTO gear(name, description, attack, armor, isTwoHanded, equip_location, preferred_class, health_bonus, armor_bonus, attack_bonus, speed_bonus, graphicURL, price) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11,$12,$13)`,
           [name, 
            description, 
            attack, 
            armor, 
            isTwoHanded, 
            equip_location, 
            preferred_class, 
            health_bonus, 
            armor_bonus, 
            attack_bonus, 
            speed_bonus, 
            graphicURL, 
            price]
        );
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createGear
};