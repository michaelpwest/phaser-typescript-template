import { Game, Hud, Overlay, SceneHandler } from '../scenes';
import { Colors } from './colors';
import { Debug } from './debug';

export const Properties = {
  type: Phaser.AUTO,
  parent: 'game',
  fps: {
    target: 60,
    forceSetTimeOut: true,
  },
  pixelArt: true,
  backgroundColor: Colors.BLACK.HEX,
  scale: {
    mode: Phaser.Scale.RESIZE,
    width: 960,
    height: 540,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: Debug.physics,
    },
  },
  scene: [SceneHandler, Game, Hud, Overlay],
};
