//ZarpulenScene.jsx

import { CST } from "../loading_menu/CST.jsx";
import { store } from "../store"

export class ZarpulenScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.ZARPULEN
    })
  }

  init(data) {
  }

  preload() {
    this.load.image("castle", "/assets/castle.png")
  }

  create() {
    let bg1 = this.add.image(400, 300, "castle");
    let scaleX = this.scale.width / bg1.width;
    let scaleY = this.scale.height / bg1.height;
    let scale = Math.max(scaleX, scaleY);
    bg1.setScale(scale);
    bg1.setPosition(this.scale.width / 2, this.scale.height / 2);
    const text = this.add.text(20, 20, 'You made it to the top of the tower. Where is Zarpulen??!!??', { color: 'white', fontFamily: 'p-script', fontSize: '80px' })


    //////
    //////
    // THIS WILL DIRECT TO THE FINAL BATTLE SCENE
    //////
    //////
    //////

    // Handle Enter key press to restart the game
    this.input.keyboard.on("keydown-ENTER", () => {
      this.scene.start(CST.SCENES.LEVEL1);
    });

    // Handle pointer click to restart the game
    this.input.on("pointerup", () => {
      this.scene.start(CST.SCENES.LEVEL1);
    });

    
  }

}