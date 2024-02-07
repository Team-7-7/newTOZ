//WinScene.jsx

import { CST } from "../loading_menu/CST.jsx";
import { store } from "../store"

export class WinScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.FINALE
    })
  }

  init(data) {
  }

  preload() {
    this.load.image("castle", "/assets/castle.png")
    this.load.image("victory", "/assets/titlePage/victory.png")
    this.load.image("credits", "/assets/titlePage/credits.png")
    this.load.audio("victoryMusic", "/assets/audio/soundeffects/victorymusic.mp3")
  }

  create() {
    
    setTimeout(()=>{
    this.victory = this.sound.add("victoryMusic", { 
      volume: 0.4,
      loop: true 
    });
    this.victory.play();
  }, 1000)
    
    
    /////HELPER UTIL TO SEE WHAT SCENES ARE STILL ACTIVE IN PHASER///////
    // let runOnce = 0;
    // if (runOnce < 1) {
    //   let sceneManager = this.scene.manager;
    //   let activeScenes = sceneManager.scenes;   // Get the list of active scenes
    //   // Iterate over all scenes
    //   this.scene.manager.scenes.forEach(scene => {
    //     if (this.scene.isActive(scene.scene.key)) {
    //       console.log(`Scene ${scene.scene.key} is ACTIVE`);
    //     } else {
    //       console.log(`Scene ${scene.scene.key} is NOT ACTIVE`);
    //     }
    //   });
    //   this.scene.stop("HEALTH");
    //   runOnce++
    // }
    /////////////////////END HELPER/////
    this.scene.stop("HEALTH");

    console.log("FINALE scene")
    let bg1 = this.add.image(400, 300, "castle");
    let scaleX = this.scale.width / bg1.width;
    let scaleY = this.scale.height / bg1.height;
    let scale = Math.max(scaleX, scaleY);
    bg1.setScale(scale);
    bg1.setPosition(this.scale.width / 2, this.scale.height / 2);
    const finaleText = this.add.text(20, 900, 'Congratulations, you win, however, Zarpulen, clinging to life, slithers away. To be continued...in the Return of Zurpalen', {
      color: 'white',
      fontFamily: 'p-script',
      fontSize: '40px',
      wordWrap: {
        width: this.scale.width - 20,
        useAdvancedWrap: true
      },
      padding: {
        left: 10,
        right: 10,
        top: 5,
        bottom: 5
      },
      backgroundColor: '#000'
    });



// Victory HEADLINE WITH RAINBOW COLORS ////
let victory = this.add.image(this.scale.width / 2, this.scale.height / 2, "victory");
victory.setScale(5); 
victory.setOrigin(0.5); 

// Makes the title alternate between rainbow-colors
this.tweens.addCounter({
  from: 0,
  to: 100,
  duration: 4000, // speed of the change
  repeat: -1, // Repeat the animation continuously
  onUpdate: function (tween) {
    const value = Math.floor(tween.getValue());
    const color = Phaser.Display.Color.HSVToRGB(value / 100, 1, 1).color;
    victory.setTint(color);
  }
});
////////////////////////////////////////////////////////////////

// Credits ////
let credits = this.add.image(this.scale.width / 6, this.scale.height / 7, "credits");
credits.setScale(2); 
credits.setOrigin(0.5); 

// Makes the title alternate between rainbow-colors
this.tweens.addCounter({
  from: 0,
  to: 100,
  duration: 2000, // speed of the color change
  repeat: -1, // Repeat the animation continuously
  onUpdate: function (tween) {
    const value = Math.floor(tween.getValue());
    const color = Phaser.Display.Color.HSVToRGB(value / 100, 1, 1).color;
    credits.setTint(color);
  }
});

// Makes the credits bounce around the screen randomly
this.tweens.add({
  targets: credits,
  x: {
    value: credits.x + this.scale.width * 5/8,
    duration: 3000,
    ease: 'Sine.easeInOut',
    yoyo: true,
    repeat: -1
  },
});




    // Handle Enter key press to restart the game
    this.input.keyboard.on("keydown-ENTER", () => {
      this.victory.stop();
      this.scene.start(CST.SCENES.TITLE);
    });

    // Handle pointer click to restart the game
    this.input.on("pointerup", () => {
      this.victory.stop();
      this.scene.start(CST.SCENES.TITLE);
    });

  }

}