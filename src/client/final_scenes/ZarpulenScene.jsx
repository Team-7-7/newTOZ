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
    this.load.image("castle_tower", "/assets/finale/castle_tower.png")
    this.load.spritesheet('zurpalen_text', 'assets/finale/zurpalen_letters.png', {
      frameWidth: 32,
      frameHeight: 32,
      startFrame: 0,
      endFrame: 7
      //start animation
      //0:z, 1:u, 2:r, 3:p, 4:a, 5:l, 6:e, 7:n
      //end animation
      //2:r, 4:a, 3:p, 1:u, 7:n, 0:z, 6:e, 5:l
    });
    this.load.spritesheet('wizard', "/assets/finale/wizard-spritesheet-calciumtrice.png", {
      frameWidth: 32,
      frameHeight: 32,
      startFrame: 0,
      endFrame: 49
    });
    this.load.spritesheet('smoke', "/assets/finale/poison-cloud-spritesheet.png", {
      frameWidth: 144,
      frameHeight: 144,
      startFrame: 0,
      endFrame: 18
    });
  }

  create() {
    let bg2 = this.add.image(400, 300, "castle_tower");
    let scaleX = this.scale.width / bg2.width;
    let scaleY = this.scale.height / bg2.height;
    let scale = Math.max(scaleX, scaleY);
    bg2.setScale(scale);
    bg2.setPosition(this.scale.width / 2, this.scale.height / 2);
    const text = this.add.text(20, 20, 'You made it to the top of the tower. Where is Zarpulen??!!?? There is only the princess here. Wait. She is transforming...', {
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



    const wizard = this.add.sprite(1360, 737, 'wizard');
    wizard.setScale(3);

    // Define the IDLE animation configuration
    const idleAnimationConfig = {
      key: 'wizardIdleAnimation',
      frames: this.anims.generateFrameNumbers('wizard', { start: 0, end: 9 }),
      frameRate: 10,
      repeat: -1,
    };

    // Create the IDLE animation
    this.anims.create(idleAnimationConfig);

    // Play the IDLE animation on the 'wizard' sprite
    wizard.anims.play('wizardIdleAnimation');

    // Flip the sprite horizontally
    wizard.setFlipX(true);

    // Define the WALK animation configuration
    const walkAnimationConfig = {
      key: 'wizardWalkAnimation',
      frames: this.anims.generateFrameNumbers('wizard', { start: 20, end: 29 }),
      frameRate: 10,
      repeat: -1,
    };

    // Create the WALK animation
    this.anims.create(walkAnimationConfig);


    // Create the 'smoke' sprite (initially invisible)
    const smoke = this.add.sprite(1300, 570, 'smoke').setScale(3);
    smoke.setAlpha(0.9);
    smoke.setVisible(false);

    // Define the SMOKE animation configuration
    const smokeAnimationConfig = {
      key: 'smokeAnimation',
      frames: this.anims.generateFrameNumbers('smoke', { start: 0, end: 18 }),
      frameRate: 10,
      repeat: -1,
    };

    // Create the SMOKE animation
    this.anims.create(smokeAnimationConfig);
    smoke.anims.play('smokeAnimation')


    // Smoke function
    // function tweenSmoke() {
    //   // Set initial properties for the smoke sprite
    //   smoke.setAlpha(0.8);
    //   smoke.setVisible(true);
     

    //   const smokeTween = this.tweens.add({
    //     targets: smoke,
    //     scale: 12,
    //     duration: 8000,
    //     ease: 'Linear',
    //     onComplete: function () {
    //       // Hide the smoke after the tween completes

    //     },
    //   });
    // }



    // Tween the wizard to the destination coordinates
    const tween = this.tweens.add({
      targets: wizard,
      x: 1300,
      y: 738,
      duration: 1000,
      ease: 'Linear',
      onStart: function () {
        // Play the WALK animation when the tween starts
        wizard.anims.play('wizardWalkAnimation');
      },
      onComplete: function () {
        // Play the IDLE animation when the tween completes
        wizard.anims.play('wizardIdleAnimation');
        setTimeout(() => {
        smoke.setVisible(true);}, 2000)
      }
    });



    const xFactor = 120;  //lol, a marvel joke. used to set the spacing for the levels

    const x1 = this.scale.width / 2 - xFactor / 2 - xFactor * 3
    const x2 = this.scale.width / 2 - xFactor / 2 - xFactor * 2
    const x3 = this.scale.width / 2 - xFactor / 2 - xFactor * 1
    const x4 = this.scale.width / 2 - xFactor / 2
    const x5 = this.scale.width / 2 + xFactor / 2
    const x6 = this.scale.width / 2 + xFactor / 2 + xFactor * 1
    const x7 = this.scale.width / 2 + xFactor / 2 + xFactor * 2
    const x8 = this.scale.width / 2 + xFactor / 2 + xFactor * 3

    const Z = this.add.sprite(x1, this.scale.height / 2, "zurpalen_text", [0])
    const U = this.add.sprite(x2, this.scale.height / 2, "zurpalen_text", [1])
    const R = this.add.sprite(x3, this.scale.height / 2, "zurpalen_text", [2])
    const P = this.add.sprite(x4, this.scale.height / 2, "zurpalen_text", [3])
    const A = this.add.sprite(x5, this.scale.height / 2, "zurpalen_text", [4])
    const L = this.add.sprite(x6, this.scale.height / 2, "zurpalen_text", [5])
    const E = this.add.sprite(x7, this.scale.height / 2, "zurpalen_text", [6])
    const N = this.add.sprite(x8, this.scale.height / 2, "zurpalen_text", [7])

    const zurpalen = [Z, U, R, P, A, L, E, N]
    for (const i of zurpalen) i.setScale(5)

    const colorDuration = 1000; // Duration for each color change
    const letterDelay = 250; // Delay between each letter

    // Function to generate rainbow colors
    function generateRainbowColors() {
      const speed = 0.005; // Adjust the speed of color change
      const red = Math.sin(speed * Date.now()) * 127 + 128;
      const green = Math.sin(speed * Date.now() + (2 * Math.PI / 3)) * 127 + 128;
      const blue = Math.sin(speed * Date.now() + (4 * Math.PI / 3)) * 127 + 128;
      return Phaser.Display.Color.GetColor(Math.floor(red), Math.floor(green), Math.floor(blue));
    }

    // Apply rainbow flashing colors to each letter with a staggered delay
    for (let i = 0; i < zurpalen.length; i++) {
      const letter = zurpalen[i];

      // Calculate the delay for each letter
      const delay = i * letterDelay;

      this.time.delayedCall(delay, () => {
        this.tweens.addCounter({
          from: 0,
          to: 100,
          duration: colorDuration,
          repeat: -1, // Repeat indefinitely
          yoyo: true, // Yoyo back and forth
          onUpdate: (tween) => {
            const colorValue = generateRainbowColors();
            letter.setTint(colorValue);
          }
        });
      });
    }

    const duration = 1000; // Duration for letter location tweens

    // Define the initial positions for "ZARPULEN"
    const initialPositions = [
      { x: x1, y: this.scale.height / 2 },  //Z
      { x: x2, y: this.scale.height / 2 },    //U
      { x: x3, y: this.scale.height / 2 },      //R
      { x: x4, y: this.scale.height / 2 },        //P
      { x: x5, y: this.scale.height / 2 },          //A
      { x: x6, y: this.scale.height / 2 },            //L
      { x: x7, y: this.scale.height / 2 },              //E
      { x: x8, y: this.scale.height / 2 }                 //N
    ];

    // Define the final positions for "RAPUNZEL"
    const finalPositions = [
      { x: x1, y: this.scale.height / 2 },
      { x: x2, y: this.scale.height / 2 },
      { x: x3, y: this.scale.height / 2 },
      { x: x4, y: this.scale.height / 2 },
      { x: x5, y: this.scale.height / 2 },
      { x: x6, y: this.scale.height / 2 },
      { x: x7, y: this.scale.height / 2 },
      { x: x8, y: this.scale.height / 2 }
    ];

    const startKey = [0, 1, 2, 3, 4, 5, 6, 7]; // Order of letters in "ZARPULEN"
    const endKey = [2, 4, 3, 1, 7, 0, 6, 5];   // Order of letters in "RAPUNZEL"
    const rapunzel = [R, A, P, U, N, Z, E, L];

    setTimeout(() => {
      // Create tweens for "ZARPULEN" to "RAPUNZEL"
      for (let i = 0; i < rapunzel.length; i++) {
        const letter = zurpalen[endKey[i]];
        const finalPos = finalPositions[i];

        // Add an intermediate y vertical value between start and final positions
        const intermediateY = (finalPos.y + initialPositions[i].y) / 2;

        // Add an intermediate x value with an offset that alternates between 50 and -50
        const xOffset = i % 2 === 0 ? 100 : -100;

        // Calculate intermediate x position
        const intermediateX = (finalPos.x + initialPositions[i].x) / 2;

        // Add a vertical offset for every other letter
        const yOffset = i % 2 === 0 ? -200 : 200;

        // First tween: move to intermediate position
        this.tweens.add({
          targets: letter,
          x: intermediateX + xOffset,
          y: intermediateY + yOffset,
          ease: 'Sine.easeInOut',
          duration: duration / 2,
          delay: i * duration,
          onComplete: (tween) => {
            // Second tween: move to final position
            this.tweens.add({
              targets: letter,
              x: finalPos.x,
              y: finalPos.y,
              ease: 'Sine.easeInOut',
              duration: duration / 2,
              onComplete: (secondTween) => {
                // Spot holder for adding more tween tricks and logic
              }
            });
          }
        });
      }
    }, duration * 3); //delays the tween animation so you can read "Zarpulen" before the letters start moving


    setTimeout(() => {
      // smoke.setVisible(true)
      const finalText = this.add.text(20, 900, 'The Princess was Zurpalen all along. Luring heroes here, to the tower, to consume their souls!', {
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
    }, duration * 11);

    setTimeout(() => {
    this.scene.start(CST.SCENES.LEVEL3);
    }, duration*18);


    //////
    //////
    // THIS WILL DIRECT TO THE FINAL BATTLE SCENE
    //////
    //////
    //////

    // Handle Enter key press to restart the game
    this.input.keyboard.on("keydown-ENTER", () => {
      this.scene.start(CST.SCENES.LEVEL3);
    });

    // Handle pointer click to restart the game
    this.input.on("pointerup", () => {
      this.scene.start(CST.SCENES.LEVEL3);
    });


  }

}
