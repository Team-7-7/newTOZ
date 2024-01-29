// level1.jsx

import { CST } from "./loading_menu/CST.jsx";

import eventsCenter from "./EventsCenter.jsx"; // this allows communication between scenes

import { PauseScene } from "./pauseScene.jsx";


import { store } from "./store"; // brings in redux store

export class Level1 extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.LEVEL1,
    });
    this.player;
    this.chest1;
    this.chest2;
    this.cursors;
    this.monster = {
      health: 100,
    };
    this.gameOver = false;
  }

  init() {}

  preload ()
  {
    
    const state = store.getState() // this brings in the state from redux
    console.log(state, "in preload")
    console.log('this is the character class: ', state.userCharacter.character.character_class)

      this.load.image('floor', '/assets/levelAssets/floor.png');
      this.load.image('tiles', '/assets/levelAssets/25x25Tiles.png');
      this.load.tilemapTiledJSON('map', '/assets/levelAssets/level1.json');
  
  
      // the three classes sprites load here
      switch(state.userCharacter.character.character_class){
      case "warrior":
          console.log('loading the warrior');
          this.load.spritesheet('playerSprite', 'assets/levelAssets/knight78x60.png', { frameWidth: 78, frameHeight: 60 });
          break;
      case "mage":
          console.log('loading the mage');
          this.load.spritesheet('playerSprite', 'assets/levelAssets/mage78x60.png', { frameWidth: 78, frameHeight: 60 });
          break;
      case "rogue":
          console.log('loading the rogue');
          this.load.spritesheet('playerSprite', 'assets/levelAssets/rogue78x60.png', { frameWidth: 78, frameHeight: 60 });
          break;
      };

      //this loads the monster spritesheet and JSON together
      this.load.atlas("skeleton", "assets/levelAssets/skeleton_spritesheet.png", "assets/levelAssets/skeleton_sprites.json");
      
      this.load.spritesheet('chest', 'assets/levelAssets/chest_sprite.png', {frameWidth: 32, frameHeight: 32 })
      this.load.spritesheet('goldCoin', 'assets/levelAssets/goldCoin.png', {frameWidth: 40, frameHeight: 40})
      
  }
  
  create ()
  {

    this.scene.run('pauseScene'); // used to keep the pause scene updated with stats causes pausescene to run in the background

    //  A simple background for our game
    this.add.image(800, 600, "floor");

    // loads the map and makes the walls solid
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("25x25Tiles", "tiles");
    const WorldLayer = map.createLayer("WorldLayer", tileset, 0, 0);
    WorldLayer.setCollisionByProperty({ collides: true });

    // The player and its settings
    this.player = this.physics.add.sprite(90, 90, "playerSprite");
    this.player.setSize(60, 54);

    // keep the player on the map
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, WorldLayer);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("playerSprite", {
        start: 9,
        end: 12,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "playerSprite", frame: 1 }],

      frameRate: -1,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("playerSprite", {
        start: 2,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "attackRight",
      frames: this.anims.generateFrameNumbers("playerSprite", {
        start: 14,
        end: 19,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "attackLeft",
      frames: this.anims.generateFrameNumbers("playerSprite", {
        start: 20,
        end: 25,
      }),
      frameRate: 10,
      repeat: -1,
    });

    //monster and its settings
    this.monster = this.physics.add.sprite(300, 300, "skeleton", "sprite9");
    this.monster.setSize(60, 54);
    
    //white rectangle that shows monster health
    this.monster.healthBarBackground = this.add.rectangle(this.monster.x, this.monster.y - 20, 100, 10, 0xffffff);

    //green rectangle that shows current monster health
    this.monster.healthBar= this.add.rectangle(this.monster.x, this.monster.y - 20, 100,10, 0x00ff00);

    //subtract health from monster
    this.monster.health -= 10;

    //update the width of the health bar
    this.monster.healthBar.width = this.monster.health;

    //destroy health bar after monster dies
    //this.monster.healthBar.destroy();
    //this.monster.healthBarBackground.destroy();

    //keeps monster in bounds
    this.physics.add.collider(this.monster, WorldLayer);
    this.physics.add.collider(this.player, this.monster);
    this.monster.setImmovable(true);
    this.monster.setCollideWorldBounds(true);

    //monster movements
    this.anims.create({
      key: "SkeletonIdle",
      frames: this.anims.generateFrameNames("skeleton", { frames: [ "sprite10", "sprite19", "sprite20", "sprite30", "sprite36" ], }),
      frameRate: 10,
      repeat: -1,
    });
    
    this.anims.create({
      key: "SkeletonLeft",
      frames: this.anims.generateFrameNames("skeleton", { frames: [ "sprite1", "sprite2", "sprite3", "sprite4", "sprite5", "sprite6", "sprite7", "sprite8" ], }),
      frameRate: 10,
      repeat: -1,
    });
    
    this.anims.create({
      key: "SkeletonRight",
      frames: this.anims.generateFrameNames("skeleton", { frames: [ "sprite11", "sprite12", "sprite13", "sprite14", "sprite15", "sprite16", "sprite17", "sprite18" ], }),
      frameRate: 10,
      repeat: -1,
    });
    

    this.anims.create({
      key: "SkeletonAttack",
      frames: this.anims.generateFrameNames("skeleton", { frames: [ "sprite40", "sprite41", "sprite43", "sprite49", "sprite50", "sprite51", "sprite52" ], }),
      frameRate: 10,
      repeat: -1,
    });

    // this.anime.create({
    //   key: "SkeletonDeath",
    //   frames: this.anims.generateFrameNames("skeleton", { frames: [ "sprite57", "sprite58", "sprite59", "sprite60", "sprite64" ], }),
    //   frameRate: 10,
    //   repeat: -1,
    // });

    //play monster animations
    this.monster.anims.play('SkeletonIdle', 'SkeletonLeft', 'SkeletonRight', 'SkeletonAttack', 'SkeletonDeath', true);

  
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
  
       this.collectItem = (item) => {
        console.log('collecting item function');
        item.destroy();        //item is removed from the scene

        //item is added to inventory
          const amountOfGold=1+ Math.floor(Math.random()*5);
          console.log('Character Gold should be increasing by ', amountOfGold);

          eventsCenter.emit('updateGold', amountOfGold);
          eventsCenter.emit('Test');
          console.log('emit should have been sent');
        
      };

       //chests
       // chest functions broken into two functions to avoid unwanted collisions (gold in walls, etc) 
      const openChestTopRight = (chest) => {
        //if you want the loot to be above or to the right of the chest
          if (this.keys.k.isDown){  // this line requires attack button to open chest
          chest.setFrame(1);
          const xlocation=chest.x+30;
          const ylocation=chest.y+30;
          console.log('xlocation is: ', xlocation);

        //add code here for loot
            // const gold = this.physics.add.sprite(370,60,'goldCoin');
            const gold = this.physics.add.sprite(xlocation,ylocation,'goldCoin');

            gold.setSize(22,22);
            this.physics.add.collider(this.player, gold, () => {
                    this.collectItem(gold);
            }, null, this);
          };
      };   

      const openChestBottomLeft = (chest) => {
        //if you want the loot to be below or to the left of the chest
        if (this.keys.k.isDown){  // this line requires attack button to open chest
        chest.setFrame(1);
        const xlocation=chest.x-30;
        const ylocation=chest.y-30;
        console.log('xlocation is: ', xlocation);

      //add code here for loot
          // const gold = this.physics.add.sprite(370,60,'goldCoin');
          const gold = this.physics.add.sprite(xlocation,ylocation,'goldCoin');

          gold.setSize(22,22);
          this.physics.add.collider(this.player, gold, () => {
                  console.log('Player collided with gold coin');
                  this.collectItem(gold);
          }, null, this);
        };
    };   

      this.chest1 = this.physics.add.staticSprite(300, 40, 'chest', 2);
      this.chest2 = this.physics.add.staticSprite(1185, 71, 'chest', 2);
      this.chest3 = this.physics.add.staticSprite(80, 448, 'chest', 2);
      this.chest4 = this.physics.add.staticSprite(319, 833, 'chest', 2);
      this.chest5 = this.physics.add.staticSprite(790, 966, 'chest', 2);
      this.chest6 = this.physics.add.staticSprite(1345, 565, 'chest', 2);


    // stairs to next level located at 1570, 80

      this.physics.add.collider(this.player, this.chest1, ()=>openChestTopRight(this.chest1));
      this.physics.add.collider(this.player, this.chest2, ()=>openChestBottomLeft(this.chest2));
      this.physics.add.collider(this.player, this.chest3, ()=>openChestBottomLeft(this.chest3));
      this.physics.add.collider(this.player, this.chest4, ()=>openChestBottomLeft(this.chest4));
      this.physics.add.collider(this.player, this.chest5, ()=>openChestBottomLeft(this.chest5));
      this.physics.add.collider(this.player, this.chest6, ()=>openChestBottomLeft(this.chest6));

      
    //camera controls, follows player and zooms in
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    this.cameras.main.setZoom(1); // 1 is the default zoom level
    // Set boundaries for the camera
    //   this.cameras.main.setBounds(0, 0, 1600, 1200);k
    this.cameras.main.setBounds(-200, -200, 2000, 1600);

    eventsCenter.on(
      "gameOver",
      (bool) => {
        console.log("someone quit the game");
        this.gameOver = bool;
      },
      this
    );
  }

  update() {
    if (this.gameOver) {
      return;
    }

    if (this.keys.a.isDown || this.cursors.left.isDown) {
      this.player.setVelocityX(-160);

      this.player.anims.play("left", true);
    } else if (this.keys.d.isDown || this.cursors.right.isDown) {
      this.player.setVelocityX(160);

      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityX(0);

      this.player.anims.play("turn", true);
    }
    if (this.keys.w.isDown || this.cursors.up.isDown) {
      this.player.setVelocityY(-160);

      this.player.anims.play("left", true);
    } else if (this.keys.s.isDown || this.cursors.down.isDown) {
      this.player.setVelocityY(160);

      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityY(0);
    }

    if (this.keys.k.isDown) {
      this.player.anims.play("attackLeft", true);
      //   this.player.on('animationupdate-attackRight', function (animation, frame) {
      //     console.log(frame.frame.name);
    }
    if (this.keys.p.isDown) {
      console.log("p is pressed, pausing game");
      this.scene.pause("LEVEL1");
      this.scene.launch("PAUSE");
    }
      //monster movement
    if (this.monster.body.velocity.x < 0) {
      this.monster.anims.play('SkeletonLeft', true);

    } else if (this.monster.body.velocity.x > 0) {
      this.monster.anims.play('SkeletonRight', true);

    } else { this.monster.anims.play('SkeletonIdle', true);
      }

      if (this.keys.l.isDown)
      {
          console.log('The player is at these coordinates', `x: ${this.player.x}`, `y: ${this.player.y}`);

      }

    //monster healthbar position
    // this.monster.healthBar.x = this.monster.x;
    // this.monster.healthBar.y = this.monster.y - 20;
    // this.monster.healthbar.destroy();
  }

  };
