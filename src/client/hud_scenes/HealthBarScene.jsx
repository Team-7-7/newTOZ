// HealthBarScene.jsx

import { CST } from "../loading_menu/CST.jsx";

export class HealthBarScene extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.HEALTH });
  }

  create() {
    const rectangle = this.add.rectangle(20, 20, 200, 50, 0xff0000);
    rectangle.setOrigin(0, 0);
    // Set up your hearts or health bar display here
    // You can use Phaser.Sprite or Phaser.Image for hearts
    // Example: this.hearts = this.add.group();
    // for (let i = 0; i < playerHealth; i++) {
    //   const heart = this.add.sprite(i * 40, 20, 'heartTextureKey');
    //   this.hearts.add(heart);
    // }
  }

  updateHealth(health) {
    // Update your hearts or health bar based on the player's health
    // Example: this.hearts.children.iterate((heart, index) => {
    //   if (index < health) {
    //     heart.setFrame(0); // If using spritesheet, change frame to represent a filled heart
    //   } else {
    //     heart.setFrame(1); // If using spritesheet, change frame to represent an empty heart
    //   }
    // });
  }
}
