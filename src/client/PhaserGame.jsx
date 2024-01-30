//PhaserGame.jsx

import Phaser from 'phaser';
import {Level1} from './level1';
import {Level2} from './level2';
import {Load} from "./loading_menu/LoadingScene.jsx"
import {Menu} from './loading_menu/MenuScene';
import {PauseScene} from './pauseScene';
import {LoginScene} from './loading_menu/Login_Phaser.jsx';
import {TitleScene} from './loading_menu/TitleScene.jsx';
import { CST } from './loading_menu/CST.jsx';
import WebFont from 'webfontloader';

const PhaserGame = () => {
  var config = {
    type: Phaser.AUTO,
    parent:'//cdn.jsdelivr.net/npm/phaser@3.70.0/dist/phaser.js',
    width: 1600,
    height: 1200,
    // line required fr use of dom elements
    dom: {
      createContainer: true
  },
  pixelArt: true,  // Enable pixel art mode
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene:[ TitleScene, LoginScene, Load, Menu, Level1, Level2, PauseScene]
    // scene:[ Load, Menu, Level1, PauseScene]
  

    };
    
    //var game = new Phaser.Game(config);
    WebFont.load({
      custom: {
          families: ['p-script', 'pixle script bold']
      },
      active: function() {
          console.log('font loaded');
          // Once the fonts are loaded, start the Phaser game
          var game = new Phaser.Game(config);
      }
    });

    return <div id="phaser-game"></div>;
    };
    

export default PhaserGame;