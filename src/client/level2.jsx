// level2.jsx

import { CST } from "./loading_menu/CST.jsx";
import eventsCenter from "./EventsCenter.jsx"; // this allows communication between scenes
import { PauseScene } from "./pauseScene.jsx";
import { store } from "./store"; // brings in redux store

export class Level2 extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.LEVEL2,
    });
    this.player;
    this.chest1;
    this.chest2;
    this.chest3;
    this.chest4;
    this.chest5;
    this.chest6;
    this.chest7;
    this.barrel1;
    this.barrel2;
    this.cursors;
    this.monster;
    this.monster1;
    this.monster2;
    this.monster3;
    this.monster4;
    this.monster5;
    this.monster6;
    this.monsters = [this.monster, this.monster1, this.monster2, this.monster3, this.monster4, this.monster5, this.monster6];
    this.gameOver = false;
    this.door;
    this.collisionCalled = false;
    this.level = 2;

    //character stats to be loaded from pause screen
    this.characterHealth = 1;
    this.characterMaxHealth = 1;
    this.characterArmor = 1;
    this.characterAttack = 1;
    this.characterSpeed = 1;

  }
  updateCharacterHealth(healthChange) {
    this.characterHealth -= healthChange;
    if (this.characterHealth <= 0) {   //no more health? go to GAME OVER 
      this.zurpalen.stop();            //stop the music
      this.walkingSound.stop();
      this.walkingSound2.stop();
      this.scene.start(CST.SCENES.GAMEOVER)};
    eventsCenter.emit('updateHP', this.characterHealth); // Emit 'updateCharacterHealth' event with the new health value
  };

  init() {
    isWalking: false;
  }
// ############################## PRELOAD ################################################  

  preload() {
    const state = store.getState(); // this brings in the state from redux

    this.load.image("tiles2", "/assets/levelAssets/OLDtileset32x32.png");
    this.load.tilemapTiledJSON("map2", "/assets/levelAssets/level2.json");

    // the three classes sprites load here
    switch(state.userCharacter.character.character_class){
      case "warrior":
          this.load.atlas('playerSprite', 'assets/levelAssets/knight78x60.png', 'assets/levelAssets/knight.json');
          break;
      case "mage":
          this.load.atlas('playerSprite', 'assets/levelAssets/mage78x60.png', 'assets/levelAssets/mage.json');
          break;
      case "rogue":
          this.load.atlas('playerSprite', 'assets/levelAssets/rogue78x60.png', 'assets/levelAssets/rogue.json');
          break;
      };
   //============================MONSTERS===============================================================
   this.load.atlas('werewolf', 'assets/levelAssets/white_wolf_spritesheet.png', 'assets/levelAssets/white_wolf_sprites.json');

   // ================ GOLD, DOORS, GEAR STUFF =============  
   this.load.spritesheet('chest', 'assets/levelAssets/chest_sprite.png', {frameWidth: 32, frameHeight: 32 });
   this.load.spritesheet('goldCoin', 'assets/levelAssets/goldCoin.png', {frameWidth: 40, frameHeight: 40});
   this.load.spritesheet('door','assets/levelAssets/door50x100.png', {frameWidth: 50, frameHeight: 100}) ;
   this.load.spritesheet('gear', 'assets/gear50x50.png', { frameWidth: 50, frameHeight: 50 });

 // ========== SOUND STUFF ======================
   this.load.audio('walking', 'assets/audio/soundeffects/steps1.mp3')
   this.load.audio('walking2', 'assets/audio/soundeffects/steps2.mp3')
   this.load.audio('swoosh', 'assets/audio/soundeffects/swoosh.mp3')
   this.load.audio('zurpalen', 'assets/audio/soundeffects/zurpalen.mp3')
}

