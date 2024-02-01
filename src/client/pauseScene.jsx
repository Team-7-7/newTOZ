//pauseScene.jsx

import eventsCenter from "./EventsCenter.jsx";
import { CST } from "./loading_menu/CST.jsx";
import { store } from "./store"; // brings in redux store



export class PauseScene extends Phaser.Scene {
  constructor(){
      super({
          key: CST.SCENES.PAUSE
      })    
      fontFamily:'p-script'

    this.gameOver=false;
    this.characterName="";
    this.characterHealth = 0;
    this.characterMaxHealth = 0;
    this.characterArmor = 0;
    this.characterAttack = 0;
    this.characterSpeed = 0;
    this.characterXp = 0;
    this.characterLevel = 0;
    this.characterGold=0;
    this.loadedCharacterStats = false;
    this.head_gear1 = 7;
    this.left_hand_gear2=7;
    this.right_hand_gear3=7;
    this.foot_gear4 =7;
    this.chest_gear5=7;
    this.backpack1 =7;
    this.backpack2 =7;
    this.backpack3 =7;
    this.backpack4 =7;
    this.backpack5 =7;
    this.backpack6 =7;
    this.backpack7 =7;
    this.backpack8 =7;
    

  }
  

init(){

}


preload ()
{

    const state = store.getState() // this brings in the state from redux

    //bring in values of the character from state:
    if(!this.loadedCharacterStats){
    this.characterName=state.userCharacter.character.name;
    this.characterHealth += state.userCharacter.character.currentHP;
    this.characterMaxHealth += state.userCharacter.character.maxHP;
    this.characterArmor += state.userCharacter.character.base_armor;
    this.characterAttack += state.userCharacter.character.base_attack;
    this.characterSpeed += state.userCharacter.character.base_speed;
    this.characterXp += state.userCharacter.character.xp;
    this.characterLevel += state.userCharacter.character.level;
    this.characterGold += state.userCharacter.character.gold;
    this.loadedCharacterStats = true;
    this.head_gear1 = state.userCharacter.character.head_gear1;
    this.left_hand_gear2=state.userCharacter.character.left_hand_gear2;
    this.right_hand_gear3=state.userCharacter.character.right_hand_gear3;
    this.foot_gear4 =state.userCharacter.character.foot_gear4;
    this.chest_gear5=state.userCharacter.character.chest_gear5;
    this.backpack1 =state.userCharacter.character.backpack1;
    this.backpack2 =state.userCharacter.character.backpack2;
    this.backpack3 =state.userCharacter.character.backpack3;
    this.backpack4 =state.userCharacter.character.backpack4;
    this.backpack5 =state.userCharacter.character.backpack5;
    this.backpack6 =state.userCharacter.character.backpack6;
    this.backpack7 =state.userCharacter.character.backpack7;
    this.backpack8 =state.userCharacter.character.backpack8;



    }


    switch(state.userCharacter.character.character_class){
        case "warrior":
            this.load.image('playerPauseScene', '/assets/pauseAssets/knightPauseScene.png');
            break;
        case "mage":
            this.load.image('playerPauseScene', '/assets/pauseAssets/magePauseScene.png');
            break;
        case "rogue":    
            this.load.image('playerPauseScene', '/assets/pauseAssets/roguePauseScene.png');
            break;
    }

    this.load.spritesheet('playButton', 'assets/pauseAssets/playButton110x60.png', { frameWidth: 110, frameHeight: 60 });
    this.load.spritesheet('saveButton', 'assets/pauseAssets/saveButton110x60.png', { frameWidth: 110, frameHeight: 60 });
    this.load.spritesheet('quitButton', 'assets/pauseAssets/quitButton110x60.png', { frameWidth: 110, frameHeight: 60 });
    this.load.spritesheet('sword','assets/levelAssets/swordIcon25x48.png', {frameWidth: 25, frameHeight: 48}) ;
    this.load.spritesheet('empty','assets/levelAssets/emptySlot50x50.png', {frameWidth: 50, frameHeight: 50}) ;
    this.load.spritesheet('swordSlot', 'assets/pauseAssets/swordSlot50x50.png', { frameWidth: 50, frameHeight: 50 });
    this.load.spritesheet('gear', 'assets/gear50x50.png', { frameWidth: 50, frameHeight: 50 });




}

create ()
{
    const state = store.getState() // this brings in the state from redux

// console.log('this is state.gear.allPossibleGear[this.right_hand_gear3].graphicUrl: ', state.gear.allPossibleGear[this.right_hand_gear3].graphicUrl);

    eventsCenter.on('updateGold', (moreGold)=> {
        console.log('updateGold event triggered with amount:', moreGold);
        this.characterGold +=moreGold;
        this.characterXp += Math.round(moreGold/2);

    }, this);

    eventsCenter.on('lootedItem', (item)=>{
        console.log('in the pause Scene, the looted item is a ', item);
        if(item === 'lootsword'){
                    this.right_hand_gear3 = 1;
        }
    })


    // ***************  this is a test to see if the emitter is working correctly ************************************
    eventsCenter.on('Test', ()=>{
        console.log('Test Emitter is working');
    }, this);
            

    //  A background for our pause Screen
    this.add.image(800, 600, 'playerPauseScene');

    this.add.text(630, 380, this.characterName, { font: "20px p-script", fill: "#7e4035" });
    this.add.text(640, 425, this.characterHealth, { font: "30px p-script", fill: "#7e4035" });
    this.add.text(680, 425, '/' + this.characterMaxHealth, { font: "30px p-script", fill: "#7e4035" });
    this.add.text(640, 480, this.characterArmor, { font: "30px p-script", fill: "#7e4035" });
    this.add.text(640, 530, this.characterAttack, { font: "30px p-script", fill: "#7e4035" });
    this.add.text(640, 580, this.characterSpeed, { font: "30px p-script", fill: "#7e4035" });
    this.add.text(850, 370, this.characterXp, { font: "30px p-script", fill: "#7e4035" });
    this.add.text(850, 425, this.characterLevel, { font: "30px p-script", fill: "#7e4035" });
    this.add.text(850, 480, this.characterGold, { font: "30px p-script", fill: "#7e4035" });

    const clickHead = this.add.sprite(941,479, 'gear' , this.head_gear1 -1).setInteractive(); // head
    const clickLhand = this.add.sprite(852,638, 'gear',this.left_hand_gear2 -1).setInteractive(); // left hand
    const clickRhand = this.add.sprite(1054,626, 'gear',this.right_hand_gear3-1).setInteractive(); // right hand
    const clickFeet = this.add.sprite(943,729, 'gear' , this.foot_gear4 -1).setInteractive(); // feet
    const clickChest = this.add.sprite(943,654, 'gear', this.chest_gear5 -1).setInteractive(); // chest

    const clickBP1 = this.add.sprite(557,688, 'gear', this.backpack1 -1).setInteractive(); // backpack 1
    const clickBP2 = this.add.sprite(611,688, 'gear', this.backpack2 -1).setInteractive(); // backpack 2
    const clickBP3 = this.add.sprite(662,688, 'gear', this.backpack3 -1).setInteractive(); // backpack 3
    const clickBP4 = this.add.sprite(709,688, 'gear', this.backpack4 -1).setInteractive(); // backpack 4

    const clickBP5 = this.add.sprite(557,742, 'gear', this.backpack5 -1).setInteractive(); // backpack 5
    const clickBP6 = this.add.sprite(611,742, 'gear', this.backpack6 -1).setInteractive(); // backpack 6
    const clickBP7 = this.add.sprite(662,742, 'gear', this.backpack7 -1).setInteractive(); // backpack 7
    const clickBP8 = this.add.sprite(709,742, 'gear', this.backpack8 -1).setInteractive(); // backpack 8


const updateStats = () =>{

    console.log('updating the Stats');

    let attackSum = state.gear.allPossibleGear[this.head_gear1].attack + state.gear.allPossibleGear[this.left_hand_gear2].attack + state.gear.allPossibleGear[this.right_hand_gear3].attack + state.gear.allPossibleGear[this.foot_gear4].attack + state.gear.allPossibleGear[this.chest_gear5].attack ;
    let healthSum = state.gear.allPossibleGear[this.head_gear1].health_bonus + state.gear.allPossibleGear[this.left_hand_gear2].health_bonus + state.gear.allPossibleGear[this.right_hand_gear3].health_bonus + state.gear.allPossibleGear[this.foot_gear4].health_bonus + state.gear.allPossibleGear[this.chest_gear5].health_bonus;
    let armorSum = state.gear.allPossibleGear[this.head_gear1].armor_bonus + state.gear.allPossibleGear[this.left_hand_gear2].armor_bonus + state.gear.allPossibleGear[this.right_hand_gear3].armor_bonus + state.gear.allPossibleGear[this.foot_gear4].armor_bonus + state.gear.allPossibleGear[this.chest_gear5].armor_bonus;
    let speedSum = state.gear.allPossibleGear[this.head_gear1].speed_bonus + state.gear.allPossibleGear[this.left_hand_gear2].speed_bonus + state.gear.allPossibleGear[this.right_hand_gear3].speed_bonus + state.gear.allPossibleGear[this.foot_gear4].speed_bonus + state.gear.allPossibleGear[this.chest_gear5].speed_bonus;



    this.characterHealth = state.userCharacter.character.currentHP;
    this.characterMaxHealth = state.userCharacter.character.maxHP + healthSum;
    this.characterArmor = state.userCharacter.character.base_armor +armorSum;
    this.characterAttack = state.userCharacter.character.base_attack + attackSum;
    this.characterSpeed = state.userCharacter.character.base_speed + speedSum;
    this.characterXp = state.userCharacter.character.xp;
    this.characterLevel = state.userCharacter.character.level;
    this.characterGold = state.userCharacter.character.gold;

    // **************** emit new stats to current level **************************

    eventsCenter.emit('updateStats',  this.characterHealth, this.characterMaxHealth,this.characterArmor,this.characterAttack,this.characterSpeed);
    // eventsCenter.emit('updateStats', 1);
    console.log('in the pause screen updating stats');

}





const equipItem = (originalLocation, targetLocation) =>{
   let temp = null;
    switch (originalLocation){
            case "BP1":
                switch (targetLocation){
                    case 1:
                        temp = this.head_gear1;
                        this.head_gear1 = this.backpack1;
                        this.backpack1 = temp;
                        break;
                    case 2:
                        temp = this.left_hand_gear2;
                        this.left_hand_gear2 = this.backpack1;
                        this.backpack1 = temp;
                        break;
                    case 3:
                        temp = this.right_hand_gear3;
                        this.right_hand_gear3 = this.backpack1;
                        this.backpack1 = temp;
                        break;
                    case 4:
                        temp = this.foot_gear4;
                        this.foot_gear4 = this.backpack1;
                        this.backpack1 = temp;
                        break;
                    case 5:
                        temp = this.chest_gear5;
                        this.chest_gear5 = this.backpack1;
                        this.backpack1 = temp;
                        break;
                    default:
                        console.log('it did not get moved');
                        break;
                }break;
            case "BP2":
                switch (targetLocation){
                    case 1:
                        temp = this.head_gear1;
                        this.head_gear1 = this.backpack2;
                        this.backpack2 = temp;
                        break;
                    case 2:
                        temp = this.left_hand_gear2;
                        this.left_hand_gear2 = this.backpack2;
                        this.backpack2 = temp;
                        break;
                    case 3:
                        temp = this.right_hand_gear3;
                        this.right_hand_gear3 = this.backpack2;
                        this.backpack2 = temp;
                        break;
                    case 4:
                        temp = this.foot_gear4;
                        this.foot_gear4 = this.backpack2;
                        this.backpack2 = temp;
                        break;
                    case 5:
                        temp = this.chest_gear5;
                        this.chest_gear5 = this.backpack2;
                        this.backpack2 = temp;
                        break;
                    default:
                        console.log('it did not get moved');
                        break;
                }break;
            case "BP3":
            switch (targetLocation){
                case 1:
                    temp = this.head_gear1;
                    this.head_gear1 = this.backpack3;
                    this.backpack3 = temp;
                    break;
                case 2:
                    temp = this.left_hand_gear2;
                    this.left_hand_gear2 = this.backpack3;
                    this.backpack3 = temp;
                    break;
                case 3:
                    temp = this.right_hand_gear3;
                    this.right_hand_gear3 = this.backpack3;
                    this.backpack3 = temp;
                    break;
                case 4:
                    temp = this.foot_gear4;
                    this.foot_gear4 = this.backpack3;
                    this.backpack3 = temp;
                    break;
                case 5:
                    temp = this.chest_gear5;
                    this.chest_gear5 = this.backpack3;
                    this.backpack3 = temp;
                    break;
                default:
                    console.log('it did not get moved');
                    break;
            }break;
            case "BP4":
            switch (targetLocation){
                case 1:
                    temp = this.head_gear1;
                    this.head_gear1 = this.backpack4;
                    this.backpack4 = temp;
                    break;
                case 2:
                    temp = this.left_hand_gear2;
                    this.left_hand_gear2 = this.backpack4;
                    this.backpack4 = temp;
                    break;
                case 3:
                    temp = this.right_hand_gear3;
                    this.right_hand_gear3 = this.backpack4;
                    this.backpack4 = temp;
                    break;
                case 4:
                    temp = this.foot_gear4;
                    this.foot_gear4 = this.backpack4;
                    this.backpack4 = temp;
                    break;
                case 5:
                    temp = this.chest_gear5;
                    this.chest_gear5 = this.backpack4;
                    this.backpack4 = temp;
                    break;
                default:
                    console.log('it did not get moved');
                    break;
            } break;
            case "BP5":
                switch (targetLocation){
                    case 1:
                        temp = this.head_gear1;
                        this.head_gear1 = this.backpack5;
                        this.backpack5 = temp;
                        break;
                    case 2:
                        temp = this.left_hand_gear2;
                        this.left_hand_gear2 = this.backpack5;
                        this.backpack5 = temp;
                        break;
                    case 3:
                        temp = this.right_hand_gear3;
                        this.right_hand_gear3 = this.backpack5;
                        this.backpack5 = temp;
                        break;
                    case 4:
                        temp = this.foot_gear4;
                        this.foot_gear4 = this.backpack5;
                        this.backpack5 = temp;
                        break;
                    case 5:
                        temp = this.chest_gear5;
                        this.chest_gear5 = this.backpack5;
                        this.backpack5 = temp;
                        break;
                    default:
                        console.log('it did not get moved');
                        break;
                }break;
            case "BP6":
                switch (targetLocation){
                    case 1:
                        temp = this.head_gear1;
                        this.head_gear1 = this.backpack6;
                        this.backpack6 = temp;
                        break;
                    case 2:
                        temp = this.left_hand_gear2;
                        this.left_hand_gear2 = this.backpack6;
                        this.backpack6 = temp;
                        break;
                    case 3:
                        temp = this.right_hand_gear3;
                        this.right_hand_gear3 = this.backpack6;
                        this.backpack6 = temp;
                        break;
                    case 4:
                        temp = this.foot_gear4;
                        this.foot_gear4 = this.backpack6;
                        this.backpack6 = temp;
                        break;
                    case 5:
                        temp = this.chest_gear5;
                        this.chest_gear5 = this.backpack6;
                        this.backpack6 = temp;
                        break;
                    default:
                        console.log('it did not get moved');
                        break;
                }break;
            case "BP7":
            switch (targetLocation){
                case 1:
                    temp = this.head_gear1;
                    this.head_gear1 = this.backpack7;
                    this.backpack7 = temp;
                    break;
                case 2:
                    temp = this.left_hand_gear2;
                    this.left_hand_gear2 = this.backpack7;
                    this.backpack7 = temp;
                    break;
                case 3:
                    temp = this.right_hand_gear3;
                    this.right_hand_gear3 = this.backpack7;
                    this.backpack7 = temp;
                    break;
                case 4:
                    temp = this.foot_gear4;
                    this.foot_gear4 = this.backpack7;
                    this.backpack7 = temp;
                    break;
                case 5:
                    temp = this.chest_gear5;
                    this.chest_gear5 = this.backpack7;
                    this.backpack7 = temp;
                    break;
                default:
                    console.log('it did not get moved');
                    break;
            }break;
            case "BP8":
            switch (targetLocation){
                case 1:
                    temp = this.head_gear1;
                    this.head_gear1 = this.backpack8;
                    this.backpack8 = temp;
                    break;
                case 2:
                    temp = this.left_hand_gear2;
                    this.left_hand_gear2 = this.backpack8;
                    this.backpack8 = temp;
                    break;
                case 3:
                    temp = this.right_hand_gear3;
                    this.right_hand_gear3 = this.backpack8;
                    this.backpack8 = temp;
                    break;
                case 4:
                    temp = this.foot_gear4;
                    this.foot_gear4 = this.backpack8;
                    this.backpack8 = temp;
                    break;
                case 5:
                    temp = this.chest_gear5;
                    this.chest_gear5 = this.backpack8;
                    this.backpack8 = temp;
                    break;
                default:
                    console.log('it did not get moved');
                    break;
            }break;
        }
        updateStats();
        this.scene.restart();
    }

clickHead.on('pointerdown', (event) => {
    console.log('you clicked on the item on the head');
    console.log('on the head is: ', this.head_gear1);
    if (this.backpack1 === 7){
        equipItem('BP1', 1)
    } else if(this.backpack2 === 7){
        equipItem('BP2', 1)
    } else if(this.backpack3 === 7){
        equipItem('BP3', 1) 
    } else if(this.backpack4 === 7){
        equipItem('BP4', 1) 
    } else if(this.backpack5 === 7){
        equipItem('BP5', 1) 
    } else if(this.backpack6 === 7){
        equipItem('BP6', 1)
    } else if(this.backpack7 === 7){
        equipItem('BP7', 1)
    } else if(this.backpack8 === 7){
        equipItem('BP8', 1)
    }
    });


clickLhand.on('pointerdown', (event) => {
    console.log('you clicked on the item in the left hand');
    console.log('in the left hand is: ', this.left_hand_gear2);
    if (this.backpack1 === 7){
        equipItem('BP1', 2)
    } else if(this.backpack2 === 7){
        equipItem('BP2', 2)
    } else if(this.backpack3 === 7){
        equipItem('BP3', 2) 
    } else if(this.backpack4 === 7){
        equipItem('BP4', 2) 
    } else if(this.backpack5 === 7){
        equipItem('BP5', 2) 
    } else if(this.backpack6 === 7){
        equipItem('BP6', 2)
    } else if(this.backpack7 === 7){
        equipItem('BP7', 2)
    } else if(this.backpack8 === 7){
        equipItem('BP8', 2)
    }
});

clickRhand.on('pointerdown', (event) => {
    console.log('you clicked on the item in the right hand');
    console.log('in the right hand is: ', this.right_hand_gear3);
    if (this.backpack1 === 7){
        equipItem('BP1', 3)
    } else if(this.backpack2 === 7){
        equipItem('BP2', 3)
    } else if(this.backpack3 === 7){
        equipItem('BP3', 3) 
    } else if(this.backpack4 === 7){
        equipItem('BP4', 3) 
    } else if(this.backpack5 === 7){
        equipItem('BP5', 3) 
    } else if(this.backpack6 === 7){
        equipItem('BP6', 3)
    } else if(this.backpack7 === 7){
        equipItem('BP7', 3)
    } else if(this.backpack8 === 7){
        equipItem('BP8', 3)
    }
});

clickFeet.on('pointerdown', (event) => {
    console.log('you clicked on the item on the feet');
    console.log('on the feet is: ', this.foot_gear4);
    if (this.backpack1 === 7){
        equipItem('BP1', 4)
    } else if(this.backpack2 === 7){
        equipItem('BP2', 4)
    } else if(this.backpack3 === 7){
        equipItem('BP3', 4) 
    } else if(this.backpack4 === 7){
        equipItem('BP4', 4) 
    } else if(this.backpack5 === 7){
        equipItem('BP5', 4) 
    } else if(this.backpack6 === 7){
        equipItem('BP6', 4)
    } else if(this.backpack7 === 7){
        equipItem('BP7', 4)
    } else if(this.backpack8 === 7){
        equipItem('BP8', 4)
    }
});

clickChest.on('pointerdown', (event) => {
    console.log('you clicked on the item in the chest');
    console.log('on the chest is: ', this.chest_gear5);
    if (this.backpack1 === 7){
        equipItem('BP1', 5)
    } else if(this.backpack2 === 7){
        equipItem('BP2', 5)
    } else if(this.backpack3 === 7){
        equipItem('BP3', 5) 
    } else if(this.backpack4 === 7){
        equipItem('BP4', 5) 
    } else if(this.backpack5 === 7){
        equipItem('BP5', 5) 
    } else if(this.backpack6 === 7){
        equipItem('BP6', 5)
    } else if(this.backpack7 === 7){
        equipItem('BP7', 5)
    } else if(this.backpack8 === 7){
        equipItem('BP8', 5)
    }
});

clickBP1.on('pointerdown', (event) => {
    console.log('you clicked on the item in Back Pack 1');
    equipItem('BP1',state.gear.allPossibleGear[this.backpack1].equip_location );
});
clickBP2.on('pointerdown', (event) => {
    console.log('you clicked on the item in Back Pack 2');
    equipItem('BP2',state.gear.allPossibleGear[this.backpack2].equip_location );
});
clickBP3.on('pointerdown', (event) => {
    console.log('you clicked on the item in Back Pack 3');
    equipItem('BP3',state.gear.allPossibleGear[this.backpack3].equip_location );
});
clickBP4.on('pointerdown', (event) => {
    console.log('you clicked on the item in Back Pack 4');
    equipItem('BP4',state.gear.allPossibleGear[this.backpack4].equip_location );
});
clickBP5.on('pointerdown', (event) => {
    console.log('you clicked on the item in Back Pack 5');
    equipItem('BP5',state.gear.allPossibleGear[this.backpack5].equip_location );
});
clickBP6.on('pointerdown', (event) => {
    console.log('you clicked on the item in Back Pack 6');
    equipItem('BP6',state.gear.allPossibleGear[this.backpack6].equip_location );
});
clickBP7.on('pointerdown', (event) => {
    console.log('you clicked on the item in Back Pack 7');
    equipItem('BP7',state.gear.allPossibleGear[this.backpack7].equip_location );
});
clickBP8.on('pointerdown', (event) => {
    console.log('you clicked on the item in Back Pack 8');
    equipItem('BP8',state.gear.allPossibleGear[this.backpack8].equip_location );
});




    //  Input Events
    this.keys = this.input.keyboard.addKeys({
    //   w: Phaser.Input.Keyboard.KeyCodes.W,
    //   a: Phaser.Input.Keyboard.KeyCodes.A,
    //   s: Phaser.Input.Keyboard.KeyCodes.S,
    //   d: Phaser.Input.Keyboard.KeyCodes.D,
      k: Phaser.Input.Keyboard.KeyCodes.K,
      p: Phaser.Input.Keyboard.KeyCodes.P,

  
     });


    this.input.keyboard.on('keydown-P', function (event) {
        this.scene.resume("LEVEL1");
        this.scene.stop("PAUSE");
    }, this);



    // this.playButton = this.physics.add.staticSprite(580,865, 'playButton').setInteractive();
    const playButton = this.add.sprite(580,865, 'playButton').setInteractive();
    const saveButton = this.add.sprite(815,860, 'saveButton').setInteractive();
    const quitButton = this.add.sprite(1018,860, 'quitButton').setInteractive();

    playButton.on('pointerup', function(event){
        this.scene.resume("LEVEL1");
        this.scene.stop("PAUSE");
    }, this);

    saveButton.on('pointerup', function(event){
        console.log('save the game function required')
    }, this);

    quitButton.on('pointerup', function(event){
        console.log('quit the game function required')
        // may need to emit this to the current scene
        eventsCenter.emit('gameOver', true);

    }, this);


};

update ()
{
    // if (this.gameOver)
    // {
    //     return;
    // }

    // if (this.keys.a.isDown)
    // {
    // }
    // else if (this.keys.d.isDown)
    // {
    // }
    // else
    // {
    // }
    // if(this.keys.w.isDown)
    // {
    // }
    // else if(this.keys.s.isDown)
    // {
    // }
    // else
    // {
    // }

    if (this.keys.k.isDown)
    {
        console.log('k is pressed, attacking now');
    }

    if (this.keys.p.isDown)
    {
        console.log('p is pressed, resuming game');
          this.scene.pause("PAUSE");
          this.scene.launch("LEVEL1");
    }

}
}
