import { Constants, Textures } from '../config';
import { BaseScene } from './base-scene';

export class SceneHandler extends BaseScene {
  constructor() {
    super('SceneHandler');
  }

  public preload(): void {
    // Load background image.
    this.load.image(Textures.BACKGROUND, 'assets/images/background.png');

    // Load ground image.
    this.load.image(Textures.GROUND, 'assets/images/ground.png');

    // Load player sprite sheet.
    this.load.spritesheet(Textures.PLAYER, 'assets/images/player.png', {
      frameWidth: 32,
      frameHeight: 32,
    });

    // Load HUD sprite sheet.
    this.load.spritesheet(Textures.HUD, 'assets/images/hud.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    // Load sounds.
    this.load.audio('menu-select', ['assets/sounds/menu-select.wav']);
    this.load.audio('tap', ['assets/sounds/tap.wav']);
    this.load.audio('game-over', ['assets/sounds/game-over.wav']);
  }

  public create(): void {
    super.create();

    // Start HUD scene.
    this.scene.launch('Hud');

    // Update game state to menu.
    this.registry.set('game-state', Constants.GAME.STATES.MENU);

    // Initialize events();
    this.initEvents();
  }

  private initEvents(): void {
    // Handle game state change.
    this.registry.events.on('changedata-game-state', (parent: Phaser.Data.DataManager, gameState: string) => {
      console.log(gameState);
      switch (gameState) {
        case Constants.GAME.STATES.STARTED:
          // Start game.
          this.scene.start('Game');
          break;
        case Constants.GAME.STATES.MENU:
        case Constants.GAME.STATES.GAME_OVER:
          // Stop game.
          this.scene.stop('Game');
          break;
        default:
          break;
      }
    });
  }
}
