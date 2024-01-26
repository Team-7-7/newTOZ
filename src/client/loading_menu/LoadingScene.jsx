//LoadingScene.jsx

import {CST} from "./CST.jsx";

export class Load extends Phaser.Scene {
    constructor(){
        super({
            key: CST.SCENES.LOAD
        })
    }
    init(data){
      console.log('hello');
    
    }
    
    preload(){

    }
    
    create(){
        // this.scene.start(CST.SCENES.LOGIN);
        this.scene.start(CST.SCENES.MENU,'hello from load scene');
        console.log('this is the loadingScene.jsx running');

        
    }
}