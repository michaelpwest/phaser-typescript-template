import { World, Game, Hud, Overlay, Preload } from '../scenes';
import { Debug } from './debug';

export const Properties = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 1920,
  height: 1080,
  fps: {
    target: 60,
    forceSetTimeOut: true,
  },
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        x: 0,
        y: 5000,
      },
      debug: Debug.physics,
    },
  },
  scene: [Preload, World, Game, Hud, Overlay],
};
