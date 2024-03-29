// level3.jsx

import { CST } from "./loading_menu/CST.jsx";

import eventsCenter from "./EventsCenter.jsx"; // this allows communication between scenes

import { PauseScene } from "./pauseScene.jsx";

import { store } from "./store"; // brings in redux store

export class Level3 extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.LEVEL3,
    });
    this.player;
    this.chest1;
    this.chest2;
    this.barrel1;
    this.barrel2;
    this.cursors;
    this.monster;
    this.medusa;
    this.gameOver = false;
    this.level = 3;
    this.hasPLayed = false;
  }


  //this method takes in the amount the health needs to change for a loss. To increase health the argument would need to paradoxically, be a negative mumber
  //example:    this.updateCharacterHealth(this.monster.damage*.0001); 
  updateCharacterHealth(healthChange) {
    console.log('healthchange is: ', healthChange);
    this.characterHealth -= healthChange;
    if (this.characterHealth <= 0) {   //no more health? go to GAME OVER 
      this.zurpalen.stop();            //stop the music
      this.walkingSound.stop();
      this.walkingSound2.stop();
      this.scene.start(CST.SCENES.GAMEOVER)};
      console.log('health is at: ', this.characterHealth);
    eventsCenter.emit('updateHP', this.characterHealth); // Emit 'updateCharacterHealth' event with the new health value
  };

  init() {
    console.log("level3");
    isWalking: false;
  }

  preload() {
    const state = store.getState(); // this brings in the state from redux
    console.log(state, "in preload");
    console.log(
      "this is the character class: ",
      state.userCharacter.character.character_class
    );

    this.load.image("tiles3", "/assets/levelAssets/OLDtileset32x32.png");
    this.load.tilemapTiledJSON("map3", "/assets/levelAssets/level3.json");

    // the three classes sprites load here
    switch(state.userCharacter.character.character_class){
      case "warrior":
          console.log('loading the warrior');
          this.load.atlas('playerSprite', 'assets/levelAssets/knight78x60.png', 'assets/levelAssets/knight.json');
          break;
      case "mage":
          console.log('loading the mage');
          this.load.atlas('playerSprite', 'assets/levelAssets/mage78x60.png', 'assets/levelAssets/mage.json');
          break;
      case "rogue":
          console.log('loading the rogue');
          this.load.atlas('playerSprite', 'assets/levelAssets/rogue78x60.png', 'assets/levelAssets/rogue.json');
          break;
      };

    this.load.atlas(
      "skeleton",
      "assets/levelAssets/skeleton_spritesheet.png",
      "assets/levelAssets/skeleton_sprites.json"
    );

    this.load.spritesheet("chest", "assets/levelAssets/chest_sprite.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("goldCoin", "assets/levelAssets/goldCoin.png", {
      frameWidth: 40,
      frameHeight: 40,
    });
    this.load.spritesheet("sword", "assets/levelAssets/swordIcon25x48.png", {
      frameWidth: 25,
      frameHeight: 48,
    });
    this.load.spritesheet("door", "assets/levelAssets/door50x100.png", {
      frameWidth: 50,
      frameHeight: 100,
    });




    this.load.audio('walking', 'assets/audio/soundeffects/steps1.mp3')
    this.load.audio('walking2', 'assets/audio/soundeffects/steps2.mp3')
    this.load.audio('zurpalen', 'assets/audio/soundeffects/zurpalen.mp3')
    this.load.audio('swoosh', 'assets/audio/soundeffects/swoosh.mp3')
    this.load.audio('BossMusic', 'assets/audio/soundeffects/bossfight.mp3')
 
 
 // ########################### Medusa boss ############################
 this.load.atlas('medusa', 'assets/levelAssets/medusa.png', 'assets/levelAssets/medusa-sprite.json');
 // Medusa hear spritesheet
 this.load.spritesheet('medusa_heart', 'assets/hud/heart_spritesheet.png', {
  frameWidth: 32,
  frameHeight: 32,
  startFrame: 0,
  endFrame: 2
});
this.load.spritesheet('smoke', "/assets/finale/poison-cloud-spritesheet.png", {
  frameWidth: 144,
  frameHeight: 144,
  startFrame: 0,
  endFrame: 18
});
  }

  updateMedusaHealth(health) {
    // Update health bar based on Medusa's health
    let healthConversion = Math.floor(health / 30);
    let remainder = health % 30;

    if (health > 0) {
      this.medusa_hearts.children.iterate((medusa_heart, index) => {
        if (index < healthConversion) {
          medusa_heart.setFrame(2); // Filled heart
        } else if (index === healthConversion && remainder > 15) {
          medusa_heart.setFrame(1); // Half-filled heart for the remaining health
          medusa_heart.setFlipX(true);
        } else {
          medusa_heart.setFrame(0); // Empty heart
        }
      });
    }
  }

  create() {

    // =========== Health Bar healthbar =========== //
    eventsCenter.on('updateHP', (newHealth) => {
      this.characterHealth = newHealth;
    }, this);
    // =========== End Health Bar ======== /// 

    
    this.scene.run('pauseScene'); // used to keep the pause scene updated with stats causes pausescene to run in the background
    this.scene.launch("PAUSE"); // starts the pause screen and loads stats

    
    
    this.isSound1PlayedLast = true;
    this.lastSoundTimestamp = 0; 

    this.swoosh = this.sound.add('swoosh', {
      volume:0.8
    });

    this.bossMusic = this.sound.add('BossMusic', {
      volume:0.5,
      loop:true
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
    


    this.map = this.make.tilemap({ key: "map3" });
    const tileset = this.map.addTilesetImage("OLDtileset32x32", "tiles3");
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }

    
    this.floorLayer = this.map.createLayer("floorLayer", tileset, 0, 0);
    this.floorLayer.setCollisionByProperty({ collides: false });
    this.WorldLayer = this.map.createLayer("WorldLayer", tileset, 0, 0);
    this.WorldLayer.setCollisionByProperty({ collides: true });
    
     
    this.wallmounts = this.map.createLayer('wallmounts', tileset, 0, 0);
    this.wallmounts.setCollisionByProperty({ collides: false });

    this.player = this.physics.add.sprite(57, 1104, "playerSprite");


    this.physics.add.collider(this.player, this.WorldLayer);

    // **************** Loading player stats ************************

    // eventsCenter.on('updateStats', 'health', 'maxHealth','armor','attack','speed') => {
      eventsCenter.on('updateStats', (health, maxHealth,armor,attack,speed) => {
        console.log('on main screen updating stats ');
        this.characterHealth = health;
        this.characterMaxHealth = maxHealth;
        this.characterArmor = armor;
        this.characterAttack = attack;
        this.characterSpeed = speed;
        console.log('character speed is: ', this.characterSpeed);
  
  
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

this.player.setCollideWorldBounds(true);

//################ MEDUSA BELOW  ###########//
  this.medusa = this.physics.add.sprite(513, 109, "medusa", "a1")
  this.medusa.maxHealth = 300;
  this.medusa.health = 300;
  this.medusa.setScale(1.5)
  this.medusa.setOrigin(0.5, 0.5);

  //keeps medusa in bounds
  this.physics.add.collider(this.medusa, this.WorldLayer);
  this.physics.add.collider(this.player, this.medusa);
  this.medusa.setImmovable(true);
  this.medusa.setCollideWorldBounds(true);
  this.medusa.body.onCollide = (true);

  // MEDUSA HEALTH BAR //
  let medusaHealth = this.medusa.maxHealth;
  this.medusa_hearts = this.add.group();
  for (let i = 0; i < 10; i++) {
    const medusa_heart = this.add.sprite(583 + i * 40, 780, 'medusa_heart'); 
    medusa_heart.setFrame(2); 
    medusa_heart.setTint(0x32CD32); // Tint the medusa_heart green
    this.medusa_hearts.add(medusa_heart);
  }

  // Listen for 'updateMedusaHP' event
  eventsCenter.on('updateMedusaHP', (newMedusaHealth) => {
    medusaHealth = newMedusaHealth; // Update Medusa's health
    this.updateMedusaHealth(medusaHealth);
  }, this);
    
  //medusa animation movements
  this.anims.create({
    key: "MedusaIdle",
    frames: this.anims.generateFrameNames("medusa", { frames: [ "idle1","idle2","idle3","idle4","idle5","idle6" ], }),
    frameRate: 8,
    repeat: -1,
  });

  this.anims.create({
    key: "MedusaMove",
    frames: this.anims.generateFrameNames("medusa", { frames: [ "move1", "move2", "move3", "move4" ], }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "MedusaDeath",
    frames: this.anims.generateFrameNames("medusa", { frames: [ "death1", "death2", "death3", "death4", "death5", "death6" ], }),
    frameRate: 8,
    repeat: 1,
  });
  
  this.anims.create({
    key: "MedusaHurt",
    frames: this.anims.generateFrameNames("medusa", { frames: [ "hurt1", "hurt2", "hurt3" ], }),
    frameRate: 9,
    repeat: 9,
  });
  
  this.anims.create({
    key: "MedusaAttackSnakes",
    frames: this.anims.generateFrameNames("medusa", { frames: [ "a1", "a2", "a3", "a4", "a5", "a6", "a7" ], }),
    frameRate: 10,
    repeat: 3,
  });

  this.anims.create({
    key: "MedusaAttackDeathRay",
    frames: this.anims.generateFrameNames("medusa", { frames: [ "attack1", "attack2", "attack3", "attack4", "attack5", "attack6" ], }),
    frameRate: 10,
    repeat: 3,
  });
  
//play monster animations
this.medusa.anims.play('MedusaIdle', 'MedusaMove', 'MedusaDeath', 'MedusaHurt', 'MedusaAttackSnakes', 'MedusaAttackDeathRay', true);


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
    
   eventsCenter.on('droppingGear', (droppedGearNumber)=>{
    if (this.level === 3){
    console.log ('dropped gear number is: ', droppedGearNumber);
    let xdroplocation = getRandomInt(50)+50;
      if(xdroplocation %2 ==0){ xdroplocation = xdroplocation * -1}
      xdroplocation += this.player.x;
    let ydroplocation = getRandomInt(50)+50;
      if(ydroplocation %2 ==0){ ydroplocation = ydroplocation * -1}
      ydroplocation += this.player.y;
      console.log('player location is: ', this.player.x, ' ', this.player.y);
      console.log('x and y are: ', xdroplocation, ' ', ydroplocation);
    let droppedGear = this.physics.add.sprite(xdroplocation, ydroplocation, 'gear' , droppedGearNumber-1);
    this.physics.add.collider(this.player, droppedGear, () => {
      this.collectItem(droppedGear, 'lootGear', droppedGearNumber);
    }, null, this); 
  }
  },this)

         //***************** barrels ******************* */

         this.barrel1 = this.physics.add.staticSprite(89, 663, 'barrels', 2); // healing barrel
         this.barrel2 = this.physics.add.staticSprite(945, 75, 'barrels', 2); // healing barrel
         const barrel1Collider = this.physics.add.collider(this.player, this.barrel1, ()=> {
   
           this.barrel1.setFrame(3);
           //update player health
           eventsCenter.emit('updateHP', this.characterMaxHealth);
           barrel1Collider.destroy();
         });
         const barrel2Collider = this.physics.add.collider(this.player, this.barrel2, ()=> {
           this.barrel2.setFrame(3);
           //update player health
           eventsCenter.emit('updateHP', this.characterMaxHealth);  
          barrel2Collider.destroy();
         });
 
    //camera controls, follows player and zooms in
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    this.cameras.main.setZoom(1); // 1 is the default zoom level
    // Set boundaries for the camera
    //   this.cameras.main.setBounds(0, 0, 1600, 1200);k
    this.cameras.main.setBounds(-500, -500, 2300, 2100);
}
  update(){
    
    if (this.gameOver) {
        return;
      }

      function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }
  
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
        this.scene.pause("LEVEL3");
        this.scene.launch("PAUSE");
      }
      
      if (this.keys.l.isDown) {
        console.log(
          "The player is at these coordinates",
          `x: ${this.player.x}`,
          `y: ${this.player.y}`
        );
      }


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



//MEDUSA Collider
const medusaCollider = this.physics.add.overlap(this.player, this.medusa, () => { 
  // decrease health when player and monster collide
  if (!this.timerDamage){ 
   this.updateCharacterHealth(5);

   console.log('character is hit');
   this.timerDamage = true;
   this.timerDamage = this.time.delayedCall(800, () => {
     this.timerDamage = false;
     this.player.clearTint(); // Remove the tint
   }, [], this);

   this.player.setTint(0xff0000); // Set the player sprite to red

   if (this.characterHealth <= 0) {
     console.log ('player is dead');
   }
 }

 // the player can attack while there is overlap
 if(this.keys.k.isDown){
   if(!this.timerPlayerDamage){
     console.log('medusa health is: ', this.medusa.health);
     let playerDamage = this.characterAttack*2;
     this.medusa.health -= playerDamage;
     this.medusa.anims.play("MedusaHurt", true);
     console.log('in overlap function, monster health is: ', this.medusa.health);
     this.timerPlayerDamage = true;
     this.timerPlayerDamage = this.time.delayedCall(500, () => {this.timerPlayerDamage = false;}, [], this);
     console.log('this.monster.health is: ', this.medusa.health);
     this.updateMedusaHealth(this.medusa.health)
     if(this.medusa.health <1){
       console.log('medusa is dead')
      //  this.medusa.anims.stop();
       this.medusa.anims.play("MedusaDeath", true);
       
       let medusaX = this.medusa.x; // Get Medusa's current x position
       let medusaY = this.medusa.y-80; // Get Medusa's current y position
       medusaCollider.destroy();
       this.medusa.destroy()

       const smoke = this.add.sprite(medusaX, medusaY, 'smoke').setScale(2);
       smoke.setAlpha(0.9);
       smoke.setVisible(true);
   
       // Define the SMOKE animation configuration
       const smokeAnimationConfig = {
         key: 'smokeAnimation',
         frames: this.anims.generateFrameNumbers('smoke', { start: 0, end: 18 }),
         frameRate: 10,
         repeat: -1,
       };
   
       // Create the SMOKE animation
       this.anims.create(smokeAnimationConfig);
       smoke.anims.play('smokeAnimation')

       setTimeout(() => {
        this.bossMusic.stop();
        this.walkingSound.stop();
        this.walkingSound2.stop();
        this.scene.start(CST.SCENES.FINALE);
      }, 3000)

   }
 }
}});

//################ MEDUSA ABOVE  ###########//

this.medusa.on('animationcomplete', function (animation, frame) {
  // Check if the completed animation is MedusaHurt
  if (animation.key === "MedusaHurt") {
      // Perform any actions you need after the MedusaHurt animation completes
      // For example, you can play the MedusaIdle animation here
      this.medusa.anims.play("MedusaMove", true);
  }
}, this);


    ///=================================Medusa Tracking=====================================
    let followDistance = 500;
    let speed = 70;
    let stopDistance = 30;

    //checks to see if medusa is dead 
    if (!this.medusa || !this.medusa.body) {
      console.log('medusa is dead')
      // setTimeout(() => {
      //   this.bossMusic.stop();
      //   this.scene.start(CST.SCENES.FINALE);
      // }, 2000)
      return;
    }

    // Flag to track if Medusa has attacked
    let hasAttacked = false;

    // Seek AI movement
    let directionX = this.player.x - this.medusa.x;
    let directionY = this.player.y - this.medusa.y;

    // Determine the direction Medusa is moving in
    let moveDirection = (directionX >= 0) ? 1 : -1;

    // Flip Medusa's sprite based on the direction
    if (moveDirection === 1) {
      this.medusa.flipX = true; // flip for rightward movement
    } else {
      this.medusa.flipX = false; // no Flip horizontally for leftward movement
    }

    // direction to unit vector
    let magnitude = Math.sqrt(directionX * directionX + directionY * directionY);

    // Check if the distance is less than a certain value
    if (magnitude < followDistance && magnitude > stopDistance) {
      directionX /= magnitude;
      directionY /= magnitude;


      // Set Medusa's velocity
      this.medusa.body.velocity.x = directionX * speed;
      this.medusa.body.velocity.y = directionY * speed;

      // Medusa attack
      if (Phaser.Math.Distance.Between(this.medusa.x, this.medusa.y, this.player.x, this.player.y) < 100 && !hasAttacked) {
        this.medusa.damage = 10;
        this.medusa.body.velocity.x = 0;

        if (getRandomInt(10) % 2 === 0) {
          this.medusa.anims.play("MedusaAttackDeathRay", true).on('animationcomplete', function () {
            this.medusa.anims.play("MedusaMove", true)
            hasAttacked = true;  // Set the flag to true after the attack
          }, this);
        } else {
          this.medusa.anims.play("MedusaAttackSnakes", true).on('animationcomplete', function () {
            this.medusa.anims.play("MedusaMove", true)
            hasAttacked = true;  // Set the flag to true after the attack
          }, this);
        }
      }
    }

else if (magnitude <= stopDistance) { // New condition to check if Medusa is too close to the character
  // If Medusa is too close, stop her movement
  this.medusa.body.velocity.x = 0;
  this.medusa.body.velocity.y = 0;

  // Set Medusa's animation for idle
  this.medusa.anims.play("MedusaIdle", true);

  // Reset the hasAttacked flag when player is not in range
  hasAttacked = false;
} 

else {
  // If the player is too far, stop the Medusa
  this.medusa.body.velocity.x = 0;
  this.medusa.body.velocity.y = 0;

  // Set Medusa's animation for idle 
  this.medusa.anims.play("MedusaIdle", true);

  // Reset the hasAttacked flag when player is not in range
  hasAttacked = false;
}

/////////////
 // =====================  boss fight audio change ============================================
 let threshold = 50;


 if (!this.hasPlayed && Math.abs(this.player.x - 1095) < threshold && Math.abs(this.player.y - 549) < threshold) {
   this.bossMusic.play();
    this.zurpalen.stop();
    this.hasPlayed = true;
 }


  } 

  

};

   
