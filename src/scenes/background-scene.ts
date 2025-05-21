import Phaser from 'phaser';
import { BackgroundAttrs, GameStates, Registry, Scenes, Textures } from '../config';

export class BackgroundScene extends Phaser.Scene {
  private backgroundFar: Phaser.GameObjects.TileSprite;
  private backgroundNear: Phaser.GameObjects.TileSprite;

  constructor() {
    super(Scenes.BACKGROUND);
  }

  public create(): void {
    // Add background.
    this.addBackground();
  }

  public update(): void {
    const gameState = this.registry.get(Registry.GAME_STATE);
    if (gameState === GameStates.STARTED) {
      // Move background based on camera movement.
      const gameScene = this.scene.get('GameScene') as Phaser.Scene;
      const camera = gameScene.cameras.main;
      if (camera) {
        this.backgroundFar.tilePositionX = camera.scrollX * BackgroundAttrs.FAR.SCROLL.GAME;
        this.backgroundNear.tilePositionX = camera.scrollX * BackgroundAttrs.NEAR.SCROLL.GAME;
      }
    } else {
      // Scroll background on menu screen.
      this.backgroundFar.tilePositionX += BackgroundAttrs.FAR.SCROLL.MENU;
      this.backgroundNear.tilePositionX += BackgroundAttrs.NEAR.SCROLL.MENU;
    }
  }

  private addBackground(): void {
    // Add far background.
    const backgroundFar = this.textures.get(Textures.BACKGROUND.FAR.NAME).getSourceImage();
    this.backgroundFar = this.add
      .tileSprite(
        0,
        0,
        Number(this.game.config.width) / BackgroundAttrs.FAR.SCALE,
        backgroundFar.height,
        Textures.BACKGROUND.FAR.NAME,
      )
      .setScrollFactor(0)
      .setScale(BackgroundAttrs.FAR.SCALE)
      .setOrigin(0);

    // Add near background.
    const backgroundNear = this.textures.get(Textures.BACKGROUND.NEAR.NAME).getSourceImage();
    this.backgroundNear = this.add
      .tileSprite(
        0,
        Number(this.game.config.height),
        Number(this.game.config.width) / BackgroundAttrs.NEAR.SCALE,
        backgroundNear.height,
        Textures.BACKGROUND.NEAR.NAME,
      )
      .setScrollFactor(0)
      .setScale(BackgroundAttrs.NEAR.SCALE)
      .setOrigin(0, 1);
  }
}
