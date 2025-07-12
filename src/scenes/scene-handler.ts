import { GameStates, Registry, Scenes, Sounds, Textures } from '../config';

export class SceneHandler extends Phaser.Scene {
  constructor() {
    super(Scenes.HANDLER);
  }

  public preload(): void {
    // Load background image.
    this.load.image(Textures.BACKGROUND.NAME, Textures.BACKGROUND.FILE);

    // Load ground image.
    this.load.image(Textures.GROUND.NAME, Textures.GROUND.FILE);

    // Load player sprite sheet.
    this.load.spritesheet(Textures.PLAYER.NAME, Textures.PLAYER.FILE, {
      frameWidth: 32,
      frameHeight: 32,
    });

    // Load HUD sprite sheet.
    this.load.spritesheet(Textures.HUD.NAME, Textures.HUD.FILE, {
      frameWidth: 16,
      frameHeight: 16,
    });

    // Load sounds.
    this.load.audio(Sounds.RUN.NAME, Sounds.RUN.FILE);
    this.load.audio(Sounds.JUMP.NAME, Sounds.JUMP.FILE);
    this.load.audio(Sounds.MENU_SELECT.NAME, Sounds.MENU_SELECT.FILE);
    this.load.audio(Sounds.START_GAME.NAME, Sounds.START_GAME.FILE);
    this.load.audio(Sounds.GAME_OVER.NAME, Sounds.GAME_OVER.FILE);
  }

  public create(): void {
    // Start HUD scene.
    this.scene.launch(Scenes.HUD);

    // Update game state to menu.
    this.registry.set(Registry.GAME_STATE, GameStates.MENU);

    // Initialize events();
    this.initEvents();
  }

  private initEvents(): void {
    // Game state change handler.
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
