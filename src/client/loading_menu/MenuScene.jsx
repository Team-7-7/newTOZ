//MenuScene.jsx
import { CST } from "./CST.jsx";

export class Menu extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.MENU
        })

    }

    init(data) {
        console.log(data);
        console.log("I GOT IT - at the MENU scene");
    }

    preload() {
        this.load.image("background1", "/assets/castle.png")
        this.load.image("manuscript", "/assets/titlePage/manuscript.png")
        this.load.image("nes", "/assets/titlePage/nes_controller.png")
        this.load.image("controls", "/assets/titlePage/controls.png")

    }


    create() {
        let bg1 = this.add.image(400, 300, "background1");
        let scaleX = this.scale.width / bg1.width;
        let scaleY = this.scale.height / bg1.height;
        let scale = Math.max(scaleX, scaleY);
        bg1.setScale(scale);
        bg1.setPosition(this.scale.width / 2, this.scale.height / 2);

        let manuscript = this.add.image(this.scale.width / 4, this.scale.height / 2, "manuscript");
        manuscript.setScale(2);

        let controls = this.add.image(this.scale.width - (this.scale.width / 4), this.scale.height / 2, "controls");
        controls.setScale(2);

        let nes = this.add.image(this.scale.width - (this.scale.width / 4), this.scale.height - (this.scale.height / 5), "nes");
        nes.setScale(8);


        const text = this.add.text(this.scale.width / 2, this.scale.height - (this.scale.height / 12), 'You stand before the tower gate...press enter to begin', {
            color: 'white',
            fontFamily: 'p-script',
            fontSize: '32px',
            align: 'center'
        });
        text.setOrigin(0.5);


        this.input.keyboard.on('keydown-ENTER', () => {
            this.scene.start(CST.SCENES.LEVEL1);
        })
        this.input.on('pointerup', () => {
            this.scene.start(CST.SCENES.LEVEL1);
        })
        this.input.keyboard.on('keydown-g', () => {
            this.scene.start(CST.SCENES.LEVEL1);
        })
    }
}