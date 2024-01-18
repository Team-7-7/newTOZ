

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



var game = new Phaser.Game(config);

function preload ()
{
   
}

function create ()
{

  
}

function update ()
{
 
}



  return <div id="phaser-game"></div>;
};

