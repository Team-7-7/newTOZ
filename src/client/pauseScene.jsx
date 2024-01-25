//pauseScene.jsx

import eventsCenter from "./EventsCenter.jsx";
import { CST } from "./loading_menu/CST.jsx";


export class PauseScene extends Phaser.Scene {
  constructor(){
      super({
          key: CST.SCENES.PAUSE
      })    
      fontFamily:'p-script'

    this.gameOver=false;
    this.characterName="zymok";
    this.characterHealth = 2;
    this.characterMaxHealth = 10;
    this.characterArmor = 3;
    this.characterAttack = 4;
    this.characterSpeed = 5;
    this.characterXp = 1000;
    this.characterLevel = 1;
    this.characterGold=2;
    // this.playButton;
    // this.saveButton;
    // this.quitButton;
  }
  

init(){

}


preload ()
{

    // ***********  needs logic to choose which pause scene based on player character ********************************
    this.load.image('playerPauseScene', '/assets/pauseAssets/knightPauseScene.png');
    // this.load.image('playerPauseScene', '/assets/pauseAssets/magePauseScene.png');
    // this.load.image('playerPauseScene', '/assets/pauseAssets/roguePauseScene.png');


    this.load.spritesheet('playButton', 'assets/pauseAssets/playButton110x60.png', { frameWidth: 110, frameHeight: 60 });
    this.load.spritesheet('saveButton', 'assets/pauseAssets/saveButton110x60.png', { frameWidth: 110, frameHeight: 60 });
    this.load.spritesheet('quitButton', 'assets/pauseAssets/quitButton110x60.png', { frameWidth: 110, frameHeight: 60 });

}

create ()
{
    eventsCenter.on('updateGold', (moreGold)=> {
        console.log('updateGold event triggered with amount:', moreGold);
        console.log('this is the character gold before: ', this.characterGold);
        this.characterGold +=moreGold;
        console.log('this is the character gold after: ', this.characterGold);

    }, this);


    // ***************  this is a test to see if the emitter is working correctly ************************************
    eventsCenter.on('Test', ()=>{
        console.log('Test Emitter is working');
    }, this);
            

    //  A simple background for our pause Screen
    this.add.image(800, 600, 'playerPauseScene');




    // *************** need to change font family and color **************************************************
    // this.add.text(850, 470, this.characterGold, { font: "48px Arial Black", fill: "#000" });
    this.add.text(640, 370, this.characterName, { font: "30px p-script", fill: "#7e4035" });
    this.add.text(640, 425, this.characterHealth, { font: "30px p-script", fill: "#7e4035" });
    this.add.text(680, 425, '/' + this.characterMaxHealth, { font: "30px p-script", fill: "#7e4035" });
    this.add.text(640, 480, this.characterArmor, { font: "30px p-script", fill: "#7e4035" });
    this.add.text(640, 530, this.characterAttack, { font: "30px p-script", fill: "#7e4035" });
    this.add.text(640, 580, this.characterSpeed, { font: "30px p-script", fill: "#7e4035" });
    this.add.text(850, 370, this.characterXp, { font: "30px p-script", fill: "#7e4035" });
    this.add.text(850, 425, this.characterLevel, { font: "30px p-script", fill: "#7e4035" });
    this.add.text(850, 480, this.characterGold, { font: "30px p-script", fill: "#7e4035" });




    //  Input Events
    this.keys = this.input.keyboard.addKeys({
    //   w: Phaser.Input.Keyboard.KeyCodes.W,
    //   a: Phaser.Input.Keyboard.KeyCodes.A,
    //   s: Phaser.Input.Keyboard.KeyCodes.S,
    //   d: Phaser.Input.Keyboard.KeyCodes.D,
      k: Phaser.Input.Keyboard.KeyCodes.K,
      p: Phaser.Input.Keyboard.KeyCodes.P,

  
     });


    this.input.keyboard.on('keydown-P', function (event) {
        this.scene.resume("LEVEL1");
        this.scene.stop("PAUSE");
    }, this);



    // this.playButton = this.physics.add.staticSprite(580,865, 'playButton').setInteractive();
    const playButton = this.add.sprite(580,865, 'playButton').setInteractive();
    const saveButton = this.add.sprite(815,860, 'saveButton').setInteractive();
    const quitButton = this.add.sprite(1018,860, 'quitButton').setInteractive();

    playButton.on('pointerup', function(event){
        this.scene.resume("LEVEL1");
        this.scene.stop("PAUSE");
    }, this);

    saveButton.on('pointerup', function(event){
        console.log('save the game function required')
    }, this);

    quitButton.on('pointerup', function(event){
        console.log('quit the game function required')
        // may need to emit this to the level1 scene
        eventsCenter.emit('gameOver', true);

    }, this);


};

update ()
{
    // if (this.gameOver)
    // {
    //     return;
    // }

    // if (this.keys.a.isDown)
    // {
    // }
    // else if (this.keys.d.isDown)
    // {
    // }
    // else
    // {
    // }
    // if(this.keys.w.isDown)
    // {
    // }
    // else if(this.keys.s.isDown)
    // {
    // }
    // else
    // {
    // }

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
