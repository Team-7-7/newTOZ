import Phaser from 'phaser';

const PhaserGame = () => {
  var config = {
    type: Phaser.AUTO,
    width: 1600,
    height: 1200,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var chest1;
var chest2;
var cursors;
var gameOver = false;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('floor', 'assets/floor.png');
    this.load.image('tiles', 'assets/25x25Tiles.png');
    this.load.tilemapTiledJSON('map', 'assets/level1.json');


    this.load.spritesheet('fighter', 'assets/fighter.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('chest', 'assets/chest_sprite.png', {frameWidth: 32, frameHeight: 32 })

}

function create ()
{

    //  A simple background for our game
    this.add.image(800, 600, 'floor');


  // loads the map and makes the walls solid    
    const map = this.make.tilemap({key:"map"});
    const tileset = map.addTilesetImage('25x25Tiles', 'tiles');
    const WorldLayer = map.createLayer("WorldLayer", tileset, 0, 0);
    WorldLayer.setCollisionByProperty({ collides: true });


   
    // The player and its settings
    player = this.physics.add.sprite(50, 50, 'fighter');

    // keep the player on the map
    player.setCollideWorldBounds(true); 
    this.physics.add.collider(player, WorldLayer);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('fighter', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'fighter', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('fighter', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys({
      w: Phaser.Input.Keyboard.KeyCodes.W,
      a: Phaser.Input.Keyboard.KeyCodes.A,
      s: Phaser.Input.Keyboard.KeyCodes.S,
      d: Phaser.Input.Keyboard.KeyCodes.D,
      k: Phaser.Input.Keyboard.KeyCodes.K,
  
     });

     //chests
    const openChest = (chest) => {
        console.log(`collided with chest`);
        if (this.keys.k.isDown){  // this line requires attack button to open chest
        chest.setFrame(1);
        }
        //add code here for loot
    };    
    chest1 = this.physics.add.staticSprite(300, 150, 'chest', 2);
    chest2 = this.physics.add.staticSprite(700, 550, 'chest', 2);


    this.physics.add.collider(player, chest1, ()=>openChest(chest1));
    this.physics.add.collider(player, chest2, ()=>openChest(chest2));

  

    
     //camera controls, follows player and zooms in
     this.cameras.main.startFollow(player, true, 0.05, 0.05);
     this.cameras.main.setZoom(2); // 1 is the default zoom level
      // Set boundaries for the camera
    this.cameras.main.setBounds(0, 0, 1600, 1200);
   
    
}

function update ()
{
    if (gameOver)
    {
        return;
    }

    if (this.keys.a.isDown || cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (this.keys.d.isDown || cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
      player.setVelocityX(0);

      player.anims.play('turn', true);
    }
    if(this.keys.w.isDown || cursors.up.isDown)
    {
        player.setVelocityY(-160);

        player.anims.play('left', true);
    }
    else if(this.keys.s.isDown || cursors.down.isDown)
    {
        player.setVelocityY(160);

        player.anims.play('right', true);
    }
    else
    {
      player.setVelocityY(0);
    }

    if (this.keys.k.isDown)
    {
        console.log('k is pressed, attacking now');

    }

}



  return <div id="phaser-game"></div>;
};

export default PhaserGame;