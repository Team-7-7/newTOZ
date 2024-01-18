import { CST } from "./loading_menu/CST.jsx";


export class PauseScene extends Phaser.Scene {
  constructor(){
      super({
          key: CST.SCENES.PAUSE
      })    

  this.gameOver=false;
  }
  

init(){

}


preload ()
{
    this.load.image('floor', '/assets/floor.png');

}

create ()
{

    //  A simple background for our pause Screen
    this.add.image(800, 600, 'floor');



    //  Input Events
    this.keys = this.input.keyboard.addKeys({
      w: Phaser.Input.Keyboard.KeyCodes.W,
      a: Phaser.Input.Keyboard.KeyCodes.A,
      s: Phaser.Input.Keyboard.KeyCodes.S,
      d: Phaser.Input.Keyboard.KeyCodes.D,
      k: Phaser.Input.Keyboard.KeyCodes.K,
      p: Phaser.Input.Keyboard.KeyCodes.P,
  
     });


    this.input.keyboard.on('keydown-P', function (event) {
        this.scene.resume("LEVEL1");
        this.scene.stop("PAUSE");
    }, this);
};

update ()
{
    if (this.gameOver)
    {
        return;
    }

    if (this.keys.a.isDown)
    {

    }
    else if (this.keys.d.isDown)
    {

    }
    else
    {

    }
    if(this.keys.w.isDown)
    {

    }
    else if(this.keys.s.isDown)
    {

    }
    else
    {
 
    }

    if (this.keys.k.isDown)
    {
        console.log('k is pressed, attacking now');

    }

    if (this.keys.p.isDown)
    {
        console.log('p is pressed, resuming game');
          this.scene.pause("PAUSE");
          this.scene.launch("LEVEL1");
    }

}
}
