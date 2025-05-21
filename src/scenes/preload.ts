import { BaseScene } from './base-scene';

export class Preload extends BaseScene {
  constructor() {
    super('BaseScene');
  }

  public preload(): void {
    // Load background.
    this.load.image('background', 'assets/images/background.png');

    // Load ground.
    this.load.image('ground', 'assets/images/ground.png');

    // Load game sprite sheet.
    this.load.spritesheet('sprite-sheet', 'assets/images/sprite-sheet.png', {
      frameWidth: 128,
      frameHeight: 128,
    });

    // Load sounds.
    this.load.audio('menu-select', ['assets/sounds/menu-select.wav']);
    this.load.audio('jump', ['assets/sounds/jump.wav']);
    this.load.audio('game-over', ['assets/sounds/game-over.wav']);
  }

  public create(): void {
    super.create();

    // Start scenes.
    this.scene.launch('World');
    this.scene.launch('Hud');
    this.scene.launch('Overlay');
  }
}
