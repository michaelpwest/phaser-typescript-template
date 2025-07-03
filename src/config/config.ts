import { Game, Hud, SceneHandler } from '../scenes';
import { Debug } from './debug';

export const Config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 1920,
  height: 1080,
  fps: {
    target: 60,
    forceSetTimeOut: true,
  },
  pixelArt: true,
  roundPixels: true,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: Debug.physics,
      width: 1920,
      height: 1080,
      gravity: {
        x: 0,
        y: 500,
      },
    },
  },
  scene: [SceneHandler, Hud, Game],
};
