import Phaser from 'phaser';
import { LoadScene } from './loading_menu/LoadingScene';
import { MenuScene } from './loading_menu/MenuScene';
import { Level1 } from './level1';


const PhaserGame = () => {
  var config = {
    type: Phaser.AUTO,
    parent:'//cdn.jsdelivr.net/npm/phaser@3.11.0/dist/phaser.js',
    
    width: 1600,
    height: 1200,

 
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene:[LoadScene, MenuScene, Level1]
    };
    var game = new Phaser.Game(config);

    return <div id="phaser-game"></div>;
    };
    

export default PhaserGame;