// #########################  CREATE ############################################### 

  create() {

// =========== Health Bar healthbar =========== //
eventsCenter.on('updateHP', (newHealth) => {
  this.characterHealth = newHealth;
}, this);
// =========== End Health Bar ======== ///

// ==============  World Building Section ===================================

    this.scene.run('pauseScene'); // used to keep the pause scene updated with stats causes pausescene to run in the background
    this.scene.launch("PAUSE"); // starts the pause screen and loads stats

    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
    this.map = this.make.tilemap({ key: "map2" });
    const tileset = this.map.addTilesetImage("OLDtileset32x32", "tiles2");

    this.floorLayer = this.map.createLayer("floorLayer", tileset, 0, 0);
    this.floorLayer.setCollisionByProperty({ collides: false });

    const WorldLayer = this.map.createLayer("WorldLayer", tileset, 0, 0);
    WorldLayer.setCollisionByProperty({ collides: true });
    
    this.wallmounts = this.map.createLayer('wallmounts', tileset, 0, 0);
    this.wallmounts.setCollisionByProperty({ collides: false });

    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys({
      w: Phaser.Input.Keyboard.KeyCodes.W,
      a: Phaser.Input.Keyboard.KeyCodes.A,
      s: Phaser.Input.Keyboard.KeyCodes.S,
      d: Phaser.Input.Keyboard.KeyCodes.D,
      k: Phaser.Input.Keyboard.KeyCodes.K,
      p: Phaser.Input.Keyboard.KeyCodes.P,
      l: Phaser.Input.Keyboard.KeyCodes.L,
      });

// ===================== SOUND STUFF ================================
this.isSound1PlayedLast = true;
    this.lastSoundTimestamp = 0; 
    
    this.swoosh = this.sound.add('swoosh', {
      volume:0.8
    });

    this.zurpalen = this.sound.add('zurpalen', {
      volume:0.8,
      loop:true
    });

    this.walkingSound = this.sound.add('walking', {
      volume:0.5,
      loop:true
    });
    this.walkingSound2 = this.sound.add('walking2', {
      volume:0.5,
      loop:true
    })

    this.zurpalen.play();

    this.scene.run("pauseScene"); // used to keep the pause scene updated with stats causes pausescene to run in the background

    this.map = this.make.tilemap({ key: "map2" });
    
    this.floorLayer = this.map.createLayer("floorLayer", tileset, 0, 0);
    this.floorLayer.setCollisionByProperty({ collides: false });
    this.WorldLayer = this.map.createLayer("WorldLayer", tileset, 0, 0);
    this.WorldLayer.setCollisionByProperty({ collides: true });
    
     
    this.wallmounts = this.map.createLayer('wallmounts', tileset, 0, 0);
    this.wallmounts.setCollisionByProperty({ collides: false });

    // this.selectLayer(this.floorLayer);
    // this.selectLayer(this.worldLayer);
    // this.physics.add.collider(this.player, this.WorldLayer);  //DUPLICATE?

// ===================== PLAYER STUFF  ===========================================

    // The player and its settings
    this.player = this.physics.add.sprite(90, 90, "playerSprite");
    this.player.setSize(60, 54);

    // keep the player on the map
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, WorldLayer);

    // eventsCenter.on('updateStats', 'health', 'maxHealth','armor','attack','speed') => {
    eventsCenter.on('updateStats', (health, maxHealth,armor,attack,speed) => {
      this.characterHealth = health;
      this.characterMaxHealth = maxHealth;
      this.characterArmor = armor;
      this.characterAttack = attack;
      this.characterSpeed = speed;
  }, this);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("playerSprite", {
        frames:["sprite8", "sprite9", "sprite10", "sprite11", "sprite12", "sprite13"]
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "playerSprite", frame: ["sprite1"] }],
      frameRate: -1,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("playerSprite", {
        frames: ["sprite2", "sprite3", "sprite4", "sprite5", "sprite6", "sprite7"]
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "attackRight",
      frames: this.anims.generateFrameNumbers("playerSprite", {
       frames: ["sprite14", "sprite15", "sprite16", "sprite17", "sprite18", "sprite19"]
     
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.create({
      key: "attackLeft",
      frames: this.anims.generateFrameNumbers("playerSprite", {
        frames: ["sprite20", "sprite21", "sprite22", "sprite23", "sprite24", "sprite25"]
      }),
      frameRate: 2,
      repeat: -1,
    });

  //==========================================MONSTER====================================================
  //======================================MONSTER SPRITES===========================================
  this.monster = this.physics.add.sprite(776, 90, "werewolf", "sprite12");
  this.monster1 = this.physics.add.sprite(217, 951, "werewolf", "sprite12");
  this.monster2 = this.physics.add.sprite(436, 541, "werewolf", "sprite12");
  this.monster3 = this.physics.add.sprite(1186, 1071, "werewolf", "sprite12");
  this.monster4 = this.physics.add.sprite(1268, 298, "werewolf", "sprite12");
  this.monster5 = this.physics.add.sprite(992, 594, "werewolf", "sprite12");
  this.monster6 = this.physics.add.sprite(1436, 597, "werewolf", "sprite12");
  this.monster.setSize(60, 54);

  let monsters = [this.monster, this.monster1, this.monster2, this.monster3, this.monster4, this.monster5, this.monster6];
  monsters.forEach(monster => {
    monster.health = 100; 
  });

  //keeps monster in bounds
  this.physics.add.collider(this.monsters, WorldLayer);
  this.physics.add.collider(this.player, this.monsters);
  this.monster.setImmovable(true);
  this.monster.setCollideWorldBounds(true);
  this.monster.body.onCollide = (true);

  //monster animaiton movements
  this.anims.create({
    key: "WerewolfIdle",
    frames: this.anims.generateFrameNames("werewolf", { frames: [ "sprite6", "sprite7", "sprite1", "sprite2", "sprite3", "sprite4", "sprite5", "sprite8", ], }),
    frameRate: 5,
    repeat: -1,
    flipX: false,
  });

  this.anims.create({
    key: "WerewolfWalk",
    frames: this.anims.generateFrameNames("werewolf", { frames: [ "sprite18", "sprite15", "sprite11", "sprite9", "sprite12", "sprite16", "sprite19", "sprite17", "sprite13", "sprite10", "sprite14" ], }),
    frameRate: 5,
    repeat: -1,
    flipX: true,
  });

  this.anims.create({
    key: "WerewolfAttack",
    frames: this.anims.generateFrameNames("werewolf", { frames: [ "sprite55", "sprite53", "sprite52", "sprite50", "sprite51", "sprite54", "sprite56","sprite57", "sprite58", "sprite59", "sprite65", "sprite62" ], }),
    frameRate: 5,
    repeat: -1,
    flipX: true,
  });

  //play monster animations
  this.monster.anims.play('WerewolfIdle', 'WerewolfAttack', 'WerewolfWalk', true);
  this.monster1.anims.play('WerewolfIdle', 'WerewolfAttack', 'WerewolfWalk', true);
  this.monster2.anims.play('WerewolfIdle', 'WerewolfAttack', 'WerewolfWalk', true);
  this.monster3.anims.play('WerewolfIdle', 'WerewolfAttack', 'WerewolfWalk', true);
  this.monster4.anims.play('WerewolfIdle', 'WerewolfAttack', 'WerewolfWalk', true);
  this.monster5.anims.play('WerewolfIdle', 'WerewolfAttack', 'WerewolfWalk', true);
  this.monster6.anims.play('WerewolfIdle', 'WerewolfAttack', 'WerewolfWalk', true);
    

  // =================== GEAR, CHESTS, GOLD STUFF ====================================================

       // ********************* dropping gear ********************************
      
       eventsCenter.on('droppingGear', (droppedGearNumber)=>{
        if (this.level === 2){
        let xdroplocation = getRandomInt(50)+50;
          if(xdroplocation %2 ==0){ xdroplocation = xdroplocation * -1}
          xdroplocation += this.player.x;
        let ydroplocation = getRandomInt(50)+50;
          if(ydroplocation %2 ==0){ ydroplocation = ydroplocation * -1}
          ydroplocation += this.player.y;
        let droppedGear = this.physics.add.sprite(xdroplocation, ydroplocation, 'gear' , droppedGearNumber-1);
        this.physics.add.collider(this.player, droppedGear, () => {
          this.collectItem(droppedGear, 'lootGear', droppedGearNumber);
        }, null, this); 
      }
      },this)

  
        this.collectItem = (item, lootItem, gearNumber) => {
          item.destroy();        //item is removed from the scene
          //item is added to inventory
          if(lootItem === 'lootGold'){
            const amountOfGold=1+ Math.floor(Math.random()*5);
            eventsCenter.emit('updateGold', amountOfGold);
          }else if (lootItem === 'lootGear') {
            eventsCenter.emit('lootedItem', gearNumber);
          }
        };
  
         // chest functions broken into two functions to avoid unwanted collisions (gold in walls, etc) 
  
         const openChestTopRight = (chest) => {
            chest.setFrame(1);
            const xlocation=chest.x+30;
            const ylocation=chest.y+30;
              const gold = this.physics.add.sprite(xlocation,ylocation,'goldCoin');
              this.physics.add.collider(this.player, gold, () => {
                  this.collectItem(gold, 'lootGold');
                }, null, this)
          // gear loot code here        
              const randomLootNumber = getRandomInt(10)+1;
                if (randomLootNumber>6){ // ******************************* there are 6 possible loot items in the gear database *****
                  // no extra loot found
                }else{
                  // randomLoot = randomLootNumber;
                  const gearLoot = this.physics.add.sprite(xlocation+20, ylocation+20, 'gear' , randomLootNumber-1);
                  this.physics.add.collider(this.player, gearLoot, () => {
                    this.collectItem(gearLoot, 'lootGear', randomLootNumber);
                  }, null, this);          
                };
  
            // ************** code to disable the chest here *******************
            switch(chest){
              case this.chest1: chest1Collider.destroy();
                break;
              case this.chest2: chest2Collider.destroy();
                break;
              case this.chest3: chest3Collider.destroy();
                break;
              case this.chest4: chest4Collider.destroy();
                break;
              case this.chest5: chest5Collider.destroy();
                break;
              case this.chest6: chest6Collider.destroy();
                break;
              case this.chest7: chest7Collider.destroy();
                break;
            }
        };   
  
        const openChestBottomLeft = (chest) => {
          chest.setFrame(1);
          const xlocation=chest.x-30;
          const ylocation=chest.y-30;
            const gold = this.physics.add.sprite(xlocation,ylocation,'goldCoin');
            this.physics.add.collider(this.player, gold, () => {
                    this.collectItem(gold, 'lootGold');
                  }, null, this);
            const randomLootNumber = getRandomInt(10)+1;
              if (randomLootNumber>6){ // ******************************* there are 6 possible loot items in the gear database *****
                // no extra loot found
              }else{
                const gearLoot = this.physics.add.sprite(xlocation-20, ylocation-20, 'gear' , randomLootNumber-1);
                this.physics.add.collider(this.player, gearLoot, () => {
                this.collectItem(gearLoot, 'lootGear', randomLootNumber);
                }, null, this);          
              };
            switch(chest){
              case this.chest1: chest1Collider.destroy();
                break;
              case this.chest2: chest2Collider.destroy();
                break;
              case this.chest3: chest3Collider.destroy();
                break;
              case this.chest4: chest4Collider.destroy();
                break;
              case this.chest5: chest5Collider.destroy();
                break;
              case this.chest6: chest6Collider.destroy();
                break;
              case this.chest7: chest7Collider.destroy();
                break;
            }
        };   

        this.chest1 = this.physics.add.staticSprite(463, 256, 'chest', 0);
        this.chest2 = this.physics.add.staticSprite(75, 272, 'chest', 0);
        this.chest3 = this.physics.add.staticSprite(78, 948, 'chest', 0);
        this.chest4 = this.physics.add.staticSprite(996, 259, 'chest', 0);
        this.chest5 = this.physics.add.staticSprite(1270, 95, 'chest', 0);
        this.chest6 = this.physics.add.staticSprite(733, 1077, 'chest', 0);
  
        const chest1Collider = this.physics.add.collider(this.player, this.chest1, ()=>openChestTopRight(this.chest1));
        const chest2Collider = this.physics.add.collider(this.player, this.chest2, ()=>openChestBottomLeft(this.chest2));
        const chest3Collider = this.physics.add.collider(this.player, this.chest3, ()=>openChestBottomLeft(this.chest3));
        const chest4Collider = this.physics.add.collider(this.player, this.chest4, ()=>openChestBottomLeft(this.chest4));
        const chest5Collider = this.physics.add.collider(this.player, this.chest5, ()=>openChestBottomLeft(this.chest5));
        const chest6Collider = this.physics.add.collider(this.player, this.chest6, ()=>openChestTopRight(this.chest6));

         //***************** barrels ******************* */

      this.barrel1 = this.physics.add.staticSprite(207, 272, 'barrels', 2); // healing barrel
      this.barrel2 = this.physics.add.staticSprite(1171, 761, 'barrels', 1); // poison barrel
      const barrel1Collider = this.physics.add.collider(this.player, this.barrel1, ()=> {

        this.barrel1.setFrame(3);
        //update player health
        eventsCenter.emit('updateHP', this.characterMaxHealth);
        barrel1Collider.destroy();

      });
      const barrel2Collider = this.physics.add.collider(this.player, this.barrel2, ()=> {
        this.barrel2.setFrame(3);
        //update player health
        eventsCenter.emit('updateHP', this.characterHealth/2);
        this.player.setTint(0x00FF00); // Set the player sprite to green
          this.time.delayedCall(1000, () => {
            this.player.clearTint(); // Remove the tint after 1 second
          }, [], this);
        barrel2Collider.destroy();

      });

    
// ======================camera controls, follows player and zooms in ==================================
this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
this.cameras.main.setZoom(1); // 1 is the default zoom level
// Set boundaries for the camera
//   this.cameras.main.setBounds(0, 0, 1600, 1200);k
this.cameras.main.setBounds(-500, -500, 2300, 2100);
eventsCenter.on(
  "gameOver",
  (bool) => {
    console.log("someone quit the game");
    this.gameOver = bool;
  },this);
}

// ############################### UPDATE ###############################################

  update(){
    
    if (this.gameOver) {
        return;
      }
      
      function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }
  // ===================  KEY CONTROLS ==============================================
     
  let playerDirection = "right"; // Default direction

if (this.keys.a.isDown || this.cursors.left.isDown) {
  this.player.setVelocityX(-10* this.characterSpeed);
  this.player.anims.play("left", true);
  playerDirection = "left";
} else if (this.keys.d.isDown || this.cursors.right.isDown) {
  this.player.setVelocityX(10* this.characterSpeed);
  this.player.anims.play("right", true);
  playerDirection = "right";
} else {
  this.player.setVelocityX(0);
  this.player.anims.play("turn", true);
}

if (this.keys.w.isDown || this.cursors.up.isDown) {
  this.player.setVelocityY(-10* this.characterSpeed);
  this.player.anims.play("left", true);
  playerDirection = "up";
} else if (this.keys.s.isDown || this.cursors.down.isDown) {
  this.player.setVelocityY(10* this.characterSpeed);
  this.player.anims.play("right", true);
  playerDirection = "down";
} else {
  this.player.setVelocityY(0);
}

if (this.keys.k.isDown) {
  this.player.anims.stop(); // stop animation to play attack animation
  if (playerDirection === "left") {
    this.player.anims.play("attackLeft", true);
    console.log(this.player.anims.isPlaying);
  } else if (playerDirection === "right") {
    this.player.anims.play("attackRight", true);
    console.log(this.player.anims.isPlaying);
  } else if (playerDirection === "up") {
    this.player.anims.play("attackUp", true);
  } else if (playerDirection === "down") {
    this.player.anims.play("attackDown", true);
  }
}

if (this.keys.p.isDown) {
  this.scene.pause("LEVEL2");
  this.scene.launch("PAUSE");
}

if (this.keys.l.isDown) {
  console.log(
    "The player is at these coordinates",
    `x: ${this.player.x}`,
    `y: ${this.player.y}`
  );
}
  

// ===========================  SOUNDS STUFF ==================================================
  //code alternates walking sound effects to avoid overlap
  if((this.keys.a.isDown || this.cursors.left.isDown) && this.time.now - this.lastSoundTimestamp > 500){
    if(this.isSound1PlayedLast) {
      this.walkingSound.play();
    } else {
      this.walkingSound2.play();
    }
    this.isSound1PlayedLast = !this.isSound1PlayedLast;
    this.lastSoundTimestamp = this.time.now;
  }
  if((this.keys.d.isDown || this.cursors.right.isDown) && this.time.now - this.lastSoundTimestamp > 500){
    if(this.isSound1PlayedLast) {
      this.walkingSound.play();
    } else {       
      this.walkingSound2.play();
    }
    this.isSound1PlayedLast = !this.isSound1PlayedLast;
    this.lastSoundTimestamp = this.time.now;
  }
  if((this.keys.w.isDown || this.cursors.up.isDown) && this.time.now - this.lastSoundTimestamp > 500){
    if(this.isSound1PlayedLast) {    
      this.walkingSound.play();
    } else {
      this.walkingSound2.play();
    }
    this.isSound1PlayedLast = !this.isSound1PlayedLast;
    this.lastSoundTimestamp = this.time.now;
  }
  if((this.keys.s.isDown || this.cursors.down.isDown) && this.time.now - this.lastSoundTimestamp > 500){
    if(this.isSound1PlayedLast) {  
      this.walkingSound.play();
    } else {
      this.walkingSound2.play();
    }
    this.isSound1PlayedLast = !this.isSound1PlayedLast;
    this.lastSoundTimestamp = this.time.now;
  }
  if(this.keys.a.isDown || this.keys.d.isDown || this.keys.w.isDown || this.keys.s.isDown || this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown){
    this.isMoving = true;
  } else {
    this.isMoving = false;
    setTimeout(() => {
      if(this.player.body.velocity.y === 0 && !this.isMoving){    
        this.walkingSound.stop();
        this.walkingSound2.stop();
      }
    }); 
  }
 if(this.keys.k.isDown){
  this.swoosh.play();
 }
 
 // ========================  MONSTER STUFF ============================================
let monsters = [this.monster, this.monster1, this.monster2, this.monster3, this.monster4, this.monster5, this.monster6]; 

 monsters.forEach(monster => {
   const monsterCollider = this.physics.add.overlap(this.player, monster, () => { 
     // decrease health when player and monster collide
     if (!this.timerDamage){ 
       this.updateCharacterHealth(10*.50);
       this.timerDamage = true;
       this.timerDamage = this.time.delayedCall(800, () => {
         this.timerDamage = false;
         this.player.clearTint(); // Remove the tint
       }, [], this);
 
       this.player.setTint(0xff0000); // Set the player sprite to red
       if (this.characterHealth <= 0) {
       }
     }
 
     // the player can attack while there is overlap
     if(this.keys.k.isDown){
       if(!this.timerPlayerDamage){
         console.log('monster health is: ', monster.health);
         let playerDamage = this.characterAttack*4;
         monster.health -= playerDamage;
         this.timerPlayerDamage = true;
         this.timerPlayerDamage = this.time.delayedCall(500, () => {this.timerPlayerDamage = false;}, [], this);
         if(monster.health <= 1){
           console.log('monster is dead');
           monsterCollider.destroy();
           //gold coin drop
           let xdroplocation = getRandomInt(50)+50;
           if(xdroplocation %2 ==0){ xdroplocation = xdroplocation * -1}
           xdroplocation += this.player.x;
            let ydroplocation = getRandomInt(50)+50;
           if(ydroplocation %2 ==0){ ydroplocation = ydroplocation * -1}
           ydroplocation += this.player.y;
           const gold = this.physics.add.sprite(xdroplocation,ydroplocation,'goldCoin');
           this.physics.add.collider(this.player, gold, () => {
               this.collectItem(gold, 'lootGold');
             }, null, this)
          //  this.physics.add.staticSprite(monster.x, monster.y, 'chest', 2);
           monster.destroy()
         }
       }
     }
   });
 });

//=================================MonsterTracking=====================================
  let followDistance = 150;
  let speed = 50;

  monsters.forEach(monster => {
    if(!monster || !monster.body){
      return;
    }
    // Seek AI movement
    let directionX = this.player.x - monster.x;
    let directionY = this.player.y - monster.y;

    // direction to unit vector
    let magnitude = Math.sqrt(directionX * directionX + directionY * directionY);

    // Check if the distance is less than a certain value
    if (magnitude < followDistance) {
      directionX /= magnitude;
      directionY /= magnitude;

      // monsters velocity
      monster.body.velocity.x = directionX * speed;
      monster.body.velocity.y = directionY * speed;

      // Determine the direction of the monster's movement and play the appropriate animation
      if (directionX > 0) {
        monster.flipX = false; // face right
        monster.anims.play("WerewolfWalk", true);
      } else {
        monster.flipX = true; // face left
        monster.anims.play("WerewolfWalk", true);
      }

      // Monster attack
      if ( Phaser.Math.Distance.Between(monster.x, monster.y, this.player.x, this.player.y) < 75
      ) { 
        monster.damage = 10;
        monster.body.velocity.x = 0;
        monster.anims.play("WerewolfAttack", true);
      }
    } else {
      // If the player is too far, stop the monster
      monster.body.velocity.x = 0;
      monster.body.velocity.y = 0;
      monster.anims.stop;
    }
  });
 // =====================  LEVEL CHANGE ============================================
 let threshold = 50;


 if (Math.abs(this.player.x - 1441) < threshold && Math.abs(this.player.y - 62) < threshold) {
   this.level = 3;
   eventsCenter.emit('levelChange', 3);
   this.zurpalen.stop();
   this.walkingSound.stop();
   this.walkingSound2.stop();
   this.scene.start(CST.SCENES.ZARPULEN);
   this.scene.destroy(Level2);

}








  } 



};
// }

