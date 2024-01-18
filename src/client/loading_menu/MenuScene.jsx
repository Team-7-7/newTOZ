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

    preaload(){ 
         this.load.image("background1" , "./assets/clouds.png") 
         this.load.image("background2" , "./assets/ground.png")
        }
    

    create(){
         this.add.image(400, 300, "background1");
         this.add.image(400, 300, "background2");

    }
}