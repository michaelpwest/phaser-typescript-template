import { GameStates, Registry, Scenes, SoundFiles, Sounds, TextureFiles, Textures } from '../config';
import { BaseScene } from './base-scene';

export class SceneHandler extends BaseScene {
  constructor() {
    super(Scenes.SCENE_HANDLER);
  }

  public preload(): void {
    // Load background image.
    this.load.image(Textures.BACKGROUND, TextureFiles.BACKGROUND);

    // Load ground image.
    this.load.image(Textures.GROUND, TextureFiles.GROUND);

    // Load player sprite sheet.
    this.load.spritesheet(Textures.PLAYER, TextureFiles.PLAYER, {
      frameWidth: 32,
      frameHeight: 32,
    });

    // Load HUD sprite sheet.
    this.load.spritesheet(Textures.HUD, TextureFiles.HUD, {
      frameWidth: 16,
      frameHeight: 16,
    });

    // Load sounds.
    this.load.audio(Sounds.RUN, SoundFiles.RUN);
    this.load.audio(Sounds.JUMP, SoundFiles.JUMP);
    this.load.audio(Sounds.MENU_SELECT, SoundFiles.MENU_SELECT);
    this.load.audio(Sounds.START_GAME, SoundFiles.START_GAME);
    this.load.audio(Sounds.GAME_OVER, SoundFiles.GAME_OVER);
  }

  public create(): void {
    super.create();

    // Start HUD scene.
    this.scene.launch(Scenes.HUD);

    // Update game state to menu.
    this.registry.set(Registry.GAME_STATE, GameStates.MENU);

    // Initialize events();
    this.initEvents();
  }

  private initEvents(): void {
    // Handle game state change.
    this.registry.events.on(
      `changedata-${Registry.GAME_STATE}`,
      (parent: Phaser.Data.DataManager, gameState: string) => {
        switch (gameState) {
          case GameStates.STARTED:
            // Start game.
            this.scene.start(Scenes.GAME);
            break;
          case GameStates.MENU:
          case GameStates.GAME_OVER:
            // Stop game.
            this.scene.stop(Scenes.GAME);
            break;
          default:
            break;
        }
      },
    );
  }
}
