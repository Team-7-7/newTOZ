// GameOver.jsx
import { CST } from "./loading_menu/CST.jsx";

export class GameOver extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.GAMEOVER,
    });
  }

  preload() {
    this.load.image("background1", "/assets/castle.png");
    this.load.image("gameover_title", "/assets/titlePage/game_over.png")
  }

  create() {
    // Background setup
    let bg1 = this.add.image(400, 300, "background1");
    let scaleX = this.scale.width / bg1.width;
    let scaleY = this.scale.height / bg1.height;
    let scale = Math.max(scaleX, scaleY);
    bg1.setScale(scale);
    bg1.setPosition(this.scale.width / 2, this.scale.height / 2);



    // GAME OVER HEADLINE WITH RAINBOW COLORS ////
    let gameOverTitle = this.add.image(this.scale.width / 2, this.scale.height * 3 / 7, "gameover_title");
    gameOverTitle.setScale(5); 
    gameOverTitle.setOrigin(0.5); 

    // Makes the title alternate between rainbow-colors/////////////////////
    this.tweens.addCounter({
      from: 0,
      to: 100,
      duration: 4000, // speed of the change
      repeat: -1, // Repeat the animation continuously
      onUpdate: function (tween) {
        const value = Math.floor(tween.getValue());
        const color = Phaser.Display.Color.HSVToRGB(value / 100, 1, 1).color;
        gameOverTitle.setTint(color);
      }
    });
    ///////////////////////////////////////////////////////////GAME OVER/////




    // Game over text setup
    const text = this.add.text(
      this.scale.width / 2,
      this.scale.height - this.scale.height / 11,
      "You have failed. Zurpalen sends the world into eternal darkness. Try again?",
      {
        color: "white",
        fontFamily: "p-script",
        fontSize: "32px",
        align: "center",
      }
    );
    text.setOrigin(0.5);

    // Wipe mask setup
    const wipeMask = this.add.graphics();
    wipeMask.fillStyle(0x000000);
    wipeMask.fillRect(0, 0, this.scale.width, this.scale.height);

    // Wipe tween setup
    this.tweens.add({
      targets: wipeMask,
      alpha: 0,
      duration: 1000,
      onComplete: () => {
        wipeMask.destroy();
      },
    });

    // Handle Enter key press to restart the game
    this.input.keyboard.on("keydown-ENTER", () => {
      this.startLevel1();
    });

    // Handle pointer click to restart the game
    this.input.on("pointerup", () => {
      this.startLevel1();
    });

    // Shortcut to restart using the 'G' key
    this.input.keyboard.on("keydown-G", () => {
      this.startLevel1();
    });
  }

  startLevel1() {
    // Start the wipe tween when restarting the game
    const wipeMask = this.add.graphics();
    wipeMask.fillStyle(0x000000);
    wipeMask.fillRect(0, 0, this.scale.width, this.scale.height);

    this.tweens.add({
      targets: wipeMask,
      duration: 1000,
      alpha: { value: 1, ease: "Linear" },
      onComplete: () => {
        wipeMask.destroy();
        this.scene.start(CST.SCENES.LEVEL1);
      },
    });
  }
}
