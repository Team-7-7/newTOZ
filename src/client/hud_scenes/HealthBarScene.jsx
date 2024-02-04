// HealthBarScene.jsx

import { CST } from "../loading_menu/CST.jsx";
import eventsCenter from "../EventsCenter.jsx";

export class HealthBarScene extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.HEALTH });
 
    //character stats to be loaded from pause screen
    this.characterHealth = 1;
    this.characterMaxHealth = 1;
    this.characterArmor = 1;
    this.characterAttack = 1;
    this.characterSpeed = 1;
 }


  preload() {
    this.load.spritesheet('heart', 'assets/hud/heart_spritesheet.png', {
      frameWidth: 32,
      frameHeight: 32,
      startFrame: 0,
      endFrame: 2
    });
  }

  create() {

    // GETS HEALTH WHEN STATS ARE UPDATED:
    //eventsCenter.emit('updateStats',  this.characterHealth, this.characterMaxHealth,this.characterArmor,this.characterAttack,this.characterSpeed);
    eventsCenter.on('updateStats', (health, maxHealth, armor, attack, speed ) =>{
    this.characterHealth = health; 
    this.characterMaxHealth = maxHealth;
    this.characterArmor = armor;
    this.characterAttack = attack;
    this.characterSpeed = speed;
} )
    // let playerHealth = 100; //use a 5 heart system to represent the total HP
    let playerHealth = this.characterMaxHealth; //use a 5 heart system to represent the total HP


    this.hearts = this.add.group();
    for (let i = 0; i < playerHealth/20; i++) {
      const heart = this.add.sprite(30 + i * 40, 30, 'heart');
      this.hearts.add(heart.setFrame(0));
    }

  // Listen for 'updateHP' event on Levels
  eventsCenter.on('updateHP', (newHealth) => {
    playerHealth = newHealth; // Update the player's health
    this.updateHealth(playerHealth);
  }, this);
}
  
  updateHealth(health) {
    // Update your hearts based on the player's health
    let healthConversion = Math.floor(health / 20);
    let remainder = health % 20;
    // console.log('health', health, "healthConversion", healthConversion, "halfheart-remainder", remainder)

    if (health>0){
    this.hearts.children.iterate((heart, index) => {
      if (index < healthConversion) {
        heart.setFrame(0); // Filled heart
      } else if (index === healthConversion && remainder > 5) {
        // Half-filled heart for the remaining health
        heart.setFrame(1);
      } else {
        heart.setFrame(2); // Empty heart
      }
    })
    
    //LOGIC FOR GAME OVER LIVES ON THE LEVEL SCENES in the updateCharacterHealth(healthChange) METHOD
    // if (health <= 0) {
    //   // Player health is 0 or below, transition to game over scene
    //   this.scene.start(CST.SCENES.GAMEOVER);
    // }

  
  };

  

  }
}
