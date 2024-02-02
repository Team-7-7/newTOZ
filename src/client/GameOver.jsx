// GameOver.jsx
import { CST } from "./loading_menu/CST.jsx";
import { HealthBarScene } from './hud_scenes/HealthBarScene.jsx';

export class GameOver extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.GAMEOVER,
    });
  }

  preload() {
    // Load assets in the preload method
    this.load.image("background1", "/assets/castle.png");
  }

  create() {
    // Background setup
    let bg1 = this.add.image(400, 300, "background1");
    let scaleX = this.scale.width / bg1.width;
    let scaleY = this.scale.height / bg1.height;
    let scale = Math.max(scaleX, scaleY);
    bg1.setScale(scale);
    bg1.setPosition(this.scale.width / 2, this.scale.height / 2);

  // Add the HealthBarScene to the scene

  // this.scene.launch(HEALTH, true);
  this.scene.launch(CST.SCENES.HEALTH, true);



    // Game over text setup
    const text = this.add.text(
      this.scale.width / 2,
      this.scale.height - this.scale.height / 2,
      "Game over, you have failed. Zurpalen sends the world into eternal darkness.",
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
