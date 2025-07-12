import { Game, Hud, SceneHandler } from '../scenes';
import { Debug } from './debug';

export const Config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 1080,
  height: 1920,
  fps: {
    target: 60,
    forceSetTimeOut: true,
  },
  pixelArt: true,
  roundPixels: true,
  render: {
    antialias: false,
  },
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: Debug.physics,
      gravity: {
        x: 0,
        y: 2000,
      },
    },
  },
  scene: [SceneHandler, Hud, Game],
};
