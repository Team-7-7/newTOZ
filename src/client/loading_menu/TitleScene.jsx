//TitleScene.jsx

import { CST } from "./CST.jsx";
import { store } from "../store"

export class TitleScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.TITLE
    })
  }

  init(data) {
  }

  preload() {
    this.load.image("castle", "/assets/castle.png")
    this.load.image("login", "/assets/titlePage/login.png")
    this.load.image("play", "/assets/titlePage/play.png")
    this.load.image("register", "/assets/titlePage/register.png")
    this.load.image("toz_title", "/assets/titlePage/tower_of_zurpalen_lg.png")
  }

  create() {
    let bg1 = this.add.image(400, 300, "castle");
    let scaleX = this.scale.width / bg1.width;
    let scaleY = this.scale.height / bg1.height;
    let scale = Math.max(scaleX, scaleY);
    bg1.setScale(scale);
    bg1.setPosition(this.scale.width / 2, this.scale.height / 2);

    // TOZ TITLE ////
    let tozTitle = this.add.image(this.scale.width / 2, this.scale.height * 3 / 7, "toz_title");
    tozTitle.setScale(5); // Enlarge the title png x 5
    tozTitle.setOrigin(0.5); // Center the image based on its center point

    // Makes the title alternate between rainbow-colors
    this.tweens.addCounter({
      from: 0,
      to: 100,
      duration: 4000, // speed of the change
      repeat: -1, // Repeat the animation continuously
      onUpdate: function (tween) {
        const value = Math.floor(tween.getValue());
        const color = Phaser.Display.Color.HSVToRGB(value / 100, 1, 1).color;
        tozTitle.setTint(color);
      }
    });
    // END TOZ TITLE ////

    // Add Buttons //
    ///USER ALREADY LOGGED IN ///
    if (localStorage.getItem("TOKEN")) {
      let playButton = this.add.image(this.scale.width / 2, this.scale.height * 7 / 8, "play").setOrigin(0.5).setInteractive();
      playButton.setScale(4)

      playButton.on('pointerup', () => {
        this.scene.start(CST.SCENES.MENU)
      });

      const logoutText = this.add.text(this.scale.width / 2, this.scale.height * 19 / 20, 'Logout', {
        color: 'white',
        fontFamily: 'p-script',
        fontSize: '24px',
        align: 'center'
      });
  
      logoutText.setOrigin(0.5); // Center the text horizontally
  
      function logout() {
        localStorage.removeItem('TOKEN');
        console.log('Token removed. User logged out.');}
  
        logoutText.setInteractive();
        logoutText.on('pointerup', () => {
          logout();
          this.scene.start('TITLE');
        });
      }  
    ///END USER ALREADY LOGGED IN ///


    //NOT LOGGED IN //
    if (!localStorage.getItem("TOKEN")) {
      let loginButton = this.add.image(this.scale.width * 1 / 3, this.scale.height * 7 / 8, "login").setOrigin(0.5).setInteractive();
      let registerButton = this.add.image(this.scale.width * 2 / 3, this.scale.height * 7 / 8, "register").setOrigin(0.5).setInteractive();

      loginButton.setScale(4)
      registerButton.setScale(4)

      loginButton.on('pointerup', () => {
        // Handle login button click
        this.scene.start('LOGIN');
      });

      registerButton.on('pointerup', () => {
        // Handle register button click
        console.log('Register button clicked');
      });

    }
    //END NOT LOGGED IN //

    const text = this.add.text(20, 20, 'Time is of the essence. \nSave the princess from the...', { color: 'white', fontFamily: 'p-script', fontSize: '32px' })

  }
}