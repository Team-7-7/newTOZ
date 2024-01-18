import {CST} from "./CST.jsx";

export class MenuScene extends Phaser.Scene {
    constructor(){
        super({
            key: CST.SCENES.MENU
        })
    }
    
    init(data){
        console.log(data);
        console.log("I GOT IT");
    }

    preload(){ 
        this.load.image("background1" , "./assets/castle.png") 
        
    }
    

    create(){
        let bg1 = this.add.image( 400, 300, "background1");
      
       

        let scaleX = this.scale.width / bg1.width;
        let scaleY = this.scale.height / bg1.height;
        let scale = Math.max(scaleX, scaleY);
    
        bg1.setScale(scale);
        
        
        bg1.setPosition(this.scale.width / 2, this.scale.height / 2);
        
        // scaling that did not work

        // bg1.setScale(this.scale.width / bg1.width,  this.scale.height / bg1.height);
        // bg2.setScale(this.scale.width / bg2.width,  this.scale.height / bg2.height);
        
        // this.add.image(400, 300, "background1");
        // this.add.image(400, 300, "background2");

        this.input.keyboard.on('keydown-ENTER', () => {
            this.scene.start(CST.SCENES.LEVEL1);
        })
    }
}