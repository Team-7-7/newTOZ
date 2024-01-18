import Phaser from 'phaser';
import { LoadScene } from './loading_menu/LoadingScene';
import { MenuScene } from './loading_menu/MenuScene';
import { Level1 } from './level1';


const PhaserGame = () => {
  var config = {
    type: Phaser.AUTO,
    parent:'//cdn.jsdelivr.net/npm/phaser@3.11.0/dist/phaser.js',
  scale:{
    mode: Phaser.Scale.ScaleModes.RESIZE,
    width: window.innerWidth,
    height: window.innerHeight,
  },
    // width: 1600,
    // height: 1200,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene:[ Level1, LoadScene, MenuScene,]
    };
    var game = new Phaser.Game(config);

    return <div id="phaser-game"></div>;
    };
    

export default PhaserGame;