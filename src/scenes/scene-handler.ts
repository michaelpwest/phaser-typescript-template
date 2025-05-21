import Phaser from 'phaser';
import { GameStates, Registry, Scenes, Sounds, Textures } from '../config';
import { Util } from '../util';

export class SceneHandler extends Phaser.Scene {
  private startGameSound: Phaser.Sound.BaseSound;
  private gameOverSound: Phaser.Sound.BaseSound;

  constructor() {
    super(Scenes.HANDLER);
  }

  public preload(): void {
    // Load background images.
    this.load.image(Textures.BACKGROUND.FAR.NAME, Textures.BACKGROUND.FAR.FILE);
    this.load.image(Textures.BACKGROUND.NEAR.NAME, Textures.BACKGROUND.NEAR.FILE);

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
    // Start Background scene.
    this.scene.launch(Scenes.BACKGROUND);

    // Start HUD scene.
    this.scene.launch(Scenes.HUD);

    // Update game state to menu.
    this.registry.set(Registry.GAME_STATE, GameStates.MENU);

    // Initialize sounds.
    this.initSounds();

    // Initialize events.
    this.initEvents();
  }

  private initSounds(): void {
    // Initialize sounds.
    this.startGameSound = this.sound.add(Sounds.START_GAME.NAME);
    this.gameOverSound = this.sound.add(Sounds.GAME_OVER.NAME);
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

            // Play start game sound.
            Util.playSound(this.startGameSound);
            break;
          case GameStates.MENU:
            // Stop game.
            this.scene.stop(Scenes.GAME);
            break;
          case GameStates.GAME_OVER:
            // Stop game.
            this.scene.stop(Scenes.GAME);

            // Play game over sound.
            Util.playSound(this.gameOverSound);
            break;
          default:
            break;
        }
      },
    );
  }
}
