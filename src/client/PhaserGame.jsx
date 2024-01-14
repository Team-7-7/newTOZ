import Phaser from 'phaser';

const PhaserGame = () => {
  var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var cursors;
var gameOver = false;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('floor', 'assets/floor.png');

    this.load.spritesheet('fighter', 'assets/fighter.png', { frameWidth: 32, frameHeight: 48 });
}

function create ()
{
    //  A simple background for our game
    this.add.image(400, 400, 'floor');

   
    // The player and its settings
    player = this.physics.add.sprite(10, 10, 'fighter');

    // keep the player on the map
    player.setCollideWorldBounds(true);

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

    
}

function update ()
{
    if (gameOver)
    {
        return;
    }

    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
      player.setVelocityX(0);

      player.anims.play('right', true);
    }
    if(cursors.up.isDown)
    {
        player.setVelocityY(-160);

        player.anims.play('right', true);
    }
    else if(cursors.down.isDown)
    {
        player.setVelocityY(160);

        player.anims.play('right', true);
    }
    else
    {
      player.setVelocityY(0);
    }
}

  return <div id="phaser-game"></div>;
};

export default PhaserGame;