const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()

const createCharacter = async (
    name, 
    gender, 
    character_class, 
    currentHP, 
    maxHP, 
    xp, 
    level, 
    graphicURL, 
    gold, 
    head_gear1, 
    leaft_hand_gear2, 
    right_hand_gear3, 
    foot_gear4, 
    chest_gear5, 
    base_attack, 
    base_armor, 
    base_speed, 
    isNPC, 
    location_coordinates, 
    inventoryid, 
    stagescompleted) => {
    try {
        await prisma.client.query(
            `INSERT INTO characters(name, gender, class, currentHP,  maxHP, xp, level, graphicURL, gold, head_gear1, leaft_hand_gear2, right_hand_gear3, foot_gear4, chest_gear5, base_attack, base_armor, base_speed, isNPC, location_coordinates, inventoryid, stagescompleted) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)`,
               [name, 
                gender, 
                character_class, 
                currentHP, 
                maxHP, 
                xp, 
                level, 
                graphicURL, 
                gold, 
                head_gear1, 
                leaft_hand_gear2, 
                right_hand_gear3, 
                foot_gear4, 
                chest_gear5, 
                base_attack, 
                base_armor, 
                base_speed, 
                isNPC, 
                location_coordinates, 
                inventoryid, 
                stagescompleted]
        );
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createCharacter
};