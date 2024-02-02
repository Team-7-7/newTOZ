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
  }

  create() {
    console.log("FINALE scene")
    let bg1 = this.add.image(400, 300, "castle");
    let scaleX = this.scale.width / bg1.width;
    let scaleY = this.scale.height / bg1.height;
    let scale = Math.max(scaleX, scaleY);
    bg1.setScale(scale);
    bg1.setPosition(this.scale.width / 2, this.scale.height / 2);
    const text = this.add.text(20, 20, 'Congratulations, you win, however, Zarpulen escapes. To be continued.', { color: 'white', fontFamily: 'p-script', fontSize: '120px' })

        // Handle Enter key press to restart the game
        this.input.keyboard.on("keydown-ENTER", () => {
          this.scene.start(CST.SCENES.TITLE);
        });
    
        // Handle pointer click to restart the game
        this.input.on("pointerup", () => {
          this.scene.start(CST.SCENES.TITLE);
        });

  }

}