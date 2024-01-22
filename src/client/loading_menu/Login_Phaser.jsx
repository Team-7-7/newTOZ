import {CST} from "./CST.jsx";
import "../loginform.css";

export class LoginScene extends Phaser.Scene {
    constructor(){
         super({
            key: CST.SCENES.LOGIN
         })
    }


init(data){

}

preload(){
    this.load.image("castle" , "/assets/castle.png")
    this.load.html("nameform" , "/assets/text/loginform.html")
    
}

create(){
    let bg1 = this.add.image( 400, 300, "castle");
      
       

    let scaleX = this.scale.width / bg1.width;
    let scaleY = this.scale.height / bg1.height;
    let scale = Math.max(scaleX, scaleY);

    bg1.setScale(scale);
    
    
    bg1.setPosition(this.scale.width / 2, this.scale.height / 2);
    
    
    const text = this.add.text(20, 20,'time is of the essences login to save the princess', {color: 'white', fontFamily:'p-script', fontSize: '32px'})
   
    const element = this.add.dom(400,600).createFromCache('nameform');
   
    // element.setPerspective(800);
    element.node.style.perspective = '800px';

    element.addListener('click');

    element.on('click', (event) => {
        if(event.target.name === 'loginButton')
        {
            const inputUsername = element.getChildByID('username');
            const inputPassword = element.getChildByID('password');
    
            //  Have they entered anything?
            if (inputUsername.value !== '' && inputPassword.value !== '')
            {
                //  Turn off the click events
                element.removeListener('click');
    
                //  Hide the login element
                element.setVisible(false);
    
                //  Populate the text with whatever they typed in
                
                text.setText('Hurry ' + inputUsername.value +'! The princess is in danger!');
            }
            else
            {
                //  Flash the prompt

                console.log('text object:', text); // Check the text object
                console.log('text alpha:', text.alpha); // Check the alpha property of the text object

                console.log('element object:', element); // Check the element object    
                console.log('element y:', element.y); // Check the y property of the element object


                this.scene.tweens.add({
                    targets: text,
                    alpha: 0.2,
                    duration: 250,
                    ease: 'Power3',
                    yoyo: true
                });
                this.tweens.add({
                    targets: element,
                    y:300,
                    duration: 3000,
                    ease: 'Power3'
                });
            }
        }
    });
            }
        }
