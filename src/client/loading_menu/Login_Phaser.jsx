import { CST } from "./CST.jsx";
import "../loginform.css";
import axios from 'axios';
import { store } from "../store"
import { removeUserCharacter, setUserCharacter } from '../reducers/characterSelectionSlice';
import { removeToken, setToken } from '../reducers/registrationSlice';
import { setUser, removeUser } from '../reducers/loginSlice';
import { addItemToInventory, removeAllGear } from '../reducers/gearSlice';
import CharacterSelection from '../CharacterSelection.jsx'

export class LoginScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LOGIN
        })
    }


    init(data) {

    }

    preload() {
        this.load.image("castle", "/assets/castle.png")
        this.load.html("nameform", "/assets/text/loginform.html")

    }

    create() {
        let bg1 = this.add.image(400, 300, "castle");



        let scaleX = this.scale.width / bg1.width;
        let scaleY = this.scale.height / bg1.height;
        let scale = Math.max(scaleX, scaleY);

        bg1.setScale(scale);


        bg1.setPosition(this.scale.width / 2, this.scale.height / 2);


        const text = this.add.text(20, 20, 'time is of the essences login to save the princess', { color: 'white', fontFamily: 'p-script', fontSize: '32px' })

        const element = this.add.dom(400, 600).createFromCache('nameform');

        // element.setPerspective(800);
        element.node.style.perspective = '800px';

        element.addListener('click');


        element.on('click', (event) => {

            if (event.target.name === 'loginButton') {
                const inputUsername = element.getChildByID('username');
                const inputPassword = element.getChildByID('password');

                //  Have they entered anything?
                if (inputUsername.value !== '' && inputPassword.value !== '') {


                    const loginLogic = async () => {
                        try {
                            // validate user and issue a JWT Token
                            const { data: token } = await axios.post("/auth/login", {
                                username: inputUsername.value,
                                password: inputPassword.value,
                            })
                            localStorage.setItem("TOKEN", JSON.stringify(token.token))


                            //get user ID
                            const userId = token.id


                            //get User Record from DB and set it in state
                            const { data: userRecord } = await axios.get(`/api/user/${userId}`);
                            console.log("user record: ", userRecord)

                            // TO DO -> SELECT CHARACTER CLASS /////////
                            // if no character is associated with the user yet, take them to the character selection page
                            if (!userRecord.character_id) {

                                console.log('no character record, you need to build your character')
                                // TO DO!
                                // navigate('/character') 
                            }
                            /////////////////////////////////////////////

                            
                            //load up character information into state
                            if (userRecord.character_id) {
                                const { data: characterRecord } = await axios.get(`/api/character/${userRecord.character_id}`);
                                store.dispatch(setUserCharacter(characterRecord));
                                //load up 
                                const { data: userInventory } = await axios.get(`/api/inventory/${userRecord.character_id}`);
                                console.log("UserInventory : ", userInventory)
                                userInventory.forEach(async (gearItem) => {
                                    const { data: gearDetails } = await axios.get(`/api/gear/${gearItem.gear_id}`)
                                    store.dispatch(addItemToInventory(gearDetails));
                                    console.log(gearDetails.name, "added to Inventory in State")
                                });
                            }

                            // localStorage.setItem("CHARACTER", characterRecord)

                            //Set Redux State with character info
                            store.dispatch(setToken(token.token))
                            store.dispatch(setUser({ id: userId }));
                            store.dispatch(removeUser());  //Clears User data out of state if already there
                            store.dispatch(setUser(userRecord));



                            console.log(CST.SCENES.LOAD)
                            this.scene.start(CST.SCENES.MENU)

                        } catch (err) {
                            console.log(err)
                        }


                        // this.scene.start(CST.SCENES.MENU, { text: ` Hurry ${inputUsername.value}! The princess is in danger!` });

                    }

                    loginLogic();




                    //  Turn off the click events
                    element.removeListener('click');
                    //  Tween the login form out
                    element.scene.tweens.add({ targets: element.rotate3d, x: 1, w: 90, duration: 3000, ease: 'Power3' });

                    element.scene.tweens.add({
                        targets: element, scaleX: 2, scaleY: 2, y: 700, duration: 3000, ease: 'Power3',
                        onComplete: function () {
                            element.setVisible(false);
                        }
                    });

                    //  Populate the text with whatever they typed in as the username!
                    const hasToken = localStorage.getItem("TOKEN");
                    if (hasToken) {
                        text.setText(` Hurry ${inputUsername.value}! The princess is in danger!`);
                    } else {
                        text.setText(` ${inputUsername.value}! You need to register!`);
                    }
                }
                else {
                    //  Flash the prompt

                    console.log(text)
                    console.log(element)

                    this.scene.tweens.add({
                        targets: text,
                        alpha: 0.1,
                        duration: 200,
                        ease: 'Power3',
                        yoyo: true,
                    });

                    this.scene.tweens.add({
                        targets: element,
                        y: 300,
                        duration: 3000,
                        ease: 'Power3',
                    });

                }


            }
        });
        //this.scene.start(CST.SCENES.LOAD);
    }
}
